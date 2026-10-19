---
id: F-009
title: "WebGL hover distortion (opsional)"
type: requirements
status: draft
tier: lite
owner: "M Sechan Alfarisi"
created: 2026-10-19
last_updated: 2026-10-19
last_verified: 2026-10-19
supersedes: null
---

# Requirements: WebGL hover distortion (opsional)

## Problem

Hover distortion saat ini memakai filter SVG (F-006). Shader WebGL bisa memberi distorsi gambar yang lebih kaya, tetapi menambah dependency besar dan butuh ADR-0002.

## Goal

Keputusan terdokumentasi apakah WebGL sepadan dengan biayanya, sebelum ada kode.

## Non-goals

- Mengganti efek SVG yang sudah bekerja sebelum ADR-0002 disetujui.

## Functional requirements

### FR-001 — Distorsi shader dengan fallback

Jika ADR-0002 disetujui, kartu dan gambar bab memakai shader displacement, dengan fallback SVG dan poster statis.

- AC-001: Given ADR-0002 disetujui dan dependency disetujui pemilik, when pointer di atas kartu, then shader berjalan dan berhenti di luar viewport; tanpa WebGL atau dengan reduced motion, fallback SVG atau statis dipakai.

## Dependencies, scope, and open questions

- Butuh ADR-0002 dan persetujuan dependency `three` (kebijakan dependency di `tech.md`).
- Lebih bernilai setelah screenshot asli tersedia (A-002).
