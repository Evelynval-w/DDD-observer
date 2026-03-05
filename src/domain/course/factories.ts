import { v4 as uuidv4 } from "uuid"
import { CourseId, CourseTitle } from "./types"
import { Course } from "./course"
import { Module } from "../module/module"
import { DomainEvent } from "../events/events"

// ─── Smart Constructors ───────────────────────────────────────────────────────

export function createCourseTitle(value: string): CourseTitle {
  if (!value || value.trim().length === 0) {
    throw new Error("Course title cannot be empty")
  }
  return value as CourseTitle
}

// ─── Factory Function ─────────────────────────────────────────────────────────
// Creates a fresh Course in its initial state.
// A course must have at least one module — an empty course cannot exist.

export function createCourse(
  title: CourseTitle,
  modules: Module[]
): Course {
  if (modules.length === 0) {
    throw new Error("A course must have at least one module")
  }
  return {
    id: uuidv4() as CourseId,
    title,
    modules,
    status: "InProgress",
  }
}

// ─── State-Changing Function ──────────────────────────────────────────────────
// evaluateCourseCompletion is the ONLY way a course status changes to Completed.
// It checks every module — if any is not Passed, the course stays InProgress.
// It returns a NEW course — never mutates the original.
// It fires a CourseCompleted event if all modules are Passed.

export function evaluateCourseCompletion(
  course: Course,
  notify: (event: DomainEvent) => void
): Course {
  const allPassed = course.modules.every((m) => m.status === "Passed")

  if (!allPassed) {
    return course
  }

  const completedCourse: Course = {
    ...course,
    status: "Completed",
  }

  notify({
    type: "CourseCompleted",
    courseId: course.id,
    courseTitle: course.title,
  })

  return completedCourse
}