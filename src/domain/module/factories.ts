import { v4 as uuidv4 } from "uuid"
import { ModuleId, ModuleTitle, QuizScore, AttemptCount } from "./types"
import { Module } from "./module"

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_ATTEMPTS = 3
const PASSING_SCORE = 70

// ─── Smart Constructors ───────────────────────────────────────────────────────
// These are the ONLY places where branded types are created.
// They validate first, then cast. Never cast without validating.

export function createModuleTitle(value: string): ModuleTitle {
  if (!value || value.trim().length === 0) {
    throw new Error("Module title cannot be empty")
  }
  return value as ModuleTitle
}

export function createQuizScore(value: number): QuizScore {
  if (value < 0 || value > 100) {
    throw new Error("Quiz score must be between 0 and 100")
  }
  return value as QuizScore
}

export function createAttemptCount(value: number): AttemptCount {
  if (value < 0) {
    throw new Error("Attempt count cannot be negative")
  }
  return value as AttemptCount
}

// ─── Factory Function ─────────────────────────────────────────────────────────
// Creates a fresh Module in its initial state.
// Score is null because no quiz has been submitted yet.

export function createModule(title: ModuleTitle): Module {
  return {
    id: uuidv4() as ModuleId,
    title,
    score: null,
    attempts: createAttemptCount(0),
    status: "Pending",
  }
}

// ─── State-Changing Function ──────────────────────────────────────────────────
// submitQuiz is the ONLY way a module's status changes.
// It returns a NEW module — it never mutates the original.
// It fires a domain event after computing the new state.

export function submitQuiz(
  module: Module,
  rawScore: number,
  notify: (event: any) => void
): Module {
  // Business Rule: cannot attempt a locked module
  if (module.status === "Locked") {
    throw new Error(
      `Module "${module.title}" is locked. No more attempts allowed.`
    )
  }

  const score = createQuizScore(rawScore)
  const newAttempts = createAttemptCount(module.attempts + 1)
  const passed = score >= PASSING_SCORE

  if (passed) {
    const updatedModule: Module = {
      ...module,
      score,
      attempts: newAttempts,
      status: "Passed",
    }
    notify({ type: "ModulePassed", moduleId: module.id, score })
    return updatedModule
  }

  if (newAttempts >= MAX_ATTEMPTS) {
    const updatedModule: Module = {
      ...module,
      score,
      attempts: newAttempts,
      status: "Locked",
    }
    notify({ type: "ModuleLocked", moduleId: module.id, attempts: newAttempts })
    return updatedModule
  }

  // Failed but attempts remain
  const updatedModule: Module = {
    ...module,
    score,
    attempts: newAttempts,
    status: "Failed",
  }
  notify({
    type: "ModuleFailed",
    moduleId: module.id,
    score,
    attemptsLeft: createAttemptCount(MAX_ATTEMPTS - newAttempts),
  })
  return updatedModule
}