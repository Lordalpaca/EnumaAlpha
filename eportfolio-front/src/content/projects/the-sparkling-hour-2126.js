export default {
  slug: "the-sparkling-hour-2126",
  title: "The Sparkling Hour: Year 2126",
  description:
    "Full creative tech production for a futurist event by what a WHY × NEXTOPIA at Siam Paragon — a cinematic scroll-driven hero website, a Metropolis-remix promo reel, and a live interactive activity with a real-time 3D globe projected at the venue.",
  thumbnail: "/projects/sparkling-hour/hero-landing.jpg",
  tags: [
    "Next.js",
    "React Three Fiber",
    "GSAP",
    "Supabase Realtime",
    "Gemini AI",
    "AI Video",
    "ffmpeg",
    "Event Tech",
  ],
  date: "2026",
  content: `
## Overview

**The Sparkling Hour: Year 2126** was a Friday-night lecture event by **what a WHY × NEXTOPIA** (Floor 5, Siam Paragon, Bangkok) on 31 July 2026 — four experts, one question: *what will the world look like in 100 years?*

I built the entire digital experience around the event:

1. **A cinematic scroll-driven hero website** — the ticket-selling landing page
2. **A promo reel** — a remix of Fritz Lang's *Metropolis* (1927), cut programmatically
3. **A live interactive activity** — attendees beam their vision of 2126 onto a real-time 3D globe projected in the venue

[Visit the live site →](https://events.whatawhy.com/the-sparkling-hour/2126)

## The Hero Website

A single-page, scroll-driven cinematic narrative: you start in dark space, warp forward through the stars, and land on the question the event asks. Built with **Next.js + React Three Fiber + GSAP ScrollTrigger**.

![Landing beat — dark space, the question emerges](/projects/sparkling-hour/hero-landing.jpg)

The cinematic moving beats use **AI-generated video scroll-scrubbed as image sequences on canvas** (the same technique Apple uses on its product pages) — raw video seeks by keyframe and stutters when scrubbed backwards, so each AI clip is exported to frames, preloaded, and drawn by scroll position. A live canvas layer on top keeps the star field and text crisp.

![Event details with the Lecture on Tap concept](/projects/sparkling-hour/hero-event.jpg)

The four speakers appear as a "Crew Manifest" — sci-fi captain dossiers with scan-line portraits:

![Know Your Captains — speaker dossier UI](/projects/sparkling-hour/hero-captains.jpg)

The event's signature "Collective Imagination" workshop got its own blueprint-styled section with playful micro-interactions:

![Shrink-paper workshop section, blueprint style](/projects/sparkling-hour/hero-workshop.jpg)

![Hosted at NEXTOPIA, Siam Paragon](/projects/sparkling-hour/hero-nextopia.jpg)

## The Promo Reel

A remix of *Metropolis* (1927, public domain) — the original cinematic vision of a future city, re-cut to ask 2126's question. Rather than editing by hand, I built a small **ffmpeg pipeline**: clips catalogued from the source film, voiceover recorded in segments, speech-to-text alignment for word-accurate captions, and a manifest-driven build script that assembles the final cut. Iterating a new version meant editing a text file, not re-editing a timeline.

*Reel link coming — posted on Instagram.*

## The Live Activity — Type & Appear

During the event, attendees opened a form on their phones and completed one sentence: *"In year 2126 there will be…"*

![The joiner form attendees opened on their phones](/projects/sparkling-hour/activity-joiner.jpg)

Seconds later, their name and vision appeared floating around a **real-time 3D globe** projected in the venue — each submission also triggering **Gemini image generation** to create a unique falling sticker for it.

![The projector display — 31 travelers aboard, live during the event](/projects/sparkling-hour/activity-display.jpg)

**Stack:** Next.js + Supabase (realtime subscriptions) + React Three Fiber globe with NASA night-lights textures + Gemini 2.5 Flash Image for per-submission sticker generation, deployed on Netlify behind a reverse proxy so everything lives under one event URL.

## What I Did

- Designed and built the scroll-driven hero site from concept to production
- Directed and programmatically assembled the Metropolis promo reel
- Built the realtime joiner → projector activity used live at the event
- Configured the reverse-proxy routing so both apps serve under one event domain

## Technical Skills

- Next.js / React Three Fiber / GSAP ScrollTrigger
- Scroll-scrubbed canvas image sequences (AI video → frames)
- Supabase Realtime (live event data)
- Gemini image generation API
- ffmpeg automation, STT caption alignment
- AI video tooling (Veo, Kling, Runway) for cinematic beats
  `,
};
