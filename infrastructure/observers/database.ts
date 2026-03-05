import { DomainEvent } from "../../src/domain/events/events"

// ─── Database Mock Observer ───────────────────────────────────────────────────
// This function simulates saving data to a database in reaction to domain events.
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
}