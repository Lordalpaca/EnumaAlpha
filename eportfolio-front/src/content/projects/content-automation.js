export default {
  slug: "content-automation",
  title: "AI Content Automation Platform",
  description:
    "A bilingual AI content pipeline built for a Thai law firm — from trending-topic discovery to AI drafting with law references, lawyer approval, and one-click publishing across Facebook, Instagram, LINE OA, and the firm's website.",
  thumbnail: "/projects/content-automation/dashboard.jpg",
  tags: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "OpenRouter",
    "LINE API",
    "Meta Graph API",
    "i18n",
  ],
  date: "2026",
  content: `
## Overview

A full content-operations platform built for a law firm's marketing team (client work — no public link). It takes a piece of legal content from *"what should we even post?"* all the way to published across four channels, with a lawyer's sign-off in the middle.

The whole flow: **AI suggests trending Thai legal topics → AI drafts bilingual content with law references → human edits → lawyer approves via a shareable link (no login) → publish to Facebook, Instagram, LINE OA, and the website — from one dashboard.**

![Dashboard — content pipeline at a glance](/projects/content-automation/dashboard.jpg)

## Topic Discovery

The platform watches Thai news feeds and Google Trends, filters for legally relevant stories, and presents them as ready-to-pick topic cards — so the marketing team never starts from a blank page.

![Live topic feed pulling from Thai news sources and Google Trends](/projects/content-automation/topics.jpg)

## Bilingual AI Drafting

Drafts are generated in **Thai and English written independently** — not translated — because legal content that reads naturally in both languages needs to be composed in both languages. Each platform gets its own adaptation: long-form for the website article, punchy bullets for Instagram, conversational for LINE.

A settings panel controls style, AI model, creativity, and length per regeneration — and drafts cite actual Thai law references pulled through a legal search API.

![The 4-step editor — per-platform content with AI settings panel](/projects/content-automation/editor.jpg)

## Lawyer Approval Flow

Legal content can't ship without review. Submitting a draft generates a **shareable approval link** — the lawyer opens it on their phone, reads Thai and English side by side, and approves or requests edits. No account, no login, no friction. A LINE notification tells the team the moment a verdict lands.

## Scheduling & Publishing

Approved content goes to a calendar for scheduling, then publishes through real integrations: **Meta Graph API** (Facebook + Instagram), **LINE Messaging API** (LINE OA broadcast), and **Sanity CMS** (the firm's website).

![Content calendar with scheduling queue](/projects/content-automation/calendar.jpg)

## What I Did

- Designed and built the entire platform solo — from demo MVP to deployed production system
- Modeled the editorial workflow (draft → review → approve → publish) around how the firm actually works
- Integrated OpenRouter (AI drafting), a Thai legal search API (law references), Meta Graph API, LINE Messaging API, and Sanity CMS
- Built the bilingual UI (Thai/English) with next-intl

## Technical Skills

- Next.js 14 App Router / TypeScript
- PostgreSQL (Supabase) + JWT auth
- Multi-channel publishing APIs (Meta, LINE, Sanity)
- AI prompt engineering for structured bilingual output
- RSS/news feed ingestion + Google Trends
- Internationalization (next-intl)
  `,
};
