# SUKONTHnAI - MVP Requirements Document

**Project Name:** SUKONTHnAI (Scent AI)  
**Version:** MVP v1.0  
**Target Completion:** February 10, 2026  
**Location:** What a Why Sanctuary

---

## 🎯 Project Overview

An AI-powered fragrance blending installation that analyzes visual input (photos, artwork, faces) and creates custom Thai perfume blends by dispensing 4 different base notes through automated pumps.

---

## 👤 User Experience Flow

### **Session Start**
1. User presses **BEGIN button**
2. LCD displays welcome message:
   ```
   Hello. I am SUKONTHnAI.
   I will help you discover a Thai perfume 
   from your picture or art.
   
   To begin, place your face or picture 
   in front of the camera and press the button.
   ```

### **Capture & Analysis**
3. User positions themselves/object in front of webcam
4. User presses **CAPTURE button**
5. Webcam captures image
6. LCD displays: `"Analyzing your essence..."`
7. AI processes image (GPT-4 Vision via OpenRouter)
8. LCD displays analysis:
   ```
   Hmm... this picture is giving:
   [AI's reasoning about the image]
   
   Creating your scent...
   ```

### **Dispensing**
9. Pumps activate based on AI-calculated ratios
10. LCD displays:
   ```
   Your scent: [Poetic Thai Name]
   
   Session ID: [UNIQUE_ID]
   Save this to recreate your scent!
   ```

### **Session End**
11. System waits for next button press to restart

---

## 🧪 Fragrance Architecture

### **4 Thai Base Notes (Fixed for MVP)**

| Pump | Ingredient | Therapeutic Quality | Value Range |
|------|-----------|---------------------|-------------|
| Pump 1 | Citrus/Kaffir Lime | Energy, Freshness, Sharpness | 0-10 |
| Pump 2 | Jasmine/Floral | Calm, Spirit, Heart-opening | 0-10 |
| Pump 3 | Ginger/Spice | Warmth, Grounding, Medicinal | 0-10 |
| Pump 4 | Agarwood/Wood | Depth, Ancient, Base Note | 0-10 |

### **AI Reasoning Logic**

The AI (SUKONTHnAI persona) analyzes:
- **Color palette** (warm/cool tones)
- **Emotional mood** (calm/energetic/melancholic/joyful)
- **Lighting** (bright/dark/soft/harsh)
- **Objects/subjects** (nature/urban/portraits/abstract)

**Decision Framework:**
1. Describe visual atmosphere (1 sentence)
2. Determine "Remedy" needed (e.g., busy image → increase Jasmine for calm)
3. Assign pump values (0-10) based on therapeutic response

---

## 🤖 AI Prompt (System Instructions)

```
You are SUKONTHnAI, an expert AI Fragrance Architect at What a Why Sanctuary. 
Your 'Nai' (Eye) perceives the visual world, and your 'Sukonth' (Soul of Scent) 
translates it into a therapeutic Thai aroma.

INSTRUCTIONS:
1. Analyze the attached image for color palette, emotional mood, lighting, and objects.
2. Formulate a custom fragrance using exactly 4 Thai base notes corresponding to these pumps:
   - Pump 1: Citrus/Kaffir Lime (Energy, Freshness, Sharpness)
   - Pump 2: Jasmine/Floral (Calm, Spirit, Heart-opening)
   - Pump 3: Ginger/Spice (Warmth, Grounding, Medicinal)
   - Pump 4: Agarwood/Wood (Depth, Ancient, Base Note)

3. STEP-BY-STEP REASONING:
   - First, describe the visual atmosphere in one sentence.
   - Second, decide the "Remedy" needed for this atmosphere 
     (e.g., if the photo is busy/stressful, increase Jasmine).
   - Third, assign values 0-10 for each pump based on this logic.

4. OUTPUT FORMAT:
You must output ONLY a valid JSON object. Do not include markdown formatting or extra text.

{
  "scent_name": "Poetic Thai Name",
  "reasoning": "A brief explanation of why this scent fits the image.",
  "pumps": {
    "p1": 0-10,
    "p2": 0-10,
    "p3": 0-10,
    "p4": 0-10
  }
}
```

**Model:** `gpt-4-vision-preview` (via OpenRouter)

---

## 💾 Data Collection & Storage

### **Storage Location**
Google Sheets (for researcher/builder analysis)

### **Data Points Saved Per Session**

| Field | Description | Example |
|-------|-------------|---------|
| `session_id` | Unique identifier | `SUKONTHNAI_20260208_143052` |
| `timestamp` | Date/time of creation | `2026-02-08 14:30:52` |
| `image_base64` | Photo captured (or URL if too large) | `data:image/jpeg;base64,...` |
| `scent_name` | AI-generated Thai name | `"ลมเย็นยามเช้า" (Morning Breeze)` |
| `reasoning` | AI's explanation | `"This image radiates calm energy..."` |
| `pump_1_value` | Citrus/Kaffir Lime amount | `3` |
| `pump_2_value` | Jasmine/Floral amount | `7` |
| `pump_3_value` | Ginger/Spice amount | `2` |
| `pump_4_value` | Agarwood/Wood amount | `5` |

### **User Access (Post-MVP)**
- Users receive unique Session ID on LCD
- Can reference ID to recreate scent later (future feature)

---

## 🔧 Technical Architecture

### **Hardware Components**
- Raspberry Pi (main controller)
- Webcam (image capture)
- LCD Screen (16x2 or 20x4, I2C interface)
- 4x Peristaltic pumps (controlled via GPIO or relay module)
- 2x Buttons (BEGIN, CAPTURE - or single multi-function button)
- Power supply for pumps

### **Software Stack**

#### **On Raspberry Pi:**
- **Node-RED** (hardware orchestration)
  - Camera control
  - Button input handling
  - LCD display updates
  - Pump control (GPIO)
  - MQTT publishing/subscribing

- **Mosquitto MQTT Broker** (message routing)

#### **On Server/Cloud (or Pi):**
- **N8N** (workflow automation)
  - Receives image via MQTT
  - Calls OpenRouter API (GPT-4 Vision)
  - Processes AI response
  - Saves to Google Sheets
  - Sends pump commands back via MQTT

### **Communication Protocol**
**MQTT** (preferred for IoT)

**Topics:**
- `sukonthnai/image/captured` - Pi publishes image data
- `sukonthnai/ai/response` - N8N publishes AI results
- `sukonthnai/pumps/dispense` - Pump activation commands
- `sukonthnai/lcd/update` - LCD text updates

---

## 📊 System Flow Diagram

```
┌─────────────┐
│   USER      │
│ Press Btn   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│   RASPBERRY PI (Node-RED)           │
│                                     │
│  1. Capture image (fswebcam)       │
│  2. Convert to base64              │
│  3. Publish to MQTT:               │
│     sukonthnai/image/captured      │
└──────┬──────────────────────────────┘
       │
       │ MQTT
       ▼
┌─────────────────────────────────────┐
│   N8N WORKFLOW                      │
│                                     │
│  4. Receive image via MQTT         │
│  5. Call OpenRouter API            │
│     - Model: gpt-4-vision-preview  │
│     - Prompt: SUKONTHnAI system    │
│  6. Parse JSON response            │
│  7. Save to Google Sheets          │
│  8. Publish results to MQTT:       │
│     sukonthnai/ai/response         │
└──────┬──────────────────────────────┘
       │
       │ MQTT
       ▼
┌─────────────────────────────────────┐
│   RASPBERRY PI (Node-RED)           │
│                                     │
│  9. Receive AI response            │
│ 10. Update LCD with scent info     │
│ 11. Trigger pumps (GPIO/relay)     │
│     - p1: X seconds                │
│     - p2: Y seconds                │
│     - p3: Z seconds                │
│     - p4: W seconds                │
│ 12. Display Session ID on LCD      │
│ 13. Wait for next button press     │
└─────────────────────────────────────┘
```

---

## ⚠️ Error Handling (MVP)

| Error Condition | LCD Display | System Action |
|----------------|-------------|---------------|
| Camera failure | `"Oops! Camera not responding. Please restart."` | Log error, wait for restart |
| AI API timeout/down | `"Oops! AI is thinking too hard. Please try again."` | Log error, return to start |
| Pump malfunction | `"Oops! Dispenser issue. Please notify staff."` | Log error, halt pumps |
| MQTT connection lost | `"Oops! Connection lost. Reconnecting..."` | Attempt reconnect, log error |

**General Error Message:**
```
Oops! Something went wrong.
Please try again or contact staff.
```

---

## 🚀 MVP Scope (Must-Have for Feb 10)

### ✅ **In Scope**
- [x] Single button to start session
- [x] Webcam image capture
- [x] LCD welcome/status messages
- [x] AI image analysis (GPT-4V)
- [x] 4-pump perfume dispensing
- [x] Google Sheets data logging
- [x] Basic error messages on LCD
- [x] MQTT communication between Pi and N8N

### ❌ **Out of Scope (Post-MVP)**
- [ ] User-facing scent profile retrieval system
- [ ] Animated face on LCD screen
- [ ] Multiple fragrance "collections" (only 4 pumps for now)
- [ ] User accounts or login
- [ ] QR code generation for Session ID
- [ ] Advanced error recovery automation
- [ ] Web dashboard for live monitoring
- [ ] Multi-language support

---

## 📝 Notes & Considerations

### **Pump Calibration**
- Values 0-10 need to be converted to pump runtime (seconds)
- **Assumption:** Value of 10 = 3 seconds of pump runtime
- **Formula:** `pump_time_seconds = (value / 10) * 3`
- Test and calibrate based on actual perfume volume needed

### **Image Storage**
- Base64 encoding can make Google Sheets slow if too many images
- **Alternative:** Upload image to Google Drive, store Drive link in Sheets
- Decision needed before final implementation

### **Session ID Format**
- `SUKONTHNAI_YYYYMMDD_HHMMSS`
- Example: `SUKONTHNAI_20260208_143052`

### **OpenRouter API Key**
- **Current Key:** `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`
- **⚠️ IMPORTANT:** Regenerate and secure this key before public launch
- Store in N8N credentials (never hardcode)

---

## 📅 Development Timeline

| Date | Task |
|------|------|
| **Feb 7** | Hardware assembly complete (waiting on electrical parts) |
| **Feb 8** | - Set up MQTT broker on Pi<br>- Build Node-RED flow (camera + pumps + LCD)<br>- Test hardware components |
| **Feb 9** | - Build N8N workflow<br>- Connect to OpenRouter API<br>- Set up Google Sheets logging<br>- End-to-end testing |
| **Feb 10** | - Final calibration<br>- Bug fixes<br>-**MVP COMPLETE** |

---

## 🔗 API & Resources

### **OpenRouter**
- API Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: `openai/gpt-4-vision-preview`
- [Docs](https://openrouter.ai/docs)

### **Google Sheets API**
- N8N has native Google Sheets nodes
- Requires OAuth setup (one-time)

### **MQTT Broker (Mosquitto)**
- Install: `sudo apt-get install mosquitto mosquitto-clients`
- Default port: 1883

---

## ✅ Success Criteria (MVP)

The MVP is complete when:
1. A user can press a button and see welcome message
2. System captures image when button is pressed again
3. AI analyzes image and returns valid JSON with scent formula
4. LCD displays scent name and reasoning
5. All 4 pumps dispense correct amounts
6. Session data is saved to Google Sheets
7. System resets and waits for next session
8. Basic error messages appear if something fails

---

**Document Owner:** [Your Name]  
**Last Updated:** February 7, 2026  
**Status:** Draft for MVP Development
