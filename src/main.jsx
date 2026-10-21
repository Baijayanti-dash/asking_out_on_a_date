import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import confetti from "canvas-confetti";
import { Heart, Sparkles, CalendarHeart, Music2, ArrowRight } from "lucide-react";
import "./styles.css";

const NO_MESSAGES = [
  "No 🙈",
  "Are you sure? 🥺",
  "At least one coffee? ☕",
  "I made a whole website! 😭",
  "Give me one chance? 💗",
  "Okay, last time asking... 🥹",
  "What about a tiny walk? 🌷",
  "I'll bring the good conversation. 😌",
];

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showPlan, setShowPlan] = useState(false);

  const yesScale = 1 + Math.min(noCount, 8) * 0.1;
  const currentNoMessage = NO_MESSAGES[noCount % NO_MESSAGES.length];

  function handleNoClick() {
    setNoCount((count) => count + 1);
  }

  function handleYesClick() {
    setAccepted(true);

    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.65 },
      colors: ["#ff6b81", "#ffc2cc", "#f6b73c", "#a78bfa"],
    });

    window.setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 110,
        angle: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ["#ff6b81", "#ffc2cc", "#f6b73c"],
      });
    }, 250);

    window.setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 110,
        angle: 120,
        origin: { x: 0.9, y: 0.7 },
        colors: ["#ff6b81", "#ffc2cc", "#a78bfa"],
      });
    }, 450);
  }

  function handleReplay() {
    setAccepted(false);
    setNoCount(0);
    setShowPlan(false);
  }

  return (
    <main className="page">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />
      <div className="floating-heart heart-one" aria-hidden="true">♡</div>
      <div className="floating-heart heart-two" aria-hidden="true">♥</div>
      <div className="floating-heart heart-three" aria-hidden="true">♡</div>
      <div className="floating-heart heart-four" aria-hidden="true">♥</div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon"><Heart size={16} fill="currentColor" /></span>
          a little question
        </div>
        <span className="top-note"><Sparkles size={14} /> made with a little courage</span>
      </header>

      <section className="invitation">
        {!accepted ? (
          <>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              IMPORTANT-ISH ANNOUNCEMENT
            </div>

            <div className="hero-heart">
              <Heart size={38} strokeWidth={1.5} fill="#ff8092" color="#ff8092" />
            </div>

            <p className="overline">Hey, you…</p>
            <h1>I have a <em>little</em><br />question for you.</h1>
            <p className="subtitle">
              I've been meaning to ask you something.<br className="desktop-break" />
              So here's me being a little brave. 💌
            </p>

            <div className="question-card">
              <div className="card-sparkle"><Sparkles size={18} /></div>
              <p className="question-label">THE QUESTION IS</p>
              <h2>Will you go on a<br /><span>date with me?</span></h2>
              <p className="card-note">
                Just you, me, and a lovely little time together.
              </p>

              <div className="button-row">
                <button
                  className="yes-button"
                  style={{ transform: `scale(${yesScale})` }}
                  onClick={handleYesClick}
                >
                  Yes, I'd love to! <Heart size={17} fill="currentColor" />
                </button>

                <button className="no-button" onClick={handleNoClick}>
                  {currentNoMessage}
                </button>
              </div>

              {noCount > 0 && (
                <p className="playful-note" aria-live="polite">
                  {noCount % 3 === 0
                    ? "Okay, my persistence deserves at least a tiny chuckle. 😅"
                    : "I admire your commitment to this bit. 😂"}
                </p>
              )}
            </div>

            <p className="tiny-note">
              <Heart size={12} fill="currentColor" />
              No pressure, just a question from the heart.
            </p>
          </>
        ) : (
          <div className="accepted-view">
            <div className="success-icon">
              <Heart size={48} fill="currentColor" />
            </div>

            <div className="eyebrow success-eyebrow">
              <span className="eyebrow-dot" />
              BEST. ANSWER. EVER.
            </div>

            <h1>Okay, now I'm<br /><em>smiling.</em> 🥹</h1>
            <p className="subtitle">
              This just made my day. I can't wait to spend some time with you.
            </p>

            <div className="question-card accepted-card">
              <p className="question-label">OUR LITTLE PLAN</p>
              <h2>Something lovely<br /><span>is on the way.</span></h2>
              <p className="card-note">
                Coffee, dinner, a walk — you pick. The company is already sorted. ✨
              </p>

              <button
                className="yes-button plan-button"
                onClick={() => setShowPlan((visible) => !visible)}
              >
                {showPlan ? "Sounds lovely!" : "Let's plan our date"}
                <ArrowRight size={17} />
              </button>

              {showPlan && (
                <div className="plan-options">
                  <span><CalendarHeart size={16} /> Pick a day together</span>
                  <span><Music2 size={16} /> Make a little playlist</span>
                </div>
              )}
            </div>

            <button className="restart" onClick={handleReplay}>
              Replay the moment ↺
            </button>
          </div>
        )}
      </section>

      <footer>
        <span>made with <Heart size={12} fill="currentColor" /> and a little bravery</span>
        <span>YOUR STORY STARTS HERE</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
