---
name: agent-terminal-demo
description: >-
  Use this skill when adding, modifying, or testing interactive terminal demos,
  minigames, keyboard shortcuts, or CLI simulations inside HeroVisualB, AgentDemo,
  or SpaceDefenderGame.
---

# OrbitX Developer Studio Terminal Architecture

This skill provides the blueprint for adding new phases, simulation scenarios, and interactive developer tools into the macOS Studio Console (`HeroVisualB.tsx`).

## Architecture & State Machine

The console is driven by a state machine in `src/components/sections/HeroVisualB.tsx`:
- `phase: "intro"`: Initial boot sequence and subsystem diagnostics.
- `phase: "interactive"`: Interactive command prompt and keyboard shortcut menu (`TerminalMenu.tsx`).
- `phase: "demo"`: Autonomous AI Agent task execution replay (`AgentDemo.tsx`).
- `phase: "game"`: 60fps ASCII Space Defender arcade minigame (`SpaceDefenderGame.tsx`).

## Adding a Simulation Scenario to AgentDemo
Open `src/components/sections/AgentDemo.tsx`:
Add a scenario to `SCENARIOS`:
```ts
{
  type: "user",
  text: "User query here...",
},
{
  type: "tool",
  tool: "tool_name",
  output: "Tool execution result...",
},
{
  type: "agent",
  text: "Final response delivered to user...",
}
```

## Keyboard Shortcuts
All interactive phases must support:
- `Escape`: Return to the main menu (`phase: "interactive"`).
- Keyboard focus guards: Ignore single-key shortcuts when focus is inside an `<input>` or `<textarea>`.
