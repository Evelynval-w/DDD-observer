# DDD Observer — LMS Domain: Course Completion

## What This Project Is

This project is a practical implementation of Domain-Driven Design (DDD)
and the Observer Pattern using TypeScript.

The domain chosen is a **Learning Management System (LMS)** focused on
course completion. The system enforces business rules at the type level
and at runtime, and reacts to domain events through decoupled observers.

The original repo example (e-commerce inventory) is preserved in `index.ts`
at the root. The LMS domain lives in `src/` and `infrastructure/`.

---

## Project Structure
```
src/domain/
├── module/
│   ├── types.ts        # Branded types: ModuleId, ModuleTitle, QuizScore, AttemptCount
│   ├── module.ts       # Module entity type (immutable, all fields readonly)
│   └── factories.ts    # createModule, submitQuiz (smart constructors)
├── course/
│   ├── types.ts        # Branded types: CourseId, CourseTitle, CourseStatus
│   ├── course.ts       # Course entity type (immutable, ReadonlyArray of modules)
│   └── factories.ts    # createCourse, evaluateCourseCompletion
└── events/
    └── events.ts       # All domain events as a discriminated union

infrastructure/observers/
├── observer.ts         # Observer type, observers array, notifyObservers helper
├── email.ts            # sendEmailMock — reacts to events with console.log
└── database.ts         # saveToDatabaseMock — reacts to events with console.log

docs/
└── domain.md           # Full domain description in plain English
```

---

## Business Rules

These rules are enforced in code. Breaking any of them throws an error
and is caught by a try/catch block — the app never crashes silently.

1. A `QuizScore` must be between 0 and 100
2. A module is `Passed` only if the score is 70 or above
3. A student has a maximum of 3 attempts per module
4. After 3 failed attempts the module is `Locked` — no further attempts allowed
5. A `Course` is `Completed` only when ALL its modules are `Passed`
6. A course must have at least one module
7. A `ModuleTitle` and `CourseTitle` cannot be empty strings

---

## Domain Events & Observers

| Event | Email Mock | Database Mock |
|---|---|---|
| `ModulePassed` | Sends congratulations | Logs score |
| `ModuleFailed` | Sends retry reminder with attempts left | Logs failed attempt |
| `ModuleLocked` | Alerts the instructor | Logs locked record |
| `CourseCompleted` | Sends certificate | Saves completion record |

---

## How to Run
```bash
npm install
npm run dev
```

---

## Key Concepts Demonstrated

- **Branded Types** — `QuizScore`, `ModuleId`, `CourseTitle` etc. are not
  plain primitives. The compiler rejects invalid assignments.
- **Smart Constructors** — `createQuizScore()`, `createModuleTitle()` etc.
  validate before casting. The only place a branded type is created.
- **Immutability** — every entity field is `readonly`. State changes return
  a new object, never mutate the original.
- **Observer Pattern** — `notifyObservers` iterates the subscribers array.
  The domain never knows who is listening.
- **Discriminated Union** — `DomainEvent` lets observers safely check
  `event.type` with full TypeScript type safety.
- **Error Handling** — all impossible data is wrapped in try/catch blocks.
  The app handles errors gracefully without crashing.