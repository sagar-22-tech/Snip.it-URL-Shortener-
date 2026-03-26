import { useState, useEffect } from "react";

/* ── Icons ── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.41 1.42l-.71-.71a1 1 0 0 1 0-1.41Zm13.44 13.44a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.93 18.36a1 1 0 0 1 0-1.42l.7-.7a1 1 0 1 1 1.42 1.41l-.71.71a1 1 0 0 1-1.41 0ZM17.66 5.64a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ── Deterministic stars ── */
const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.round(10 + (i * 137.508) % 80),
  y: Math.round(5 + (i * 97.3) % 55),
  r: i % 5 === 0 ? 1.5 : i % 3 === 0 ? 1.2 : 0.8,
  delay: `${(i * 0.37) % 3}s`,
}));

export default function App() {
  const [dark, setDark] = useState(false);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const [shake, setShake] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => { setTimeout(() => setReveal(true), 80); }, []);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2600);
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      setShake(true);
      setError("Please enter a URL to shorten.");
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError(""); setResult(null); setLoading(true);
    try {
      const res = await fetch("https://snip-it-url-shortener.onrender.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setResult(data);
      setUrl("");
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.short_url) return;
    await navigator.clipboard.writeText(result.short_url);
    setCopied(true); showToast();
    setTimeout(() => setCopied(false), 2200);
  };

  const d = dark;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }

        .app {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 24px; position: relative; overflow: hidden;
          transition: background 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .app.night { background: linear-gradient(160deg,#060714 0%,#0d0b2a 45%,#100818 100%); color:#eae6ff; }
        .app.day   { background: linear-gradient(160deg,#cce8ff 0%,#f0f8ff 45%,#ffe8c8 100%); color:#1a1340; }

        /* Stars */
        .stars { position:absolute; inset:0; pointer-events:none; transition:opacity 0.65s ease; opacity:${d?1:0}; }
        .star { position:absolute; background:#fff; border-radius:50%; animation:twinkle 3s ease-in-out infinite; }
        @keyframes twinkle { 0%,100%{opacity:.9;transform:scale(1)} 50%{opacity:.25;transform:scale(.55)} }

        /* Clouds */
        .clouds { position:absolute; top:0; left:0; right:0; height:200px; pointer-events:none; transition:opacity 0.7s ease; opacity:${d?0:.9}; }
        .cloud { position:absolute; border-radius:50px; background:rgba(255,255,255,.92); filter:blur(1.5px); }
        .cloud-1 { width:140px;height:42px;top:28px;left:4%;  box-shadow:55px -14px 0 rgba(255,255,255,.85), 28px -22px 0 rgba(255,255,255,.9); }
        .cloud-2 { width:95px; height:32px;top:54px;left:23%; box-shadow:38px -12px 0 rgba(255,255,255,.78); opacity:.7; }
        .cloud-3 { width:115px;height:36px;top:18px;left:62%; box-shadow:48px -15px 0 rgba(255,255,255,.85); opacity:.65; }

        /* Celestial orbs */
        .celestial { position:absolute; top:0; left:0; right:0; height:270px; pointer-events:none; overflow:hidden; }
        .orb { position:absolute; border-radius:50%; transition:all .7s cubic-bezier(.4,0,.2,1); }
        .orb-moon {
          width:78px;height:78px; top:26px; right:10%;
          background:radial-gradient(circle at 36% 36%,#ede9fe,#c4b5fd 58%,#7c3aed);
          box-shadow:0 0 40px 14px rgba(167,139,250,.22),0 0 90px 35px rgba(124,58,237,.1);
          opacity:${d?1:0}; transform:${d?'scale(1) translateY(0)':'scale(.35) translateY(-70px)'};
        }
        .orb-sun {
          width:88px;height:88px; top:18px; right:9.5%;
          background:radial-gradient(circle at 40% 40%,#fffde0,#fbbf24 52%,#f59e0b);
          box-shadow:0 0 0 16px rgba(251,191,36,.11),0 0 65px 22px rgba(251,191,36,.28),0 0 130px 55px rgba(245,158,11,.1);
          opacity:${d?0:1}; transform:${d?'scale(.35) translateY(-70px)':'scale(1) translateY(0)'};
        }

        /* Horizon */
        .horizon { position:absolute; bottom:0; left:0; right:0; height:200px; pointer-events:none; }
        .horizon.night { background:linear-gradient(to top,rgba(79,46,220,.08),transparent); }
        .horizon.day   { background:linear-gradient(to top,rgba(251,191,36,.07),transparent); }

        /* Card */
        .card {
          width:100%; max-width:560px;
          border-radius:28px; padding:44px 44px 40px;
          position:relative; z-index:2;
          transform:translateY(${reveal?'0':'30px'});
          opacity:${reveal?1:0};
          transition:transform .75s cubic-bezier(.22,1,.36,1),opacity .75s ease,background .6s ease,box-shadow .6s ease,border-color .6s ease;
        }
        .card.night {
          background:rgba(14,11,36,.83);
          border:1px solid rgba(139,92,246,.15);
          box-shadow:0 40px 100px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter:blur(28px) saturate(1.4);
        }
        .card.day {
          background:rgba(255,255,255,.74);
          border:1px solid rgba(251,191,36,.22);
          box-shadow:0 24px 70px rgba(99,102,241,.1),0 4px 16px rgba(0,0,0,.05),inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter:blur(28px) saturate(1.6);
        }

        /* Header */
        .header { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; }
        .brand  { display:flex; align-items:center; gap:11px; }

        .brand-icon {
          width:40px;height:40px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          transition:background .5s,box-shadow .5s;
        }
        .brand-icon.night { background:linear-gradient(135deg,#6d28d9,#4338ca); box-shadow:0 4px 16px rgba(109,40,217,.5); }
        .brand-icon.day   { background:linear-gradient(135deg,#f59e0b,#f97316); box-shadow:0 4px 16px rgba(245,158,11,.45); }

        .brand-name { font-size:22px; font-weight:900; letter-spacing:-.8px; transition:color .5s; }
        .brand-name.night { color:#ede9fe; }
        .brand-name.day   { color:#1e1b4b; }
        .brand-name .dot { transition:color .5s; }
        .brand-name.night .dot { color:#8b5cf6; }
        .brand-name.day   .dot { color:#f59e0b; }

        /* ── Dark / Light pill toggle ── */
        .dn-toggle {
          display:flex; align-items:center;
          padding:4px; border-radius:100px; border:none; cursor:pointer;
          transition:background .5s, box-shadow .5s;
        }
        .dn-toggle.night { background:rgba(255,255,255,.07); box-shadow:0 0 0 1px rgba(139,92,246,.22),inset 0 1px 0 rgba(255,255,255,.05); }
        .dn-toggle.day   { background:rgba(255,255,255,.62); box-shadow:0 0 0 1px rgba(251,191,36,.38), 0 2px 8px rgba(0,0,0,.08); }

        .dn-opt {
          display:flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:100px;
          font-size:13px; font-weight:800; letter-spacing:.1px;
          transition:background .32s,color .32s,box-shadow .32s;
          white-space:nowrap;
        }
        /* Dark segment */
        .dn-opt.dark-seg.dark-active   { background:linear-gradient(135deg,#4c1d95,#3730a3); color:#e9d5ff; box-shadow:0 2px 10px rgba(76,29,149,.5); }
        .dn-opt.dark-seg.dark-inactive { background:transparent; color:rgba(167,139,250,.45); }
        /* Light segment */
        .dn-opt.light-seg.light-active   { background:linear-gradient(135deg,#fbbf24,#f97316); color:#fff; box-shadow:0 2px 10px rgba(251,191,36,.45); }
        .dn-opt.light-seg.light-inactive { background:transparent; color:rgba(180,130,0,.5); }

        /* Tagline / Headline */
        .tagline { font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;transition:color .5s; }
        .tagline.night { color:rgba(167,139,250,.55); }
        .tagline.day   { color:rgba(180,100,0,.5); }

        .headline { font-size:31px;font-weight:900;letter-spacing:-1.2px;line-height:1.13;margin-bottom:30px;transition:color .5s; }
        .headline.night { color:#f0ecff; }
        .headline.day   { color:#1e1240; }
        .headline em { font-style:normal; background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .headline.night em { background-image:linear-gradient(90deg,#a78bfa,#818cf8); }
        .headline.day   em { background-image:linear-gradient(90deg,#f59e0b,#ef4444); }

        /* Input */
        .input-group { display:flex;flex-direction:column;gap:11px;margin-bottom:18px; }
        .input-wrap  { position:relative; }
        .input-wrap.shake { animation:shake .42s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 22%{transform:translateX(-7px)} 50%{transform:translateX(7px)} 75%{transform:translateX(-4px)} }

        .input-icon { position:absolute;left:15px;top:50%;transform:translateY(-50%);pointer-events:none;opacity:.4;transition:color .5s,opacity .2s; }
        .input-icon.night { color:#a78bfa; }
        .input-icon.day   { color:#f59e0b; }

        .url-input {
          width:100%; padding:16px 16px 16px 46px;
          border-radius:16px; border:none; outline:none;
          font-family:'Fira Code',monospace; font-size:13.5px;
          transition:background .5s,box-shadow .25s,color .5s;
        }
        .url-input.night { background:rgba(255,255,255,.04); color:#ddd6fe; box-shadow:0 0 0 1.5px rgba(139,92,246,.18); }
        .url-input.day   { background:rgba(255,255,255,.68); color:#1e1240; box-shadow:0 0 0 1.5px rgba(251,191,36,.3),0 2px 8px rgba(0,0,0,.04); }
        .url-input::placeholder { opacity:.35; }
        .url-input.night:focus { box-shadow:0 0 0 2px #7c3aed,0 0 28px rgba(124,58,237,.18); }
        .url-input.day:focus   { box-shadow:0 0 0 2px #f59e0b,0 0 24px rgba(245,158,11,.18); }

        /* Button */
        .submit-btn {
          width:100%; padding:16px; border-radius:16px; border:none; cursor:pointer;
          font-family:'Outfit',sans-serif; font-size:15.5px; font-weight:800; letter-spacing:.1px;
          display:flex; align-items:center; justify-content:center; gap:10px;
          color:#fff; transition:transform .15s,box-shadow .2s,filter .15s,background .5s;
        }
        .submit-btn.night { background:linear-gradient(135deg,#6d28d9,#4338ca); box-shadow:0 8px 26px rgba(109,40,217,.38); }
        .submit-btn.day   { background:linear-gradient(135deg,#f59e0b,#ef4444); box-shadow:0 8px 26px rgba(245,158,11,.35); }
        .submit-btn:hover:not(:disabled) { transform:translateY(-2px); filter:brightness(1.08); }
        .submit-btn:active:not(:disabled){ transform:translateY(0); }
        .submit-btn:disabled { opacity:.55; cursor:not-allowed; }

        .spinner { width:18px;height:18px; border:2.5px solid rgba(255,255,255,.28); border-top-color:#fff; border-radius:50%; animation:spin .65s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* Error */
        .error-msg {
          display:flex;align-items:center;gap:9px; padding:12px 16px; border-radius:12px;
          font-size:13.5px;font-weight:600;
          background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.22); color:#f87171;
          animation:popIn .3s cubic-bezier(.22,1,.36,1);
        }
        @keyframes popIn { from{opacity:0;transform:translateY(6px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }

        /* Result */
        .result-wrap { margin-top:22px; animation:popIn .45s cubic-bezier(.22,1,.36,1); }
        .result-card { border-radius:18px;padding:20px 22px; transition:background .5s,border-color .5s; }
        .result-card.night { background:rgba(109,40,217,.09); border:1px solid rgba(109,40,217,.22); }
        .result-card.day   { background:rgba(251,191,36,.08); border:1px solid rgba(251,191,36,.3); }

        .result-label { font-size:10.5px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:9px;transition:color .5s; }
        .result-label.night { color:rgba(167,139,250,.55); }
        .result-label.day   { color:rgba(180,100,0,.5); }

        .result-row { display:flex;align-items:center;gap:10px;flex-wrap:wrap; }

        .result-url { font-family:'Fira Code',monospace;font-size:14.5px;font-weight:500;word-break:break-all;flex:1;min-width:0;transition:color .5s; }
        .result-url.night { color:#a78bfa; }
        .result-url.day   { color:#d97706; }

        .copy-btn {
          display:flex;align-items:center;gap:6px; padding:9px 16px; border-radius:10px; border:none; cursor:pointer;
          font-family:'Outfit',sans-serif; font-size:13px;font-weight:800;white-space:nowrap;
          transition:transform .15s,background .25s,color .25s,box-shadow .2s; flex-shrink:0;
        }
        .copy-btn.idle.night { background:rgba(255,255,255,.07); color:#c4b5fd; }
        .copy-btn.idle.day   { background:rgba(251,191,36,.15); color:#b45309; }
        .copy-btn.done       { background:linear-gradient(135deg,#059669,#10b981); color:#fff; box-shadow:0 4px 12px rgba(5,150,105,.3); }
        .copy-btn:hover:not(.done) { transform:scale(1.05); }

        .orig-row { margin-top:12px;padding-top:12px;font-family:'Fira Code',monospace;font-size:11.5px;word-break:break-all;transition:border-color .5s,color .5s; }
        .orig-row.night { border-top:1px solid rgba(255,255,255,.05); color:rgba(196,181,253,.35); }
        .orig-row.day   { border-top:1px solid rgba(0,0,0,.07);       color:rgba(120,80,0,.4); }
        .orig-label { font-family:'Outfit',sans-serif;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;opacity:.6;margin-right:5px; }

        /* Divider / footer */
        .divider { height:1px;margin:28px 0;transition:background .5s; }
        .divider.night { background:rgba(255,255,255,.06); }
        .divider.day   { background:rgba(0,0,0,.07); }

        .footer { text-align:center;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;transition:color .5s; }
        .footer.night { color:rgba(167,139,250,.25); }
        .footer.day   { color:rgba(180,100,0,.28); }

        /* Toast */
        .toast {
          position:fixed; bottom:30px; left:50%;
          transform:translateX(-50%) translateY(${toast?'0':'22px'});
          opacity:${toast?1:0};
          pointer-events:none;
          transition:transform .38s cubic-bezier(.22,1,.36,1),opacity .38s ease;
          z-index:99;
          display:flex;align-items:center;gap:8px;
          padding:12px 24px; border-radius:100px;
          font-size:14px;font-weight:800;letter-spacing:.2px;
          background:linear-gradient(135deg,#059669,#10b981);
          color:#fff; box-shadow:0 8px 28px rgba(5,150,105,.38);
          white-space:nowrap;
        }

        @media(max-width:500px){
          .card{padding:30px 22px 28px;}
          .headline{font-size:25px;}
          .dn-opt{padding:6px 10px;font-size:12px;}
        }
      `}</style>

      <div className={`app ${d ? 'night' : 'day'}`}>

        {/* Stars */}
        <div className="stars">
          {STARS.map(s => (
            <div key={s.id} className="star" style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.r * 2, height: s.r * 2,
              animationDelay: s.delay,
            }} />
          ))}
        </div>

        {/* Clouds */}
        <div className="clouds">
          <div className="cloud cloud-1" /><div className="cloud cloud-2" /><div className="cloud cloud-3" />
        </div>

        {/* Moon / Sun */}
        <div className="celestial">
          <div className="orb orb-moon" />
          <div className="orb orb-sun" />
        </div>

        {/* Horizon */}
        <div className={`horizon ${d ? 'night' : 'day'}`} />

        {/* ── Card ── */}
        <div className={`card ${d ? 'night' : 'day'}`}>

          {/* Header */}
          <div className="header">
            <div className="brand">
              <div className={`brand-icon ${d ? 'night' : 'day'}`}><LinkIcon /></div>
              <span className={`brand-name ${d ? 'night' : 'day'}`}>
                snip<span className="dot">.</span>it
              </span>
            </div>

            {/* ── Dark / Light pill ── */}
            <button
              className={`dn-toggle ${d ? 'night' : 'day'}`}
              onClick={() => setDark(p => !p)}
              aria-label="Toggle dark/light mode"
            >
              <span className={`dn-opt dark-seg ${d ? 'dark-active' : 'dark-inactive'}`}>
                <MoonIcon /> Dark
              </span>
              <span className={`dn-opt light-seg ${!d ? 'light-active' : 'light-inactive'}`}>
                <SunIcon /> Light
              </span>
            </button>
          </div>

          {/* Headline */}
          <div className={`tagline ${d ? 'night' : 'day'}`}>URL Shortener</div>
          <div className={`headline ${d ? 'night' : 'day'}`}>
            Long links, <em>made tiny</em><br />in an instant.
          </div>

          {/* Input */}
          <div className="input-group">
            <div className={`input-wrap ${shake ? 'shake' : ''}`}>
              <input
                className={`url-input ${d ? 'night' : 'day'}`}
                type="url"
                placeholder="Paste your long URL here…"
                value={url}
                onChange={e => { setUrl(e.target.value); setError(""); }}
                onKeyDown={e => e.key === 'Enter' && handleShorten()}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
              />
              <div className={`input-icon ${d ? 'night' : 'day'}`}><LinkIcon /></div>
            </div>

            <button
              className={`submit-btn ${d ? 'night' : 'day'}`}
              onClick={handleShorten}
              disabled={loading}
            >
              {loading
                ? <><div className="spinner" /> Shortening…</>
                : <><span>Shorten URL</span><ArrowIcon /></>
              }
            </button>
          </div>

          {/* Error */}
          {error && <div className="error-msg"><AlertIcon /> {error}</div>}

          {/* Result */}
          {result && (
            <div className="result-wrap">
              <div className={`result-card ${d ? 'night' : 'day'}`}>
                <div className={`result-label ${d ? 'night' : 'day'}`}>Your Short URL</div>
                <div className="result-row">
                  <div className={`result-url ${d ? 'night' : 'day'}`}>{result.short_url}</div>
                  <button
                    className={`copy-btn ${copied ? 'done' : `idle ${d ? 'night' : 'day'}`}`}
                    onClick={handleCopy}
                  >
                    {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
                  </button>
                </div>
                <div className={`orig-row ${d ? 'night' : 'day'}`}>
                  <span className="orig-label">Original</span>→ {result.original}
                </div>
              </div>
            </div>
          )}

          <div className={`divider ${d ? 'night' : 'day'}`} />
          <div className={`footer ${d ? 'night' : 'day'}`}>Paste · Shorten · Share</div>
        </div>

        {/* Toast */}
        <div className="toast"><CheckIcon /> Copied to clipboard!</div>
      </div>
    </>
  );
}
