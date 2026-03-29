/**
 * Data Analyst → Data Engineer Roadmap Tracker
 * A full-featured productivity app with localStorage persistence.
 *
 * Structure:
 *  - roadmapData: static definition of all phases, weeks, days, and tasks
 *  - useProgress: custom hook for reading/writing progress to localStorage
 *  - Sidebar: phase & week navigation
 *  - ProgressBar: reusable progress bar component
 *  - TaskCard: individual day card with checkboxes
 *  - WeekView: renders all 7 days for a selected week
 *  - Dashboard: top-level layout
 *  - App: root component
 */

import { useState, useEffect, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────
// ROADMAP DATA
// ─────────────────────────────────────────────

const TASK_CATEGORIES = {
  SQL: "SQL",
  BI: "BI / Excel",
  PROJECT: "Project",
  REVIEW: "Review",
};

function buildDay(dayNum, title, tasks) {
  return { dayNum, title, tasks };
}

function buildTask(id, category, label) {
  return { id, category, label };
}

/**
 * Generates 7 days for a week with themed tasks.
 */
function generateWeekDays(weekNum, theme, phase = 1) {
  const days = [];
  const dayTitles = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
  ];

  const globalDayOffset = phase === 1 ? (weekNum - 1) * 7 : 112 + (weekNum - 1) * 7;

  const sqlTasks = {
    1: ["SELECT, WHERE, ORDER BY fundamentals", "GROUP BY & aggregation functions", "HAVING clause deep-dive", "DISTINCT & aliases", "Basic subqueries", "SQL review & practice quiz", "Weekend project: query a sample DB"],
    2: ["INNER JOIN mechanics", "LEFT / RIGHT JOIN patterns", "FULL OUTER JOIN & CROSS JOIN", "Self-joins & aliasing tables", "Multi-table JOIN queries", "JOIN performance tips", "Build JOIN-based report"],
    3: ["Subqueries in WHERE clause", "Correlated subqueries", "CTEs with WITH clause", "Window functions: ROW_NUMBER, RANK", "LEAD / LAG functions", "PARTITION BY deep-dive", "End-of-week SQL challenge"],
    4: ["Mini project: Sales dashboard queries", "Data cleaning with SQL", "CASE statements & conditionals", "String functions & LIKE patterns", "Date/time functions", "Query optimisation basics", "Present mini project queries"],
    5: ["Power BI intro & data import", "Building bar & line charts", "Slicers and filters", "DAX basics: SUM, AVERAGE, COUNT", "Creating calculated columns", "Dashboard layout design", "Publish & share report"],
    6: ["Advanced DAX measures", "KPI cards & gauges", "Drill-through pages", "Row-level security basics", "Power Query transformations", "Connecting multiple data sources", "Full Power BI dashboard project"],
    7: ["Excel pivot tables refresh", "VLOOKUP & XLOOKUP", "INDEX / MATCH patterns", "Conditional formatting", "Excel charts for reporting", "Combined Excel + Power BI workflow", "Dashboard comparison review"],
    8: ["Executive dashboard design principles", "Storytelling with data theory", "Annotations & callouts in Power BI", "Mobile layout optimisation", "Bookmarks & page navigation", "End-to-end dashboard project", "Peer review session"],
    9: ["Advanced window functions", "Recursive CTEs", "Query execution plans", "Index strategies", "Stored procedures intro", "Performance tuning workshop", "SQL challenge: optimise slow queries"],
    10: ["End-to-end analyst project: define scope", "Data collection & cleaning", "Exploratory analysis queries", "Build Power BI report", "Write insights narrative", "Stakeholder presentation prep", "Project review & retrospective"],
    11: ["Data storytelling frameworks", "Choosing the right chart type", "Colour theory for dashboards", "Writing data narratives", "Case study: real-world analysis", "Portfolio page 1 draft", "Portfolio review"],
    12: ["GitHub portfolio setup", "README writing best practices", "Documenting SQL projects", "Adding Power BI screenshots", "Peer portfolio feedback", "LinkedIn profile optimisation", "Portfolio v1 complete"],
    13: ["Job description analysis", "CV / resume tailoring", "Cover letter template", "LinkedIn outreach messages", "Job board strategy", "Application tracking setup", "Apply to 5 positions"],
    14: ["SQL interview questions: easy", "SQL interview questions: medium", "Behavioural interview prep (STAR)", "Mock interview session", "Data take-home challenge practice", "Review feedback", "Rest & reflect"],
    15: ["Hard SQL interview questions", "Power BI scenario questions", "Statistics & probability basics", "A/B testing concepts", "Business case study practice", "Mock interview #2", "Assess & iterate"],
    16: ["Final SQL mock test", "Final Power BI challenge", "Update portfolio with latest work", "LinkedIn final polish", "Send 10 targeted applications", "Follow-up email templates", "Celebrate Phase 1 completion 🎉"],
  };

  // Phase 2 task themes by month group
  const phase2Topics = {
    1: "Python Basics & Pandas",
    2: "Advanced Pandas & NumPy",
    3: "SQL + Python Integration",
    4: "ETL Pipeline Foundations",
    5: "Apache Airflow",
    6: "REST APIs & Data Ingestion",
    7: "AWS S3 & IAM",
    8: "AWS Lambda & RDS",
    9: "AWS Glue & Athena",
    10: "Docker & Containerisation",
    11: "Apache Spark",
    12: "Data Warehousing & Capstone",
  };

  const topic = phase === 1 ? (sqlTasks[weekNum] || sqlTasks[1]) : null;

  for (let d = 0; d < 7; d++) {
    const dayNum = globalDayOffset + d + 1;
    const dayLabel = dayTitles[d];
    const weekTitle = phase === 2 ? phase2Topics[weekNum] : theme;
    const title = `Day ${dayNum} – ${dayLabel}: ${weekTitle}`;

    let tasks = [];

    if (phase === 1) {
      const sqlLabel = topic ? topic[d] : "SQL practice";
      tasks = [
        buildTask(`d${dayNum}-sql`, TASK_CATEGORIES.SQL, `SQL Practice (2 hrs): ${sqlLabel}`),
        buildTask(`d${dayNum}-bi`, TASK_CATEGORIES.BI, `Power BI / Excel (1.5 hrs): ${weekNum <= 4 ? "Excel data analysis exercise" : weekNum <= 8 ? "Build a Power BI chart" : "Dashboard refinement"}`),
        buildTask(`d${dayNum}-proj`, TASK_CATEGORIES.PROJECT, `Project Work (1 hr): ${weekNum <= 4 ? "Design query for mini-project" : weekNum <= 8 ? "Add page to dashboard project" : weekNum <= 10 ? "End-to-end project milestone" : weekNum <= 12 ? "Portfolio entry" : "Job application task"}`),
        buildTask(`d${dayNum}-rev`, TASK_CATEGORIES.REVIEW, `Review & Notes (30 mins): Summarise key learnings from today`),
      ];
    } else {
      const p2 = phase2Topics[weekNum] || "Data Engineering";
      const p2Tasks = {
        1: [`Python: variables, data types, loops (2 hrs)`, `Pandas: read_csv, head, describe (1.5 hrs)`, `Mini project: load CSV & explore (1 hr)`],
        2: [`Pandas: groupby, merge, pivot (2 hrs)`, `NumPy arrays & vectorised ops (1.5 hrs)`, `Data cleaning pipeline script (1 hr)`],
        3: [`SQLAlchemy: connect Python to DB (2 hrs)`, `psycopg2 queries from Python (1.5 hrs)`, `Automate SQL report with Python (1 hr)`],
        4: [`ETL design patterns theory (2 hrs)`, `Extract: read from CSV/JSON/API (1.5 hrs)`, `Transform & Load pipeline (1 hr)`],
        5: [`Airflow: DAGs & operators (2 hrs)`, `Schedule an ETL DAG (1.5 hrs)`, `Monitor & debug Airflow task (1 hr)`],
        6: [`REST API consumption with requests (2 hrs)`, `JSON parsing & pagination (1.5 hrs)`, `Ingest API data into Postgres (1 hr)`],
        7: [`AWS S3: buckets, upload, download (2 hrs)`, `IAM roles & policies (1.5 hrs)`, `Python boto3 S3 automation (1 hr)`],
        8: [`AWS Lambda function setup (2 hrs)`, `RDS Postgres on AWS (1.5 hrs)`, `Lambda → RDS pipeline (1 hr)`],
        9: [`AWS Glue crawlers & catalogue (2 hrs)`, `Athena SQL over S3 data (1.5 hrs)`, `End-to-end AWS pipeline (1 hr)`],
        10: [`Docker concepts & Dockerfile (2 hrs)`, `Containerise a Python ETL script (1.5 hrs)`, `Docker Compose multi-service (1 hr)`],
        11: [`Spark architecture & RDDs (2 hrs)`, `PySpark DataFrames (1.5 hrs)`, `Spark job on sample dataset (1 hr)`],
        12: [`Data warehouse design (Redshift/BigQuery) (2 hrs)`, `Star schema modelling (1.5 hrs)`, `Capstone project milestone (1 hr)`],
      };
      const t = p2Tasks[weekNum] || p2Tasks[1];
      tasks = [
        buildTask(`d${dayNum}-core`, "Core Skill", `${t[0]}`),
        buildTask(`d${dayNum}-hands`, "Hands-on", `${t[1]}`),
        buildTask(`d${dayNum}-proj`, TASK_CATEGORIES.PROJECT, `${t[2]}`),
        buildTask(`d${dayNum}-rev`, TASK_CATEGORIES.REVIEW, `Review & Notes (30 mins): Document what you built today`),
      ];
    }

    days.push(buildDay(dayNum, title, tasks));
  }
  return days;
}

/**
 * Full roadmap definition.
 */
const roadmapData = {
  phases: [
    {
      id: "phase1",
      label: "Phase 1: Data Analyst",
      duration: "16 Weeks",
      color: "indigo",
      weeks: [
        { id: "w1", label: "Week 1 – SQL Basics", theme: "SQL Fundamentals", days: generateWeekDays(1, "SQL Fundamentals", 1) },
        { id: "w2", label: "Week 2 – SQL Joins", theme: "SQL Joins", days: generateWeekDays(2, "SQL Joins", 1) },
        { id: "w3", label: "Week 3 – Intermediate SQL", theme: "Intermediate SQL", days: generateWeekDays(3, "Intermediate SQL", 1) },
        { id: "w4", label: "Week 4 – SQL Mini Project", theme: "SQL Mini Project", days: generateWeekDays(4, "SQL Mini Project", 1) },
        { id: "w5", label: "Week 5 – Power BI Intro", theme: "Power BI Intro", days: generateWeekDays(5, "Power BI Intro", 1) },
        { id: "w6", label: "Week 6 – Advanced Power BI", theme: "Advanced Power BI", days: generateWeekDays(6, "Advanced Power BI", 1) },
        { id: "w7", label: "Week 7 – Excel Analytics", theme: "Excel Analytics", days: generateWeekDays(7, "Excel Analytics", 1) },
        { id: "w8", label: "Week 8 – Dashboard Projects", theme: "Dashboard Projects", days: generateWeekDays(8, "Dashboard Projects", 1) },
        { id: "w9", label: "Week 9 – Advanced SQL", theme: "Advanced SQL", days: generateWeekDays(9, "Advanced SQL", 1) },
        { id: "w10", label: "Week 10 – End-to-End Project", theme: "End-to-End Project", days: generateWeekDays(10, "End-to-End Project", 1) },
        { id: "w11", label: "Week 11 – Storytelling", theme: "Data Storytelling", days: generateWeekDays(11, "Data Storytelling", 1) },
        { id: "w12", label: "Week 12 – Portfolio", theme: "Portfolio Building", days: generateWeekDays(12, "Portfolio Building", 1) },
        { id: "w13", label: "Week 13 – Job Applications", theme: "Job Applications", days: generateWeekDays(13, "Job Applications", 1) },
        { id: "w14", label: "Week 14 – Interview Prep I", theme: "Interview Prep I", days: generateWeekDays(14, "Interview Prep I", 1) },
        { id: "w15", label: "Week 15 – Interview Prep II", theme: "Interview Prep II", days: generateWeekDays(15, "Interview Prep II", 1) },
        { id: "w16", label: "Week 16 – Final Push", theme: "Final Push", days: generateWeekDays(16, "Final Push", 1) },
      ],
    },
    {
      id: "phase2",
      label: "Phase 2: Data Engineering",
      duration: "12 Months",
      color: "emerald",
      weeks: Array.from({ length: 12 }, (_, i) => {
        const monthLabels = [
          "Month 1 – Python & Pandas",
          "Month 2 – Advanced Pandas",
          "Month 3 – SQL + Python",
          "Month 4 – ETL Foundations",
          "Month 5 – Apache Airflow",
          "Month 6 – APIs & Ingestion",
          "Month 7 – AWS S3 & IAM",
          "Month 8 – Lambda & RDS",
          "Month 9 – Glue & Athena",
          "Month 10 – Docker",
          "Month 11 – Apache Spark",
          "Month 12 – Warehousing & Capstone",
        ];
        return {
          id: `p2w${i + 1}`,
          label: monthLabels[i],
          theme: monthLabels[i].split(" – ")[1],
          days: generateWeekDays(i + 1, monthLabels[i].split(" – ")[1], 2),
        };
      }),
    },
  ],
};

// ─────────────────────────────────────────────
// CUSTOM HOOK – Progress persistence
// ─────────────────────────────────────────────

const STORAGE_KEY = "roadmap_progress_v1";

function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleTask = useCallback((taskId) => {
    setProgress((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }, []);

  return { progress, toggleTask, resetProgress };
}

// ─────────────────────────────────────────────
// UTILITY – compute stats
// ─────────────────────────────────────────────

function computeWeekStats(week, progress) {
  let total = 0;
  let done = 0;
  week.days.forEach((day) => {
    day.tasks.forEach((task) => {
      total++;
      if (progress[task.id]) done++;
    });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

function computePhaseStats(phase, progress) {
  let total = 0;
  let done = 0;
  phase.weeks.forEach((week) => {
    week.days.forEach((day) => {
      day.tasks.forEach((task) => {
        total++;
        if (progress[task.id]) done++;
      });
    });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

function computeOverallStats(progress) {
  let total = 0;
  let done = 0;
  roadmapData.phases.forEach((phase) => {
    phase.weeks.forEach((week) => {
      week.days.forEach((day) => {
        day.tasks.forEach((task) => {
          total++;
          if (progress[task.id]) done++;
        });
      });
    });
  });
  return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

/** Reusable progress bar */
function ProgressBar({ pct, color = "indigo", size = "md" }) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" };
  const colors = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-400",
    sky: "bg-sky-400",
  };
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
      <div
        className={`${colors[color]} ${heights[size]} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Category badge */
const CATEGORY_STYLES = {
  SQL: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  "BI / Excel": "bg-violet-50 text-violet-700 border border-violet-100",
  Project: "bg-amber-50 text-amber-700 border border-amber-100",
  Review: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  "Core Skill": "bg-sky-50 text-sky-700 border border-sky-100",
  "Hands-on": "bg-rose-50 text-rose-700 border border-rose-100",
};

function CategoryBadge({ category }) {
  const style = CATEGORY_STYLES[category] || "bg-gray-100 text-gray-600";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style}`}>
      {category}
    </span>
  );
}

/** Single task row with checkbox */
function TaskRow({ task, checked, onToggle }) {
  return (
    <label className="flex items-start gap-3 py-2.5 px-1 group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
      <div className="mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
            ${checked
              ? "bg-indigo-500 border-indigo-500 shadow-sm"
              : "border-gray-300 group-hover:border-indigo-300"
            }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <CategoryBadge category={task.category} />
        <span className={`text-sm leading-snug ${checked ? "line-through text-gray-400" : "text-gray-700"}`}>
          {task.label}
        </span>
      </div>
    </label>
  );
}

/** A day card */
function DayCard({ day, progress, toggleTask, isToday }) {
  const doneTasks = day.tasks.filter((t) => progress[t.id]).length;
  const totalTasks = day.tasks.length;
  const allDone = doneTasks === totalTasks;

  return (
    <div
      className={`rounded-2xl bg-white border transition-all duration-200
        ${isToday
          ? "border-indigo-300 shadow-md shadow-indigo-100 ring-2 ring-indigo-200"
          : "border-gray-100 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Card Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${isToday ? "border-indigo-100 bg-indigo-50/40" : "border-gray-50"} rounded-t-2xl`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isToday && (
            <span className="flex-shrink-0 text-xs font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-full">
              TODAY
            </span>
          )}
          <h3 className="text-sm font-semibold text-gray-800 truncate">{day.title}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {allDone ? (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ✓ Done
            </span>
          ) : (
            <span className="text-xs text-gray-500 tabular-nums">
              {doneTasks}/{totalTasks}
            </span>
          )}
        </div>
      </div>

      {/* Progress micro-bar */}
      <div className="px-5 pt-3">
        <ProgressBar pct={Math.round((doneTasks / totalTasks) * 100)} color={allDone ? "emerald" : "indigo"} size="sm" />
      </div>

      {/* Task list */}
      <div className="px-4 pb-4 pt-2 divide-y divide-gray-50">
        {day.tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            checked={!!progress[task.id]}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
}

/** Week view – grid of 7 day cards */
function WeekView({ week, progress, toggleTask, currentDayNum }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {week.days.map((day) => (
        <DayCard
          key={day.dayNum}
          day={day}
          progress={progress}
          toggleTask={toggleTask}
          isToday={day.dayNum === currentDayNum}
        />
      ))}
    </div>
  );
}

/** Sidebar nav item */
function SidebarWeek({ week, isActive, onClick, pct, color }) {
  const colors = {
    indigo: { active: "bg-indigo-500 text-white", hover: "hover:bg-indigo-50 text-gray-700", bar: "bg-indigo-500" },
    emerald: { active: "bg-emerald-500 text-white", hover: "hover:bg-emerald-50 text-gray-700", bar: "bg-emerald-500" },
  };
  const c = colors[color] || colors.indigo;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-2
        ${isActive ? c.active : `${c.hover} hover:bg-opacity-80`}`}
    >
      <div className="flex-1 min-w-0">
        <div className="truncate">{week.label}</div>
        {!isActive && (
          <div className={`mt-1 h-1 rounded-full bg-gray-100 overflow-hidden`}>
            <div className={`h-1 rounded-full ${c.bar}`} style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      {!isActive && (
        <span className="text-xs tabular-nums text-gray-400 flex-shrink-0">{pct}%</span>
      )}
    </button>
  );
}

/** Sidebar */
function Sidebar({ activePhaseId, activeWeekId, onSelectWeek, progress, onReset }) {
  const [expandedPhase, setExpandedPhase] = useState(activePhaseId);

  return (
    <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo / Header */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-none">DataPath</h1>
            <p className="text-xs text-gray-400 mt-0.5">Analyst → Engineer</p>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="px-5 py-4 border-b border-gray-50">
        {(() => {
          const stats = computeOverallStats(progress);
          return (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</span>
                <span className="text-sm font-bold text-gray-900">{stats.pct}%</span>
              </div>
              <ProgressBar pct={stats.pct} color="indigo" size="md" />
              <p className="text-xs text-gray-400 mt-1.5">{stats.done} of {stats.total} tasks</p>
            </div>
          );
        })()}
      </div>

      {/* Phase nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
        {roadmapData.phases.map((phase) => {
          const phaseStats = computePhaseStats(phase, progress);
          const isExpanded = expandedPhase === phase.id;

          return (
            <div key={phase.id}>
              {/* Phase header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${phase.color === "indigo" ? "bg-indigo-400" : "bg-emerald-400"}`} />
                  <span className="text-xs font-bold text-gray-700 truncate">{phase.label}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                  <span className="text-xs text-gray-400">{phaseStats.pct}%</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Week list */}
              {isExpanded && (
                <div className="ml-2 mt-0.5 space-y-0.5 pl-2 border-l-2 border-gray-100">
                  {phase.weeks.map((week) => {
                    const wStats = computeWeekStats(week, progress);
                    return (
                      <SidebarWeek
                        key={week.id}
                        week={week}
                        isActive={activeWeekId === week.id}
                        onClick={() => onSelectWeek(phase.id, week.id)}
                        pct={wStats.pct}
                        color={phase.color}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Reset button */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={() => {
            if (window.confirm("Reset all progress? This cannot be undone.")) {
              onReset();
            }
          }}
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          Reset All Progress
        </button>
      </div>
    </aside>
  );
}

/** Top stats bar */
function StatsBar({ phase, week, progress }) {
  const weekStats = computeWeekStats(week, progress);
  const phaseStats = computePhaseStats(phase, progress);
  const overallStats = computeOverallStats(progress);

  const StatCard = ({ label, pct, done, total, color }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">{label}</span>
        <span className="text-lg font-bold text-gray-900 tabular-nums flex-shrink-0 ml-2">{pct}%</span>
      </div>
      <ProgressBar pct={pct} color={color} size="md" />
      <p className="text-xs text-gray-400 mt-1.5 tabular-nums">{done}/{total} tasks</p>
    </div>
  );

  return (
    <div className="flex gap-3 flex-wrap">
      <StatCard label="This Week" pct={weekStats.pct} done={weekStats.done} total={weekStats.total} color={phase.color === "indigo" ? "indigo" : "emerald"} />
      <StatCard label={phase.label} pct={phaseStats.pct} done={phaseStats.done} total={phaseStats.total} color={phase.color === "indigo" ? "indigo" : "emerald"} />
      <StatCard label="Overall Roadmap" pct={overallStats.pct} done={overallStats.done} total={overallStats.total} color="amber" />
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────

function Dashboard() {
  const { progress, toggleTask, resetProgress } = useProgress();

  // Default: phase 1, week 1
  const [activePhaseId, setActivePhaseId] = useState("phase1");
  const [activeWeekId, setActiveWeekId] = useState("w1");

  // Simulate "current day" as day 1 by default (user can change via URL param or just leave it)
  const currentDayNum = 1;

  const activePhase = roadmapData.phases.find((p) => p.id === activePhaseId) || roadmapData.phases[0];
  const activeWeek = activePhase.weeks.find((w) => w.id === activeWeekId) || activePhase.weeks[0];

  const handleSelectWeek = (phaseId, weekId) => {
    setActivePhaseId(phaseId);
    setActiveWeekId(weekId);
  };

  // Keep sidebar in sync when phase changes
  useEffect(() => {
    if (!activePhase.weeks.find((w) => w.id === activeWeekId)) {
      setActiveWeekId(activePhase.weeks[0].id);
    }
  }, [activePhaseId]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        activePhaseId={activePhaseId}
        activeWeekId={activeWeekId}
        onSelectWeek={handleSelectWeek}
        progress={progress}
        onReset={resetProgress}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                  ${activePhase.color === "indigo" ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"}`}>
                  {activePhase.label}
                </span>
                <span className="text-xs text-gray-400">{activePhase.duration}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{activeWeek.label}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{activeWeek.theme} · 7 days · {activeWeek.days.reduce((a, d) => a + d.tasks.length, 0)} tasks</p>
            </div>

            {/* Week navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const allWeeks = activePhase.weeks;
                  const idx = allWeeks.findIndex((w) => w.id === activeWeekId);
                  if (idx > 0) setActiveWeekId(allWeeks[idx - 1].id);
                }}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"
                title="Previous week"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const allWeeks = activePhase.weeks;
                  const idx = allWeeks.findIndex((w) => w.id === activeWeekId);
                  if (idx < allWeeks.length - 1) setActiveWeekId(allWeeks[idx + 1].id);
                }}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"
                title="Next week"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatsBar phase={activePhase} week={activeWeek} progress={progress} />

          {/* Day cards grid */}
          <WeekView
            week={activeWeek}
            progress={progress}
            toggleTask={toggleTask}
            currentDayNum={currentDayNum}
          />
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────

export default function App() {
  return <Dashboard />;
}

