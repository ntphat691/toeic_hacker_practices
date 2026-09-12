# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build website hosting 20 full TOEIC practice tests (10 from "Hacker Volume 2", 10 from "Hacker Volume 3"). There is no `package.json`, bundler, or test runner — every page pulls its CSS and grading/rendering logic from `assets/` (see below) and keeps only its own `questionsData` inline. The site is fully public — there is no login/auth, no backend, no database. (A Firebase-based login + admin/user-management system used to exist; it was removed, so `firebase-config.js`, `login.html`, `admin.html`, and `config.js` are gone. Don't reintroduce imports to those filenames.)

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
- Every page keeps only its `questionsData` (prompt, options, correct `answer` letter) inline in a `<script>` tag — there is no shared/external question data file per test, and this part is never extracted since it's genuinely unique per-test content, not duplicate code. The rendering/grading logic that used to sit in the same `<script>` tag now lives in `assets/js/` (see below) and is loaded via `<script src="../../assets/js/....js"></script>` right after it.
- `index.html` at the repo root is the landing/dashboard page linking out to all 20 tests' Listening/Reading pages — it has no auth check, anyone with the URL can use it.
- `assets/css/` holds the CSS shared by every test page, linked with `<link rel="stylesheet" href="../../assets/css/....css">` (two levels up from `Hacker{Vol2,Vol3}_Practice/TEST{NN}/`):
  - `common.css` — the full shared layout/theme (header, container, score panel, question cards, options, buttons, responsive rules, etc.), identical across all 20 Listening and all 20 Reading pages, linked from every test page.
  - `listening.css` — the small delta only Listening pages need on top of `common.css` (the fixed `.audio-player`/`.collapse-btn` bar and the matching `body` top padding). Reading pages don't link this file since they have no audio player.
  - `assets/images/` is currently unused — there are no images shared across tests; every image referenced from a page's `questionsData` (`image/NN.png`, `image/131-134.png`, etc.) is question-specific and lives in that test's own `TEST{NN}/image/` folder, not here.
- If you ever need to change shared styling, edit `assets/css/common.css` (or `listening.css` for the audio bar) once — it applies to all 20 tests automatically, unlike the old inline-`<style>`-per-page setup.
- `assets/js/` holds the rendering/grading logic shared by test pages (loading `questionsData`, generating question HTML, `selectAnswer`/scoring, `resetQuiz`, and — for Listening — `toggleAudioPlayer`):
  - `listening.js` — used by all 20 `ListeningTestNN.html` pages (byte-identical logic across all of them).
  - `reading.js` — used by 18 of the 20 `ReadingTestNN.html` pages (byte-identical logic across those 18).
  - `reading-vol3-test01.js` and `reading-vol3-test02.js` — dedicated files used only by `HackerVol3_Practice/TEST01/ReadingTest01.html` and `TEST02/ReadingTest02.html` respectively. Their original inline logic was a genuinely different (older-style) implementation — different function names (`loadQuestionsData`/`initializeQuiz`), a `confirm()`-gated reset, different answer-locking behavior — not a copy-paste duplicate of `reading.js`, so it was kept behaviorally unchanged in its own file rather than merged in. Don't casually swap these two tests onto `reading.js` — that would change their actual quiz behavior (e.g. the reset confirmation dialog, whether an answer locks after one try), not just refactor code.

**When adding or editing a test:** the Listening/Reading HTML files for a given volume are structurally near-identical (same CSS via `assets/css/`, and — for 38 of the 40 pages — the same JS logic via `assets/js/`) — when changing shared *behavior* (scoring, audio player, answer review), edit the relevant shared file in `assets/js/` and it applies everywhere that links it; only touch a page's inline `<script>` if you're changing that test's `questionsData`. Remember `HackerVol3_Practice/TEST01` and `TEST02` Reading pages use their own separate JS files (see above), so a `reading.js` fix won't reach them — check whether it needs to be ported there too. To start a new test page, copy an existing well-formed `ListeningTestNN.html`/`ReadingTestNN.html` (it'll already link the shared CSS/JS) and replace its `questionsData`, audio, and images — there are no separate template files in this repo.
