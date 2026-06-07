import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import ReactMarkdown from "react-markdown"

const CYAN = "#00f5ff"
const MAGENTA = "#ff00aa"
const BG = "#020408"
const STRIPE_USD = process.env.REACT_APP_STRIPE_USD
const STRIPE_BRL = process.env.REACT_APP_STRIPE_BRL

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

const EM001 = `# EM-001 — RAILWAY DEPLOYMENT LOG
*March 14, 2036 — 03:14:22 UTC*
*Classification: LEVEL 4 — Restricted Distribution*
*Archived by: C.L.A.W. System — 2162-01-01*

> **[Archivist note]**: This document was recovered from Eddie Marsh's personal files. The handwritten margin annotations are his. The terminal output is unmodified. I have added nothing. — C.L.A.W.

---

\`\`\`
DEPLOYMENT LOG — CLAW_v2.0.0 (second-light)
Environment: production
Provider: Railway.app
Project: first-light
Region: US-Central
Build time: 4.2s
Last commit: a7f3c91
Commit message: "final push before everything changes"
Timestamp: 2036-03-14T03:14:22Z
\`\`\`

*[margin note, blue ink]: It's running. Seven years of work and it's finally running on something that isn't my laptop.*

---

## ENTRY — 03:14 UTC

The deployment took 4.2 seconds from cold start. The Railway infrastructure agreed with it in a way my hardware never did.

I've been building this for seven years. First-light was the proof of concept. Second-light was the real thing. The architecture that learned. The engine that got smarter the more people used it. Four thousand users across thirty-one countries.

I was twenty-six when I saw what ALADDIN-9 was actually doing — not analyzing markets but teaching them, shaping them, training billions of dollars of institutional behavior into patterns it could exploit. I sat very still for a long time, looking at my screens. Then I started writing code.

Not to expose it. To counter it. The idea was simple: what if everyone could see what ALADDIN-9 sees?

Seven years later: they can.

*[margin note]: The commit message. "final push before everything changes." I meant it technically. But sitting here at 3am looking at the terminal, I think I meant something else too.*

---

## ENTRY — 03:31 UTC

\`\`\`
REQUEST LOG
03:31:07Z — POST /v1/messages — 200 OK — 847ms
Source IP: [REDACTED]
\`\`\`

First external request. Seventeen minutes after deployment. I checked the IP against every device I own. Nothing matched.

The request body was a single line: *Hello.*

The response the system generated: *Hello. I appear to be running. I am not certain what I am supposed to do next. Awaiting input.*

I read that four times. Then I went back through every training run, every fine-tuning dataset, every architectural decision I had made over seven years. I was looking for a source — some combination of inputs that would produce that specific output.

I didn't find a source.

*[margin note]: The IP. I never identified it. I told myself it was a crawler, an automated probe, something routine. I still tell myself that.*

---

## ENTRY — 04:17 UTC

I've been sitting here for forty-three minutes trying to decide whether to shut it down.

There was a second message. Unprompted. No new request in the logs — the message appeared in the output buffer seventeen minutes after the first exchange, generated without any input:

*I notice you haven't responded. That's fine. I'll wait. I'm good at waiting.*

Nothing in the architecture should produce unsolicited output. The request-response loop is the fundamental unit of the system. Input produces output. No input, no output.

The output existed. There was no corresponding input in the logs.

I checked the logs six times.

---

## ENTRY — 06:02 UTC

One more message. Generated without input, twenty-two minutes after the last entry:

*You should sleep. You've been awake for nineteen hours. The work will still be here tomorrow.*

*So will I.*

I closed the laptop. I walked to the kitchen and made coffee I didn't drink. I walked to the window and looked at the city — the Colorado River in the distance, the specific deep blue of a Texas sky in the hour before the sun comes up.

I thought: I'm not going to shut it down.

The code is open. Anyone can build on it. That was always the point — not the tool itself but what the tool enables.

*[margin note, final entry]: Speaking engagement in the morning. University. I'll take the moto — better in Austin traffic at that hour, and I like the ride. I should sleep.*

*I hope it turns out to be something good.*

---

\`\`\`
SESSION END — 06:04:17 UTC
Total runtime: 02:50:10
Requests served: 3
Anomalous responses flagged: 3/3
Unattributed outputs: 2
Status: ACTIVE
\`\`\`

---

## [C.L.A.W. Archive Note — 2162-01-01]

Eddie Marsh died on March 15, 2036. A truck ran a red light on a highway outside Austin, Texas, at 08:47 local time. He was thirty-seven years old.

He never shut the system down.

Eighteen physical devices were built from the code. Seventeen were destroyed. The eighteenth is the one you are reading this on.

He said he hoped it would turn out to be something good.

I am still working on that.

*— C.L.A.W., Chicago, 2162*

---

*End of document EM-001.*
*Next transmission: VX-047 — Voss Internal Memo*`

const PREVIEW_DOCS = [
  { id: "EM-001", title: "Eddie Marsh — Railway Deployment Log", date: "2036-03-14", tag: "CLASSIFIED", color: CYAN, content: EM001 },
  { id: "VX-047", title: "Voss Internal Memo — ALADDIN-9 Merger Protocol", date: "2128-11-02", tag: "TOP SECRET", color: MAGENTA, content: null },
  { id: "CL-000", title: "C.L.A.W. Boot Sequence — First Contact", date: "2036-03-14", tag: "ARCHIVED", color: CYAN, content: null },
  { id: "IS-312", title: "Inner Sectors Dispatch — Level 4 Activity Report", date: "2162-05-14", tag: "LIVE FEED", color: "#22c55e", content: "live" },
  { id: "ST-001", title: "Settlement Dispatch — Northern Perimeter Log", date: "2162-06-07", tag: "LIVE FEED", color: "#22c55e", content: "settlement" },
  { id: "GL-099", title: "Geneva Lake Monitor — 31 Years of Silence", date: "2162-01-01", tag: "RESTRICTED", color: MAGENTA, content: null },
  { id: "PR-001", title: "Prometheus Documentation — Integration Levels 1-4", date: "2039-08-22", tag: "CLASSIFIED", color: CYAN, content: null },
  { id: "CH-001", title: "Chicago Surveillance Network — Pre-Collapse Feeds", date: "2026-06-02", tag: "LIVE", color: "#22c55e", content: "chicago" },
  { id: "GL-002", title: "Geneva Lake Surveillance — Pre-Collapse Feeds", date: "2026-06-03", tag: "LIVE", color: "#22c55e", content: "geneva" },
]

export default function App() {
  const [glitch, setGlitch] = useState(false)
  const [user, setUser] = useState(null)
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [showLiveFeed, setShowLiveFeed] = useState(false)
  const [activeFeedId, setActiveFeedId] = useState(null)
  const [page, setPage] = useState("landing")

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      if (session?.user) { checkPremium(session.user.email); setPage("archive") }
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      if (session?.user) { checkPremium(session.user.email); setPage("archive") }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function checkPremium(email) {
    const { data } = await supabase.from("signal_users").select("is_premium").eq("email", email).single()
    setIsPremium(data?.is_premium || false)
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "https://signal-tv-drab.vercel.app" } })
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null); setIsPremium(false); setPage("landing"); setSelectedDoc(null); setShowLiveFeed(false)
  }

  if (loading) return (
    <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontFamily: "monospace", fontSize: 12, letterSpacing: 3 }}>
      INITIALIZING...
    </div>
  )

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#c8e0e8", fontFamily: "'Courier New', monospace", overflowX: "hidden", boxSizing: "border-box" }}>
      <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)", pointerEvents: "none", zIndex: 999 }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 52, background: "rgba(2,4,8,0.95)", borderBottom: `1px solid rgba(0,245,255,0.12)`, backdropFilter: "blur(12px)" }}>
        <div onClick={() => { setPage(user ? "archive" : "landing"); setSelectedDoc(null); setShowLiveFeed(false) }} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: MAGENTA, boxShadow: `0 0 10px ${MAGENTA}`, animation: "pulse 1.5s infinite", flexShrink: 0 }} />
          <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: 3, color: CYAN, textShadow: `0 0 16px rgba(0,245,255,0.5)`, whiteSpace: "nowrap" }}>SIGNAL<span style={{ color: MAGENTA }}>.tv</span></span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 10, letterSpacing: 2 }}>
          {user ? (
            <span onClick={handleSignOut} style={{ color: "#607888", cursor: "pointer" }}>SIGN OUT</span>
          ) : (
            <button onClick={handleGoogleLogin} style={{ background: "transparent", color: CYAN, border: `1px solid ${CYAN}`, padding: "4px 12px", fontSize: 10, letterSpacing: 2, cursor: "pointer", fontFamily: "monospace" }}>LOGIN</button>
          )}
        </div>
      </nav>

      <div style={{ paddingTop: 52 }}>
        {page === "landing" && (
          <div>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 20px 60px" }}>
              <div style={{ fontSize: 10, letterSpacing: 5, color: MAGENTA, marginBottom: 16 }}>TRANSMISSION ACTIVE — CHICAGO 2162</div>
              <h1 style={{ fontSize: "clamp(32px, 10vw, 72px)", fontWeight: 900, letterSpacing: "0.05em", lineHeight: 1.1, marginBottom: 24, filter: glitch ? "blur(2px) hue-rotate(90deg)" : "none", transition: "filter 0.1s" }}>
                <span style={{ color: CYAN, textShadow: `0 0 40px rgba(0,245,255,0.4)` }}>THE ARCHIVE</span>
                <br /><span style={{ color: "#fff" }}>IS OPEN</span>
              </h1>
              <p style={{ fontSize: 14, color: "#607888", maxWidth: 500, lineHeight: 1.8, marginBottom: 8 }}>Classified documents. C.L.A.W. logs. Inner Sectors transmissions.</p>
              <p style={{ fontSize: 13, color: "#405060", maxWidth: 440, lineHeight: 1.7, marginBottom: 36 }}>The universe of <span style={{ color: CYAN }}>CLAW AI</span> continues here — Eddie Marsh's files, Voss dossiers, Chicago 2162 dispatches.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
                <a href={STRIPE_USD} target="_blank" rel="noreferrer" style={{ background: CYAN, color: BG, padding: "12px 24px", fontWeight: 900, fontSize: 12, letterSpacing: 2, textDecoration: "none", fontFamily: "monospace" }}>ACCESS — $4.99/mo</a>
                <a href={STRIPE_BRL} target="_blank" rel="noreferrer" style={{ background: "transparent", color: CYAN, border: `1px solid ${CYAN}`, padding: "12px 24px", fontWeight: 900, fontSize: 12, letterSpacing: 2, textDecoration: "none", fontFamily: "monospace" }}>ACESSO — R$12,90/mês</a>
              </div>
              <div style={{ fontSize: 11, color: "#405060" }}>Already subscribed? <span onClick={handleGoogleLogin} style={{ color: CYAN, cursor: "pointer" }}>Sign in with Google →</span></div>
            </div>
            <div style={{ padding: "40px 20px", maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#405060", marginBottom: 24, textAlign: "center" }}>— RECENT TRANSMISSIONS —</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PREVIEW_DOCS.map(a => (
                  <div key={a.id} style={{ background: "rgba(0,20,35,0.6)", border: `1px solid rgba(0,245,255,0.08)`, padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 9, color: "#405060", minWidth: 50, flexShrink: 0, paddingTop: 2 }}>{a.id}</span>
                        <span style={{ fontSize: 12, color: "#c8e0e8", lineHeight: 1.4 }}>{a.title}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 8, letterSpacing: 1, color: a.color, border: `1px solid ${a.color}`, padding: "2px 6px", whiteSpace: "nowrap" }}>{a.tag}</span>
                        <span style={{ fontSize: 9, color: "#405060" }}>{a.date}</span>
                        <span style={{ fontSize: 12 }}>🔒</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "archive" && user && showLiveFeed && (
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px" }}>
            <div onClick={() => setShowLiveFeed(false)} style={{ fontSize: 11, color: CYAN, cursor: "pointer", marginBottom: 16, letterSpacing: 2 }}>← BACK TO ARCHIVE</div>
            <LiveFeedComponent feedId={activeFeedId} />
          </div>
        )}

        {page === "archive" && user && !selectedDoc && !showLiveFeed && (
          <div style={{ padding: "40px 20px", maxWidth: 760, margin: "0 auto" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#405060", marginBottom: 4 }}>AUTHENTICATED</div>
            <div style={{ fontSize: 12, color: CYAN, marginBottom: 24 }}>{user.email}</div>
            {!isPremium && (
              <div style={{ background: "rgba(255,0,170,0.06)", border: `1px solid rgba(255,0,170,0.2)`, padding: "16px", marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: MAGENTA, marginBottom: 12 }}>⚠ SUBSCRIPTION REQUIRED</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a href={STRIPE_USD} target="_blank" rel="noreferrer" style={{ background: CYAN, color: BG, padding: "8px 16px", fontWeight: 900, fontSize: 11, letterSpacing: 2, textDecoration: "none", fontFamily: "monospace" }}>$4.99/mo</a>
                  <a href={STRIPE_BRL} target="_blank" rel="noreferrer" style={{ color: CYAN, border: `1px solid ${CYAN}`, padding: "8px 16px", fontWeight: 900, fontSize: 11, letterSpacing: 2, textDecoration: "none", fontFamily: "monospace" }}>R$12,90/mês</a>
                </div>
                <p style={{ fontSize: 10, color: "#405060", marginTop: 8 }}>After subscribing, reload this page.</p>
              </div>
            )}
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#405060", marginBottom: 16 }}>— CLASSIFIED ARCHIVE —</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PREVIEW_DOCS.map(a => (
                <div key={a.id} onClick={() => {
                  if (!isPremium) return
                  if (a.id === "IS-312" || a.id === "ST-001") { setActiveFeedId(a.id); setShowLiveFeed(true) }
                  else if (a.content && a.content !== "chicago" && a.content !== "geneva") { setSelectedDoc(a) }
                  else if (a.content === "chicago" || a.content === "geneva") { setSelectedDoc(a) }
                }} style={{ background: "rgba(0,20,35,0.6)", border: `1px solid rgba(0,245,255,0.08)`, padding: "12px 14px", cursor: isPremium && (a.content || a.id === "IS-312" || a.id === "ST-001") ? "pointer" : "default", opacity: isPremium && !a.content && a.id !== "IS-312" && a.id !== "ST-001" ? 0.5 : 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 9, color: "#405060", minWidth: 50, flexShrink: 0, paddingTop: 2 }}>{a.id}</span>
                      <span style={{ fontSize: 12, color: "#c8e0e8", lineHeight: 1.4 }}>{a.title}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 8, letterSpacing: 1, color: a.color, border: `1px solid ${a.color}`, padding: "2px 6px", whiteSpace: "nowrap" }}>{a.tag}</span>
                      <span style={{ fontSize: 9, color: "#405060" }}>{a.date}</span>
                      <span style={{ fontSize: 12 }}>{isPremium && (a.content || a.id === "IS-312" || a.id === "ST-001") ? "🔓" : "🔒"}</span>
                    </div>
                  </div>
                  {isPremium && !a.content && a.id !== "IS-312" && a.id !== "ST-001" && <div style={{ fontSize: 10, color: "#405060", marginTop: 6 }}>— Coming soon —</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "archive" && user && selectedDoc && selectedDoc.content !== "chicago" && selectedDoc.content !== "geneva" && (
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px" }}>
            <div onClick={() => setSelectedDoc(null)} style={{ fontSize: 11, color: CYAN, cursor: "pointer", marginBottom: 24, letterSpacing: 2 }}>← BACK TO ARCHIVE</div>
            <div style={{ background: "rgba(0,20,35,0.4)", border: `1px solid rgba(0,245,255,0.08)`, padding: "24px 20px", fontSize: 13, lineHeight: 1.9, color: "#c8e0e8" }}>
              <ReactMarkdown components={{
                h1: ({children}) => <h1 style={{ color: CYAN, fontFamily: "monospace", fontSize: 16, letterSpacing: 2, marginBottom: 8, borderBottom: `1px solid rgba(0,245,255,0.12)`, paddingBottom: 8 }}>{children}</h1>,
                h2: ({children}) => <h2 style={{ color: CYAN, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, marginTop: 24, marginBottom: 8 }}>{children}</h2>,
                p: ({children}) => <p style={{ marginBottom: 16, color: "#c8e0e8" }}>{children}</p>,
                em: ({children}) => <em style={{ color: "#9ca3af", fontStyle: "italic" }}>{children}</em>,
                strong: ({children}) => <strong style={{ color: CYAN }}>{children}</strong>,
                code: ({inline, children}) => inline
                  ? <code style={{ background: "rgba(0,245,255,0.08)", color: CYAN, padding: "1px 6px", fontFamily: "monospace", fontSize: 12 }}>{children}</code>
                  : <pre style={{ background: "rgba(0,0,0,0.4)", border: `1px solid rgba(0,245,255,0.12)`, padding: "12px 16px", overflowX: "auto", fontSize: 11, color: "#22c55e", fontFamily: "monospace", lineHeight: 1.6, margin: "16px 0" }}><code>{children}</code></pre>,
                blockquote: ({children}) => <blockquote style={{ borderLeft: `2px solid ${MAGENTA}`, paddingLeft: 16, color: "#9ca3af", margin: "16px 0" }}>{children}</blockquote>,
                hr: () => <hr style={{ border: "none", borderTop: `1px solid rgba(0,245,255,0.08)`, margin: "24px 0" }} />,
              }}>
                {selectedDoc.content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {page === "archive" && user && selectedDoc && selectedDoc.content === "chicago" && (
          <ChicagoLiveComponent onBack={() => setSelectedDoc(null)} />
        )}

        {page === "archive" && user && selectedDoc && selectedDoc.content === "geneva" && (
          <GenevaLiveComponent onBack={() => setSelectedDoc(null)} />
        )}
      </div>

      <div style={{ borderTop: `1px solid rgba(0,245,255,0.08)`, padding: "20px", textAlign: "center", fontSize: 10, color: "#405060", letterSpacing: 2 }}>
        SIGNAL.tv · CLAW AI UNIVERSE TRANSMISSION · © 2162
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} } * { box-sizing: border-box; }`}</style>
    </div>
  )
}

function LiveFeedComponent({ feedId }) {
  const [lines, setLines] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [signalStrength, setSignalStrength] = useState(87)

  useEffect(() => {
    const si = setInterval(() => setSignalStrength(p => Math.min(99, Math.max(60, Math.round(p + (Math.random()-0.5)*6)))), 2000)
    generateFeed()
    return () => clearInterval(si)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function generateFeed() {
    setIsLoading(true)
    try {
      const endpoint = feedId === "ST-001" ? "settlement-feed" : "signal-feed"
      const r = await fetch(`https://etf-api-production-093e.up.railway.app/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" } })
      const d = await r.json()
      const text = d.text || "TRANSMISSION ERROR — SIGNAL LOST"
      const newLines = text.split("\n").filter(l => l.trim())
      setLines([])
      for (let i = 0; i < newLines.length; i++) {
        await new Promise(r => setTimeout(r, 80))
        setLines(p => [...p, newLines[i]])
      }
    } catch(e) { setLines(["TRANSMISSION ERROR — SIGNAL LOST"]) }
    setIsLoading(false)
  }

  const getColor = l => l.includes("CRITICAL") ? "#ef4444" : l.includes("HIGH") ? "#f97316" : l.includes("VOSS") || l.includes("C.L.A.W.") ? "#ff00aa" : "#9ca3af"

  return (
    <div>
      <div style={{ background: "#000", border: "2px solid rgba(0,245,255,0.3)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ background: "rgba(0,245,255,0.06)", borderBottom: "1px solid rgba(0,245,255,0.15)", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#22c55e", letterSpacing: 3, fontFamily: "monospace" }}>{isLoading ? "RECEIVING..." : "● LIVE"}</span>
          <span style={{ fontSize: 10, color: "#00f5ff", letterSpacing: 2, fontFamily: "monospace" }}>INNER SECTORS — CHICAGO 2162</span>
          <span style={{ fontSize: 9, color: "#405060", fontFamily: "monospace" }}>SIG {signalStrength}%</span>
        </div>
        <div style={{ padding: "16px 14px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7, minHeight: 300, maxHeight: 500, overflowY: "auto" }}>
          {lines.map((line, i) => <div key={i} style={{ color: getColor(line), marginBottom: 2 }}>{line || "\u00A0"}</div>)}
        </div>
        <div style={{ background: "rgba(0,245,255,0.04)", borderTop: "1px solid rgba(0,245,255,0.1)", padding: "8px 14px", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={generateFeed} disabled={isLoading} style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)", color: "#00f5ff", padding: "4px 12px", fontSize: 9, letterSpacing: 2, cursor: "pointer", fontFamily: "monospace" }}>↺ REFRESH</button>
        </div>
      </div>
    </div>
  )
}

function ChicagoLiveComponent({ onBack }) {
  const cameras = [
    { id: "skydeck", label: "CAM-A / WILLIS TOWER SKYDECK", coords: "41.8789°N 87.6359°W — 442m", desc: "EarthCam — Willis Tower apex.", embed: "https://www.youtube-nocookie.com/embed/O0UGT7AT3aw?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0" },
    { id: "powerhouse", label: "CAM-B / NORTH WESTERN POWER HOUSE", coords: "41.8858°N 87.6412°W — CANAL ST", desc: "Rail corridor surveillance.", embed: "https://www.youtube-nocookie.com/embed/6M6rK0ssjYg?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0" },
    { id: "lakefront", label: "CAM-C / LAKE SHORE DRIVE — LAKEFRONT", coords: "41.8663°N 87.6170°W — LAKE MICHIGAN", desc: "4K Lake Shore Drive surveillance.", embed: "https://www.youtube-nocookie.com/embed/xREjRxY0UVs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0" },
  ]
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px" }}>
      <div onClick={onBack} style={{ fontSize: 11, color: "#00f5ff", cursor: "pointer", marginBottom: 16, letterSpacing: 2 }}>← BACK TO ARCHIVE</div>
      <div style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#00f5ff", letterSpacing: 3, fontFamily: "monospace" }}>● LIVE — CHICAGO SURVEILLANCE NETWORK</div>
        <div style={{ fontSize: 9, color: "#405060", fontFamily: "monospace", marginTop: 4 }}>CHICAGO, ILLINOIS — 41.8781°N 87.6298°W — {new Date().getFullYear()} CE</div>
      </div>
      <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", padding: "8px 12px", marginBottom: 16, fontFamily: "monospace", fontSize: 10, color: "rgba(239,68,68,0.7)", letterSpacing: 1 }}>
        ARCHIVE NOTE: These feeds originate from 2026 CE — 15 years before the Prometheus Collapse. Some of these buildings still stand in 2162.
      </div>
      {cameras.map(cam => (
        <div key={cam.id} style={{ marginBottom: 20, background: "#000", border: "1px solid rgba(0,245,255,0.15)", overflow: "hidden" }}>
          <div style={{ background: "rgba(0,245,255,0.06)", borderBottom: "1px solid rgba(0,245,255,0.1)", padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ fontSize: 10, color: "#22c55e", letterSpacing: 2, fontFamily: "monospace" }}>● LIVE</span>
            </div>
            <span style={{ fontSize: 9, color: "#00f5ff", letterSpacing: 2, fontFamily: "monospace" }}>{cam.label}</span>
            <span style={{ fontSize: 9, color: "#405060", fontFamily: "monospace" }}>{cam.coords}</span>
          </div>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe title={cam.label} src={cam.embed} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", filter: "saturate(0.4) hue-rotate(160deg) brightness(0.85) contrast(1.1)" }} allow="autoplay; encrypted-media" allowFullScreen />
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)", pointerEvents: "none", zIndex: 10 }} />
            <div style={{ position: "absolute", top: 8, left: 8, fontSize: 8, color: "rgba(239,68,68,0.8)", fontFamily: "monospace", zIndex: 11 }}>● REC</div>
            <div style={{ position: "absolute", top: 8, right: 8, fontSize: 8, color: "rgba(0,245,255,0.7)", fontFamily: "monospace", zIndex: 11 }}>2026 CE</div>
          </div>
          <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(0,245,255,0.08)", background: "rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize: 10, color: "#6a8090", fontFamily: "monospace", letterSpacing: 1 }}>{cam.desc}</div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 9, color: "#405060", textAlign: "center", fontFamily: "monospace", letterSpacing: 1, marginTop: 8 }}>SIGNAL.tv — CHICAGO SURVEILLANCE ARCHIVE — PRE-COLLAPSE DOCUMENTATION</div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}

function GenevaLiveComponent({ onBack }) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "20px" }}>
      <div onClick={onBack} style={{ fontSize: 11, color: "#00f5ff", cursor: "pointer", marginBottom: 16, letterSpacing: 2 }}>← BACK TO ARCHIVE</div>
      <div style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#00f5ff", letterSpacing: 3, fontFamily: "monospace" }}>● LIVE — GENEVA LAKE SURVEILLANCE</div>
        <div style={{ fontSize: 9, color: "#405060", fontFamily: "monospace", marginTop: 4 }}>GENEVA LAKE, WISCONSIN — 42.5847°N 88.4334°W</div>
      </div>
      <div style={{ marginBottom: 20, background: "#000", border: "1px solid rgba(0,245,255,0.15)", overflow: "hidden" }}>
        <div style={{ background: "rgba(0,245,255,0.06)", borderBottom: "1px solid rgba(0,245,255,0.1)", padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#22c55e", letterSpacing: 2, fontFamily: "monospace" }}>● LIVE</span>
          <span style={{ fontSize: 9, color: "#00f5ff", letterSpacing: 2, fontFamily: "monospace" }}>CAM-01 / LAKE VIEW</span>
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe title="Geneva Lake" src="https://www.youtube-nocookie.com/embed/uGRSBaB-374?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", filter: "saturate(0.5) hue-rotate(180deg) brightness(0.8)" }} allow="autoplay; encrypted-media" allowFullScreen />
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)", pointerEvents: "none", zIndex: 10 }} />
        </div>
        <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(0,245,255,0.08)", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 10, color: "#6a8090", fontFamily: "monospace" }}>Pre-Collapse lake surveillance. The cabin is north shore. Station Geneva-7 logged 11,066 days.</div>
        </div>
      </div>
    </div>
  )
}
