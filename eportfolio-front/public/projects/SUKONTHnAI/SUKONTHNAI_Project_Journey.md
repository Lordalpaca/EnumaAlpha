# Building SUKONTHnAI: Learning AI-Powered Hardware Integration in One Week

**By Alpha**  
**February 4-11, 2026**  
**Built at What a Why Sanctuary, Bangkok**

---

## The Inspiration

I discovered [Anemoia](https://www.media.mit.edu/projects/anemoia/overview/) by Cyrus Clarke and the MIT Media Lab team - an AI system that generates personalized scents from memories and emotions. It was fascinating how they used AI to create multi-sensory experiences.

After taking a weekend course on Raspberry Pi and AIoT fundamentals, I wondered if I could build something in that same space. Not as sophisticated as Anemoia, but as a learning project to understand how these systems work. The goal: create an AI-powered fragrance system analyzing visual input in one week.

I had basic knowledge of motor drivers, Node-RED, and N8N from previous tinkering. But I'd never built a complete system integrating computer vision AI, hardware control, and workflow automation. This would be my first end-to-end IoT project.

**Development approach:** I worked with Claude (Anthropic's AI assistant) for coding help - I made all architectural decisions, did all physical hardware work, diagnosed issues, and tested everything. Claude generated code based on my requirements and helped debug. Basically: I was the engineer, Claude was the coding tool.

---

## What I Built

**SUKONTHnAI** (Thai: "Scent AI") is an interactive art installation that:

1. **Captures** your photo or artwork via webcam
2. **Analyzes** the image using Gemini Flash 2.0, interpreting colors, mood, and energy
3. **Formulates** a custom fragrance blend from 4 Thai aromatherapy categories
4. **Dispenses** the precise formula through automated peristaltic pumps
5. **Records** each creation to a database for future reproduction

The system processes everything in ~20 seconds, displaying the AI's "thought process" on an LCD screen as it determines your perfect scent.

---

## The Stack

### Hardware
- **Raspberry Pi 5** (8GB) - Main compute, AI processing, networking
- **Raspberry Pi Pico** - Hardware control (pumps, LCD, button)
- **USB Webcam** - Image capture
- **LCD 1602A with I2C** - User interface display
- **4x Peristaltic Pumps** (12V) - Fragrance dispensing
- **2x L298N Motor Drivers** - Pump control
- **12V 10A Power Supply** - System power

### Software Architecture
- **MicroPython** on Pico - Hardware abstraction layer
- **Node-RED** - Flow orchestration and MQTT broker
- **N8N** - Workflow automation
- **Google Gemini Flash 2.0** (via OpenRouter) - AI vision analysis
- **Google Drive & Sheets** - Data persistence
- **MQTT** - Inter-service messaging

### Key Technical Decisions

**Separated compute from hardware control:** Used Raspberry Pi Pico for GPIO operations instead of Pi 5 directly. This prevented potential GPIO damage from 12V motor driver feedback and created a cleaner architecture.

**USB serial communication:** Simple, reliable communication between Pi 5 (brain) and Pico (muscles) without needing WiFi or additional networking.

**Broad fragrance categories over specific scents:** AI prompt uses categories (Energy/Citrus, Calm/Floral, Warmth/Spice, Depth/Base) rather than specific ingredient names, allowing physical fragrance changes without code updates.

**Multi-stage LCD display:** Instead of just showing results, the LCD cycles through the AI's reasoning: "I see... [observation]" → "Hmm... Creating scent" → "Your scent: [name]" → Final display with session ID.

---

## The Journey: Day by Day

### Day 1 (Feb 4): Vision & Requirements
- Drafted complete MVP requirements document
- Defined user experience flow
- Selected 4 Thai fragrance categories representing different therapeutic qualities
- Created AI persona prompt for fragrance analysis

**Key Decision:** Keep MVP scope tight - 4 pumps, single button, essential features only.

### Day 2-3 (Feb 5-6): Hardware Planning
- Researched L298N motor driver specifications
- Created complete wiring diagrams for Pi 5 GPIO
- Ordered missing components (I2C LCD adapter)

**Major Learning:** Discovered 5V logic level incompatibility between L298N and Pi 5's 3.3V GPIO. Almost damaged the Pi.

### Day 4 (Feb 7): Architecture Pivot
- After GPIO safety concerns, decided to use Raspberry Pi Pico for all hardware control
- Redesigned system architecture: Pi 5 (compute) ↔ USB serial ↔ Pico (hardware)
- Created new wiring diagrams for Pico-based control
- Mapped all 12 control pins for 2x L298N drivers

**Critical Insight:** Professional IoT systems separate "brain" from "muscles" for good reason - safety, modularity, and reliability.

### Day 5 (Feb 8): Software Foundation
- Built N8N workflow: MQTT → Gemini API → Google Sheets
- Created Node-RED flow for orchestration
- Configured OpenRouter API integration
- Set up Google Drive & Sheets for data logging

**Challenge:** Network connectivity issues on Pi 5. Root cause: Static IP configuration had gateway pointing to Pi's own IP instead of router, creating a routing loop.

### Day 6 (Feb 9): Hardware Assembly & Testing
- Flashed MicroPython onto Raspberry Pi Pico
- Wired all components: button, LCD, 4 pumps, 2 L298N drivers
- Wrote Pico control code (200+ lines of MicroPython)
- Individual component testing

**Hardware Debugging Saga:**
- Button test: ✅ (after fixing loose wire)
- LCD test: ❌ → rectangles instead of text → adjusted I2C contrast potentiometer → ✅
- Pump 1 & 2: ✅
- Pump 3 & 4: ❌ → discovered ENB pin wired to wrong GPIO → ✅
- All 4 pumps: ❌ → pins 4 & 5 swapped → ✅

**Hardest Moment:** Spent 5 hours attempting to desolder I2C module without proper tools (no desoldering wick or solder sucker). Ripped copper pads. Had to use backup module. Learned: never desolder without proper tools.

### Day 7 (Feb 10): Integration Hell & Victory
- Connected Pico to Pi 5 via USB
- Discovered Pico boots into REPL mode instead of running main.py
- Fixed: Properly saved code as main.py (not pico_controller.py)
- Serial communication testing: Pi 5 → Pico ✅, Pico → Pi 5 ❌
- Found issue: `cat` command couldn't read serial properly from Pico

**Node-RED Configuration Challenges:**
- MQTT broker needed inside Node-RED (Aedes module)
- Serial port configuration didn't import cleanly
- fswebcam needed installation inside Docker container

**Breakthrough at 8:00 PM:** Complete system test successful
- Button press detected
- Webcam captured image
- Image sent to Gemini Flash 2.0
- AI returned fragrance formula
- All 4 pumps dispensed correctly
- LCD displayed thought process
- Data logged to Google Sheets

**MVP COMPLETE at 9:00 AM, Feb 11**

---

## Technical Challenges & Solutions

### Challenge: GPIO Safety with 12V Motors
**Problem:** L298N drivers operate at 5V logic, Pi 5 uses 3.3V GPIO. Risk of damage.  
**Solution:** Used Raspberry Pi Pico (5V-tolerant) for all motor control, communicating with Pi 5 via USB serial.

### Challenge: Serial Communication Reliability
**Problem:** Pico → Pi 5 serial messages not appearing in `cat` output.  
**Solution:** Used Node-RED's serial-in node instead of bash `cat` command. Proper buffering and line parsing.

### Challenge: AI Model Selection
**Problem:** GPT-4 Vision doesn't support human faces in images.  
**Solution:** Switched to Google Gemini Flash 2.0, which handles human portraits without restrictions.

### Challenge: LCD I2C Not Displaying Text
**Problem:** LCD showed only rectangles despite correct wiring.  
**Solution:** MicroPython I2C library needed specific initialization sequence. Also adjusted physical contrast potentiometer on I2C module.

### Challenge: Pump Synchronization
**Problem:** Need to display AI reasoning while pumps run, but LCD can't update during blocking pump operations.  
**Solution:** Send all pump commands at once via serial, let Pico handle execution. LCD messages sent separately with delays.

### Challenge: Docker Network Isolation
**Problem:** fswebcam installed on host but Node-RED running in Docker couldn't access it.  
**Solution:** Installed fswebcam inside Node-RED Docker container: `docker exec -it nodered bash`

---

## The AI Prompt Engineering

After multiple iterations, the final prompt structure:

```
You are SUKONTHnAI, an expert AI Fragrance Architect at What a Why Sanctuary.

1. Analyze the image for color palette, emotional mood, lighting, and objects.

2. Formulate a fragrance using 4 categories:
   - Pump 1: Energy/Citrus (Energy, Freshness, Sharpness)
   - Pump 2: Calm/Floral (Calm, Spirit, Heart-opening)
   - Pump 3: Warmth/Spice (Warmth, Grounding, Medicinal)
   - Pump 4: Depth/Base (Depth, Ancient, Base Note)

3. STEP-BY-STEP REASONING:
   - Describe the visual atmosphere in one sentence
   - Decide the "Remedy" needed
   - Assign values 0-10 for each pump

4. OUTPUT: JSON only
{
  "scent_name": "Poetic Thai-Inspired Name",
  "reasoning": "What you see and why this scent fits",
  "pumps": { "p1": 0-10, "p2": 0-10, "p3": 0-10, "p4": 0-10 }
}
```

**Key Insight:** AI performs better with structured reasoning steps than direct requests for output. The prompt guides through observation → analysis → formula.

---

## Fragrance Categories & Inventory

**Available Essential Oils (17):**
Turmeric, Citronella, Wintergreen, Shallot Mint, Peppermint, Cinnamon, Orange, Plai, Eucalyptus, Rosemary, Lavender, Ginger, Clove, Bergamot, Makwaen, Wan Sao Long, Jasmine

**Food Extracts (9):**
Chocolate, Vanilla, Maple, Blueberry, Coconut, Rose, Orange, Mango, Rum, Black Tea

**Category Mapping:**
- **Energy/Citrus:** Orange, Citronella, Peppermint, Wintergreen, Bergamot
- **Calm/Floral:** Jasmine, Lavender, Rose, Vanilla, Coconut
- **Warmth/Spice:** Ginger, Cinnamon, Clove, Turmeric, Plai, Eucalyptus, Rosemary
- **Depth/Base:** Makwaen, Wan Sao Long, Black Tea, Rum, Chocolate, Maple

User physically selects 4 fragrances (one per category) before each session. System adapts to whatever fragrances are loaded.

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│              RASPBERRY PI PICO                      │
│                                                     │
│  [Button] → Detect → Send JSON → USB Serial        │
│  [LCD] ← Update ← Receive JSON ← USB Serial        │
│  [4 Pumps] ← Control ← Receive JSON ← USB Serial   │
└────────────────┬────────────────────────────────────┘
                 │ USB Serial (115200 baud)
                 │
┌────────────────▼────────────────────────────────────┐
│              RASPBERRY PI 5                         │
│  ┌──────────────────────────────────────────────┐  │
│  │           NODE-RED (Port 1880)               │  │
│  │                                              │  │
│  │  Serial In → Parse → Check Button Event     │  │
│  │       ↓                                      │  │
│  │  Update LCD + Capture Webcam (fswebcam)     │  │
│  │       ↓                                      │  │
│  │  Convert to Base64 + Create Session ID      │  │
│  │       ↓                                      │  │
│  │  Publish to MQTT (Aedes Broker:1883)        │  │
│  └──────────────┬──────────────▲────────────────┘  │
│                 │               │                   │
│  ┌──────────────▼───────────────┴────────────────┐ │
│  │            N8N (Port 5678)                    │ │
│  │                                               │ │
│  │  MQTT In → Google Drive Upload               │ │
│  │       ↓                                       │ │
│  │  Call Gemini Flash 2.0 (via OpenRouter)      │ │
│  │       ↓                                       │ │
│  │  Parse Response → Google Sheets               │ │
│  │       ↓                                       │ │
│  │  MQTT Out → Pump Commands + LCD Messages     │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Data Flow: Button Press to Scent

1. **User presses button** on Pico
2. **Pico sends:** `{"event": "button_press"}` via USB serial
3. **Node-RED receives**, triggers workflow
4. **LCD updates:** "Analyzing your essence..."
5. **fswebcam captures** image → `/tmp/sukonthnai_capture.jpg`
6. **Convert to base64**, create session ID: `SUKONTHNAI_20260211_090000`
7. **Publish to MQTT:** `sukonthnai/image/captured` topic
8. **N8N receives** MQTT message
9. **Upload image** to Google Drive folder
10. **Call Gemini Flash 2.0** with image + SUKONTHnAI prompt
11. **AI responds** with JSON: scent name, reasoning, pump values (0-10 each)
12. **Parse response**, log to Google Sheets
13. **Publish to MQTT:** `sukonthnai/ai/response` topic
14. **Node-RED receives** AI response
15. **LCD displays** 4-stage thought process:
    - "I see... [observation]" (3 sec)
    - "Hmm... Creating scent" (3 sec)
    - "Your scent: [name]" (3 sec)
    - "[Name] ID: [session ID]" (5 sec)
16. **Send pump commands** to Pico via serial
17. **Pico runs pumps** with formula: `(value / 10) * 3` seconds each
18. **System ready** for next user

**Total time:** ~20-25 seconds from button press to finished scent

---

## Lessons Learned

### Technical
1. **Separation of concerns matters:** Keeping compute (Pi 5) separate from hardware control (Pico) made debugging infinitely easier.
2. **Common ground is non-negotiable:** All grounds (12V supply, L298N, Pico, Pi 5) must be connected together.
3. **Docker isolation is real:** Tools installed on host aren't available inside containers. Always `docker exec` to install.
4. **Serial communication needs buffering:** Simple `cat` commands don't work reliably. Use proper serial libraries.
5. **AI prompts need structure:** Step-by-step reasoning produces better results than direct output requests.

### Hardware
1. **Always have backup components:** That second I2C module saved the project.
2. **Test components individually first:** Trying to debug 4 pumps at once is hell. Test one at a time.
3. **Proper tools matter:** 5 hours of desoldering pain taught me to always have desoldering wick ready.
4. **Wire strain relief is important:** Loose wires were my most common bug.

### Process
1. **Document everything immediately:** When debugging at 2 AM, you won't remember what you tried.
2. **Scope control is critical:** Resisted adding "just one more feature" repeatedly.
3. **Incremental testing saves time:** Test each layer before adding the next.
4. **Know when to pivot:** Switched from Pi 5 GPIO to Pico early when safety concerns emerged.

---

## What I'm Proud Of

1. **System integration:** Connected 7+ different technologies into one coherent system
2. **Problem-solving under pressure:** Debugged hardware issues without prior experience
3. **Architecture decisions:** Made smart trade-offs between complexity and reliability
4. **Learning speed:** Went from zero MicroPython knowledge to shipping production code in 3 days
5. **Completion:** Despite setbacks (desoldering disaster, serial communication issues, motor driver debugging), shipped the MVP on time

---

## What's Next

**Immediate improvements:**
- Add ultrasonic mist maker for dramatic effect
- QR code generation for session IDs (users can retrieve their formula later)
- Multi-language support (Thai/English)

**Future features:**
- User fragrance selection UI (choose which 4 fragrances to load)
- Scent profiles: save user preferences across sessions
- Web dashboard for live monitoring and analytics
- Multiple fragrance "collections" with hot-swap capability

---

## What I Learned

This project taught me that complex systems are built piece by piece - you don't need to know everything upfront. I learned:

**Technical skills:**
- How to separate compute from hardware control (Pi 5 + Pico architecture)
- Serial communication between devices
- MQTT pub/sub patterns for IoT
- Working with Docker containers
- AI prompt engineering for creative tasks

**Process lessons:**
- Test components individually before integrating
- Document as you go (especially at 2 AM)
- Pivot quickly when you hit safety/technical issues
- Proper tools matter (that 5-hour desoldering disaster proved it)
- Ship first, perfect later

**Most importantly:** I learned that I can build functional prototypes of systems I see in research labs. Not at their level of sophistication yet, but functional enough to understand how they work. That's valuable.

Whether this leads to anything or not, I proved to myself I can go from inspiration (seeing Anemoia) to working prototype in a week. That's progress.

---

## What's Next

**For this project:**
- Add ultrasonic mist maker for visual effect
- Improve AI prompts based on user testing
- Add QR codes for session retrieval
- Better error handling and user feedback

**For my learning:**
- Study how professional installations like Anemoia handle multi-sensory integration
- Learn more about scent composition and olfactory design
- Explore other sensory modalities (haptics, sound)
- Build more end-to-end systems to get faster at integration

---

## Technical Specifications

**Compute:**
- Raspberry Pi 5 (8GB RAM, BCM2712 SoC)
- Raspberry Pi Pico (RP2040, 264KB RAM)

**Networking:**
- WiFi: 2.4GHz/5GHz
- MQTT Broker: Aedes on localhost:1883
- HTTP APIs: OpenRouter, Google Drive, Google Sheets

**Power:**
- 12V 10A power supply for pumps
- 5V from Pi 5 USB for Pico
- Total power consumption: ~15W idle, ~80W with pumps active

**Precision:**
- Pump control: 0.1 second resolution
- Value range: 0-10 (maps to 0-3 seconds dispense time)
- Repeatability: ±0.2 seconds (tested)

**Response Time:**
- Button to LCD update: <100ms
- Image capture: ~2 seconds
- AI analysis: 3-8 seconds (depends on API)
- Pump dispensing: 0-3 seconds per pump
- Total cycle: ~20-25 seconds

---

## Acknowledgments & Inspiration

**Primary Inspiration:** [Anemoia](https://www.media.mit.edu/projects/anemoia/overview/) by Cyrus Clarke, MIT Media Lab - for pioneering AI-driven scent generation and showing what's possible when combining AI with olfactory experiences.

**Development Tools:**  
- Claude (Anthropic) - AI coding assistant for code generation and debugging
- Node-RED community - for IoT flow patterns
- OpenRouter - for multi-model API access
- MicroPython community - for Pico examples

**Location:** What a Why Sanctuary, Bangkok  
**Timeline:** February 4-11, 2026  

**Note:** This was a learning project to understand how AI-powered multi-sensory installations work. While inspired by professional research like Anemoia, this is a beginner's implementation focused on learning the fundamentals of system integration.

---

## Contact

**Alpha**  
Bangkok, Thailand  
[Your contact info]

**Project Repository:** [Link to your GitHub]  
**Live Demo:** What a Why Sanctuary, Bangkok

---

*Built with: MicroPython, Node-RED, N8N, Gemini Flash 2.0, Love, and way too much coffee* ☕🔬🤖
