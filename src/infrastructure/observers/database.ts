import { DomainEvent } from "../../domain/events/events"

// ─── Database Mock Observer ───────────────────────────────────────────────────
// Simulates saving data to a database in reaction to domain events.
// In a real system this would call a database like PostgreSQL or MongoDB.
// Here it just logs to the console — the implementation is "blurred background".

export const saveToDatabaseMock = (event: DomainEvent): void => {
  if (event.type === "CourseCompleted") {
    console.log(
      `[DB] Completion record saved — courseId: ${event.courseId}, title: "${event.courseTitle}"`
    )
  }

  if (event.type === "ModulePassed") {
    console.log(
      `[DB] Score logged — moduleId: ${event.moduleId}, score: ${event.score}`
    )
  }

  if (event.type === "ModuleFailed") {
    console.log(
      `[DB] Failed attempt recorded — moduleId: ${event.moduleId}, score: ${event.score}`
    )
  }

  if (event.type === "ModuleLocked") {
    console.log(
      `[DB] Module locked record saved — moduleId: ${event.moduleId}, total attempts: ${event.attempts}`
    )
  }

  if (event.type === "XPAwarded") {
    console.log(
      `[DB] Leaderboard updated — studentId: ${event.studentId}, total XP: ${event.points}`
    )
  }

  if (event.type === "StreakIncremented") {
    console.log(
      `[DB] Streak recorded — studentId: ${event.studentId}, current streak: ${event.newStreak}`
    )
  }

  if (event.type === "StreakBroken") {
    console.log(
      `[DB] Streak reset — studentId: ${event.studentId}, lost streak: ${event.lostStreak}`
    )
  }
}