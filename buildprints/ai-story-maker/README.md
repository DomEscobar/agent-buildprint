# AI Story Maker

AI Story Maker is a production canvas for turning a short-drama episode into script, plan, storyboard, image, and video work. It is built around the way creators actually iterate: one episode stays visible as a connected board while the assistant, editors, and media tools help move each artifact forward.

## What It Does

- Creates a focused workspace for a selected project and episode.
- Shows the episode pipeline as connected canvas nodes instead of hiding work in chat history.
- Keeps script, director plan, assets, storyboard table, storyboard frames, and video workbench in one production flow.
- Lets creators inspect, edit, refresh, arrange, and read back generated artifacts.
- Pairs the canvas with a realtime assistant that can continue production work without taking over the screen.
- Tracks provider and media states honestly, including missing credentials, generation progress, failures, and completed outputs.

## Core Features

### Episode Production Canvas

The main surface is a white, spatial production board. Creators can pan, zoom, fit, refresh, and auto-layout the episode pipeline while keeping the active project and episode in view.

### Script And Director Planning

Script and director-plan nodes open into proper editing surfaces with preview and save/readback behavior. The goal is not a one-time generation result; it is an editable production document that survives reloads.

### Storyboard Workflow

The storyboard flow supports a structured table and frame-level production work. Frames can carry prompts, states, media references, selected status, failures, and generation history so the creator can see what is ready and what needs attention.

### Assets And Media Workbench

Assets, derived images, references, video prompts, model settings, generated videos, and failed media jobs stay attached to the episode. Provider-backed generation is available when credentials exist, and blocked states are shown clearly when they do not.

### Realtime Production Assistant

The assistant sits beside the canvas as a production partner. It can summarize progress, respond to episode context, suggest next steps, reconnect when needed, and expose guarded actions like clearing memory or stopping a run.

### English-First Interface

The default product language is English. The UI copy is designed to stay centralized and translation-ready, so future localized versions can be added without mixing internal build or proof terms into the creator-facing experience.

## Experience Goals

AI Story Maker should feel closer to a focused creative editor than an admin dashboard. The first screen should make the active episode, production pipeline, assistant status, and blocked media actions immediately understandable. Controls are compact, canvas-first, and built for repeated editing rather than a decorative landing page.
