import { DomainEvent } from "../../domain/events/events"

// ─── Email Mock Observer ──────────────────────────────────────────────────────
// Simulates sending emails in reaction to domain events.
// In a real system this would call an email service like SendGrid or Nodemailer.
// Here it just logs to the console — the implementation is "blurred background".

export const sendEmailMock = (event: DomainEvent): void => {
  if (event.type === "CourseCompleted") {
    console.log(
      `[EMAIL] Certificate sent for completing course: "${event.courseTitle}"`
    )
  }

  if (event.type === "ModuleFailed") {
    console.log(
      `[EMAIL] Retry reminder sent — ${event.attemptsLeft} attempt(s) remaining on module: ${event.moduleId}`
    )
  }

  if (event.type === "ModuleLocked") {
    console.log(
      `[EMAIL] Instructor alerted — module ${event.moduleId} is now locked after ${event.attempts} failed attempts`
    )
  }

  if (event.type === "ModulePassed") {
    console.log(
      `[EMAIL] Well done! Module ${event.moduleId} passed with score ${event.score}`
    )
  }

  if (event.type === "StreakBroken") {
    console.log(
      `[EMAIL] Re-engagement email sent — student ${event.studentId} lost a ${event.lostStreak}-day streak`
    )
  }

  if (event.type === "StreakIncremented") {
    console.log(
      `[EMAIL] Keep it up! Student ${event.studentId} is on a ${event.newStreak}-day streak`
    )
  }
}