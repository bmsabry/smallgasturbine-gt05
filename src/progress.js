// Per-user learning state in localStorage.
// Namespaced by user email so two users on the same device don't trample each other.
// Implements:
//  - needs-analysis answers
//  - module completion + per-section accuracy
//  - quiz results
//  - spaced-repetition schedule (1d / 3d / 1w / 2w / doubling)

const VERSION = 1;

function _key(email) {
  return `gt05_progress::${(email || "anon").toLowerCase()}`;
}

const DEFAULT_STATE = {
  version: VERSION,
  needs: null,           // { level, goal, time, modality, obstacles }
  sectionState: {},      // { [sectionId]: { startedAt, completedAt, probeAttempts: { [probeId]: [boolean,...] }, mastered: bool } }
  summative: null,       // { takenAt, score, total, byItem: { [itemId]: boolean } }
  reviews: {},           // { [conceptId]: { lastReviewedAt, nextDueAt, intervalDays, streak } }
  notes: {},             // { [sectionId]: string }
};

const INTERVALS = [1, 3, 7, 14]; // then doubles after index 3

export function loadProgress(email) {
  try {
    const raw = localStorage.getItem(_key(email));
    if (!raw) return { ...DEFAULT_STATE };
    const p = JSON.parse(raw);
    if (!p || p.version !== VERSION) return { ...DEFAULT_STATE };
    // shallow-merge for forward-compat
    return { ...DEFAULT_STATE, ...p };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveProgress(email, state) {
  try { localStorage.setItem(_key(email), JSON.stringify(state)); } catch {}
  return state;
}

export function recordNeeds(email, needs) {
  const p = loadProgress(email);
  p.needs = { ...needs, completedAt: Date.now() };
  return saveProgress(email, p);
}

export function startSection(email, sectionId) {
  const p = loadProgress(email);
  if (!p.sectionState[sectionId]) {
    p.sectionState[sectionId] = { startedAt: Date.now(), probeAttempts: {}, mastered: false };
  }
  return saveProgress(email, p);
}

export function recordProbe(email, sectionId, probeId, correct) {
  const p = loadProgress(email);
  if (!p.sectionState[sectionId]) p.sectionState[sectionId] = { startedAt: Date.now(), probeAttempts: {}, mastered: false };
  const s = p.sectionState[sectionId];
  if (!s.probeAttempts[probeId]) s.probeAttempts[probeId] = [];
  s.probeAttempts[probeId].push(!!correct);
  // schedule a review for this concept on first correct answer
  if (correct) _scheduleReview(p, probeId, true);
  return saveProgress(email, p);
}

export function completeSection(email, sectionId, mastered = true) {
  const p = loadProgress(email);
  if (!p.sectionState[sectionId]) p.sectionState[sectionId] = { startedAt: Date.now(), probeAttempts: {} };
  p.sectionState[sectionId].completedAt = Date.now();
  p.sectionState[sectionId].mastered = !!mastered;
  // schedule a section-level review
  _scheduleReview(p, `section::${sectionId}`, true);
  return saveProgress(email, p);
}

export function recordSummative(email, score, total, byItem) {
  const p = loadProgress(email);
  p.summative = { takenAt: Date.now(), score, total, byItem };
  return saveProgress(email, p);
}

export function setNote(email, sectionId, text) {
  const p = loadProgress(email);
  p.notes[sectionId] = text;
  return saveProgress(email, p);
}

function _scheduleReview(p, conceptId, success) {
  if (!p.reviews) p.reviews = {};
  const now = Date.now();
  const prev = p.reviews[conceptId];
  let streak = success ? (prev ? prev.streak + 1 : 1) : 0;
  let nextInterval;
  if (success) {
    if (streak <= INTERVALS.length) nextInterval = INTERVALS[streak - 1];
    else nextInterval = INTERVALS[INTERVALS.length - 1] * Math.pow(2, streak - INTERVALS.length);
  } else {
    nextInterval = 1; // reset to daily
  }
  p.reviews[conceptId] = {
    lastReviewedAt: now,
    nextDueAt: now + nextInterval * 24 * 60 * 60 * 1000,
    intervalDays: nextInterval,
    streak,
  };
}

export function dueReviews(email) {
  const p = loadProgress(email);
  const now = Date.now();
  return Object.entries(p.reviews || {})
    .map(([conceptId, r]) => ({ conceptId, ...r }))
    .sort((a, b) => a.nextDueAt - b.nextDueAt)
    .map((r) => ({
      ...r,
      due: r.nextDueAt <= now,
      daysUntil: Math.max(0, Math.round((r.nextDueAt - now) / (24 * 60 * 60 * 1000))),
    }));
}

export function overallStats(email, sectionCount) {
  const p = loadProgress(email);
  let completed = 0, totalProbes = 0, correctProbes = 0;
  for (const sid of Object.keys(p.sectionState)) {
    const s = p.sectionState[sid];
    if (s.completedAt) completed++;
    for (const probeId of Object.keys(s.probeAttempts || {})) {
      const attempts = s.probeAttempts[probeId];
      totalProbes++;
      if (attempts && attempts.includes(true)) correctProbes++;
    }
  }
  return {
    sectionsCompleted: completed,
    sectionsTotal: sectionCount,
    pctComplete: sectionCount ? Math.round((completed / sectionCount) * 100) : 0,
    probeAccuracy: totalProbes ? Math.round((correctProbes / totalProbes) * 100) : 0,
    summative: p.summative,
    needsCompleted: !!p.needs,
  };
}
