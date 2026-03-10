import { v4 as uuidv4 } from "uuid"
import { StudentId, StudentName, StreakCount, XPPoints } from "./types"
import { Student } from "./student"
import { DomainEvent } from "../events/events"

// ─── Smart Constructors ───────────────────────────────────────────────────────

export function createStudentName(value: string): StudentName {
  if (!value || value.trim().length === 0) {
    throw new Error("Student name cannot be empty")
  }
  return value as StudentName
}

export function createStreakCount(value: number): StreakCount {
  if (value < 0) {
    throw new Error("Streak count cannot be negative")
  }
  return value as StreakCount
}

export function createXPPoints(value: number): XPPoints {
  if (value <= 0) {
    throw new Error("XP points must be greater than zero")
  }
  return value as XPPoints
}

// ─── Factory Function ─────────────────────────────────────────────────────────
// Creates a fresh Student with zero streak and zero XP.

export function createStudent(name: StudentName): Student {
  return {
    id: uuidv4() as StudentId,
    name,
    streak: 0 as StreakCount,
    xp: 0 as XPPoints,
  }
}

// ─── State-Changing Functions ─────────────────────────────────────────────────
// Each returns a NEW student — never mutates the original.
// Each fires a domain event after computing the new state.

export function incrementStreak(
  student: Student,
  notify: (event: DomainEvent) => void
): Student {
  const newStreak = createStreakCount(student.streak + 1)
  const updated: Student = { ...student, streak: newStreak }
  notify({ type: "StreakIncremented", studentId: student.id, newStreak })
  return updated
}

export function breakStreak(
  student: Student,
  notify: (event: DomainEvent) => void
): Student {
  if (student.streak === 0) return student
  const lostStreak = student.streak
  const updated: Student = { ...student, streak: 0 as StreakCount }
  notify({ type: "StreakBroken", studentId: student.id, lostStreak })
  return updated
}

export function awardXP(
  student: Student,
  points: number,
  notify: (event: DomainEvent) => void
): Student {
  const validPoints = createXPPoints(points)
  const newXP = (student.xp + validPoints) as XPPoints
  const updated: Student = { ...student, xp: newXP }
  notify({ type: "XPAwarded", studentId: student.id, points: newXP })
  return updated
}