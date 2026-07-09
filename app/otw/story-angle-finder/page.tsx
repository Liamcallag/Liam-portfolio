"use client";

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// ── Types ──────────────────────────────────────────────────────────────────

type Client = "Volvo" | "IKEA" | "PostNord";

interface Angle {
  insight: string;
  tension: string;
  brand_role: string;
  format_suggestion: string;
}

interface CardReveal {
  frame: boolean;
  insightLabel: boolean;
  insightBar: boolean;
  tensionLabel: boolean;
  tensionBar: boolean;
  brandLabel: boolean;
  brandBar: boolean;
  tape: boolean;
}

const EMPTY_REVEAL: CardReveal = {
  frame: false,
  insightLabel: false,
  insightBar: false,
  tensionLabel: false,
  tensionBar: false,
  brandLabel: false,
  brandBar: false,
  tape: false,
};

// ── Data ───────────────────────────────────────────────────────────────────

const CLIENTS: Client[] = ["Volvo", "IKEA", "PostNord"];

const EXAMPLE_CHALLENGES: Record<Client, string> = {
  Volvo:
    "Building excitement for EVs without abandoning our safety-first identity, while Chinese EV brands undercut on price",
  IKEA: "Proving our sustainability commitment is real, not just marketing, to people who still see us as disposable furniture",
  PostNord:
    "Rebuilding trust with customers who've had real delivery/return problems, without sounding defensive",
};

const CARD_ROTATIONS = [-2.1, 1.7, -1.3, 2.4, -0.8];

// ── Skeleton Card ──────────────────────────────────────────────────────────

function SkeletonCard({
  index,
  reveal,
  angle,
}: {
  index: number;
  reveal: CardReveal;
  angle?: Angle;
}) {
  const rotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
  if (!reveal.frame) return null;

  return (
    <div
      className="angle-card skeleton-card skeleton-frame-in"
      style={{ "--rotation": `${rotation}deg` } as React.CSSProperties}
    >
      {reveal.tape && <div className="card-tape reveal-item" />}

      <span className="card-number">{String(index + 1).padStart(2, "0")}</span>

      {reveal.insightLabel && (
        <div className="card-row">
          <h3 className="card-label reveal-item">Insight</h3>
          {reveal.insightBar && (
            angle ? (
              <p className="card-body reveal-item">{angle.insight}</p>
            ) : (
              <>
                <div className="skeleton-line reveal-item" style={{ width: "85%" }} />
                <div className="skeleton-line reveal-item" style={{ width: "60%", marginTop: "0.35rem" }} />
              </>
            )
          )}
        </div>
      )}

      {reveal.tensionLabel && (
        <div className="card-row">
          <h3 className="card-label reveal-item">Tension</h3>
          {reveal.tensionBar && (
            angle ? (
              <p className="card-body reveal-item">{angle.tension}</p>
            ) : (
              <div className="skeleton-line reveal-item" style={{ width: "75%" }} />
            )
          )}
        </div>
      )}

      {reveal.brandLabel && (
        <div className="card-row">
          <h3 className="card-label reveal-item">Brand&rsquo;s Role</h3>
          {reveal.brandBar && (
            angle ? (
              <p className="card-body reveal-item">{angle.brand_role}</p>
            ) : (
              <>
                <div className="skeleton-line reveal-item" style={{ width: "90%" }} />
                <div className="skeleton-line reveal-item" style={{ width: "50%", marginTop: "0.35rem" }} />
              </>
            )
          )}
        </div>
      )}

      {reveal.brandBar && (
        <div className="card-tag reveal-item">
          {angle ? (
            <span>{angle.format_suggestion}</span>
          ) : (
            <div className="skeleton-tag" />
          )}
        </div>
      )}
    </div>
  );
}

// ── Angle Card ─────────────────────────────────────────────────────────────

function AngleCard({ angle, index }: { angle: Angle; index: number }) {
  const rotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length];

  return (
    <div
      className="angle-card"
      style={{ "--rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <div className="card-tape" />
      <span className="card-number">{String(index + 1).padStart(2, "0")}</span>

      <div className="card-row">
        <h3 className="card-label">Insight</h3>
        <p className="card-body">{angle.insight}</p>
      </div>

      <div className="card-row">
        <h3 className="card-label">Tension</h3>
        <p className="card-body">{angle.tension}</p>
      </div>

      <div className="card-row">
        <h3 className="card-label">Brand&rsquo;s Role</h3>
        <p className="card-body">{angle.brand_role}</p>
      </div>

      <div className="card-tag">
        <span>{angle.format_suggestion}</span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function StoryAngleFinderPage() {
  const [selectedClient, setSelectedClient] = useState<Client>("Volvo");
  const [challenge, setChallenge] = useState("");
  const [loadingStage, setLoadingStage] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [angles, setAngles] = useState<Angle[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [researchDone, setResearchDone] = useState(false);
  const [dataArrived, setDataArrived] = useState(false);
  const [revealed, setRevealed] = useState<[CardReveal, CardReveal, CardReveal]>([
    { ...EMPTY_REVEAL },
    { ...EMPTY_REVEAL },
    { ...EMPTY_REVEAL },
  ]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const anglesRef = useRef<Angle[]>([]);
  const revealCompleteRef = useRef(false);

  const ESTIMATED_TOTAL = 45;

  const progressPct =
    dataArrived || loadingStage === "done" || loadingStage === "error"
      ? 100
      : loadingStage === "loading"
      ? Math.min(90, (elapsed / ESTIMATED_TOTAL) * 100)
      : 0;

  function statusText() {
    if (researchDone) {
      return elapsed < 35 ? "Writing your story angles…" : "Almost there…";
    }
    if (elapsed < 5) return `Searching for what's current on ${selectedClient}…`;
    if (elapsed < 15) return "Reading what turned up…";
    if (elapsed < 25) return "Finding the human angle…";
    return "Writing your story angles…";
  }

  const isLoading = loadingStage === "loading";

  function clearProgressTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function clearRevealTimers() {
    revealTimersRef.current.forEach(clearTimeout);
    revealTimersRef.current = [];
  }

  async function handleGenerate() {
    if (!challenge.trim() || isLoading) return;

    setAngles([]);
    setErrorMsg("");
    setElapsed(0);
    setResearchDone(false);
    setDataArrived(false);
    setRevealed([{ ...EMPTY_REVEAL }, { ...EMPTY_REVEAL }, { ...EMPTY_REVEAL }]);
    setLoadingStage("loading");

    anglesRef.current = [];
    revealCompleteRef.current = false;
    clearRevealTimers();

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed((Date.now() - start) / 1000);
    }, 150);

    function scheduleReveal(cardIdx: 0 | 1 | 2, field: keyof CardReveal, delay: number) {
      const t = setTimeout(() => {
        setRevealed((prev) => {
          const next: [CardReveal, CardReveal, CardReveal] = [
            { ...prev[0] },
            { ...prev[1] },
            { ...prev[2] },
          ];
          next[cardIdx] = { ...next[cardIdx], [field]: true };
          return next;
        });
      }, delay);
      revealTimersRef.current.push(t);
    }

    for (let i = 0; i < 3; i++) {
      const base = i * 1500;
      scheduleReveal(i as 0 | 1 | 2, "frame", base);
      scheduleReveal(i as 0 | 1 | 2, "insightLabel", base + 800);
      scheduleReveal(i as 0 | 1 | 2, "insightBar", base + 1100);
      scheduleReveal(i as 0 | 1 | 2, "tensionLabel", base + 2100);
      scheduleReveal(i as 0 | 1 | 2, "tensionBar", base + 2400);
      scheduleReveal(i as 0 | 1 | 2, "brandLabel", base + 3400);
      scheduleReveal(i as 0 | 1 | 2, "brandBar", base + 3700);
      scheduleReveal(i as 0 | 1 | 2, "tape", base + 4300);
    }

    const completionTimer = setTimeout(() => {
      revealCompleteRef.current = true;
      if (anglesRef.current.length > 0) {
        clearProgressTimer();
        setLoadingStage("done");
      }
    }, 7300);
    revealTimersRef.current.push(completionTimer);

    let research = "";
    try {
      const researchRes = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: selectedClient, challenge }),
      });
      const researchData = await researchRes.json();
      if (researchRes.ok && !researchData.error) {
        research = researchData.research;
      }
    } catch {
      // continue to generation with empty research
    }
    setResearchDone(true);

    try {
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: selectedClient, challenge, research }),
      });
      const generateData = await generateRes.json();

      if (!generateRes.ok || generateData.error) {
        clearProgressTimer();
        clearRevealTimers();
        setErrorMsg(generateData.error || "Something went wrong. Please try again.");
        setLoadingStage("error");
        return;
      }

      anglesRef.current = generateData.angles;
      setAngles(generateData.angles);
      setDataArrived(true);
      clearProgressTimer();

      if (revealCompleteRef.current) {
        setLoadingStage("done");
      }
    } catch {
      clearProgressTimer();
      clearRevealTimers();
      setErrorMsg("Network error. Please check your connection and try again.");
      setLoadingStage("error");
    }
  }

  useEffect(() => {
    return () => {
      clearProgressTimer();
      clearRevealTimers();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClientChange(c: Client) {
    setSelectedClient(c);
    setChallenge("");
    setAngles([]);
    setErrorMsg("");
    setElapsed(0);
    setResearchDone(false);
    setDataArrived(false);
    setRevealed([{ ...EMPTY_REVEAL }, { ...EMPTY_REVEAL }, { ...EMPTY_REVEAL }]);
    setLoadingStage("idle");
    clearProgressTimer();
    clearRevealTimers();
    anglesRef.current = [];
    revealCompleteRef.current = false;
  }

  return (
    <>
      <style>{`
        .otw-page {
          --teal: #0A5260;
          --cyan: #00B4C4;
          --cyan-hover: #009AAA;
          --paper: #FFFFFF;
          --surface: #F4F8F9;
          --ink: #111111;
          --ink-soft: #444444;
          --border: rgba(10, 82, 96, 0.12);
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--paper);
          min-height: 100vh;
          color: var(--ink);
        }

        /* Suppress portfolio grain overlay on this page */
        body::after { display: none; }
        body { background: #fff; }

        /* ── Header ─────────────────────────────────────────────────────── */
        .otw-header {
          background: var(--teal);
          padding: 1rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .otw-wordmark {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #fff;
          text-decoration: none;
          opacity: 0.9;
          transition: opacity 0.15s ease;
        }

        .otw-wordmark:hover { opacity: 1; }

        .otw-portfolio-link {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .otw-portfolio-link:hover { color: #fff; }

        .otw-header-tag {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        /* ── Inner content ──────────────────────────────────────────────── */
        .otw-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 3.5rem 1.75rem 6rem;
        }

        .otw-eyebrow {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 0.9rem;
        }

        .otw-headline {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 1.1rem;
        }

        .otw-subtitle {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-soft);
          opacity: 0.5;
          margin-bottom: 0;
        }

        .otw-hero-divider {
          height: 1px;
          background: var(--border);
          margin: 2rem 0;
        }

        .otw-subhead {
          font-size: 1rem;
          color: var(--ink-soft);
          max-width: 540px;
          line-height: 1.65;
          margin-bottom: 0;
        }

        /* Section numbers */
        .section-row {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .section-num {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--cyan);
          opacity: 0.6;
          flex-shrink: 0;
          padding-top: 0.1rem;
        }

        .section-title {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.4;
        }

        .section-block {
          border-top: 1px solid var(--border);
          padding-top: 1.75rem;
          margin-bottom: 2rem;
        }

        /* ── Client tabs ────────────────────────────────────────────────── */
        .client-tabs {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .client-tab {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: 3px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--ink-soft);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .client-tab:hover { border-color: var(--teal); color: var(--teal); }
        .client-tab.active { background: var(--teal); border-color: var(--teal); color: #fff; }

        /* ── Form ───────────────────────────────────────────────────────── */
        .form-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-soft);
          display: block;
          margin-bottom: 0.5rem;
        }

        .challenge-field {
          width: 100%;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          font-family: inherit;
          color: var(--ink);
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 4px;
          resize: vertical;
          min-height: 80px;
          transition: border-color 0.15s ease, background 0.15s ease;
          outline: none;
          box-sizing: border-box;
        }

        .challenge-field:focus { border-color: var(--cyan); background: #fff; }
        .challenge-field::placeholder { color: #aaa; }

        .chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .chips-label {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999;
          display: block;
          margin-bottom: 0.4rem;
        }

        .chip {
          font-size: 0.78rem;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--teal);
          cursor: pointer;
          transition: all 0.12s ease;
          text-align: left;
          font-family: inherit;
        }

        .chip:hover { background: var(--teal); color: #fff; border-color: var(--teal); }

        /* ── Generate button ────────────────────────────────────────────── */
        .generate-btn {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 0.85rem 2rem;
          background: var(--cyan);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .generate-btn:hover:not(:disabled) { background: var(--cyan-hover); transform: translateY(-1px); }
        .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* ── Progress ───────────────────────────────────────────────────── */
        .progress-wrap { margin-top: 1.25rem; }

        .progress-track {
          height: 2px;
          background: rgba(10, 82, 96, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--cyan);
          border-radius: 2px;
          transition: width 0.2s ease;
        }

        /* ── Error ──────────────────────────────────────────────────────── */
        .error-box {
          margin-top: 1.5rem;
          padding: 1rem 1.25rem;
          border-radius: 4px;
          border: 1.5px solid #e53e3e;
          background: #fff5f5;
          color: #c53030;
          font-size: 0.9rem;
        }

        /* ── Results header ─────────────────────────────────────────────── */
        .results-header {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .results-header::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        /* ── Cards ──────────────────────────────────────────────────────── */
        .cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .angle-card {
          background: #fff;
          border: 1px solid rgba(10, 82, 96, 0.1);
          border-radius: 2px;
          padding: 1.75rem 1.75rem 1.25rem;
          transform: rotate(var(--rotation));
          transform-origin: center center;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          box-shadow: 0 2px 16px rgba(10, 82, 96, 0.07), 0 1px 4px rgba(0,0,0,0.04);
          position: relative;
        }

        .angle-card:hover {
          transform: rotate(0deg);
          box-shadow: 0 8px 32px rgba(10, 82, 96, 0.12), 0 2px 8px rgba(0,0,0,0.06);
        }

        /* Tape — bright cyan, semi-transparent */
        .card-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 56px;
          height: 20px;
          background: rgba(0, 180, 196, 0.4);
          border-radius: 2px;
          pointer-events: none;
        }

        .card-number {
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--cyan);
          opacity: 0.5;
          display: block;
          margin-bottom: 1.25rem;
        }

        .card-row { margin-bottom: 1.1rem; }

        .card-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin: 0 0 0.35rem;
          display: block;
        }

        .card-body { font-size: 0.93rem; line-height: 1.65; color: var(--ink-soft); margin: 0; }

        .card-tag { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border); }

        .card-tag span {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          background: var(--teal);
          color: #fff;
          padding: 0.3rem 0.75rem;
          border-radius: 3px;
          letter-spacing: 0.02em;
          line-height: 1.5;
        }

        .form-divider { height: 1px; background: var(--border); margin: 2rem 0; }

        /* ── Skeleton ───────────────────────────────────────────────────── */
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }

        @keyframes skeletonFrameIn {
          from { opacity: 0; translate: 0 10px; }
          to   { opacity: 1; translate: 0 0; }
        }

        @keyframes revealFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .skeleton-card { pointer-events: none; }
        .skeleton-frame-in { animation: skeletonFrameIn 0.4s ease both; }
        .reveal-item { animation: revealFade 0.3s ease both; }

        .skeleton-line {
          height: 0.85rem;
          border-radius: 3px;
          background: linear-gradient(90deg, #e4eff0 25%, #eef6f7 50%, #e4eff0 75%);
          background-size: 400px 100%;
          display: block;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        .skeleton-tag {
          height: 1.5rem;
          width: 8rem;
          border-radius: 3px;
          background: linear-gradient(90deg, #e4eff0 25%, #eef6f7 50%, #e4eff0 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        .otw-footer-note {
          margin-top: 4rem;
          font-size: 0.78rem;
          color: #aaa;
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
        }
      `}</style>

      <div className={`otw-page ${spaceGrotesk.variable}`}>
        {/* Standalone header */}
        <header className="otw-header">
          <Link href="/" className="otw-wordmark">Liam Callaghan</Link>
          <Link href="/" className="otw-portfolio-link">← Portfolio</Link>
        </header>

        <div className="otw-inner">
          {/* Hero */}
          <p className="otw-eyebrow">OTW — Portfolio Demo · AI Agent</p>
          <h1 className="otw-headline">Story Angle<br />Finder</h1>

          <div className="otw-hero-divider" />

          <p className="otw-subhead">
            Pick a client, describe their challenge. An AI agent researches them live
            and finds 2–3 story angles rooted in human truth — the way OTW would
            approach a brief.
          </p>

          {/* Brief section */}
          <div className="section-block">
            <label className="form-label">Client</label>
            <div className="client-tabs">
              {CLIENTS.map((c) => (
                <button
                  key={c}
                  className={`client-tab${selectedClient === c ? " active" : ""}`}
                  onClick={() => handleClientChange(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <label className="form-label" htmlFor="challenge-input">
              Business Challenge
            </label>
            <textarea
              id="challenge-input"
              className="challenge-field"
              placeholder="Describe the challenge in your own words, or use an example below…"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
            />

            <div>
              <span className="chips-label">Try an example</span>
              <div className="chips-row">
                <button
                  className="chip"
                  onClick={() => setChallenge(EXAMPLE_CHALLENGES[selectedClient])}
                >
                  {selectedClient} example challenge
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={!challenge.trim() || isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L10.5 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H5.5L8 1Z"
                fill="currentColor"
              />
            </svg>
            {isLoading ? "Working…" : "Find Story Angles"}
          </button>

          {loadingStage === "error" && (
            <div className="error-box">{errorMsg}</div>
          )}
          </div>

          {(isLoading || angles.length > 0) && (
            <>
              <div className="section-block" style={{ marginBottom: "1.25rem" }}>
                <div className="section-row" style={{ marginBottom: 0 }}>
                  <span className="section-title">
                    {isLoading
                      ? statusText()
                      : `${angles.length} Angle${angles.length !== 1 ? "s" : ""} — ${selectedClient}`
                    }
                  </span>
                </div>
              </div>

              {isLoading && (
                <div className="progress-wrap" style={{ marginTop: 0, marginBottom: "1.5rem" }}>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              )}

              <div className="cards-grid">
                {isLoading
                  ? ([0, 1, 2] as const).map((i) => (
                      <SkeletonCard
                        key={i}
                        index={i}
                        reveal={revealed[i]}
                        angle={angles[i]}
                      />
                    ))
                  : angles.map((angle, i) => (
                      <AngleCard key={i} angle={angle} index={i} />
                    ))
                }
              </div>
            </>
          )}

          <p className="otw-footer-note">
            Built by Liam Callaghan as a portfolio demo for OTW. Research powered by an AI agent (Claude) with live web search.
          </p>
        </div>
      </div>
    </>
  );
}
