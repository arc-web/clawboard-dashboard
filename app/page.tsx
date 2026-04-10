"use client";

import { useState, useEffect } from "react";
import {
  brainstormItems,
  pendingApproval,
  clawforgeTasks,
  discordThreads,
  timeline,
  systemStatus,
  getPlaneUrl,
  PLANE_OPS,
} from "./data";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0") + str.length.toString(16);
}

const EXPECTED = simpleHash("todovibes2026");

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (simpleHash(pw) === EXPECTED) {
      sessionStorage.setItem("dashboard-auth", "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-2xl font-bold text-white mb-2">ClawBoard Dashboard</h1>
        <p className="text-slate-400 mb-6 text-sm">Enter password to continue</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className={`w-full px-4 py-3 bg-slate-700 border ${error ? "border-red-500" : "border-slate-600"} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 mb-4`}
          autoFocus
        />
        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
          Enter
        </button>
        {error && <p className="text-red-400 text-sm mt-2 text-center">Wrong password</p>}
      </form>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done: "bg-emerald-500/20 text-emerald-400",
    partial: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-blue-500/20 text-blue-400",
    waiting: "bg-orange-500/20 text-orange-400",
    blocked: "bg-red-500/20 text-red-400",
    "needs-approval": "bg-orange-500/20 text-orange-400",
    todo: "bg-slate-500/20 text-slate-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || "bg-slate-600 text-slate-300"}`}>
      {status.replace("-", " ")}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    urgent: "text-red-400",
    high: "text-orange-400",
    medium: "text-yellow-400",
    low: "text-slate-400",
  };
  return <span className={`text-xs font-medium ${colors[priority] || "text-slate-400"}`}>{priority}</span>;
}

function ProgressBar({ value, max, color = "bg-emerald-500" }: { value: number; max: number; color?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
      <div className={`${color} h-3 rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 mb-4">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 rounded-xl transition">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-slate-400 text-sm">{open ? "\u25B2" : "\u25BC"}</span>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function Dashboard() {
  const doneCount = brainstormItems.filter((i) => i.status === "done").length;
  const totalItems = brainstormItems.length;
  const cfPhase1Done = clawforgeTasks.phase1.length;
  const cfTotal = clawforgeTasks.phase1.length + clawforgeTasks.phase2.length;
  const categories = [...new Set(brainstormItems.map((i) => i.category))];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">ClawBoard Dashboard</h1>
        <p className="text-slate-400">Progress report: Apr 7-10, 2026</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700/50">
          <div className="text-3xl font-bold text-emerald-400">{doneCount}/{totalItems}</div>
          <div className="text-sm text-slate-400 mt-1">Mike-Vision Done</div>
          <ProgressBar value={doneCount} max={totalItems} />
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700/50">
          <div className="text-3xl font-bold text-blue-400">{cfPhase1Done}/{cfTotal}</div>
          <div className="text-sm text-slate-400 mt-1">ClawForge Done</div>
          <ProgressBar value={cfPhase1Done} max={cfTotal} color="bg-blue-500" />
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700/50">
          <div className="text-3xl font-bold text-purple-400">131</div>
          <div className="text-sm text-slate-400 mt-1">Total Plane Tasks</div>
          <div className="text-xs text-slate-500 mt-1">77 completed</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700/50">
          <div className="text-3xl font-bold text-cyan-400">50</div>
          <div className="text-sm text-slate-400 mt-1">Skills Deployed</div>
          <div className="text-xs text-slate-500 mt-1">Alpha + Bravo</div>
        </div>
      </div>

      <Section title={`Action Required (${pendingApproval.length} tasks need approval)`} defaultOpen={true}>
        <div className="space-y-2 mb-4">
          {pendingApproval.map((t) => (
            <a key={t.id} href={getPlaneUrl(t)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between bg-slate-900/50 hover:bg-slate-700/50 rounded-lg px-4 py-3 transition border border-slate-700/30">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">{t.seq}</span>
                <span className="text-sm text-white">{t.name}</span>
              </div>
              <PriorityBadge priority={t.priority} />
            </a>
          ))}
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-4">
          <h3 className="text-amber-400 font-medium mb-2">Credentials Needed</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>- <strong>Gmail OAuth</strong> for me@advertisingreportcard.com (unlocks 7 items)</li>
            <li>- <strong>Google Calendar OAuth</strong> (unlocks 3 items)</li>
          </ul>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-3">
          <h3 className="text-blue-400 font-medium mb-2">Try These Commands</h3>
          <ul className="text-sm text-slate-300 space-y-1 font-mono">
            <li>@ZeroClaw good morning</li>
            <li>@ZeroClaw my tasks</li>
            <li>@ZeroClaw show unread</li>
            <li>@BravoClaw hello</li>
          </ul>
        </div>
      </Section>

      <Section title={`Mike-Vision Brainstorm (${doneCount}/${totalItems} done)`} defaultOpen={true}>
        {categories.map((cat) => {
          const items = brainstormItems.filter((i) => i.category === cat);
          const catDone = items.filter((i) => i.status === "done").length;
          return (
            <div key={cat} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">{cat}</h3>
                <span className="text-xs text-slate-500">{catDone}/{items.length}</span>
              </div>
              <div className="space-y-1">
                {items.map((item) => (
                  <div key={item.num} className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-slate-700/30 transition">
                    <span className="text-xs text-slate-600 w-6 font-mono">#{item.num}</span>
                    <span className="text-sm text-slate-200 flex-1">{item.item}</span>
                    <StatusBadge status={item.status} />
                    {item.planeId && (
                      <a href={getPlaneUrl({ planeId: item.planeId, project: item.project })} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300">
                        {item.taskSeq}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      <Section title={`ClawForge \u2014 Google Ads Automation (${cfPhase1Done}/${cfTotal})`}>
        <h3 className="text-emerald-400 font-medium mb-3">Phase 1 \u2014 Plane Setup (8/8 Complete)</h3>
        <div className="space-y-1 mb-6">
          {clawforgeTasks.phase1.map((t) => (
            <a key={t.seq} href={`${PLANE_OPS}${t.planeId}/`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-slate-700/30 transition">
              <span className="text-emerald-400">&#10003;</span>
              <span className="text-xs font-mono text-slate-500">{t.seq}</span>
              <span className="text-sm text-slate-200">{t.name}</span>
            </a>
          ))}
        </div>
        <h3 className="text-blue-400 font-medium mb-3">Phase 2 \u2014 Paperclip Integration (0/5 Ready)</h3>
        <div className="space-y-1">
          {clawforgeTasks.phase2.map((t) => (
            <a key={t.seq} href={`${PLANE_OPS}${t.planeId}/`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-slate-700/30 transition">
              <span className="text-slate-500">&#9675;</span>
              <span className="text-xs font-mono text-slate-500">{t.seq}</span>
              <span className="text-sm text-slate-200">{t.name}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Timeline (Apr 7-10)">
        {timeline.map((day) => (
          <div key={day.date} className="mb-6">
            <h3 className="text-blue-400 font-medium mb-2">{day.date}</h3>
            <ul className="space-y-1">
              {day.items.map((item, i) => (
                <li key={i} className="text-sm text-slate-300 pl-4 border-l-2 border-slate-700 py-1">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title={`Discord Update Threads (${discordThreads.length})`}>
        <div className="space-y-2">
          {discordThreads.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition">
              <span className="text-xs text-slate-500 w-14">{t.date}</span>
              <span className="text-sm text-white flex-1">{t.name}</span>
              {t.highlight && <span className="text-xs text-slate-500">{t.highlight}</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="System Status">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Agents</h3>
            {systemStatus.agents.map((a) => (
              <div key={a.name} className="flex items-center justify-between py-2">
                <span className="text-sm text-white">{a.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">:{a.port}</span>
                  <span className="text-xs text-slate-500">{a.skills} skills</span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Config</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Model</span><span className="text-white">{systemStatus.model}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Fallbacks</span><span className="text-white text-xs">{systemStatus.fallbacks}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Memory</span><span className="text-white">{systemStatus.memory}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Cost limit</span><span className="text-white">{systemStatus.costLimit}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">compact_context</span><span className="text-emerald-400">true</span></div>
              <div className="flex justify-between"><span className="text-slate-400">ack_reactions</span><span className="text-emerald-400">true</span></div>
            </div>
          </div>
        </div>
      </Section>

      <div className="text-center text-slate-600 text-xs py-8">
        ClawBoard Dashboard &middot; Built Apr 10, 2026 &middot; arc-web/clawboard-dashboard
      </div>
    </div>
  );
}

export default function Home() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("dashboard-auth") === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;
  return <Dashboard />;
}
