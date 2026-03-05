import { CourseId, CourseTitle, CourseStatus } from "./types"
import { Module } from "../module/module"

// ─── Entity Definition ────────────────────────────────────────────────────────
// A Course is identified by its id.
// Two courses with the same title are NOT the same course — the id decides that.
// The modules array is readonly — you cannot push directly into it.
// Any change returns a new Course object entirely.

export type Course = {
  readonly id: CourseId
  readonly title: CourseTitle
  readonly modules: ReadonlyArray<Module>
  readonly status: CourseStatus
}