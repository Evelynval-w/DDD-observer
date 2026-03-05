import { ModuleId, ModuleTitle, QuizScore, AttemptCount, ModuleStatus } from "./types.js"

// ─── Entity Definition ────────────────────────────────────────────────────────
// All fields are readonly.
// The only way to "change" a module is to return a new one from a factory function.
// This is immutability — no field is ever mutated directly.

export type Module = {
  readonly id: ModuleId
  readonly title: ModuleTitle
  readonly score: QuizScore | null
  readonly attempts: AttemptCount
  readonly status: ModuleStatus
}