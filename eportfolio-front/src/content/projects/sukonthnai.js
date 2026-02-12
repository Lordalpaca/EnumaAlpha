export default {
  slug: "sukonthnai",
  title: "SUKONTHnAI",
  description: "An AI-powered fragrance blending installation that analyzes visual input and creates custom Thai perfume blends through automated peristaltic pumps, built in one week.",
  thumbnail: "/projects/SUKONTHnAI/concept-art.png",
  tags: ["AIoT", "Raspberry Pi", "MicroPython", "Node-RED", "N8N", "MQTT", "Gemini AI"],
  date: "2026",
  content: `
## Overview

**SUKONTHnAI** — from the Thai words *Sukonth* (scent) + *Nai* (eyes) + *AI* — is an interactive art installation that captures your photo, analyzes it with AI, and dispenses a custom Thai fragrance blend tailored to the visual essence of the image — all in about 20 seconds.

Built in one week at What a Why Sanctuary, Bangkok (February 4–11, 2026).

**Inspired by** [Anemoia](https://www.media.mit.edu/projects/anemoia/overview/) by Cyrus Clarke and the MIT Media Lab — an AI system that generates personalized scents from memories and emotions.

![SUKONTHnAI Concept Art](/projects/SUKONTHnAI/concept-art.png)

## How It Works

1. **Capture** — User presses a button; a webcam captures their photo or artwork
2. **Analyze** — Gemini Flash 2.0 interprets colors, mood, lighting, and energy from the image
3. **Formulate** — The AI assigns intensity values (0–10) across 4 Thai aromatherapy categories
4. **Dispense** — Peristaltic pumps deliver the precise fragrance formula
5. **Record** — Each creation is logged to a database for future reproduction

The LCD screen displays the AI's "thought process" in real time as it determines the scent.

<video src="/projects/SUKONTHnAI/demo.mov" controls width="100%"></video>

## The Stack

### Hardware
- **Raspberry Pi 5** (8GB) — Main compute, AI processing, networking
- **Raspberry Pi Pico** — Hardware control (pumps, LCD, button)
- **USB Webcam** — Image capture
- **LCD 1602A with I2C** — User interface display
- **4x Peristaltic Pumps** (12V) — Fragrance dispensing
- **2x L298N Motor Drivers** — Pump control
- **12V 10A Power Supply** — System power

### Software
- **MicroPython** on Pico — Hardware abstraction layer
- **Node-RED** — Flow orchestration and MQTT broker
- **N8N** — Workflow automation
- **Google Gemini Flash 2.0** (via OpenRouter) — AI vision analysis
- **Google Drive & Sheets** — Data persistence
- **MQTT** — Inter-service messaging

## System Architecture

The system separates "brain" from "muscles" — the Pi 5 handles compute and AI while the Pico handles all GPIO and hardware control, communicating over USB serial.

\`\`\`
┌─────────────────────────────────────────────────────┐
│              RASPBERRY PI PICO                      │
│                                                     │
│  [Button] → Detect → Send JSON → USB Serial        │
│  [LCD] ← Update ← Receive JSON ← USB Serial        │
│  [4 Pumps] ← Control ← Receive JSON ← USB Serial   │
└────────────────┬────────────────────────────────────┘
                 │ USB Serial (115200 baud)
┌────────────────▼────────────────────────────────────┐
│              RASPBERRY PI 5                         │
│  ┌──────────────────────────────────────────────┐  │
│  │           NODE-RED (Port 1880)               │  │
│  │  Serial In → Parse → Capture Webcam          │  │
│  │       → Convert Base64 → Publish MQTT        │  │
│  └──────────────┬──────────────▲────────────────┘  │
│  ┌──────────────▼───────────────┴────────────────┐ │
│  │            N8N (Port 5678)                    │ │
│  │  MQTT In → Google Drive Upload               │ │
│  │       → Gemini Flash 2.0 AI Analysis         │ │
│  │       → Google Sheets Logging                │ │
│  │       → MQTT Out → Pump + LCD Commands       │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
\`\`\`

![LCD displaying SUKONTHnAI on the prototype](/projects/SUKONTHnAI/lcd-prototype.jpg)

## Fragrance Categories

The AI prompt uses broad therapeutic categories rather than specific ingredient names, so physical fragrances can be swapped without code changes:

| Pump | Category | Therapeutic Quality | Example Oils |
|------|----------|---------------------|-------------|
| 1 | Energy/Citrus | Freshness, Sharpness | Orange, Bergamot, Peppermint |
| 2 | Calm/Floral | Spirit, Heart-opening | Jasmine, Lavender, Rose |
| 3 | Warmth/Spice | Grounding, Medicinal | Ginger, Cinnamon, Clove |
| 4 | Depth/Base | Ancient, Base Note | Makwaen, Wan Sao Long, Black Tea |

A total of 26 fragrances (17 essential oils + 9 food extracts) are available across the categories.

## AI Prompt Engineering

The AI persona (SUKONTHnAI) follows structured reasoning steps — observation, remedy decision, then formula — which produced more consistent results than direct output requests.

The LCD cycles through a 4-stage display of the AI's reasoning:
1. *"I see... [observation]"*
2. *"Hmm... Creating scent"*
3. *"Your scent: [name]"*
4. *Final display with session ID*

![AI response in Node-RED debug — the scent "Nang Fa Bai Hiaw" (The Wilted Angel)](/projects/SUKONTHnAI/ai-response-debug.jpg)

![N8N workflow output logging session data to Google Sheets](/projects/SUKONTHnAI/n8n-workflow.jpg)

## Key Technical Decisions

**Separated compute from hardware control** — Using the Pico for GPIO instead of the Pi 5 directly prevented potential GPIO damage from 12V motor driver feedback and created a cleaner, safer architecture.

**USB serial communication** — Simple and reliable communication between Pi 5 and Pico without needing WiFi or additional networking.

**Broad fragrance categories** — AI prompt uses categories (Energy/Citrus, Calm/Floral, Warmth/Spice, Depth/Base) rather than specific ingredient names, allowing physical fragrance changes without code updates.

## Challenges & Lessons Learned

- **GPIO safety** — L298N drivers operate at 5V logic while Pi 5 uses 3.3V. The Pico (5V-tolerant) solved this.
- **Desoldering with no tools** — Spent 5 hours desoldering jumper pin rows off an I2C module with no desoldering wick or solder sucker. Got the pins out, but ruined a breadboard in the process. Had to switch to a backup module.
- **Docker isolation** — Tools installed on the host aren't available inside containers. Had to install fswebcam inside the Node-RED Docker container.
- **Serial buffering** — Simple \`cat\` commands don't work reliably for serial reads. Used Node-RED's serial-in node for proper buffering.

![I2C module after desoldering jumper pins with no wick or sucker](/projects/SUKONTHnAI/desoldering-disaster.jpg)

![The ruined breadboard — solder melted straight into the holes](/projects/SUKONTHnAI/ruined-breadboard.jpg)

## Development Approach

I worked with Claude (Anthropic's AI assistant) as a coding tool — I made all architectural decisions, did all physical hardware work, diagnosed issues, and tested everything. Claude generated code based on my requirements and helped debug.

## Status

MVP completed on February 11, 2026. Future plans include adding an ultrasonic mist maker, QR code generation for session IDs, online picture submission, and creation history.

## Technical Skills
- Raspberry Pi 5 & Pico
- MicroPython
- Node-RED & N8N
- MQTT (Pub/Sub IoT)
- AI Prompt Engineering
- Hardware Integration (Motor Drivers, I2C, Serial)
- Google Gemini Flash 2.0 API
- Peristaltic Pump Control
  `
};
