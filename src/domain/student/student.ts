import { StudentId, StudentName, StreakCount, XPPoints } from "./types"

// ─── Entity Definition ────────────────────────────────────────────────────────
// A Student is identified by their id.
// Two students with the same name are NOT the same student — the id decides that.
// All fields are readonly — nothing is ever mutated directly.
// Any change returns a new Student object entirely.

export type Student = {
  readonly id: StudentId
  readonly name: StudentName
  readonly streak: StreakCount
  readonly xp: XPPoints
}