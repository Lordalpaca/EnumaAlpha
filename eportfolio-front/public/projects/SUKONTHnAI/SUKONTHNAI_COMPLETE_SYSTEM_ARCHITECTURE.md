# SUKONTHnAI - COMPLETE SYSTEM ARCHITECTURE
**Date:** February 11, 2026  
**Status:** Final MVP Implementation  
**Deadline:** TODAY

---

## 🎯 WHAT THE SYSTEM DOES

**User Experience:**
1. User presses physical button
2. LCD shows "Analyzing your essence..."
3. Webcam captures image
4. AI analyzes image and determines scent formula
5. LCD cycles through AI's thought process:
   - "I see... [observation]" (3 seconds)
   - "Hmm... Creating scent" (3 seconds)
   - "Your scent: [name]" (3 seconds)
   - "[Scent name] + ID: [session ID]" (5 seconds)
6. 4 pumps dispense custom Thai perfume blend
7. LCD displays final scent name and session ID

**Total time:** ~20-25 seconds from button press to finished scent

---

## 🔧 HARDWARE COMPONENTS (ALL TESTED & WORKING ✅)

### **Raspberry Pi 5 ("Big Pi")**
- Role: Brain - runs AI workflow, webcam, networking
- IP: 192.168.1.85
- Services running: Node-RED (port 1880), N8N (port 5678)

### **Raspberry Pi Pico ("Small Pico")**
- Role: Hardware controller - buttons, LCD, pumps
- Connection: USB to Pi 5 (appears as /dev/ttyACM0)
- Code: MicroPython `main.py` (auto-runs on boot)

### **LCD 1602A with I2C Module**
- Pin 21 (GP16) → SDA
- Pin 22 (GP17) → SCL
- Pin 23 (GND) → GND
- Pin 40 (VBUS) → VCC (5V)
- ✅ TESTED: Displays text properly

**LCD Display Sequence (Multi-Stage):**
The LCD shows AI's thought process in 4 stages (3 seconds each):
1. "I see..." + first observation (3 sec)
2. "Hmm..." + "Creating scent" (3 sec)
3. "Your scent:" + scent name (3 sec)
4. Scent name + "ID:" + last 12 chars of session ID (5 sec)

Total display time: ~14 seconds

### **Button (Momentary Push Button)**
- Pin 20 (GP15) → Button leg 1
- Pin 18 (GND) → Button leg 2
- ✅ TESTED: Detects presses, triggers events

### **4x Peristaltic Pumps (12V)**
- Pump 1 → L298N #1 OUT1/OUT2
- Pump 2 → L298N #1 OUT3/OUT4
- Pump 3 → L298N #2 OUT1/OUT2
- Pump 4 → L298N #2 OUT3/OUT4
- ✅ TESTED: All 4 pumps run correctly

### **2x L298N Motor Drivers**
**L298N #1 (Pumps 1 & 2):**
- ENA → GP0 (Pin 1)
- IN1 → GP1 (Pin 2)
- IN2 → GP2 (Pin 4)
- IN3 → GP3 (Pin 5)
- IN4 → GP4 (Pin 6)
- ENB → GP5 (Pin 7)

**L298N #2 (Pumps 3 & 4):**
- ENA → GP6 (Pin 9)
- IN1 → GP7 (Pin 10)
- IN2 → GP8 (Pin 11)
- IN3 → GP9 (Pin 12)
- IN4 → GP10 (Pin 14)
- ENB → GP11 (Pin 15)

**Power:**
- 12V 10A supply → Both L298N "12V" pins
- Common Ground: 12V (-) + Both L298N GND + Pico GND (critical!)
- 5V jumpers: ON (do not remove)

### **USB Webcam**
- Connected to: Pi 5 USB port
- Capture command: `fswebcam -r 640x480 --no-banner /tmp/sukonthnai_capture.jpg`
- ✅ INSTALLED: fswebcam package

---

## 💻 SOFTWARE ARCHITECTURE

### **Layer 1: Pico (Hardware Controller)**
**File:** `main.py` (MicroPython)
**Location:** Saved on Pico, auto-runs on boot

**What it does:**
- Monitors button (GP15)
- Controls LCD via I2C (GP16/GP17)
- Controls 4 pumps via L298N drivers
- Communicates with Pi 5 via USB serial (115200 baud)

**Messages it SENDS to Pi 5:**
```json
{"event": "button_press"}
```

**Messages it RECEIVES from Pi 5:**
```json
{
  "pump_1": 5,
  "pump_2": 7,
  "pump_3": 3,
  "pump_4": 8,
  "scent_name": "Morning Breeze",
  "session_id": "SUKONTHNAI_20260211_185500"
}
```

**OR just LCD updates:**
```json
{
  "lcd_line1": "Hello!",
  "lcd_line2": "Welcome"
}
```

**Pump Value Conversion:**
- AI returns values 0-10
- Formula: `duration_seconds = (value / 10) * 3`
- Example: value 5 = 1.5 seconds, value 10 = 3 seconds

**Status:** ✅ Code complete and tested

---

### **Layer 2: Node-RED (Flow Orchestration)**
**Access:** http://192.168.1.85:1880
**Role:** Connects all pieces together

**REQUIRED NODES:**
1. **Serial In** (listen to Pico button)
   - Port: /dev/ttyACM0
   - Baud: 115200
   - Output: String, split on \n

2. **Serial Out** (send commands to Pico)
   - Port: /dev/ttyACM0
   - Baud: 115200

3. **Exec** (capture webcam)
   - Command: `fswebcam -r 640x480 --no-banner /tmp/sukonthnai_capture.jpg && base64 -w 0 /tmp/sukonthnai_capture.jpg`

4. **MQTT Out** (send to N8N)
   - Topic: `sukonthnai/image/captured`
   - Broker: localhost:1883

5. **MQTT In** (receive from N8N)
   - Topic: `sukonthnai/ai/response`
   - Broker: localhost:1883

6. **Aedes MQTT Broker** (runs inside Node-RED)
   - Port: 1883
   - Must be deployed and running!

**FLOW LOGIC:**
```
Button Press (from Pico serial)
    ↓
Update LCD: "Analyzing..."
    ↓
Capture Webcam Image
    ↓
Convert to Base64
    ↓
Create Session ID (SUKONTHNAI_YYYYMMDD_HHMMSS)
    ↓
Publish to MQTT: sukonthnai/image/captured
    ↓
[N8N processes - see Layer 3]
    ↓
Receive from MQTT: sukonthnai/ai/response
    ↓
Parse pump values + scent name
    ↓
Send JSON to Pico via serial
    ↓
Pico runs pumps + updates LCD
```

**Status:** ⚠️ Needs configuration (MQTT broker + Serial port)

---

### **Layer 3: N8N (AI Workflow)**
**Access:** http://192.168.1.85:5678
**Role:** Handles AI analysis and data logging

**WORKFLOW STEPS:**
1. **MQTT Trigger** - Listens on `sukonthnai/image/captured`
2. **Set Session Variables** - Extract session_id, timestamp
3. **Google Drive Upload** - Save image to folder
4. **HTTP Request to OpenRouter**
   - URL: https://openrouter.ai/api/v1/chat/completions
   - Model: openai/gpt-4-vision-preview
   - API Key: `[REDACTED]`
   - System Prompt: SUKONTHnAI persona (see below)
5. **Parse AI Response** - Extract scent_name, reasoning, pumps (p1, p2, p3, p4)
6. **Google Sheets Append** - Log session data
7. **MQTT Publish Response** - Send to `sukonthnai/ai/response`
8. **MQTT Publish LCD Update** - Send to `sukonthnai/lcd/update`

**Status:** ✅ Workflow exists from yesterday (needs MQTT credentials verification)

---

## 🤖 AI PROMPT (SUKONTHnAI Persona)

```
You are SUKONTHnAI, an expert AI Fragrance Architect at What a Why Sanctuary. 
Your 'Nai' (Eye) perceives the visual world, and your 'Sukonth' (Soul of Scent) 
translates it into a therapeutic Thai aroma.

INSTRUCTIONS:
1. Analyze the attached image for color palette, emotional mood, lighting, and objects.

2. Formulate a custom fragrance using exactly 4 fragrance categories corresponding to these pumps:
   - Pump 1: Energy/Citrus (Energy, Freshness, Sharpness)
   - Pump 2: Calm/Floral (Calm, Spirit, Heart-opening)
   - Pump 3: Warmth/Spice (Warmth, Grounding, Medicinal)
   - Pump 4: Depth/Base (Depth, Ancient, Base Note)

3. STEP-BY-STEP REASONING:
   - First, describe the visual atmosphere in one sentence.
   - Second, decide the "Remedy" needed for this atmosphere 
     (e.g., if the photo is busy/stressful, increase Calm/Floral).
   - Third, assign values 0-10 for each pump based on this logic.

4. OUTPUT FORMAT:
You must output ONLY a valid JSON object. Do not include markdown formatting or extra text.

{
  "scent_name": "Poetic Thai-Inspired Name",
  "reasoning": "A brief explanation of what you see and why this scent fits the image.",
  "pumps": {
    "p1": 0-10,
    "p2": 0-10,
    "p3": 0-10,
    "p4": 0-10
  }
}

Example reasoning: "I see vibrant orange and yellow tones suggesting energy and warmth. 
The image feels dynamic and active, calling for balanced grounding. This scent harmonizes 
that energy with calming depth."
```

---

## 📊 DATA COLLECTION

### **Google Sheets: SUKONTHnAI_Data**
**Columns:**
- session_id
- timestamp
- scent_name
- reasoning
- pump_1 (value 0-10)
- pump_2 (value 0-10)
- pump_3 (value 0-10)
- pump_4 (value 0-10)
- image_url (Google Drive link)

### **Google Drive: SUKONTHnAI_Images**
Stores all captured images with session_id as filename

**Status:** ✅ Configured in N8N yesterday

---

## 🔄 COMPLETE DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    RASPBERRY PI PICO                        │
│                                                             │
│  [Button] ──> Detects Press ──> Send to Pi5 via USB       │
│                                                             │
│  [LCD] <──── Receives updates <──── From Pi5 via USB       │
│                                                             │
│  [4 Pumps] <─ Receives commands <─ From Pi5 via USB        │
└─────────────┬───────────────────────────────────────────────┘
              │ USB Serial (/dev/ttyACM0, 115200 baud)
              │
┌─────────────▼───────────────────────────────────────────────┐
│                   RASPBERRY PI 5                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              NODE-RED (Port 1880)                   │   │
│  │                                                     │   │
│  │  1. Serial In ──> Parse JSON ──> Check "button_press" │
│  │                        │                            │   │
│  │                        ├──> Update LCD via Serial   │   │
│  │                        │                            │   │
│  │                        └──> Capture Webcam (fswebcam)  │
│  │                                │                    │   │
│  │                                ▼                    │   │
│  │                        Convert to Base64           │   │
│  │                                │                    │   │
│  │                                ▼                    │   │
│  │                        Create Session ID           │   │
│  │                                │                    │   │
│  │                                ▼                    │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │      Aedes MQTT Broker (localhost:1883)     │  │   │
│  │  └─────────┬───────────────────────────▲───────┘  │   │
│  │            │ Publish                   │ Subscribe│   │
│  │            │ sukonthnai/image/captured │ sukonthnai/ai/response
│  └────────────┼───────────────────────────┼──────────┘   │
│               │                           │              │
│  ┌────────────▼───────────────────────────┴──────────┐   │
│  │              N8N (Port 5678)                      │   │
│  │                                                   │   │
│  │  MQTT In ──> Google Drive Upload                 │   │
│  │       │                                           │   │
│  │       └──> OpenRouter API (GPT-4 Vision)         │   │
│  │                  │                                │   │
│  │                  ▼                                │   │
│  │            Parse JSON Response                    │   │
│  │                  │                                │   │
│  │                  ├──> Google Sheets (Log Data)    │   │
│  │                  │                                │   │
│  │                  └──> MQTT Out ──> ai/response    │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ WHAT'S WORKING

- ✅ Pico detects button press
- ✅ Pico controls LCD (displays text)
- ✅ Pico controls all 4 pumps correctly
- ✅ Pi5 can send commands to Pico (pumps run)
- ✅ fswebcam installed on Pi5
- ✅ N8N workflow exists with OpenRouter + Google integrations
- ✅ Pico USB connection to Pi5 (/dev/ttyACM0)

---

## ⚠️ WHAT NEEDS FIXING

1. **Node-RED Flow Configuration**
   - MQTT Broker (Aedes) needs to be added/configured
   - Serial port config needs to be set up
   - Flow needs to be imported and deployed

2. **Pico → Pi5 Serial Communication**
   - Pico SENDS button events but Pi5 might not be reading them properly
   - May need to use Node-RED serial node instead of `cat` command

3. **N8N MQTT Credentials**
   - Need to verify MQTT connection settings in N8N
   - Broker: localhost, Port: 1883

---

## 🚀 PRIORITY STEPS TO COMPLETE MVP

### **STEP 1: Configure Node-RED MQTT Broker**
- Add Aedes MQTT broker node
- Set port to 1883
- Deploy

### **STEP 2: Configure Node-RED Serial Nodes**
- Set port: /dev/ttyACM0
- Set baud: 115200
- Deploy

### **STEP 3: Test Button → Pico → Pi5 Communication**
- Use Node-RED serial in node to read button presses
- Verify `{"event": "button_press"}` appears in debug

### **STEP 4: Test Webcam Capture**
- Trigger exec node manually
- Verify image captured to /tmp/

### **STEP 5: Test MQTT → N8N Communication**
- Send test message via MQTT
- Verify N8N receives it

### **STEP 6: Test N8N → OpenRouter API**
- Send test image
- Verify AI responds with pump values

### **STEP 7: Test End-to-End Flow**
- Press physical button
- Verify pumps dispense
- Verify LCD updates

---

## 🔧 TROUBLESHOOTING GUIDE

### **Pico won't run main.py on boot**
- Check if file is actually named `main.py` (not `pico_controller.py`)
- Reconnect Pico to computer, verify file exists
- Try Ctrl+D soft reboot in Thonny

### **Serial port not found**
- Run `ls /dev/ttyACM*` to find port
- Port might be /dev/ttyACM1 instead of /dev/ttyACM0
- Update Node-RED serial config accordingly

### **Pumps don't run**
- Verify 12V power supply connected
- Verify common ground (12V (-) + L298N GND + Pico GND)
- Check L298N wiring (especially ENB pins)

### **LCD shows rectangles**
- Adjust contrast potentiometer on I2C module
- Check I2C wiring (SDA/SCL swapped?)

### **MQTT not connecting**
- Verify Aedes broker is deployed in Node-RED
- Check N8N MQTT credentials (localhost:1883, no auth)
- Test with mosquitto_pub/sub: `mosquitto_pub -h localhost -t test -m "hello"`

### **AI not responding**
- Check OpenRouter API key is valid
- Verify internet connection on Pi5
- Check N8N debug logs for errors

---

## 📁 FILE LOCATIONS

**On Pico:**
- `/main.py` - Main controller code (MicroPython)

**On Pi5:**
- `/tmp/sukonthnai_capture.jpg` - Temporary webcam image
- Node-RED flows stored in Docker volume
- N8N workflows stored in Docker volume

**Available on Computer:**
- `pico_main_integrated.py` - Complete Pico code
- `Pico_Wiring_Diagram.md` - Complete wiring guide
- `nodered_flow_with_pico_serial.json` - Node-RED flow (needs config)
- `SUKONTHnAI_MVP_Requirements.md` - Original requirements

---

## 🎨 FRAGRANCE INVENTORY & CATEGORIES

### **Total Available: 26 Fragrances**

**Essential Oils (17):**
turmeric, citronella, wintergreen, shallot mint, peppermint, cinnamon, orange, plai, eucalyptus, rosemary, lavender, ginger, clove, bergamot, makwaen, wan sao long, jasmine

**Food Extracts (9):**
chocolate, vanilla, maple, blueberry, coconut, rose, orange, mango, rum, black tea

### **Category Mapping for AI**

**Category 1: Energy, Freshness, Sharpness**
- Orange ⭐
- Citronella ⭐
- Peppermint ⭐
- Wintergreen
- Bergamot

**Category 2: Calm, Spirit, Heart-opening**
- Jasmine ⭐
- Lavender ⭐
- Rose ⭐
- Vanilla
- Coconut

**Category 3: Warmth, Grounding, Medicinal**
- Ginger ⭐
- Cinnamon ⭐
- Clove ⭐
- Turmeric
- Plai (Thai ginger)
- Eucalyptus
- Rosemary

**Category 4: Depth, Ancient, Base Note**
- Makwaen (Thai pepper) ⭐
- Wan Sao Long ⭐
- Black Tea
- Rum
- Chocolate
- Maple

⭐ = Best representatives for each category

### **MVP Setup (4 Pumps)**
User physically selects 4 fragrances (one from each category) and fills pumps before session.
AI prompt uses BROAD categories, not specific fragrance names, allowing flexibility.

**Example MVP Setup:**
- Pump 1 (Energy): Orange
- Pump 2 (Calm): Jasmine  
- Pump 3 (Warmth): Ginger
- Pump 4 (Depth): Makwaen

User can swap fragrances between sessions without changing code!

---

## 💡 TESTING WITHOUT FULL SYSTEM

**Test Pico Standalone:**
```python
# Add to bottom of main.py for testing
test_pump_values = {"pump_1": 5, "pump_2": 7, "pump_3": 3, "pump_4": 8}
run_pumps_from_values(test_pump_values)
```

**Test Node-RED with Inject Node:**
- Use inject node to simulate button press
- Payload: `{"event": "button_press"}`

**Test N8N with Manual Trigger:**
- Use "Test Workflow" button
- Provide sample base64 image

---

## 🎯 DEFINITION OF DONE

MVP is complete when:
1. ✅ Physical button press is detected
2. ✅ LCD shows "Analyzing..."
3. ✅ Webcam captures image
4. ✅ AI analyzes and returns pump values
5. ✅ All 4 pumps dispense correct amounts
6. ✅ LCD shows scent name and session ID
7. ✅ Data logged to Google Sheets
8. ✅ System resets and waits for next button press

---

**LAST UPDATED:** February 11, 2026 - 7:15 PM  
**COMPLETION TARGET:** Tonight (before midnight)  
**REMAINING WORK:** Node-RED configuration + end-to-end testing
