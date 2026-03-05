// ─── Branded Types ────────────────────────────────────────────────────────────

export type CourseId = string & { readonly __brand: unique symbol }

export type CourseTitle = string & { readonly __brand: unique symbol }

// ─── String Literal Union ─────────────────────────────────────────────────────

export type CourseStatus = "InProgress" | "Completed"