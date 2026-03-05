// ─── Branded Types ───────────────────────────────────────────────────────────
// These are NOT plain primitives.
// The compiler will reject any raw number or string assigned directly to these types.

export type ModuleId = string & { readonly __brand: unique symbol }

export type ModuleTitle = string & { readonly __brand: unique symbol }

export type QuizScore = number & { readonly __brand: unique symbol }

export type AttemptCount = number & { readonly __brand: unique symbol }

// ─── String Literal Union (not branded — these are fixed valid states) ────────

export type ModuleStatus = "Pending" | "Passed" | "Failed" | "Locked"