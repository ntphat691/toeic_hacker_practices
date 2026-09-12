# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build website hosting 20 full TOEIC practice tests (10 from "Hacker Volume 2", 10 from "Hacker Volume 3"). There is no `package.json`, bundler, or test runner — every page is a self-contained HTML file with inline `<style>` and inline `<script>`. The site is fully public — there is no login/auth, no backend, no database. (A Firebase-based login + admin/user-management system used to exist; it was removed, so `firebase-config.js`, `login.html`, `admin.html`, and `config.js` are gone. Don't reintroduce imports to those filenames.)

## Running / previewing

There is no build step. Serve the directory with any static file server and open in a browser, e.g.:

```
npx serve .
```

or just open the HTML files directly (module scripts and relative imports work fine via `file://` in most cases, but a local server avoids CORS/module-loading edge cases).

There are no lint or test commands configured in this repo.

## Architecture

**Practice test pages:**
- Each test lives directly at `Hacker{Vol2,Vol3}_Practice/TEST{NN}/` with `ListeningTest{NN}.html`, `ReadingTest{NN}.html`, an `audio/` folder (MP3 for the listening section), and an `image/` folder (question-set screenshots, e.g. `131-134.png` for RC Part 6/7 passages).
- Both Listening and Reading pages are fully self-contained: the question bank (prompt, options, correct `answer` letter) is embedded as an inline `questionsData` JS object in a `<script>` tag near the bottom of the file — there is no shared/external question data file per test. Grading, scoring, and answer-review UI are all client-side JS in the same file.
- `index.html` at the repo root is the landing/dashboard page linking out to all 20 tests' Listening/Reading pages — it has no auth check, anyone with the URL can use it.

**When adding or editing a test:** the Listening/Reading HTML files for a given volume are structurally near-identical (same CSS, same scoring logic) — when changing shared behavior (scoring, audio player, answer review), check whether the fix needs to be replicated across all 20 `ListeningTestNN.html`/`ReadingTestNN.html` files rather than just one, since there's no shared template include at runtime. To start a new test page, copy an existing well-formed `ListeningTestNN.html`/`ReadingTestNN.html` and replace its `questionsData`, audio, and images — there are no separate template files in this repo.
