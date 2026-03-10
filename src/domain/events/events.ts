import { ModuleId, QuizScore, AttemptCount } from "../module/types"
import { CourseId, CourseTitle } from "../course/types"
import { StudentId, StreakCount, XPPoints } from "../student/types"

// ─── Module Events ────────────────────────────────────────────────────────────

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

// ─── Course Events ────────────────────────────────────────────────────────────

export type CourseCompletedEvent = {
  readonly type: "CourseCompleted"
  readonly courseId: CourseId
  readonly courseTitle: CourseTitle
}

// ─── Student Events ───────────────────────────────────────────────────────────

export type StreakIncrementedEvent = {
  readonly type: "StreakIncremented"
  readonly studentId: StudentId
  readonly newStreak: StreakCount
}

export type StreakBrokenEvent = {
  readonly type: "StreakBroken"
  readonly studentId: StudentId
  readonly lostStreak: StreakCount
}

export type XPAwardedEvent = {
  readonly type: "XPAwarded"
  readonly studentId: StudentId
  readonly points: XPPoints
}

// ─── Discriminated Union ──────────────────────────────────────────────────────
// DomainEvent is the single contract shared by ALL observers.
// The observer uses event.type to decide what to do.

export type DomainEvent =
  | ModulePassedEvent
  | ModuleFailedEvent
  | ModuleLockedEvent
  | CourseCompletedEvent
  | StreakIncrementedEvent
  | StreakBrokenEvent
  | XPAwardedEvent