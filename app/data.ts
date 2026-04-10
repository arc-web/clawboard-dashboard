export const PLANE_OPS = "https://arc.todovibes.com/todovibes/projects/0e399778-93d9-4a95-ba2f-755990dd69bc/issues/";
export const PLANE_INFRA = "https://arc.todovibes.com/todovibes/projects/9643da9a-da40-4f40-8cbe-561822288cd4/issues/";

export type TaskStatus = "done" | "approved" | "needs-approval" | "todo" | "blocked" | "backlog";

export interface Task {
  id: string;
  seq: string;
  name: string;
  status: TaskStatus;
  priority: string;
  planeId: string;
  project: "OPS" | "INFRA";
}

export interface BrainstormItem {
  num: number;
  item: string;
  category: string;
  status: "done" | "partial" | "approved" | "waiting" | "blocked";
  evidence: string;
  taskSeq?: string;
  planeId?: string;
  project?: "OPS" | "INFRA";
}

export const brainstormItems: BrainstormItem[] = [
  { num: 1, item: "Discord channel for Mike's daily view", category: "Daily Command Center", status: "done", evidence: "Morning cron (8am UTC) posts task briefing to #agents-ops" },
  { num: 2, item: "Show calendar appointments", category: "Daily Command Center", status: "approved", evidence: "Research task approved, needs Google Calendar OAuth", taskSeq: "AGENT-69", planeId: "8ab4fbb1-8749-4f77-9836-bfa81f3cfef3", project: "OPS" },
  { num: 3, item: "Show tasks for the day", category: "Daily Command Center", status: "done", evidence: "Morning cron: overdue, approvals, sprint status" },
  { num: 4, item: "Show emails that need responses", category: "Daily Command Center", status: "approved", evidence: "Research task approved, needs Gmail OAuth", taskSeq: "AGENT-68", planeId: "a80b848d-9869-44f0-80b4-a74f29a2fe74", project: "OPS" },
  { num: 5, item: "Show Discord messages needing response", category: "Daily Command Center", status: "done", evidence: "Discord unread scanner built (show unread command + cron)", taskSeq: "AGENT-75", planeId: "62eeddd7-f606-4fc9-b74e-77ad4667562b", project: "OPS" },
  { num: 6, item: "Calendar block in Discord", category: "Discord Daily Briefing", status: "approved", evidence: "Same as #2 — needs Calendar OAuth", taskSeq: "AGENT-69", planeId: "8ab4fbb1-8749-4f77-9836-bfa81f3cfef3", project: "OPS" },
  { num: 7, item: "Tasks block showing list + waiting items", category: "Discord Daily Briefing", status: "done", evidence: "Morning + evening crons with code-block format" },
  { num: 8, item: "Email drafts block", category: "Discord Daily Briefing", status: "approved", evidence: "Same as #4 — needs Gmail OAuth", taskSeq: "AGENT-68", planeId: "a80b848d-9869-44f0-80b4-a74f29a2fe74", project: "OPS" },
  { num: 9, item: "Discord messages block per channel", category: "Discord Daily Briefing", status: "done", evidence: "Scanner groups by channel with sender + preview + time" },
  { num: 10, item: "Interactive calendar step", category: "Discord Daily Briefing", status: "waiting", evidence: "Depends on Calendar research (AGENT-69)", taskSeq: "AGENT-76", planeId: "9661c26b-61b5-40a0-a59c-b55060bab7a9", project: "OPS" },
  { num: 11, item: "One-at-a-time execution with timetable", category: "Discord Daily Briefing", status: "done", evidence: "Timetable + work split added to plane-pm skill", taskSeq: "AGENT-65", planeId: "52ef99bf-06d8-4a8c-976b-76f1925d73a5", project: "OPS" },
  { num: 12, item: "Proactive 1-5 commands", category: "Discord Daily Briefing", status: "done", evidence: "Action plan / Research / Contrarian / Reschedule / Other" },
  { num: 13, item: "Connect Gmail", category: "Gmail Integration", status: "approved", evidence: "Research approved, needs Gmail OAuth credentials", taskSeq: "AGENT-68", planeId: "a80b848d-9869-44f0-80b4-a74f29a2fe74", project: "OPS" },
  { num: 14, item: "Check Supabase for client emails", category: "Gmail Integration", status: "waiting", evidence: "Needs approval", taskSeq: "AGENT-47", planeId: "4757990f-14bd-45e2-aa1d-c1d44b0deab4", project: "OPS" },
  { num: 15, item: "Analyze client emails", category: "Gmail Integration", status: "blocked", evidence: "Blocked on Gmail OAuth", taskSeq: "AGENT-77", planeId: "05d9eea4-95ac-4220-b8c4-4d3562cee9b3", project: "OPS" },
  { num: 16, item: "Team task delegation from email", category: "Gmail Integration", status: "blocked", evidence: "Part of AGENT-77 — blocked on Gmail OAuth" },
  { num: 17, item: "Draft immediate response email", category: "Gmail Integration", status: "blocked", evidence: "Part of AGENT-77 — blocked on Gmail OAuth" },
  { num: 18, item: "Email draft format", category: "Gmail Integration", status: "blocked", evidence: "Part of AGENT-77 — blocked on Gmail OAuth" },
  { num: 19, item: "Discord commands for email drafts", category: "Gmail Integration", status: "blocked", evidence: "Part of AGENT-77 — blocked on Gmail OAuth" },
  { num: 20, item: "Humanize Plane", category: "Plane", status: "done", evidence: "Quality standards, 76 tasks backfilled, features activated", taskSeq: "AGENT-58", planeId: "7c0e777f-32ea-4b97-b360-8c940f52dd9f", project: "OPS" },
  { num: 21, item: "Fix Paperclip login", category: "Paperclip", status: "done", evidence: "Login fixed for Mike and Johan", taskSeq: "INFRA-30", planeId: "a2afb142-dfb0-4340-a564-fe829de0af30", project: "INFRA" },
  { num: 22, item: "Document Paperclip SOP", category: "Paperclip", status: "done", evidence: "PAPERCLIP.md: agent roster, API endpoints, ClawForge integration plan, Phase 1 complete" },
  { num: 23, item: "Document Paperclip utilization", category: "Paperclip", status: "done", evidence: "PAPERCLIP.md + Discord thread: 6 agents, budget, skills, Phase 2 roadmap" },
  { num: 24, item: "Diagnose and fix slow ZeroClaw", category: "ZeroClaw Latency", status: "done", evidence: "Stability overhaul + model switch (Kimi→Qwen 3.6+) + compact_context" },
  { num: 25, item: "Process for fixing without overwriting", category: "ZeroClaw Optimization", status: "done", evidence: "Staging workflow: AGENTS.md read-only + promote.sh" },
  { num: 26, item: "Version/rollback ZeroClaw changes", category: "ZeroClaw Optimization", status: "done", evidence: ".backup/ snapshots + config backups + promote.sh" },
  { num: 27, item: "Test changes and grade results", category: "ZeroClaw Optimization", status: "done", evidence: "model-compare.js benchmark (8 tests x 3 reps x 3 models)" },
  { num: 28, item: "Document optimization steps", category: "ZeroClaw Optimization", status: "done", evidence: "OPTIMIZATION.md written with full procedures", taskSeq: "AGENT-78", planeId: "564068cb-8ad4-48f4-8c9b-b715fdfb9771", project: "OPS" },
  { num: 29, item: "Turn tests into reusable tools", category: "ZeroClaw Optimization", status: "done", evidence: "Benchmark skill created (@ZeroClaw benchmark models)" },
  { num: 30, item: "Visibility into parallel execution", category: "ZeroClaw Parallel", status: "done", evidence: "Alpha + Bravo both deployed and online", taskSeq: "INFRA-29", planeId: "d19a64d8-7367-4500-abe5-f5e5cd13196b", project: "INFRA" },
  { num: 31, item: "Quick acknowledgment before working", category: "ZeroClaw Parallel", status: "done", evidence: "AGENTS.md response pattern + ack_reactions + emoji flow" },
  { num: 32, item: "Emoji plan for status indicators", category: "ZeroClaw Emojis", status: "done", evidence: "hourglass→arrows→checkmark flow in AGENTS.md" },
  { num: 33, item: "1Password for authentication", category: "ZeroClaw 1Password", status: "done", evidence: "4 INFRA tasks completed: server, CLI, wrapper, skill", taskSeq: "INFRA-24", planeId: "eb641b6a-32ad-4b26-aee8-2773244fb62b", project: "INFRA" },
  { num: 34, item: "Document all improvements in Plane", category: "Documentation", status: "done", evidence: "PROGRESS.md, OPTIMIZATION.md, PAPERCLIP.md, costs.jsonl" },
];

export const pendingApproval: Task[] = [
  { id: "1", seq: "AGENT-33", name: "Context Window / Memory Management - Solution Research", status: "needs-approval", priority: "medium", planeId: "b74198ce-e918-46cd-906e-7aa2837c5b94", project: "OPS" },
  { id: "2", seq: "AGENT-36", name: "Parallel agent orchestration and token usage analysis", status: "needs-approval", priority: "medium", planeId: "45daf546-0ed5-47c9-a5c7-a923713aa24a", project: "OPS" },
  { id: "3", seq: "AGENT-44", name: "Migrate ClickUp to Plane", status: "needs-approval", priority: "medium", planeId: "e304e0ee-eee5-47f8-b347-f6be579a8227", project: "OPS" },
  { id: "4", seq: "AGENT-47", name: "Add Discord channel ID to Supabase client records", status: "needs-approval", priority: "medium", planeId: "4757990f-14bd-45e2-aa1d-c1d44b0deab4", project: "OPS" },
  { id: "5", seq: "AGENT-48", name: "Google Ads daily reports to client Discord channels", status: "needs-approval", priority: "high", planeId: "37c2d685-c666-403b-b19a-0dd90a00ef9d", project: "OPS" },
  { id: "6", seq: "AGENT-52", name: "Media ingestion for ZeroClaw - image reading", status: "needs-approval", priority: "medium", planeId: "a1fa52fb-21a8-4595-8554-5e6658c880a8", project: "OPS" },
  { id: "7", seq: "AGENT-70", name: "Audit ZeroClaw latency and build test pipeline", status: "needs-approval", priority: "medium", planeId: "7b1a00ea-6d6e-43bf-8fc1-ca0ecf0bc1fd", project: "OPS" },
  { id: "8", seq: "AGENT-105", name: "Backfill legacy brain.db entries with context tags", status: "needs-approval", priority: "high", planeId: "2a8bf46a-6ca6-4536-aaa2-3bfcf18b55ec", project: "OPS" },
  { id: "9", seq: "AGENT-106", name: "Add Memory Write Protocol to AGENTS.md", status: "needs-approval", priority: "high", planeId: "09913ec4-8bbc-4fa1-afaf-42bd5d6cb71c", project: "OPS" },
  { id: "10", seq: "AGENT-107", name: "Create smart-recall skill for memory filtering", status: "needs-approval", priority: "high", planeId: "63eb446d-f699-4fe5-9935-4173054c70f5", project: "OPS" },
  { id: "11", seq: "AGENT-108", name: "Tune memory retention policy in config.toml", status: "needs-approval", priority: "medium", planeId: "b8eb127c-d9cd-4cf8-96b1-9293c5dd2d28", project: "OPS" },
  { id: "12", seq: "AGENT-109", name: "Build shared memory protocol for dual-claw", status: "needs-approval", priority: "medium", planeId: "3371bb03-0e09-49df-96d7-289b2e0121dd", project: "OPS" },
  { id: "13", seq: "AGENT-110", name: "Add memory compliance metric to Weekly Review cron", status: "needs-approval", priority: "medium", planeId: "db8fc2bd-ee1b-4ac6-9784-3654f766392b", project: "OPS" },
  { id: "14", seq: "AGENT-111", name: "Verify memory system with 10-point test plan", status: "needs-approval", priority: "high", planeId: "99bdb3e6-cf11-444b-b780-322ac16fa063", project: "OPS" },
];

export const clawforgeTasks = {
  phase1: [
    { seq: "AGENT-79", name: "Plane labels and module setup", planeId: "30c8c15e-7379-4896-be9e-a94cb6baafa2" },
    { seq: "AGENT-80", name: "5 Google Ads task templates", planeId: "a28879ed-7993-4b1e-a557-44edc2fa33c1" },
    { seq: "AGENT-81", name: "Workflow design document", planeId: "ee3060d2-b942-4d47-9709-1e6630e5bf42" },
    { seq: "AGENT-82", name: "SOP + alerting thresholds", planeId: "c248a1ba-546b-4fff-b25d-f657c102489a" },
    { seq: "AGENT-83", name: "SFBayAreaMoving client page", planeId: "c794e880-2f60-4a1d-a321-ca3e43328558" },
    { seq: "AGENT-84", name: "Daily cron v3 with anomaly detection", planeId: "6c55099c-f58a-444d-b2d8-c5812fa73961" },
    { seq: "AGENT-85", name: "Weekly analysis cron", planeId: "3d7bd157-1a99-40b5-af09-2b3da5aca84f" },
    { seq: "AGENT-86", name: "Deploy crons to VPS", planeId: "32cbd780-00a9-4164-a539-af634ae0ed5c" },
  ],
  phase2: [
    { seq: "AGENT-87", name: "Connect Paperclip cost tracking", planeId: "b23534c5-4b11-4cbc-8d9f-6eb8c6e87bcb" },
    { seq: "AGENT-88", name: "Register AdAnalyst agent", planeId: "9a1d3b3c-5dad-4c3e-817e-7321f7005465" },
    { seq: "AGENT-89", name: "Google Ads write capability + safety", planeId: "31c6de0a-b93d-4e96-ab90-bbdc92cc6a3d" },
    { seq: "AGENT-90", name: "Register remaining agents + QA pipeline", planeId: "f138a661-b99c-4e16-bf39-7f7d51215bb8" },
    { seq: "AGENT-91", name: "Scale to multiple clients", planeId: "428ad967-9548-42b8-96c6-d84c8d87c29d" },
  ],
};

export const discordThreads = [
  { name: "ClickUp to Plane Migration", date: "Apr 7", id: "1491021806306594917" },
  { name: "Plane Command Center Upgrade", date: "Apr 7", id: "1491146005083586611", highlight: "5 phases with embeds" },
  { name: "1Password Integration for ZeroClaw", date: "Apr 7", id: "1491147063805874227" },
  { name: "Model Benchmark — ZeroClaw AI Provider", date: "Apr 7", id: "1491171653969776781" },
  { name: "ZeroClaw Command Testing", date: "Apr 7", id: "1491176898372309072" },
  { name: "ZeroClaw — What We Fixed", date: "Apr 8", id: "1491479168284753952", highlight: "Stability update" },
  { name: "Alpha & Bravo Claw", date: "Apr 8", id: "1491495422164996106", highlight: "Dual agent deployment" },
  { name: "Model Benchmark — Kimi vs Qwen", date: "Apr 8", id: "1491503693172838472", highlight: "Benchmark results + switch" },
  { name: "BravoClaw Updates", date: "Apr 9", id: "1491870766525055047" },
  { name: "Google Ads Workflow — ClawForge", date: "Apr 9", id: "1491887959148986590" },
  { name: "Mike-Vision — Full Progress Report", date: "Apr 9", id: "1491921790233215150", highlight: "34-item brainstorm status" },
];

export const timeline = [
  {
    date: "Apr 7",
    items: [
      "ClickUp to Plane migration discussion",
      "Plane Command Center: 5-phase upgrade (quality standards, backfill 76 tasks, sprints, 40+ commands, automated briefings)",
      "1Password integration: server deployed, CLI connected, secrets skill built",
      "Model benchmarking research started",
      "ZeroClaw command testing and validation",
    ],
  },
  {
    date: "Apr 8",
    items: [
      "Stability overhaul: AGENTS.md 432→167 lines, error suppression, memory recovery",
      "Model benchmark: Kimi 50% vs Qwen 3.5+ 77% vs Qwen 3.6+ 93%",
      "Model switch executed: Kimi K2.5 → Qwen 3.6 Plus",
      "Dual agent prep: Bravo Claw bot created, announcement thread posted",
      "What We Fixed thread posted for Mike",
    ],
  },
  {
    date: "Apr 9",
    items: [
      "Bravo Claw fully deployed: same 50 skills, separate brain, port 42618",
      "Container parity audit: fixed missing mounts, networks, config token",
      "ClawForge Phase 1 completed: 8/8 tasks (labels, templates, SOPs, crons)",
      "Mike-Vision brainstorm: 34 items tracked, 24 completed",
      "Daily command center skill built",
      "Discord formatting fix: code-block tables, no more broken markdown",
      "Memory system: 7 improvement tasks created",
    ],
  },
  {
    date: "Apr 10",
    items: [
      "Latency optimization: compact_context=true (105s→45s response time)",
      "Benchmark skill created for on-demand model testing",
      "OPTIMIZATION.md + PAPERCLIP.md documentation",
      "Session archive: removed 700K of inactive session files",
      "Discord unread scanner added to plane-pm skill",
      "Progress dashboard built (this page)",
    ],
  },
];

export const systemStatus = {
  agents: [
    { name: "Alpha (ZeroClaw)", status: "healthy", port: 42617, skills: 50 },
    { name: "Bravo (BravoClaw)", status: "healthy", port: 42618, skills: 50 },
  ],
  model: "Qwen 3.6 Plus",
  fallbacks: "Qwen 3.5+ → Gemini 2.5 Flash",
  config: {
    compact_context: true,
    max_history_messages: 40,
    ack_reactions: true,
    auto_save: true,
    provider_timeout: "45s",
  },
  memory: "2.1MB brain.db",
  sessions: "3.3MB",
  costLimit: "$5/day, $100/month",
};

export function getPlaneUrl(task: { planeId: string; project?: "OPS" | "INFRA" }) {
  const base = task.project === "INFRA" ? PLANE_INFRA : PLANE_OPS;
  return `${base}${task.planeId}/`;
}
