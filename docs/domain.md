# LMS Domain — Course Completion

## What This Domain Models

A Learning Management System where students complete courses by passing
individual modules. The system reacts to changes — like a module being
passed or a course being completed — without the domain logic caring about
how those reactions are implemented.

---

## Ubiquitous Language

These are the exact terms used in both the code and this document.
If it is called a "Module" here, it is called a "Module" in the code.

| Term | Meaning |
|---|---|
| **Module** | A single unit of learning inside a course. Has a title, a score, and a status. |
| **Course** | A collection of modules. Marked as Complete only when every module is Passed. |
| **QuizScore** | A number between 0 and 100 representing a student's result on a module quiz. |
| **AttemptCount** | How many times a student has attempted a module quiz. Cannot exceed 3. |
| **ModuleStatus** | The current state of a module: Pending, Passed, Failed, or Locked. |
| **CourseStatus** | The current state of a course: InProgress or Completed. |
| **StreakCount** | How many consecutive days a student has completed at least one module. |
| **XPPoints** | Experience points awarded to a student when they pass a module or complete a course. |
| **Observer** | A function that reacts to a domain event (e.g. sending an email, saving to a database). |
| **Domain Event** | A record of something that happened in the domain (e.g. ModulePassed, CourseCompleted). |

---

## Business Rules

These rules are enforced in the code. Breaking any of them throws an error.

1. A **QuizScore** must be between 0 and 100. Negative scores and scores above 100 are impossible.
2. A module is **Passed** only if the QuizScore is 70 or above.
3. A student has a maximum of **3 attempts** per module.
4. After 3 failed attempts, the module is **Locked**. No further attempts are allowed.
5. A **Course** is marked as **Completed** only when every one of its modules has a status of **Passed**.
6. A course must have **at least one module**. An empty course cannot exist.
7. A **StreakCount** cannot be negative.
8. **XPPoints** awarded must always be a positive number.
9. A **ModuleTitle** and **CourseTitle** cannot be empty strings.

---

## State Changes

These are the things that can happen in the domain and that observers react to.

| State Change | Trigger | Resulting Event |
|---|---|---|
| Student submits a quiz and passes | `submitQuiz(module, score >= 70)` | `ModulePassed` |
| Student submits a quiz and fails | `submitQuiz(module, score < 70)` | `ModuleFailed` |
| Student exhausts all 3 attempts | `submitQuiz(module, score < 70)` on attempt 3 | `ModuleLocked` |
| All modules in a course are Passed | `evaluateCourseCompletion(course)` | `CourseCompleted` |
| Student completes a module on a new day | `incrementStreak(student)` | `StreakIncremented` |
| Student misses a day | `breakStreak(student)` | `StreakBroken` |
| Student earns XP | `awardXP(student, points)` | `XPAwarded` |

---

## Observer Reactions

These are the side effects that happen when a domain event fires.
The domain does not know about these — they are "plugged in" from outside.

| Event | Observer Reaction |
|---|---|
| `CourseCompleted` | Email mock: send certificate to student |
| `CourseCompleted` | Database mock: save completion record |
| `ModulePassed` | Database mock: log the passing score |
| `ModuleFailed` | Email mock: send retry reminder with attempts remaining |
| `ModuleLocked` | Email mock: alert the instructor |
| `StreakBroken` | Email mock: send re-engagement notification |
| `XPAwarded` | Database mock: update student leaderboard |

---

## What This Domain Does NOT Handle

- No real email sending
- No real database
- No UI
- No authentication
- No enrollment or course scheduling