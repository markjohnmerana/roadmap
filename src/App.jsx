/**
 * DataPath – Data Analyst → Data Engineer Roadmap Tracker
 * Mobile-responsive redesign with fixed scroll behavior
 */

import { useState, useEffect, useCallback, useRef } from "react";

const CAT = { LEARN: "Learn", PRACTICE: "Practice", BUILD: "Build", REVIEW: "Review" };

let _tid = 0;
const t = (cat, label) => ({ id: `t${++_tid}`, category: cat, label });
const day = (num, title, tasks) => ({ dayNum: num, title, tasks });

function makePhase1() {
  let d = 0;
  const nd = () => ++d;
  return [
    { id: "w1", label: "Week 1 – SQL Basics", days: [
      day(nd(),"Mon – SELECT & WHERE",    [t(CAT.LEARN,"SELECT, FROM, WHERE, AND/OR — install DBeaver & load sample DB (1.5 hrs)"),t(CAT.PRACTICE,"Write 10 filter queries on Northwind orders table (1 hr)"),t(CAT.REVIEW,"SQL syntax cheatsheet: note every keyword used today (30 mins)")]),
      day(nd(),"Tue – Sorting & DISTINCT",[t(CAT.LEARN,"ORDER BY ASC/DESC, LIMIT/TOP, DISTINCT, column aliases (1.5 hrs)"),t(CAT.PRACTICE,"Top-N queries: highest sales, latest orders, unique customers (1 hr)"),t(CAT.REVIEW,"Flashcard: 5 cards for today's keywords (30 mins)")]),
      day(nd(),"Wed – Aggregations",      [t(CAT.LEARN,"COUNT, SUM, AVG, MIN, MAX + GROUP BY (1.5 hrs)"),t(CAT.PRACTICE,"Sales aggregation drills: revenue per category, orders per month (1 hr)"),t(CAT.REVIEW,"Explain GROUP BY in plain English in your notes (30 mins)")]),
      day(nd(),"Thu – HAVING & CASE",     [t(CAT.LEARN,"HAVING vs WHERE; CASE WHEN…THEN…ELSE…END (1.5 hrs)"),t(CAT.PRACTICE,"Segment customers into tiers with CASE; filter with HAVING (1 hr)"),t(CAT.REVIEW,"Add HAVING + CASE to cheatsheet (30 mins)")]),
      day(nd(),"Fri – Date Functions",    [t(CAT.LEARN,"DATEPART, DATEDIFF, DATEADD, FORMAT — date maths (1.5 hrs)"),t(CAT.PRACTICE,"Calculate order age, month of sale, days since last purchase (1 hr)"),t(CAT.REVIEW,"Week 1 summary: write every concept you learned (30 mins)")]),
      day(nd(),"Sat – Mini Project",      [t(CAT.BUILD,"Load a CSV (e.g. Superstore) into SQLite; answer 5 business questions (1.5 hrs)"),t(CAT.BUILD,"Document queries with comments; write 3-sentence findings (1 hr)"),t(CAT.REVIEW,"Push to GitHub Gist; review any weak areas (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Light flashcard review: SQL basics (30 mins)"),t(CAT.REVIEW,"Optional: SQLZoo tutorials — 2 easy exercises (30 mins)")]),
    ]},
    { id: "w2", label: "Week 2 – SQL Joins", days: [
      day(nd(),"Mon – INNER JOIN",        [t(CAT.LEARN,"INNER JOIN concept, Venn diagram mental model, ON clause (1.5 hrs)"),t(CAT.PRACTICE,"Join customers + orders; join products + categories (1 hr)"),t(CAT.REVIEW,"Draw JOIN diagram; note what rows are dropped (30 mins)")]),
      day(nd(),"Tue – LEFT JOIN",         [t(CAT.LEARN,"LEFT JOIN keeps all left rows; NULL for no match (1.5 hrs)"),t(CAT.PRACTICE,"Find customers with zero orders using LEFT JOIN + IS NULL (1 hr)"),t(CAT.REVIEW,"INNER vs LEFT JOIN comparison table in notes (30 mins)")]),
      day(nd(),"Wed – FULL & CROSS JOIN", [t(CAT.LEARN,"FULL OUTER JOIN; CROSS JOIN use cases (1.5 hrs)"),t(CAT.PRACTICE,"CROSS JOIN: generate product × region matrix (1 hr)"),t(CAT.REVIEW,"All 4 JOIN types on one cheatsheet page (30 mins)")]),
      day(nd(),"Thu – Self Join",         [t(CAT.LEARN,"Self-join pattern; employee → manager hierarchy example (1.5 hrs)"),t(CAT.PRACTICE,"Write self-join query: who reports to whom (1 hr)"),t(CAT.REVIEW,"Explain self-join in plain English (30 mins)")]),
      day(nd(),"Fri – Multi-Table JOINs", [t(CAT.LEARN,"Chaining 3+ tables; JOIN order; readability tips (1.5 hrs)"),t(CAT.PRACTICE,"5-table JOIN: orders + customers + products + categories + reps (1 hr)"),t(CAT.REVIEW,"JOIN week summary; update flashcards (30 mins)")]),
      day(nd(),"Sat – JOIN Project",      [t(CAT.BUILD,"Sales summary report using 3-table JOIN: revenue by rep by category (1.5 hrs)"),t(CAT.BUILD,"Export to CSV; write 3 data insights (1 hr)"),t(CAT.REVIEW,"GitHub push; note any JOIN gaps to revisit (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"JOIN flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: solve 2 JOIN problems on LeetCode (30 mins)")]),
    ]},
    { id: "w3", label: "Week 3 – Intermediate SQL", days: [
      day(nd(),"Mon – Subqueries",        [t(CAT.LEARN,"Subqueries in SELECT, WHERE, FROM; correlated subqueries (1.5 hrs)"),t(CAT.PRACTICE,"Rewrite 3 JOINs as subqueries; find above-average orders (1 hr)"),t(CAT.REVIEW,"When to prefer subquery vs JOIN — pros/cons (30 mins)")]),
      day(nd(),"Tue – CTEs",              [t(CAT.LEARN,"WITH clause (CTE); chaining multiple CTEs; readability (1.5 hrs)"),t(CAT.PRACTICE,"Refactor a nested subquery into a clean CTE chain (1 hr)"),t(CAT.REVIEW,"CTE syntax added to cheatsheet (30 mins)")]),
      day(nd(),"Wed – Window Fns I",      [t(CAT.LEARN,"ROW_NUMBER, RANK, DENSE_RANK; OVER(), PARTITION BY (1.5 hrs)"),t(CAT.PRACTICE,"Rank products by revenue within each category (1 hr)"),t(CAT.REVIEW,"Sketch PARTITION BY output in a table in your notes (30 mins)")]),
      day(nd(),"Thu – Window Fns II",     [t(CAT.LEARN,"LEAD, LAG, FIRST_VALUE, LAST_VALUE; running totals (1.5 hrs)"),t(CAT.PRACTICE,"Month-over-month revenue change using LAG (1 hr)"),t(CAT.REVIEW,"Window function cheatsheet (30 mins)")]),
      day(nd(),"Fri – String Functions",  [t(CAT.LEARN,"TRIM, UPPER, LOWER, SUBSTRING, REPLACE, CONCAT, COALESCE (1.5 hrs)"),t(CAT.PRACTICE,"Clean a dirty customer table: fix names, emails, nulls (1 hr)"),t(CAT.REVIEW,"Week 3 summary + flashcard update (30 mins)")]),
      day(nd(),"Sat – Cohort Analysis",   [t(CAT.BUILD,"Monthly cohort: first purchase month + retention using window fns (1.5 hrs)"),t(CAT.BUILD,"Save query + output table; write interpretation (1 hr)"),t(CAT.REVIEW,"GitHub push; this is a strong portfolio query (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Window function flashcards (30 mins)"),t(CAT.REVIEW,"Optional: 2 medium SQL on LeetCode / StrataScratch (30 mins)")]),
    ]},
    { id: "w4", label: "Week 4 – SQL Mini Project", days: [
      day(nd(),"Mon – Data Cleaning SQL", [t(CAT.LEARN,"NULLIF, ISNULL/COALESCE, CAST, CONVERT, dedup with ROW_NUMBER (1.5 hrs)"),t(CAT.PRACTICE,"Clean a raw Kaggle dataset: nulls, types, duplicates (1 hr)"),t(CAT.REVIEW,"Create a cleaned_data view; document issues found (30 mins)")]),
      day(nd(),"Tue – Project Scoping",   [t(CAT.BUILD,"Choose dataset; define 5 business questions to answer with SQL (1 hr)"),t(CAT.BUILD,"Write data dictionary; inspect row counts & nulls (1 hr)"),t(CAT.REVIEW,"Project brief saved to README draft (30 mins)")]),
      day(nd(),"Wed – Analysis Queries",  [t(CAT.BUILD,"Write queries for questions 1–3; use CTEs & window fns where needed (1.5 hrs)"),t(CAT.PRACTICE,"Optimise each query: check execution plan (1 hr)"),t(CAT.REVIEW,"Findings so far — note most interesting insight (30 mins)")]),
      day(nd(),"Thu – Finish Analysis",   [t(CAT.BUILD,"Write queries for questions 4–5; add comments to all queries (1.5 hrs)"),t(CAT.BUILD,"Export results; write 1-page findings summary (1 hr)"),t(CAT.REVIEW,"Full query review: are results correct? (30 mins)")]),
      day(nd(),"Fri – Index Basics",      [t(CAT.LEARN,"B-tree indexes; CREATE INDEX; EXPLAIN plan before/after (1.5 hrs)"),t(CAT.PRACTICE,"Add index to slowest query; measure improvement (1 hr)"),t(CAT.REVIEW,"Indexing rules cheatsheet (30 mins)")]),
      day(nd(),"Sat – Publish Project",   [t(CAT.BUILD,"GitHub repo: SQL files + README with questions, methods, findings (1.5 hrs)"),t(CAT.BUILD,"Screenshot query results; add to portfolio folder (1 hr)"),t(CAT.REVIEW,"Retrospective: what you'd do differently (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Skim Week 5 Power BI setup guide (20 mins)"),t(CAT.REVIEW,"Optional: browse r/SQL for interesting query problems (20 mins)")]),
    ]},
    { id: "w5", label: "Week 5 – Power BI Intro", days: [
      day(nd(),"Mon – Power BI Setup",    [t(CAT.LEARN,"Install Power BI Desktop; interface tour: canvas, panes, ribbon (1.5 hrs)"),t(CAT.PRACTICE,"Import your Week 4 CSV; explore in table & data view (1 hr)"),t(CAT.REVIEW,"Power BI UI vocabulary cheatsheet (30 mins)")]),
      day(nd(),"Tue – First Visuals",     [t(CAT.LEARN,"Bar, column, line, pie charts; drill-down levels (1.5 hrs)"),t(CAT.PRACTICE,"Build 3 charts from your dataset: trend + comparison + part-of-whole (1 hr)"),t(CAT.REVIEW,"Screenshot charts; note what story each tells (30 mins)")]),
      day(nd(),"Wed – Slicers & Filters", [t(CAT.LEARN,"Slicer visual; page filter; visual filter; filter pane (1.5 hrs)"),t(CAT.PRACTICE,"Add date range slicer + category filter to yesterday's report (1 hr)"),t(CAT.REVIEW,"Slicer vs filter: when to use each (30 mins)")]),
      day(nd(),"Thu – DAX Basics",        [t(CAT.LEARN,"DAX measures: SUM, AVERAGE, COUNT, COUNTROWS, DIVIDE (1.5 hrs)"),t(CAT.PRACTICE,"Create 3 measures: Total Revenue, Avg Order Value, # Customers (1 hr)"),t(CAT.REVIEW,"DAX measure syntax added to cheatsheet (30 mins)")]),
      day(nd(),"Fri – Calculated Columns",[t(CAT.LEARN,"Calculated column vs measure; row context vs filter context (1.5 hrs)"),t(CAT.PRACTICE,"Add Profit Margin %, Revenue Tier, Days Since Order columns (1 hr)"),t(CAT.REVIEW,"Week 5 summary; Power BI vocabulary reviewed (30 mins)")]),
      day(nd(),"Sat – First Dashboard",   [t(CAT.BUILD,"Arrange 5 visuals into a single-page dashboard (1.5 hrs)"),t(CAT.BUILD,"Consistent colours, aligned layout, meaningful titles (1 hr)"),t(CAT.REVIEW,"Screenshot; save to portfolio folder (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Watch 1 Power BI beginner walkthrough on YouTube (45 mins)"),t(CAT.REVIEW,"Optional: explore Microsoft Learn Power BI path (20 mins)")]),
    ]},
    { id: "w6", label: "Week 6 – Advanced Power BI", days: [
      day(nd(),"Mon – Advanced DAX",      [t(CAT.LEARN,"CALCULATE, FILTER, ALL, ALLEXCEPT; context transition explained (1.5 hrs)"),t(CAT.PRACTICE,"YTD Sales, prior year comparison, % of total measures (1 hr)"),t(CAT.REVIEW,"Document each measure with a description comment (30 mins)")]),
      day(nd(),"Tue – KPI Cards",         [t(CAT.LEARN,"Card visual, KPI visual, Gauge; target vs actual patterns (1.5 hrs)"),t(CAT.PRACTICE,"Revenue vs Target KPI card; % Goal achieved gauge (1 hr)"),t(CAT.REVIEW,"When KPI visuals mislead — note the pitfalls (30 mins)")]),
      day(nd(),"Wed – Drill-through",     [t(CAT.LEARN,"Drill-through pages; cross-filter vs cross-highlight (1.5 hrs)"),t(CAT.PRACTICE,"Product detail drill-through page from main dashboard (1 hr)"),t(CAT.REVIEW,"Test all interactions; fix broken filters (30 mins)")]),
      day(nd(),"Thu – Power Query",       [t(CAT.LEARN,"Power Query Editor: split, unpivot, merge, fill down, data types (1.5 hrs)"),t(CAT.PRACTICE,"Clean a messy Excel file entirely in Power Query (1 hr)"),t(CAT.REVIEW,"3 most useful Power Query steps noted (30 mins)")]),
      day(nd(),"Fri – Multi-Source",      [t(CAT.LEARN,"Connect CSV + Excel + database in one model; manage relationships (1.5 hrs)"),t(CAT.PRACTICE,"Build cross-source measure using relationship model (1 hr)"),t(CAT.REVIEW,"Week 6 summary; update cheatsheet (30 mins)")]),
      day(nd(),"Sat – Advanced Dashboard",[t(CAT.BUILD,"6-visual dashboard with KPIs, drill-through, slicers (1.5 hrs)"),t(CAT.BUILD,"Mobile layout + bookmarks for presentation mode (1 hr)"),t(CAT.REVIEW,"Publish to Power BI Service (free); share link (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"DAX flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: explore 1 Power BI Community showcase (20 mins)")]),
    ]},
    { id: "w7", label: "Week 7 – Excel Analytics", days: [
      day(nd(),"Mon – Pivot Tables",      [t(CAT.LEARN,"PivotTable: rows, columns, values, filters, slicers (1.5 hrs)"),t(CAT.PRACTICE,"Revenue by region × product; drill into sub-categories (1 hr)"),t(CAT.REVIEW,"Pivot table shortcut keys saved (30 mins)")]),
      day(nd(),"Tue – XLOOKUP",           [t(CAT.LEARN,"VLOOKUP limitations; XLOOKUP syntax, match mode, return array (1.5 hrs)"),t(CAT.PRACTICE,"Enrich order table with product details using XLOOKUP (1 hr)"),t(CAT.REVIEW,"VLOOKUP vs XLOOKUP comparison in notes (30 mins)")]),
      day(nd(),"Wed – INDEX/MATCH",       [t(CAT.LEARN,"INDEX(array,MATCH(…)) pattern; 2-way lookup (1.5 hrs)"),t(CAT.PRACTICE,"Dynamic lookup table using INDEX/MATCH (1 hr)"),t(CAT.REVIEW,"Formula cheatsheet updated (30 mins)")]),
      day(nd(),"Thu – Charts & Heatmaps", [t(CAT.LEARN,"Combo chart, sparklines, conditional formatting for heatmaps (1.5 hrs)"),t(CAT.PRACTICE,"Monthly sales heatmap + sparkline trend column (1 hr)"),t(CAT.REVIEW,"Screenshot examples for portfolio (30 mins)")]),
      day(nd(),"Fri – Excel + Power BI",  [t(CAT.LEARN,"Refresh Power BI from updated Excel; Power Pivot intro (1.5 hrs)"),t(CAT.PRACTICE,"Update Excel source data; verify Power BI auto-refreshes (1 hr)"),t(CAT.REVIEW,"Week 7 summary (30 mins)")]),
      day(nd(),"Sat – Excel Dashboard",   [t(CAT.BUILD,"Single-sheet Excel dashboard: pivot + charts + slicers (1.5 hrs)"),t(CAT.BUILD,"Dynamic title with cell refs; protect sheet; clean layout (1 hr)"),t(CAT.REVIEW,"Save as portfolio artefact (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Formula flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: ExcelJet.net — browse 5 new formulas (20 mins)")]),
    ]},
    { id: "w8", label: "Week 8 – Dashboard Projects", days: [
      day(nd(),"Mon – Storytelling",      [t(CAT.LEARN,"Cole Nussbaumer Knaflic framework; SCR structure for data (1.5 hrs)"),t(CAT.PRACTICE,"Critique 2 public dashboards: what works, what doesn't (1 hr)"),t(CAT.REVIEW,"Your 5 personal dashboard design rules (30 mins)")]),
      day(nd(),"Tue – Chart Selection",   [t(CAT.LEARN,"Comparison → bar; trend → line; part-of-whole → stacked/treemap (1.5 hrs)"),t(CAT.PRACTICE,"Redesign a confusing chart into a clearer alternative (1 hr)"),t(CAT.REVIEW,"Chart selection decision tree in notes (30 mins)")]),
      day(nd(),"Wed – Colour & Layout",   [t(CAT.LEARN,"Accessible colour palettes; alignment grid; whitespace (1.5 hrs)"),t(CAT.PRACTICE,"Restyle Week 5 dashboard with one consistent colour theme (1 hr)"),t(CAT.REVIEW,"Save your hex codes for reuse (30 mins)")]),
      day(nd(),"Thu – Insight Headlines", [t(CAT.LEARN,"Titles that say the insight, not describe the chart (1.5 hrs)"),t(CAT.PRACTICE,"Rewrite 5 chart titles as one-sentence insights (1 hr)"),t(CAT.REVIEW,"Collect 3 real headline examples from data journalism (30 mins)")]),
      day(nd(),"Fri – Executive Dashboard",[t(CAT.BUILD,"1-page exec summary: 4 KPIs + trend + breakdown (1.5 hrs)"),t(CAT.BUILD,"Write 3 written insights below the dashboard (1 hr)"),t(CAT.REVIEW,"Does it answer a decision? Check against business questions (30 mins)")]),
      day(nd(),"Sat – Portfolio Polish",  [t(CAT.BUILD,"Choose best dashboard; refine every detail (1.5 hrs)"),t(CAT.BUILD,"200-word project write-up; push to GitHub (1 hr)"),t(CAT.REVIEW,"Week 8 retrospective: Phase 1 halfway done! (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Plan weeks 9–10: Advanced SQL + End-to-End Project (20 mins)"),t(CAT.REVIEW,"Optional: Tableau Public browsing for design inspiration (30 mins)")]),
    ]},
    { id: "w9", label: "Week 9 – Advanced SQL", days: [
      day(nd(),"Mon – Recursive CTEs",    [t(CAT.LEARN,"Recursive CTE: anchor + recursive member; termination (1.5 hrs)"),t(CAT.PRACTICE,"Generate date spine; walk org hierarchy recursively (1 hr)"),t(CAT.REVIEW,"Trace recursion step-by-step with a small example (30 mins)")]),
      day(nd(),"Tue – Execution Plans",   [t(CAT.LEARN,"EXPLAIN / EXPLAIN ANALYZE; seq scan vs index scan (1.5 hrs)"),t(CAT.PRACTICE,"Profile 3 queries; find the most expensive operation (1 hr)"),t(CAT.REVIEW,"Note where indexes could help (30 mins)")]),
      day(nd(),"Wed – Indexing Deep Dive",[t(CAT.LEARN,"Composite indexes; covering index; index on expression (1.5 hrs)"),t(CAT.PRACTICE,"Add 2 indexes to your project DB; measure before/after (1 hr)"),t(CAT.REVIEW,"Indexing rules cheatsheet update (30 mins)")]),
      day(nd(),"Thu – Stored Procedures", [t(CAT.LEARN,"CREATE PROCEDURE; input params; error handling with TRY/CATCH (1.5 hrs)"),t(CAT.PRACTICE,"Monthly sales report as a stored procedure (1 hr)"),t(CAT.REVIEW,"When stored procs are useful vs overkill (30 mins)")]),
      day(nd(),"Fri – SQL Challenge",     [t(CAT.PRACTICE,"Solve 3 hard StrataScratch SQL problems (timed: 15 min each) (1.5 hrs)"),t(CAT.PRACTICE,"Review optimal solutions; understand alternative approaches (1 hr)"),t(CAT.REVIEW,"Advanced SQL week summary (30 mins)")]),
      day(nd(),"Sat – Performance Lab",   [t(CAT.BUILD,"Load 500K+ row dataset; write 5 optimised queries with indexes (1.5 hrs)"),t(CAT.BUILD,"Document query times + reasoning in README (1 hr)"),t(CAT.REVIEW,"GitHub push (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Advanced SQL flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: watch query optimisation video (45 mins)")]),
    ]},
    { id: "w10", label: "Week 10 – End-to-End Project", days: [
      day(nd(),"Mon – Project Setup",     [t(CAT.BUILD,"Pick dataset; define 5 questions; load to SQLite; first inspect (1.5 hrs)"),t(CAT.BUILD,"Data dictionary; row counts; null audit (1 hr)"),t(CAT.REVIEW,"Project brief in README draft (30 mins)")]),
      day(nd(),"Tue – Data Cleaning",     [t(CAT.BUILD,"SQL: fix nulls, duplicates, wrong types; CREATE VIEW cleaned_data (1.5 hrs)"),t(CAT.BUILD,"Log all cleaning decisions in a comment block (1 hr)"),t(CAT.REVIEW,"Is data now trustworthy? Sanity checks (30 mins)")]),
      day(nd(),"Wed – Analysis",          [t(CAT.BUILD,"5 analysis queries using CTEs + window functions (1.5 hrs)"),t(CAT.BUILD,"Find the most interesting insight; validate it (1 hr)"),t(CAT.REVIEW,"Document surprising findings (30 mins)")]),
      day(nd(),"Thu – Visualisation",     [t(CAT.BUILD,"Power BI report: 5 visuals answering your 5 questions (1.5 hrs)"),t(CAT.BUILD,"KPIs + insight headlines + consistent theme (1 hr)"),t(CAT.REVIEW,"Does dashboard answer the original questions? Verify. (30 mins)")]),
      day(nd(),"Fri – Write-up",          [t(CAT.BUILD,"1-page narrative: key findings + recommendations (1 hr)"),t(CAT.BUILD,"Slide deck or PDF summary for a stakeholder audience (1 hr)"),t(CAT.REVIEW,"Self-review checklist: clarity, accuracy, completeness (30 mins)")]),
      day(nd(),"Sat – Publish",           [t(CAT.BUILD,"GitHub: SQL + pbix + README + findings PDF (1.5 hrs)"),t(CAT.BUILD,"Record 3-min Loom walkthrough; embed in README (1 hr)"),t(CAT.REVIEW,"Share on LinkedIn (optional but recommended!) (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Reflect: what you're proud of + what to improve (20 mins)"),t(CAT.REVIEW,"Optional: plan storytelling week (15 mins)")]),
    ]},
    { id: "w11", label: "Week 11 – Data Storytelling", days: [
      day(nd(),"Mon – SCR Framework",     [t(CAT.LEARN,"Situation–Complication–Resolution for data presentations (1.5 hrs)"),t(CAT.PRACTICE,"Rewrite Week 10 findings using SCR structure (1 hr)"),t(CAT.REVIEW,"3 components of every data story — memorised (30 mins)")]),
      day(nd(),"Tue – Audience Targeting",[t(CAT.LEARN,"Adjusting depth: executive vs analyst vs engineer audience (1.5 hrs)"),t(CAT.PRACTICE,"Rewrite same insight for CEO vs data team (1 hr)"),t(CAT.REVIEW,"Pre-presentation checklist (30 mins)")]),
      day(nd(),"Wed – Slide Design",      [t(CAT.LEARN,"1 idea per slide; no chart junk; the assertion-evidence format (1.5 hrs)"),t(CAT.PRACTICE,"Redesign a cluttered slide into a clean version (1 hr)"),t(CAT.REVIEW,"3 good slide examples saved for reference (30 mins)")]),
      day(nd(),"Thu – Insight Headlines", [t(CAT.LEARN,"Headlines = the insight, not the chart description (1.5 hrs)"),t(CAT.PRACTICE,"Rewrite 6 generic titles as specific insight headlines (1 hr)"),t(CAT.REVIEW,"Headline formula template saved (30 mins)")]),
      day(nd(),"Fri – Mock Present",      [t(CAT.BUILD,"Present Week 10 project to yourself — record it (Loom/OBS) (1 hr)"),t(CAT.BUILD,"Watch back; write 3 specific improvements (1 hr)"),t(CAT.REVIEW,"Update slides based on review (30 mins)")]),
      day(nd(),"Sat – Storytelling Project",[t(CAT.BUILD,"New dashboard on fresh dataset — storytelling-first approach (1.5 hrs)"),t(CAT.BUILD,"Insight headlines + written recommendation section (1 hr)"),t(CAT.REVIEW,"Add to portfolio (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Read 1 data journalism article: FiveThirtyEight or The Pudding (30 mins)"),t(CAT.REVIEW,"Note 2 techniques you want to steal (10 mins)")]),
    ]},
    { id: "w12", label: "Week 12 – Portfolio Building", days: [
      day(nd(),"Mon – GitHub Profile",    [t(CAT.BUILD,"Tidy GitHub: profile README, bio, location, pinned repos (1.5 hrs)"),t(CAT.BUILD,"README template for data projects written (1 hr)"),t(CAT.REVIEW,"Review 3 strong analyst GitHub profiles for inspiration (30 mins)")]),
      day(nd(),"Tue – SQL Project Docs",  [t(CAT.BUILD,"README for SQL project: problem, method, queries, findings (1.5 hrs)"),t(CAT.BUILD,"Schema diagram + sample output screenshots added (1 hr)"),t(CAT.REVIEW,"Is it clear to someone with zero context? (30 mins)")]),
      day(nd(),"Wed – BI Project Docs",   [t(CAT.BUILD,"README for Power BI project; add Loom walkthrough link (1.5 hrs)"),t(CAT.BUILD,"Best dashboard screenshots for LinkedIn post (1 hr)"),t(CAT.REVIEW,"Both projects polished and linked (30 mins)")]),
      day(nd(),"Thu – LinkedIn",          [t(CAT.BUILD,"Update: headline 'Data Analyst | SQL | Power BI'; About section (1.5 hrs)"),t(CAT.BUILD,"Write 1 LinkedIn post about a project insight (1 hr)"),t(CAT.REVIEW,"Connect with 10 data professionals (30 mins)")]),
      day(nd(),"Fri – Portfolio Site",    [t(CAT.BUILD,"GitHub Pages or Notion portfolio: project cards + bio (1.5 hrs)"),t(CAT.BUILD,"Add project descriptions with problem, tools, outcome (1 hr)"),t(CAT.REVIEW,"Share link on LinkedIn (30 mins)")]),
      day(nd(),"Sat – Portfolio Review",  [t(CAT.BUILD,"Full audit: consistency, quality, 3 projects minimum (1.5 hrs)"),t(CAT.BUILD,"Add a 3rd project if needed (1 hr)"),t(CAT.REVIEW,"Peer feedback or self-grade (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Read job descriptions; note top skills required (30 mins)"),t(CAT.REVIEW,"Optional: career advice video for data analysts (20 mins)")]),
    ]},
    { id: "w13", label: "Week 13 – Job Applications", days: [
      day(nd(),"Mon – CV/Resume",         [t(CAT.BUILD,"1-page data analyst CV: action verbs, metrics, ATS-friendly (1.5 hrs)"),t(CAT.BUILD,"Tailor to a specific real job description (1 hr)"),t(CAT.REVIEW,"CV checklist: no photo, quantified achievements, clean format (30 mins)")]),
      day(nd(),"Tue – Cover Letter",      [t(CAT.BUILD,"Cover letter template: opening hook + project proof + close (1 hr)"),t(CAT.BUILD,"Customise for 2 specific job applications (1 hr)"),t(CAT.REVIEW,"Proofread; replace every generic phrase (30 mins)")]),
      day(nd(),"Wed – Job Boards",        [t(CAT.LEARN,"Best boards: LinkedIn Jobs, Indeed, Glassdoor, local tech boards (1 hr)"),t(CAT.BUILD,"Set up job alerts; create application tracker spreadsheet (1 hr)"),t(CAT.BUILD,"Apply to 3 positions with tailored materials (30 mins)")]),
      day(nd(),"Thu – LinkedIn Outreach", [t(CAT.BUILD,"Personalised connection request template written (1 hr)"),t(CAT.BUILD,"Reach out to 5 data analysts / hiring managers (1 hr)"),t(CAT.REVIEW,"Follow up on any pending applications (30 mins)")]),
      day(nd(),"Fri – Apply Day",         [t(CAT.BUILD,"Apply to 5 positions with tailored CVs + cover letters (1.5 hrs)"),t(CAT.BUILD,"Update application tracker (30 mins)"),t(CAT.REVIEW,"What skills appear most in JDs? Note gaps (30 mins)")]),
      day(nd(),"Sat – Portfolio + Apply", [t(CAT.BUILD,"Fix any portfolio gaps based on JD research (1.5 hrs)"),t(CAT.BUILD,"Apply to 3 more roles (1 hr)"),t(CAT.REVIEW,"Improve LinkedIn based on what's working (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Review application tracker status (15 mins)"),t(CAT.REVIEW,"Optional: practice 'Tell me about yourself' answer aloud (20 mins)")]),
    ]},
    { id: "w14", label: "Week 14 – Interview Prep I", days: [
      day(nd(),"Mon – Easy SQL Qs",       [t(CAT.PRACTICE,"5 easy SQL interview questions on StrataScratch — timed (1.5 hrs)"),t(CAT.PRACTICE,"Clean up solutions; add comments explaining logic (1 hr)"),t(CAT.REVIEW,"Patterns noted: GROUP BY + HAVING is most common (30 mins)")]),
      day(nd(),"Tue – Medium SQL Qs",     [t(CAT.PRACTICE,"5 medium LeetCode SQL problems (1.5 hrs)"),t(CAT.PRACTICE,"Review optimal solutions; understand why yours differs (1 hr)"),t(CAT.REVIEW,"Add tricky patterns to flashcards (30 mins)")]),
      day(nd(),"Wed – STAR Method",       [t(CAT.LEARN,"STAR: Situation, Task, Action, Result — framework + examples (1.5 hrs)"),t(CAT.PRACTICE,"Write STAR answers for 3 questions: project, conflict, achievement (1 hr)"),t(CAT.REVIEW,"Record yourself; note filler words and pacing (30 mins)")]),
      day(nd(),"Thu – Power BI Questions",[t(CAT.PRACTICE,"Research 15 common Power BI interview questions; write answers (1.5 hrs)"),t(CAT.PRACTICE,"Rebuild a dashboard from memory without notes (1 hr)"),t(CAT.REVIEW,"DAX flashcard review (30 mins)")]),
      day(nd(),"Fri – Take-home Test",    [t(CAT.PRACTICE,"Mock take-home: analyse a CSV + build report — 90 min timed (1.5 hrs)"),t(CAT.BUILD,"Write a short findings email as if to a hiring manager (1 hr)"),t(CAT.REVIEW,"Self-grade honestly against a senior analyst standard (30 mins)")]),
      day(nd(),"Sat – Mock Interview",    [t(CAT.PRACTICE,"Record full mock: 10 SQL + 5 behavioural questions (1.5 hrs)"),t(CAT.REVIEW,"Watch recording; 3 specific improvements identified (1 hr)"),t(CAT.BUILD,"Apply to 3 more roles (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Light SQL flashcard review (20 mins)"),t(CAT.REVIEW,"Optional: research the company you're interviewing with (30 mins)")]),
    ]},
    { id: "w15", label: "Week 15 – Interview Prep II", days: [
      day(nd(),"Mon – Hard SQL Qs",       [t(CAT.PRACTICE,"5 hard SQL problems: window functions + CTEs (timed) (1.5 hrs)"),t(CAT.PRACTICE,"Review & understand every solution fully (1 hr)"),t(CAT.REVIEW,"Flashcard update with new patterns (30 mins)")]),
      day(nd(),"Tue – Stats Basics",      [t(CAT.LEARN,"Mean, median, percentiles, std deviation, outliers (1.5 hrs)"),t(CAT.PRACTICE,"Calculate descriptive stats in SQL on a real dataset (1 hr)"),t(CAT.REVIEW,"Stats cheatsheet: interview-ready definitions (30 mins)")]),
      day(nd(),"Wed – A/B Testing",       [t(CAT.LEARN,"Hypothesis test, p-value, significance, Type I/II errors (1.5 hrs)"),t(CAT.PRACTICE,"Explain an A/B test result in plain English; write it out (1 hr)"),t(CAT.REVIEW,"Key point: you need concepts, not deep maths (30 mins)")]),
      day(nd(),"Thu – Business Cases",    [t(CAT.PRACTICE,"Answer: 'How would you measure success for Feature X?' (1.5 hrs)"),t(CAT.PRACTICE,"Answer: 'DAU dropped 20% — walk me through your investigation' (1 hr)"),t(CAT.REVIEW,"Framework: clarify → diagnose → recommend (30 mins)")]),
      day(nd(),"Fri – Mock Interview #2", [t(CAT.PRACTICE,"Full 60-min mock: SQL + business case + behavioural (1.5 hrs)"),t(CAT.REVIEW,"Score yourself; identify top 3 remaining weak spots (1 hr)"),t(CAT.BUILD,"Apply to 5 more roles (30 mins)")]),
      day(nd(),"Sat – Weak Spots Sprint", [t(CAT.PRACTICE,"Deep-dive your #1 weak area from yesterday's mock (1.5 hrs)"),t(CAT.BUILD,"Apply to 5 more roles with tailored CVs (1 hr)"),t(CAT.REVIEW,"Application tracker update (30 mins)")]),
      day(nd(),"Sun – Rest Day",          [t(CAT.REVIEW,"Company research template for upcoming interviews (20 mins)"),t(CAT.REVIEW,"Optional: data analyst career blog post (20 mins)")]),
    ]},
    { id: "w16", label: "Week 16 – Final Push", days: [
      day(nd(),"Mon – SQL Final Test",    [t(CAT.PRACTICE,"Timed SQL test: 10 questions, 45 minutes, no help (1.5 hrs)"),t(CAT.REVIEW,"Grade every answer; review wrong ones deeply (1 hr)"),t(CAT.REVIEW,"Final flashcard round (30 mins)")]),
      day(nd(),"Tue – Portfolio Final",   [t(CAT.BUILD,"Final portfolio audit: all links work, screenshots clear (1.5 hrs)"),t(CAT.BUILD,"LinkedIn: latest portfolio projects added; headline updated (1 hr)"),t(CAT.REVIEW,"Ask someone to review and give honest feedback (30 mins)")]),
      day(nd(),"Wed – BI Final Challenge",[t(CAT.PRACTICE,"Build a dashboard from scratch on a new dataset — 90 min timed (1.5 hrs)"),t(CAT.REVIEW,"Compare quality vs Week 5 dashboard — see your growth (1 hr)"),t(CAT.REVIEW,"Save as final portfolio piece (30 mins)")]),
      day(nd(),"Thu – Apply Hard",        [t(CAT.BUILD,"Apply to 10 jobs today with tailored materials (1.5 hrs)"),t(CAT.BUILD,"Follow-up emails to all pending applications (1 hr)"),t(CAT.REVIEW,"Tracker updated; note next steps for each (30 mins)")]),
      day(nd(),"Fri – Final Simulation",  [t(CAT.PRACTICE,"60-min mock interview: all question types, no pauses (1.5 hrs)"),t(CAT.REVIEW,"Debrief notes (1 hr)"),t(CAT.REVIEW,"You're ready. Review your full journey from Week 1. (30 mins)")]),
      day(nd(),"Sat – Celebrate & Plan",  [t(CAT.BUILD,"Phase 1 retrospective: document everything you learned (1.5 hrs)"),t(CAT.BUILD,"Plan Phase 2 start date + new daily study routine (1 hr)"),t(CAT.REVIEW,"🎉 You completed Phase 1. Celebrate properly! (30 mins)")]),
      day(nd(),"Sun – True Rest Day",     [t(CAT.REVIEW,"No study today. Seriously. You earned full rest."),t(CAT.REVIEW,"Optional: get excited about Phase 2 – Data Engineering 🚀")]),
    ]},
  ];
}

function makePhase2() {
  return [
    { id:"p2m1", label:"Month 1 – Python Basics", days:[
      day(113,"Mon – Python Setup",      [t(CAT.LEARN,"Install Python + VS Code; variables, types, print(), f-strings (1.5 hrs)"),t(CAT.PRACTICE,"10 small scripts: maths, strings, conditionals (1 hr)"),t(CAT.REVIEW,"Python vs SQL syntax differences cheatsheet (30 mins)")]),
      day(114,"Tue – Loops & Functions", [t(CAT.LEARN,"for/while loops; def functions; return; *args/**kwargs (1.5 hrs)"),t(CAT.PRACTICE,"FizzBuzz; 5 reusable functions: clean_text, calc_tax, etc. (1 hr)"),t(CAT.REVIEW,"Function design principles noted (30 mins)")]),
      day(115,"Wed – Lists & Dicts",     [t(CAT.LEARN,"Lists, dicts, sets, tuples; list comprehensions (1.5 hrs)"),t(CAT.PRACTICE,"Process a list of sales records with comprehensions (1 hr)"),t(CAT.REVIEW,"Data structure cheatsheet (30 mins)")]),
      day(116,"Thu – File I/O",          [t(CAT.LEARN,"Read/write CSV + JSON with open() and csv/json modules (1.5 hrs)"),t(CAT.PRACTICE,"Read CSV, filter rows by condition, write output to new file (1 hr)"),t(CAT.REVIEW,"File handling pattern documented (30 mins)")]),
      day(117,"Fri – Error Handling",    [t(CAT.LEARN,"try/except/finally; common exceptions; raising errors (1.5 hrs)"),t(CAT.PRACTICE,"Add error handling to your file I/O script (1 hr)"),t(CAT.REVIEW,"Error handling cheatsheet (30 mins)")]),
      day(118,"Sat – Pandas Intro",      [t(CAT.BUILD,"Install pandas; read_csv, head, info, describe, dtypes (1.5 hrs)"),t(CAT.BUILD,"Explore a Kaggle dataset: shape, nulls, value_counts (1 hr)"),t(CAT.REVIEW,"DataFrame ≈ SQL table — compare in notes (30 mins)")]),
      day(119,"Sun – Rest & Review",     [t(CAT.REVIEW,"Python flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: Python for Everybody — 1 chapter (45 mins)")]),
    ]},
    { id:"p2m2", label:"Month 2 – Advanced Pandas", days:[
      day(120,"Mon – Pandas Filtering",  [t(CAT.LEARN,"Boolean indexing, .loc[], .iloc[], .query() (1.5 hrs)"),t(CAT.PRACTICE,"Filter 100K row dataset: multiple conditions, ranges (1 hr)"),t(CAT.REVIEW,"Pandas filter vs SQL WHERE (30 mins)")]),
      day(121,"Tue – GroupBy & Agg",     [t(CAT.LEARN,"groupby().agg(); named aggregations; transform(); apply() (1.5 hrs)"),t(CAT.PRACTICE,"Revenue by region, avg order per customer, top-5 products (1 hr)"),t(CAT.REVIEW,"GroupBy vs SQL GROUP BY comparison (30 mins)")]),
      day(122,"Wed – Merge & Concat",    [t(CAT.LEARN,"pd.merge() with how; pd.concat(); handling duplicate columns (1.5 hrs)"),t(CAT.PRACTICE,"Join 3 DataFrames: orders + customers + products (1 hr)"),t(CAT.REVIEW,"Merge vs SQL JOIN comparison table (30 mins)")]),
      day(123,"Thu – Data Cleaning",     [t(CAT.LEARN,"fillna, dropna, astype, str.strip, duplicated, replace (1.5 hrs)"),t(CAT.PRACTICE,"End-to-end cleaning pipeline on a messy dataset (1 hr)"),t(CAT.REVIEW,"Cleaning pipeline checklist (30 mins)")]),
      day(124,"Fri – Pivot & Melt",      [t(CAT.LEARN,"pivot_table(); melt(); reshape use cases (1.5 hrs)"),t(CAT.PRACTICE,"Reshape wide dataset to long format for Power BI (1 hr)"),t(CAT.REVIEW,"Cheatsheet updated (30 mins)")]),
      day(125,"Sat – Pandas Project",    [t(CAT.BUILD,"End-to-end: ingest CSV → clean → analyse → export (1.5 hrs)"),t(CAT.BUILD,"Jupyter notebook pushed to GitHub with README (1 hr)"),t(CAT.REVIEW,"Note: this is your first Python portfolio project (30 mins)")]),
      day(126,"Sun – Rest & Review",     [t(CAT.REVIEW,"Pandas flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: NumPy array basics — 1 short tutorial (30 mins)")]),
    ]},
    { id:"p2m3", label:"Month 3 – SQL + Python", days:[
      day(127,"Mon – SQLAlchemy",        [t(CAT.LEARN,"create_engine(); connect to SQLite + Postgres (1.5 hrs)"),t(CAT.PRACTICE,"Run SELECT queries from Python; load results to DataFrame (1 hr)"),t(CAT.REVIEW,"Python ↔ DB data flow diagram (30 mins)")]),
      day(128,"Tue – pd.read_sql",       [t(CAT.LEARN,"pd.read_sql(); parameterised queries; SQL injection risks (1.5 hrs)"),t(CAT.PRACTICE,"Function that takes params + returns filtered DataFrame (1 hr)"),t(CAT.REVIEW,"Parameterised query pattern saved (30 mins)")]),
      day(129,"Wed – Writing to DB",     [t(CAT.LEARN,"df.to_sql(); if_exists replace/append; dtype mapping (1.5 hrs)"),t(CAT.PRACTICE,"Clean CSV in Pandas → write result to Postgres table (1 hr)"),t(CAT.REVIEW,"Note upsert patterns for ETL (30 mins)")]),
      day(130,"Thu – Automation",        [t(CAT.LEARN,"Schedule Python with cron (Linux) or Task Scheduler (Windows) (1.5 hrs)"),t(CAT.PRACTICE,"Automate daily SQL summary → save CSV + email (1 hr)"),t(CAT.REVIEW,"Script documentation written (30 mins)")]),
      day(131,"Fri – Python + Power BI", [t(CAT.LEARN,"Python script as Power BI data source; limitations (1.5 hrs)"),t(CAT.PRACTICE,"Run Pandas cleaning inside Power BI; refresh report (1 hr)"),t(CAT.REVIEW,"Python vs Power Query decision guide (30 mins)")]),
      day(132,"Sat – SQL+Python Project",[t(CAT.BUILD,"Python: query DB → clean → save report CSV (1.5 hrs)"),t(CAT.BUILD,"GitHub push + usage README (1 hr)"),t(CAT.REVIEW,"Reflect: this is your first mini-pipeline! (30 mins)")]),
      day(133,"Sun – Rest & Review",     [t(CAT.REVIEW,"SQL + Python flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: read about ETL design patterns (30 mins)")]),
    ]},
    { id:"p2m4", label:"Month 4 – ETL Foundations", days:[
      day(134,"Mon – ETL Concepts",      [t(CAT.LEARN,"ETL vs ELT; batch vs streaming; pipeline architecture patterns (1.5 hrs)"),t(CAT.PRACTICE,"Diagram your Phase 1 SQL project as an ETL pipeline (1 hr)"),t(CAT.REVIEW,"ETL vocabulary: source, sink, transform, lineage (30 mins)")]),
      day(135,"Tue – Extract Layer",     [t(CAT.LEARN,"Extract from CSV, JSON, REST API, database (1.5 hrs)"),t(CAT.PRACTICE,"Write extractors for 3 sources: CSV + JSON + public API (1 hr)"),t(CAT.REVIEW,"Error handling: what if source is unavailable? (30 mins)")]),
      day(136,"Wed – Transform Layer",   [t(CAT.LEARN,"Validation, type casting, business rules, normalisation (1.5 hrs)"),t(CAT.PRACTICE,"transform() function with 5 cleaning + enrichment rules (1 hr)"),t(CAT.REVIEW,"Idempotency: transformations must be re-runnable (30 mins)")]),
      day(137,"Thu – Load Layer",        [t(CAT.LEARN,"Full replace vs incremental vs upsert load strategies (1.5 hrs)"),t(CAT.PRACTICE,"Incremental load using last_updated timestamp (1 hr)"),t(CAT.REVIEW,"Incremental load pattern cheatsheet (30 mins)")]),
      day(138,"Fri – Logging",           [t(CAT.LEARN,"Python logging module: levels, file handler, format string (1.5 hrs)"),t(CAT.PRACTICE,"Add structured logging + error handling to ETL script (1 hr)"),t(CAT.REVIEW,"Why logging is critical in production (30 mins)")]),
      day(139,"Sat – ETL Project",       [t(CAT.BUILD,"Complete ETL: CSV → transform → SQLite with logging (1.5 hrs)"),t(CAT.BUILD,"Config file; error handling; GitHub push (1 hr)"),t(CAT.REVIEW,"README: how to run, what it does (30 mins)")]),
      day(140,"Sun – Rest & Review",     [t(CAT.REVIEW,"ETL concepts flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: read Airflow intro docs (30 mins)")]),
    ]},
    { id:"p2m5", label:"Month 5 – Apache Airflow", days:[
      day(141,"Mon – Airflow Concepts",  [t(CAT.LEARN,"DAGs, tasks, operators, scheduler, executor — mental model (1.5 hrs)"),t(CAT.PRACTICE,"Install Airflow with Docker; open UI; explore example DAGs (1 hr)"),t(CAT.REVIEW,"Airflow vocabulary cheatsheet (30 mins)")]),
      day(142,"Tue – First DAG",         [t(CAT.LEARN,"Write DAG with PythonOperator: 3 sequential tasks (1.5 hrs)"),t(CAT.PRACTICE,"Trigger DAG manually; view task logs (1 hr)"),t(CAT.REVIEW,"DAG anatomy: connections in notes (30 mins)")]),
      day(143,"Wed – Scheduling",        [t(CAT.LEARN,"cron expressions; @daily/@hourly; backfill concept (1.5 hrs)"),t(CAT.PRACTICE,"Schedule ETL DAG to run nightly; test backfill (1 hr)"),t(CAT.REVIEW,"Cron expression cheatsheet (30 mins)")]),
      day(144,"Thu – Task Dependencies", [t(CAT.LEARN,">> operator; BranchPythonOperator; XCom basics (1.5 hrs)"),t(CAT.PRACTICE,"DAG with conditional branch: success vs failure path (1 hr)"),t(CAT.REVIEW,"Draw your DAG graph in notes (30 mins)")]),
      day(145,"Fri – Monitoring",        [t(CAT.LEARN,"SLA misses; retry config; on_failure_callback; email alerts (1.5 hrs)"),t(CAT.PRACTICE,"Configure email alert for a failing task (1 hr)"),t(CAT.REVIEW,"Production Airflow checklist (30 mins)")]),
      day(146,"Sat – Airflow Pipeline",  [t(CAT.BUILD,"Migrate Month 4 ETL into proper Airflow DAG (1.5 hrs)"),t(CAT.BUILD,"Schedule + retry + alert configured; GitHub push (1 hr)"),t(CAT.REVIEW,"Document the DAG (30 mins)")]),
      day(147,"Sun – Rest & Review",     [t(CAT.REVIEW,"Airflow flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: watch Airflow tutorial video (45 mins)")]),
    ]},
    { id:"p2m6", label:"Month 6 – APIs & Ingestion", days:[
      day(148,"Mon – REST API Basics",   [t(CAT.LEARN,"HTTP methods, status codes, headers, JSON response structure (1.5 hrs)"),t(CAT.PRACTICE,"Call OpenWeather or CoinGecko API with requests library (1 hr)"),t(CAT.REVIEW,"API response fields you'd store in a DB (30 mins)")]),
      day(149,"Tue – Pagination",        [t(CAT.LEARN,"Page-based vs cursor pagination; rate limits; backoff (1.5 hrs)"),t(CAT.PRACTICE,"Paginate all results from an API into a list (1 hr)"),t(CAT.REVIEW,"Rate limit pattern: time.sleep() + retry (30 mins)")]),
      day(150,"Wed – Auth & Secrets",    [t(CAT.LEARN,"API key auth; OAuth 2.0 flow; .env + python-dotenv (1.5 hrs)"),t(CAT.PRACTICE,"Authenticate to protected API; secrets in .env file only (1 hr)"),t(CAT.REVIEW,"Never hardcode secrets — rule written in bold (30 mins)")]),
      day(151,"Thu – API to Database",   [t(CAT.LEARN,"Full flow: API → DataFrame → Postgres (1.5 hrs)"),t(CAT.PRACTICE,"Ingest daily weather data from API into DB table (1 hr)"),t(CAT.REVIEW,"Incremental: only fetch records newer than last run (30 mins)")]),
      day(152,"Fri – Webhook Basics",    [t(CAT.LEARN,"Push vs pull; webhook concept; Flask endpoint as receiver (1.5 hrs)"),t(CAT.PRACTICE,"Flask endpoint: receive and log webhook JSON payload (1 hr)"),t(CAT.REVIEW,"Webhooks vs polling: tradeoffs (30 mins)")]),
      day(153,"Sat – API Pipeline",      [t(CAT.BUILD,"Airflow DAG: pull API daily → process → load to DB (1.5 hrs)"),t(CAT.BUILD,"Handle errors, retries, duplicates; GitHub push (1 hr)"),t(CAT.REVIEW,"README + architecture notes (30 mins)")]),
      day(154,"Sun – Rest & Review",     [t(CAT.REVIEW,"API patterns flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: explore a new public API documentation (30 mins)")]),
    ]},
    { id:"p2m7", label:"Month 7 – AWS S3 & IAM", days:[
      day(155,"Mon – AWS Account",       [t(CAT.LEARN,"Free-tier AWS account; console tour; set billing alert (1.5 hrs)"),t(CAT.PRACTICE,"Create S3 bucket; upload + download a file manually (1 hr)"),t(CAT.REVIEW,"AWS regions, AZs, global infrastructure basics (30 mins)")]),
      day(156,"Tue – S3 Deep Dive",      [t(CAT.LEARN,"Storage classes; versioning; lifecycle policies; bucket policy JSON (1.5 hrs)"),t(CAT.PRACTICE,"Enable versioning; create lifecycle rule → Glacier after 90 days (1 hr)"),t(CAT.REVIEW,"S3 cost optimisation tips (30 mins)")]),
      day(157,"Wed – IAM",               [t(CAT.LEARN,"Users, groups, roles, policies; least privilege principle (1.5 hrs)"),t(CAT.PRACTICE,"Create IAM role with S3 read-only policy; test access (1 hr)"),t(CAT.REVIEW,"IAM security best practices checklist (30 mins)")]),
      day(158,"Thu – boto3",             [t(CAT.LEARN,"Install boto3; upload, download, list, delete with Python (1.5 hrs)"),t(CAT.PRACTICE,"Script: upload processed CSV to S3 from Python pipeline (1 hr)"),t(CAT.REVIEW,"boto3 S3 cheatsheet (30 mins)")]),
      day(159,"Fri – Data Lake Design",  [t(CAT.LEARN,"Data lake concept; S3 folder structure; year/month/day partitioning (1.5 hrs)"),t(CAT.PRACTICE,"Reorganise files in S3 with proper partition structure (1 hr)"),t(CAT.REVIEW,"Data lake vs data warehouse explained (30 mins)")]),
      day(160,"Sat – S3 Pipeline",       [t(CAT.BUILD,"Airflow: API pull → process → upload to S3 with partitions (1.5 hrs)"),t(CAT.BUILD,"Handle overwrites; GitHub + architecture diagram (1 hr)"),t(CAT.REVIEW,"Update portfolio README (30 mins)")]),
      day(161,"Sun – Rest & Review",     [t(CAT.REVIEW,"AWS flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: AWS free-tier documentation (20 mins)")]),
    ]},
    { id:"p2m8", label:"Month 8 – Lambda & RDS", days:[
      day(162,"Mon – Lambda Concepts",   [t(CAT.LEARN,"Serverless; Lambda: triggers, runtime, memory, timeout limits (1.5 hrs)"),t(CAT.PRACTICE,"Hello World Lambda in AWS console (Python 3.x runtime) (1 hr)"),t(CAT.REVIEW,"Lambda vs EC2: when to use each (30 mins)")]),
      day(163,"Tue – Lambda Triggers",   [t(CAT.LEARN,"S3 event trigger; API Gateway; CloudWatch scheduled rule (1.5 hrs)"),t(CAT.PRACTICE,"S3 trigger: Lambda fires when file uploaded to bucket (1 hr)"),t(CAT.REVIEW,"Event-driven architecture basics (30 mins)")]),
      day(164,"Wed – Lambda + Python",   [t(CAT.LEARN,"Packaging dependencies; Lambda layers; environment variables (1.5 hrs)"),t(CAT.PRACTICE,"Lambda: read S3 file → Pandas transform → save output (1 hr)"),t(CAT.REVIEW,"Cold start + timeout best practices (30 mins)")]),
      day(165,"Thu – RDS Setup",         [t(CAT.LEARN,"RDS: managed Postgres; instance types, storage, backups (1.5 hrs)"),t(CAT.PRACTICE,"Launch free-tier RDS Postgres; connect via DBeaver (1 hr)"),t(CAT.REVIEW,"RDS vs self-managed Postgres tradeoffs (30 mins)")]),
      day(166,"Fri – Lambda → RDS",      [t(CAT.LEARN,"Lambda in VPC; security groups; RDS connection from Lambda (1.5 hrs)"),t(CAT.PRACTICE,"Lambda: read S3 → transform → write to RDS table (1 hr)"),t(CAT.REVIEW,"VPC + security group rules diagram (30 mins)")]),
      day(167,"Sat – Serverless Project",[t(CAT.BUILD,"Full serverless pipeline: S3 upload → Lambda → RDS (1.5 hrs)"),t(CAT.BUILD,"CloudWatch logs; test with real data; architecture diagram (1 hr)"),t(CAT.REVIEW,"GitHub push + README (30 mins)")]),
      day(168,"Sun – Rest & Review",     [t(CAT.REVIEW,"Lambda + RDS flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: AWS Lambda pricing calculator (20 mins)")]),
    ]},
    { id:"p2m9", label:"Month 9 – Glue & Athena", days:[
      day(169,"Mon – Glue Concepts",     [t(CAT.LEARN,"Glue: crawlers, Data Catalog, ETL jobs, Glue Studio (1.5 hrs)"),t(CAT.PRACTICE,"Run Glue crawler on S3 bucket to auto-detect schema (1 hr)"),t(CAT.REVIEW,"Glue Catalog = managed Hive metastore (30 mins)")]),
      day(170,"Tue – Glue ETL Jobs",     [t(CAT.LEARN,"Glue ETL: PySpark vs Python shell; DynamicFrame vs DataFrame (1.5 hrs)"),t(CAT.PRACTICE,"Glue job: read CSV from S3, transform, write Parquet (1 hr)"),t(CAT.REVIEW,"Parquet benefits vs CSV (30 mins)")]),
      day(171,"Wed – Amazon Athena",     [t(CAT.LEARN,"Athena: serverless SQL over S3; pricing per TB scanned (1.5 hrs)"),t(CAT.PRACTICE,"Query Parquet files with Athena SQL (1 hr)"),t(CAT.REVIEW,"Optimise Athena: partition pruning + columnar format (30 mins)")]),
      day(172,"Thu – Full Pipeline",     [t(CAT.LEARN,"End-to-end: Glue crawl → ETL → Athena query (1.5 hrs)"),t(CAT.PRACTICE,"Build the full pipeline on your dataset (1 hr)"),t(CAT.REVIEW,"Cost estimate: monthly run cost in USD (30 mins)")]),
      day(173,"Fri – QuickSight",        [t(CAT.LEARN,"AWS QuickSight: connect to Athena; build a visual (1.5 hrs)"),t(CAT.PRACTICE,"QuickSight dashboard from your Athena data (1 hr)"),t(CAT.REVIEW,"QuickSight vs Power BI: when to choose each (30 mins)")]),
      day(174,"Sat – AWS Project",       [t(CAT.BUILD,"Full stack: S3 → Glue → Athena → QuickSight (1.5 hrs)"),t(CAT.BUILD,"Architecture diagram + GitHub README (1 hr)"),t(CAT.REVIEW,"This is a real DE portfolio project. Polish it. (30 mins)")]),
      day(175,"Sun – Rest & Review",     [t(CAT.REVIEW,"AWS analytics flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: AWS Glue tutorial video (45 mins)")]),
    ]},
    { id:"p2m10", label:"Month 10 – Docker", days:[
      day(176,"Mon – Docker Concepts",   [t(CAT.LEARN,"Containers vs VMs; image, container, registry; why Docker for DE (1.5 hrs)"),t(CAT.PRACTICE,"Install Docker Desktop; run hello-world; pull postgres image (1 hr)"),t(CAT.REVIEW,"Container benefits for reproducible pipelines (30 mins)")]),
      day(177,"Tue – Dockerfile",        [t(CAT.LEARN,"FROM, RUN, COPY, CMD, ENV, EXPOSE instructions (1.5 hrs)"),t(CAT.PRACTICE,"Containerise your Month 4 ETL Python script (1 hr)"),t(CAT.REVIEW,"Image layers and build cache explained (30 mins)")]),
      day(178,"Wed – Docker Compose",    [t(CAT.LEARN,"docker-compose.yml: services, volumes, networks, depends_on (1.5 hrs)"),t(CAT.PRACTICE,"Compose: Postgres + Airflow + ETL container (1 hr)"),t(CAT.REVIEW,"Compose vs Kubernetes scope (30 mins)")]),
      day(179,"Thu – Volumes & Networks",[t(CAT.LEARN,"Persistent volumes; bridge networks; service discovery (1.5 hrs)"),t(CAT.PRACTICE,"Mount volume: DB data persists after container restart (1 hr)"),t(CAT.REVIEW,"Data persistence patterns in containerised pipelines (30 mins)")]),
      day(180,"Fri – GitHub Actions",    [t(CAT.LEARN,"CI/CD: GitHub Actions build + test + push Docker image (1.5 hrs)"),t(CAT.PRACTICE,"Action that builds and tests your ETL container on push (1 hr)"),t(CAT.REVIEW,"Why CI/CD matters for data pipelines (30 mins)")]),
      day(181,"Sat – Docker Project",    [t(CAT.BUILD,"Fully dockerised: Airflow + Postgres + ETL (Docker Compose) (1.5 hrs)"),t(CAT.BUILD,"Test cold-start: fresh machine, does it work? (1 hr)"),t(CAT.REVIEW,"GitHub + setup docs (30 mins)")]),
      day(182,"Sun – Rest & Review",     [t(CAT.REVIEW,"Docker flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: explore Docker Hub for DE images (20 mins)")]),
    ]},
    { id:"p2m11", label:"Month 11 – Apache Spark", days:[
      day(183,"Mon – Spark Architecture",[t(CAT.LEARN,"Driver, executors, cluster manager; RDD vs DataFrame (1.5 hrs)"),t(CAT.PRACTICE,"Install PySpark locally; first SparkSession + read CSV (1 hr)"),t(CAT.REVIEW,"When Spark beats Pandas: data size threshold rules (30 mins)")]),
      day(184,"Tue – PySpark DataFrames",[t(CAT.LEARN,"select, filter, withColumn, groupBy, agg, join operations (1.5 hrs)"),t(CAT.PRACTICE,"Replicate Month 2 Pandas analysis in PySpark (1 hr)"),t(CAT.REVIEW,"API differences: PySpark vs Pandas (30 mins)")]),
      day(185,"Wed – Spark SQL",         [t(CAT.LEARN,"createTempView; spark.sql(); explain plans; Catalyst optimiser (1.5 hrs)"),t(CAT.PRACTICE,"Complex window function queries in Spark SQL (1 hr)"),t(CAT.REVIEW,"How Catalyst optimises your query (30 mins)")]),
      day(186,"Thu – Spark + S3",        [t(CAT.LEARN,"Read/write Parquet from S3 with PySpark; Hadoop S3A config (1.5 hrs)"),t(CAT.PRACTICE,"PySpark job: read 1M rows from S3, transform, write Parquet (1 hr)"),t(CAT.REVIEW,"Parquet partitioning strategies for S3 (30 mins)")]),
      day(187,"Fri – Spark Streaming",   [t(CAT.LEARN,"Structured Streaming: micro-batch vs continuous; triggers (1.5 hrs)"),t(CAT.PRACTICE,"Socket stream → filter → console sink (1 hr)"),t(CAT.REVIEW,"Streaming vs batch: when to choose each (30 mins)")]),
      day(188,"Sat – Spark Project",     [t(CAT.BUILD,"PySpark pipeline: large CSV from S3 → transform → Parquet (1.5 hrs)"),t(CAT.BUILD,"GitHub push; compare speed vs Pandas equivalent (1 hr)"),t(CAT.REVIEW,"Document partitioning choices (30 mins)")]),
      day(189,"Sun – Rest & Review",     [t(CAT.REVIEW,"PySpark flashcard review (30 mins)"),t(CAT.REVIEW,"Optional: Databricks community edition exploration (45 mins)")]),
    ]},
    { id:"p2m12", label:"Month 12 – Warehousing & Capstone", days:[
      day(190,"Mon – DWH Concepts",      [t(CAT.LEARN,"OLAP vs OLTP; dimensional modelling; fact vs dimension tables (1.5 hrs)"),t(CAT.PRACTICE,"Design star schema for e-commerce dataset on paper (1 hr)"),t(CAT.REVIEW,"Star schema vs snowflake schema tradeoffs (30 mins)")]),
      day(191,"Tue – Redshift/BigQuery", [t(CAT.LEARN,"Redshift: columnar storage, distribution styles, sort keys (1.5 hrs)"),t(CAT.PRACTICE,"Load data to Redshift or BigQuery sandbox; run analytical query (1 hr)"),t(CAT.REVIEW,"Cost model: Redshift vs BigQuery vs Snowflake (30 mins)")]),
      day(192,"Wed – dbt Intro",         [t(CAT.LEARN,"dbt: models, sources, tests, docs; ref() function (1.5 hrs)"),t(CAT.PRACTICE,"Set up dbt project; first model: raw → staging (1 hr)"),t(CAT.REVIEW,"dbt vs stored procedures: why dbt wins (30 mins)")]),
      day(193,"Thu – dbt Models",        [t(CAT.LEARN,"Staging → mart pattern; schema tests; dbt docs generate (1.5 hrs)"),t(CAT.PRACTICE,"Build staging + fact + 2 dim models for your dataset (1 hr)"),t(CAT.REVIEW,"Serve dbt docs locally; verify lineage graph (30 mins)")]),
      day(194,"Fri – Capstone Planning", [t(CAT.BUILD,"Define capstone: full DE pipeline with real dataset (1.5 hrs)"),t(CAT.BUILD,"Architecture diagram: source → ingest → transform → DWH → BI (1 hr)"),t(CAT.REVIEW,"Scope: realistically buildable in 2 weekend sessions (30 mins)")]),
      day(195,"Sat – Capstone Day 1",    [t(CAT.BUILD,"Ingestion layer: API/CSV → S3 via Airflow or Lambda (1.5 hrs)"),t(CAT.BUILD,"Transformation layer: Spark or dbt; commit WIP (1 hr)"),t(CAT.REVIEW,"README first draft (30 mins)")]),
      day(196,"Sun – Capstone Day 2",    [t(CAT.BUILD,"Load to warehouse; Power BI or QuickSight dashboard (1.5 hrs)"),t(CAT.BUILD,"Full README; Loom walkthrough; GitHub push (1 hr)"),t(CAT.REVIEW,"🎉 Phase 2 complete — you are now a Data Engineer! (30 mins)")]),
    ]},
  ];
}

const roadmapData = {
  phases: [
    { id:"phase1", label:"Phase 1: Data Analyst",  shortLabel:"Analyst",  duration:"16 Weeks",  color:"indigo",  weeks:makePhase1() },
    { id:"phase2", label:"Phase 2: Data Engineer", shortLabel:"Engineer", duration:"12 Months", color:"emerald", weeks:makePhase2() },
  ],
};

// ─── STORAGE HOOK ─────────────────────────────────────────────────
const STORAGE_KEY = "datapath_v3";
function useProgress() {
  const [progress, setProgress] = useState(() => {
    try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : {}; }
    catch { return {}; }
  });
  const toggleTask = useCallback((id) => {
    setProgress(prev => { const n = {...prev,[id]:!prev[id]}; localStorage.setItem(STORAGE_KEY,JSON.stringify(n)); return n; });
  },[]);
  const resetProgress = useCallback(() => { localStorage.removeItem(STORAGE_KEY); setProgress({}); },[]);
  return { progress, toggleTask, resetProgress };
}

// ─── STATS ───────────────────────────────────────────────────────
const calcStats = (tasks, progress) => {
  const total = tasks.length, done = tasks.filter(t=>progress[t.id]).length;
  return { total, done, pct: total ? Math.round(done/total*100) : 0 };
};
const weekStats  = (week,  progress) => calcStats(week.days.flatMap(d=>d.tasks), progress);
const phaseStats = (phase, progress) => calcStats(phase.weeks.flatMap(w=>w.days.flatMap(d=>d.tasks)), progress);
const overallStats = (progress) => calcStats(roadmapData.phases.flatMap(p=>p.weeks.flatMap(w=>w.days.flatMap(d=>d.tasks))), progress);

// ─── UI COMPONENTS ───────────────────────────────────────────────
function ProgressBar({ pct, color="indigo", size="md" }) {
  const h = {sm:"h-1.5",md:"h-2",lg:"h-3"}[size];
  const c = {indigo:"bg-indigo-500",emerald:"bg-emerald-500",amber:"bg-amber-400"}[color]||"bg-indigo-500";
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${h}`}>
      <div className={`${c} ${h} rounded-full transition-all duration-500`} style={{width:`${pct}%`}}/>
    </div>
  );
}

const CAT_STYLE = {
  [CAT.LEARN]:    "bg-indigo-50 text-indigo-700 border border-indigo-100",
  [CAT.PRACTICE]: "bg-violet-50 text-violet-700 border border-violet-100",
  [CAT.BUILD]:    "bg-amber-50 text-amber-700 border border-amber-100",
  [CAT.REVIEW]:   "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

function TaskRow({ task, checked, onToggle }) {
  return (
    <label className="flex items-start gap-3 py-2.5 px-1 group cursor-pointer hover:bg-gray-50 rounded-xl transition-colors">
      <div className="mt-0.5 flex-shrink-0">
        <input type="checkbox" checked={checked} onChange={()=>onToggle(task.id)} className="sr-only"/>
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150
          ${checked?"bg-indigo-500 border-indigo-500":"border-gray-300 group-hover:border-indigo-300"}`}>
          {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full self-start ${CAT_STYLE[task.category]||"bg-gray-100 text-gray-600"}`}>{task.category}</span>
        <span className={`text-sm leading-snug ${checked?"line-through text-gray-400":"text-gray-700"}`}>{task.label}</span>
      </div>
    </label>
  );
}

function DayCard({ day, progress, toggleTask }) {
  const tasks = day.tasks;
  const done = tasks.filter(t=>progress[t.id]).length;
  const allDone = done === tasks.length;
  const isRest = day.title.startsWith("Sun");
  return (
    <div className={`rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow
      ${allDone?"border-emerald-200":isRest?"border-gray-100 opacity-80":"border-gray-100"}`}>
      <div className={`px-4 py-3.5 border-b rounded-t-2xl flex items-center justify-between gap-2
        ${allDone?"border-emerald-100 bg-emerald-50/50":"border-gray-50"}`}>
        <h3 className="text-sm font-semibold text-gray-800 truncate flex-1">{day.title}</h3>
        {allDone
          ? <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">✓ Done</span>
          : <span className="text-xs text-gray-400 tabular-nums flex-shrink-0">{done}/{tasks.length}</span>
        }
      </div>
      <div className="px-4 pt-3"><ProgressBar pct={Math.round(done/tasks.length*100)} color={allDone?"emerald":"indigo"} size="sm"/></div>
      <div className="px-3 pb-3 pt-1 divide-y divide-gray-50">
        {tasks.map(task=><TaskRow key={task.id} task={task} checked={!!progress[task.id]} onToggle={toggleTask}/>)}
      </div>
      <div className="px-4 pb-3">
        <span className="text-xs text-gray-400">{isRest?"⏸ Rest day — light review only":"⏱ ~3 hrs · fits after a full work day"}</span>
      </div>
    </div>
  );
}

// ─── MOBILE DRAWER ───────────────────────────────────────────────
function MobileDrawer({ open, onClose, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ─── SIDEBAR CONTENT ─────────────────────────────────────────────
function SidebarContent({ activePhaseId, activeWeekId, onSelectWeek, progress, onReset, onClose }) {
  const [expanded, setExpanded] = useState(activePhaseId);

  return (
    <>
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <div><h1 className="text-sm font-bold text-gray-900 leading-none">DataPath</h1><p className="text-xs text-gray-400 mt-0.5">3 hrs/day · built for working pros</p></div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        )}
      </div>

      {/* Overall progress */}
      <div className="px-5 py-4 border-b border-gray-50 flex-shrink-0">
        {(()=>{const s=overallStats(progress);return(<>
          <div className="flex justify-between mb-1.5"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall</span><span className="text-sm font-bold text-gray-900">{s.pct}%</span></div>
          <ProgressBar pct={s.pct} color="indigo" size="md"/>
          <p className="text-xs text-gray-400 mt-1">{s.done} / {s.total} tasks</p>
        </>)})()}
      </div>

      {/* Schedule tip */}
      <div className="mx-3 my-2 bg-blue-50 rounded-xl px-3 py-2.5 flex-shrink-0">
        <p className="text-xs text-blue-700 font-medium leading-snug">⏱ Daily 3-hr schedule<br/><span className="font-normal text-blue-600">Learn 1.5h · Practice 1h · Review 30m</span></p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {roadmapData.phases.map(phase=>{
          const ps=phaseStats(phase,progress);
          const isExp=expanded===phase.id;
          const dot=phase.color==="indigo"?"bg-indigo-400":"bg-emerald-400";
          const bar=phase.color==="indigo"?"bg-indigo-500":"bg-emerald-500";
          const active=phase.color==="indigo"?"bg-indigo-500 text-white":"bg-emerald-500 text-white";
          const hover=phase.color==="indigo"?"hover:bg-indigo-50":"hover:bg-emerald-50";
          return(
            <div key={phase.id}>
              <button onClick={()=>setExpanded(isExp?null:phase.id)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`}/>
                  <span className="text-xs font-bold text-gray-700 truncate">{phase.label}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                  <span className="text-xs text-gray-400">{ps.pct}%</span>
                  <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExp?"rotate-90":""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </button>
              {isExp&&(
                <div className="ml-2 mt-0.5 pl-2 border-l-2 border-gray-100 space-y-0.5">
                  {phase.weeks.map(week=>{
                    const ws=weekStats(week,progress);
                    const isAct=activeWeekId===week.id;
                    return(
                      <button key={week.id} onClick={()=>{onSelectWeek(phase.id,week.id);onClose&&onClose();}}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2
                          ${isAct?active:`text-gray-600 ${hover}`}`}>
                        <span className="flex-1 truncate">{week.label}</span>
                        {!isAct&&<>
                          <div className="w-10 flex-shrink-0"><div className="h-1 rounded-full bg-gray-100 overflow-hidden"><div className={`h-1 rounded-full ${bar}`} style={{width:`${ws.pct}%`}}/></div></div>
                          <span className="text-gray-400 tabular-nums w-7 text-right">{ws.pct}%</span>
                        </>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Reset */}
      <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
        <button onClick={()=>window.confirm("Reset all progress? This can't be undone.")&&onReset()}
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
          Reset All Progress
        </button>
      </div>
    </>
  );
}

function StatsBar({ phase, week, progress }) {
  const ws=weekStats(week,progress), ps=phaseStats(phase,progress), os=overallStats(progress);
  const c=phase.color==="indigo"?"indigo":"emerald";
  function Card({label,pct,done,total,color}){
    return(
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">{label}</span><span className="text-lg font-bold text-gray-900 tabular-nums ml-2">{pct}%</span></div>
        <ProgressBar pct={pct} color={color} size="md"/>
        <p className="text-xs text-gray-400 mt-1.5 tabular-nums">{done} / {total}</p>
      </div>
    );
  }
  return(
    <div className="flex gap-2 sm:gap-3">
      <Card label="This Week" pct={ws.pct} done={ws.done} total={ws.total} color={c}/>
      <Card label={phase.shortLabel} pct={ps.pct} done={ps.done} total={ps.total} color={c}/>
      <Card label="Roadmap" pct={os.pct} done={os.done} total={os.total} color="amber"/>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────
function Dashboard() {
  const { progress, toggleTask, resetProgress } = useProgress();
  const [activePhaseId, setActivePhaseId] = useState("phase1");
  const [activeWeekId, setActiveWeekId] = useState("w1");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activePhase = roadmapData.phases.find(p=>p.id===activePhaseId)||roadmapData.phases[0];
  const activeWeek  = activePhase.weeks.find(w=>w.id===activeWeekId)||activePhase.weeks[0];

  useEffect(()=>{ if(!activePhase.weeks.find(w=>w.id===activeWeekId)) setActiveWeekId(activePhase.weeks[0].id); },[activePhaseId]);

  const goWeek = dir => {
    const idx = activePhase.weeks.findIndex(w=>w.id===activeWeekId);
    const next = activePhase.weeks[idx+dir];
    if(next) setActiveWeekId(next.id);
  };

  const sidebarProps = {
    activePhaseId, activeWeekId,
    onSelectWeek:(p,w)=>{setActivePhaseId(p);setActiveWeekId(w);},
    progress, onReset:resetProgress,
  };

  return (
    // KEY FIX: use min-h-screen instead of h-screen to eliminate extra scroll,
    // and let the page scroll naturally rather than using overflow-hidden + inner scroll
    <div className="flex min-h-screen bg-gray-50">

      {/* Desktop sidebar — sticky, natural height */}
      <aside className="hidden lg:flex flex-col w-[272px] flex-shrink-0 bg-white border-r border-gray-100 sticky top-0 h-screen overflow-hidden">
        <SidebarContent {...sidebarProps}/>
      </aside>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
        <SidebarContent {...sidebarProps} onClose={()=>setDrawerOpen(false)}/>
      </MobileDrawer>

      {/* Main content — scrolls naturally with the page */}
      <main className="flex-1 min-w-0">

        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={()=>setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <span className="text-sm font-bold text-gray-900 truncate">DataPath</span>
          </div>
          {/* Mobile nav arrows */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={()=>goWeek(-1)} className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={()=>goWeek(1)} className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">

          {/* Header row */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                  ${activePhase.color==="indigo"?"bg-indigo-100 text-indigo-600":"bg-emerald-100 text-emerald-600"}`}>{activePhase.label}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{activePhase.duration}</span>
                <span className="hidden sm:inline text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">⏱ max 3 hrs/day</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{activeWeek.label}</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">7 days · {activeWeek.days.reduce((a,d)=>a+d.tasks.length,0)} tasks · Mon–Fri study · Sat build · Sun rest</p>
            </div>
            {/* Desktop nav arrows */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={()=>goWeek(-1)} className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"><svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
              <button onClick={()=>goWeek(1)} className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-colors"><svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg></button>
            </div>
          </div>

          {/* Stats */}
          <StatsBar phase={activePhase} week={activeWeek} progress={progress}/>

          {/* Day cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
            {activeWeek.days.map(d=><DayCard key={d.dayNum} day={d} progress={progress} toggleTask={toggleTask}/>)}
          </div>

        </div>
      </main>
    </div>
  );
}

export default function App() { return <Dashboard/>; }