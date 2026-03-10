// ─── Branded Types ────────────────────────────────────────────────────────────

export type StudentId = string & { readonly __brand: unique symbol }

export type StudentName = string & { readonly __brand: unique symbol }

export type StreakCount = number & { readonly __brand: unique symbol }

export type XPPoints = number & { readonly __brand: unique symbol }