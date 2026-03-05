import { ModuleId, QuizScore, AttemptCount } from "../module/types"
import { CourseId, CourseTitle } from "../course/types"

// ─── Individual Event Types ───────────────────────────────────────────────────
// Every field is readonly — observers cannot accidentally mutate event data.
// Every event has a unique "type" string — this is the emitter name the
// observer checks to decide what action to take.

export type ModulePassedEvent = {
  readonly type: "ModulePassed"
  readonly moduleId: ModuleId
  readonly score: QuizScore
}

export type ModuleFailedEvent = {
  readonly type: "ModuleFailed"
  readonly moduleId: ModuleId
  readonly score: QuizScore
  readonly attemptsLeft: AttemptCount
}

export type ModuleLockedEvent = {
  readonly type: "ModuleLocked"
  readonly moduleId: ModuleId
  readonly attempts: AttemptCount
}

export type CourseCompletedEvent = {
  readonly type: "CourseCompleted"
  readonly courseId: CourseId
  readonly courseTitle: CourseTitle
}

// ─── Discriminated Union ──────────────────────────────────────────────────────
// DomainEvent is the single contract shared by ALL observers.
// The observer uses event.type to decide what to do.
// TypeScript will warn you if you forget to handle a case.

export type DomainEvent =
  | ModulePassedEvent
  | ModuleFailedEvent
  | ModuleLockedEvent
  | CourseCompletedEvent