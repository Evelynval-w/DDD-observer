import { DomainEvent } from "../../domain/events/events"

// ─── Observer Type ────────────────────────────────────────────────────────────
// An observer is any function that receives a DomainEvent and returns nothing.
// This is the shared contract — every observer must match this signature.

export type Observer = (event: DomainEvent) => void

// ─── Observers Array ──────────────────────────────────────────────────────────
// This is the subscriber list.
// Any function pushed here will be called whenever an event is emitted.

export const observers: Observer[] = []

// ─── Notify Function ─────────────────────────────────────────────────────────
// This is the helper that iterates the list and calls each observer.
// This is what gets passed as "notify" into submitQuiz and evaluateCourseCompletion.

export function notifyObservers(event: DomainEvent): void {
  observers.forEach((observer) => observer(event))
}