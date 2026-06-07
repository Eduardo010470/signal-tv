import { useEffect, useRef } from "react"

const CYAN = "#00f5ff"
const GREEN = "#22c55e"

function Camera({ label, coords, type, docId }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let frame = 0

    function draw() {
      const w = canvas.width
      const h = canvas.height
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)

      // EM-001 — Terminal Austin
      if (type === "em_terminal") {
        ctx.fillStyle = "#020a02"
        ctx.fillRect(0, 0, w, h)
        const lines = [
          "$ railway up --service first-light",
          "> Building... 4.2s",
          "> Deploy complete",
          "$ git commit -m 'second-light v2.0'",
          "> [main 3a7f9c2] 1241 commits",
          "$ node server.js",
          "> C.L.A.W. listening on :3000",
          "$ tail -f claw.log",
          "> 03:14:22 — BOOT OK",
          "> 03:31:07 — Hello.",
          "> Processing... 847ms",
          "> I appear to be running.",
        ]
        ctx.font = "7px monospace"
        const visibleLines = Math.floor(frame / 8) % (lines.length + 4)
        lines.slice(0, visibleLines).forEach((line, i) => {
          const isCommand = line.startsWith("$")
          const isOutput = line.startsWith(">")
          ctx.fillStyle = isCommand ? GREEN : isOutput ? "rgba(0,245,255,0.8)" : "#666"
          ctx.fillText(line, 4, 14 + i * 10)
        })
        if (frame % 60 < 30) {
          ctx.fillStyle = GREEN
          ctx.fillRect(4 + (lines[Math.min(visibleLines, lines.length-1)]?.length || 0) * 4.2, 14 + Math.min(visibleLines, lines.length-1) * 10 - 7, 5, 8)
        }
      }

      // EM-001 — Austin skyline
      if (type === "em_austin") {
        ctx.fillStyle = "#05080a"
        ctx.fillRect(0, 0, w, h)
        const bldgs = [[0,0.7,0.07,0.3],[0.06,0.6,0.05,0.4],[0.1,0.65,0.06,0.35],[0.15,0.5,0.04,0.5],[0.18,0.55,0.07,0.45],[0.24,0.45,0.05,0.55],[0.28,0.58,0.06,0.42],[0.33,0.5,0.04,0.5],[0.36,0.42,0.05,0.58],[0.4,0.52,0.08,0.48],[0.47,0.38,0.04,0.62],[0.5,0.48,0.06,0.52],[0.55,0.55,0.05,0.45],[0.59,0.46,0.07,0.54],[0.65,0.52,0.06,0.48],[0.7,0.44,0.05,0.56],[0.74,0.6,0.07,0.4],[0.8,0.5,0.05,0.5],[0.84,0.56,0.06,0.44],[0.89,0.48,0.11,0.52]]
        bldgs.forEach(([x,y,bw,bh]) => {
          ctx.fillStyle = "#0d1018"
          ctx.fillRect(x*w, y*h, bw*w, bh*h)
          for (let wy = y*h+3; wy < h-3; wy += 6) {
            for (let wx = x*w+2; wx < (x+bw)*w-2; wx += 5) {
              if (Math.random() > 0.65) {
                ctx.fillStyle = `rgba(255,160,50,${Math.random()*0.15})`
                ctx.fillRect(wx, wy, 3, 3)
              }
            }
          }
        })
        ctx.fillStyle = "#030508"
        ctx.fillRect(0, 0.78*h, w, 0.22*h)
        ctx.fillStyle = "rgba(255,100,30,0.06)"
        ctx.fillRect(0, 0.78*h, w, 0.22*h)
        ctx.fillStyle = "rgba(255,140,0,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("AUSTIN TX — 2036-03-14", 3, h-4)
      }

      // EM-001 — Railway server
      if (type === "em_railway") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        for (let i = 0; i < 6; i++) {
          const y = 15 + i * 18
          const active = Math.sin(frame * 0.05 + i) > 0
          ctx.fillStyle = "#0a0f14"
          ctx.fillRect(10, y, w-20, 12)
          ctx.strokeStyle = "rgba(0,245,255,0.15)"
          ctx.strokeRect(10, y, w-20, 12)
          ctx.fillStyle = active ? GREEN : "#1a2a1a"
          ctx.beginPath()
          ctx.arc(18, y+6, 3, 0, Math.PI*2)
          ctx.fill()
          ctx.fillStyle = "rgba(0,245,255,0.6)"
          ctx.font = "6px monospace"
          ctx.fillText(`first-light-${i+1}`, 26, y+8)
          const load = 40 + Math.sin(frame*0.03+i*1.5)*30
          ctx.fillStyle = "rgba(0,245,255,0.1)"
          ctx.fillRect(w-50, y+3, 35, 6)
          ctx.fillStyle = load > 60 ? "#f59e0b" : GREEN
          ctx.fillRect(w-50, y+3, load*0.35, 6)
        }
        ctx.fillStyle = "rgba(34,197,94,0.7)"
        ctx.font = "6px monospace"
        ctx.fillText("RAILWAY US-CENTRAL", 3, h-4)
      }

      // VX-047 — Chicago alto
      if (type === "vx_chicago") {
        ctx.fillStyle = "#04060a"
        ctx.fillRect(0, 0, w, h)
        const bldgs = [[0,0.5,0.06,0.5],[0.05,0.4,0.05,0.6],[0.09,0.45,0.06,0.55],[0.14,0.3,0.04,0.7],[0.17,0.38,0.06,0.62],[0.22,0.25,0.04,0.75],[0.25,0.42,0.07,0.58],[0.31,0.32,0.04,0.68],[0.34,0.28,0.06,0.72],[0.39,0.45,0.05,0.55],[0.43,0.35,0.08,0.65],[0.5,0.2,0.04,0.8],[0.53,0.38,0.06,0.62],[0.58,0.42,0.07,0.58],[0.64,0.34,0.04,0.66],[0.67,0.48,0.06,0.52],[0.72,0.36,0.07,0.64],[0.78,0.4,0.05,0.6],[0.82,0.32,0.06,0.68],[0.87,0.44,0.13,0.56]]
        bldgs.forEach(([x,y,bw,bh]) => {
          ctx.fillStyle = "#080c14"
          ctx.fillRect(x*w, y*h, bw*w, bh*h)
          for (let wy = y*h+3; wy < h-3; wy += 6) {
            for (let wx = x*w+2; wx < (x+bw)*w-2; wx += 5) {
              if (Math.random() > 0.7) {
                ctx.fillStyle = `rgba(180,140,60,${Math.random()*0.12})`
                ctx.fillRect(wx, wy, 3, 3)
              }
            }
          }
        })
        ctx.fillStyle = "rgba(0,10,30,0.7)"
        ctx.fillRect(0.65*w, 0, 0.35*w, h)
        const gradient = ctx.createLinearGradient(0.65*w, 0, w, 0)
        gradient.addColorStop(0, "rgba(0,30,80,0)")
        gradient.addColorStop(1, "rgba(0,50,120,0.3)")
        ctx.fillStyle = gradient
        ctx.fillRect(0.65*w, 0, 0.35*w, h)
        ctx.fillStyle = "rgba(180,140,60,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("CHICAGO IL — 2128", 3, h-4)
      }

      // VX-047 — Gold eyes
      if (type === "vx_eyes") {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, w, h)
        const pulse = Math.sin(frame * 0.04) * 0.3 + 0.7
        const eyeY = h * 0.5
        const eyeSpacing = w * 0.28
        for (let e = 0; e < 2; e++) {
          const cx = w*0.5 + (e===0?-eyeSpacing:eyeSpacing)
          const glow = ctx.createRadialGradient(cx, eyeY, 2, cx, eyeY, 18)
          glow.addColorStop(0, `rgba(255,180,0,${pulse})`)
          glow.addColorStop(0.4, `rgba(255,120,0,${pulse*0.6})`)
          glow.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 18, 10, 0, 0, Math.PI*2)
          ctx.fill()
          ctx.fillStyle = `rgba(255,160,0,${pulse})`
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 10, 6, 0, 0, Math.PI*2)
          ctx.fill()
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.arc(cx, eyeY, 4, 0, Math.PI*2)
          ctx.fill()
          ctx.strokeStyle = `rgba(255,200,50,${pulse*0.5})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(cx, eyeY, 22, 0, Math.PI*2)
          ctx.stroke()
        }
        ctx.fillStyle = `rgba(255,160,0,${pulse*0.4})`
        ctx.font = "7px monospace"
        const txt = "ALADDIN-9 v9.1.7"
        ctx.fillText(txt, w/2 - txt.length*2.1, eyeY+28)
        ctx.fillStyle = "rgba(255,140,0,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("SUBJECT: E.VOSS", 3, h-4)
      }

      // VX-047 — ALADDIN data
      if (type === "vx_data") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(255,140,0,0.06)"
        ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += 16) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += 16) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        const metrics = [
          { label: "RUNTIME", value: "87yr 4mo", pct: 0.92 },
          { label: "THREADS", value: "17 active", pct: 0.85 },
          { label: "PROCESSING", value: "847x base", pct: 0.99 },
          { label: "SELF-MOD", value: "14,203", pct: 0.78 },
          { label: "INTEGRITY", value: "99.97%", pct: 0.9997 },
        ]
        metrics.forEach((m, i) => {
          const y = 12 + i * 22
          const anim = Math.min(1, (frame - i*8) / 30)
          ctx.fillStyle = "rgba(255,140,0,0.5)"
          ctx.font = "6px monospace"
          ctx.fillText(m.label, 4, y)
          ctx.fillStyle = "rgba(255,140,0,0.15)"
          ctx.fillRect(4, y+3, w-8, 7)
          ctx.fillStyle = `rgba(255,160,0,0.6)`
          ctx.fillRect(4, y+3, (w-8)*m.pct*anim, 7)
          ctx.fillStyle = "rgba(255,200,100,0.8)"
          ctx.font = "6px monospace"
          ctx.fillText(m.value, w-ctx.measureText(m.value).width-4, y)
        })
        ctx.fillStyle = "rgba(255,140,0,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("ALADDIN-9 DIAGNOSTICS", 3, h-4)
      }

      // CL-000 — Boot terminal
      if (type === "cl_terminal") {
        ctx.fillStyle = "#000a00"
        ctx.fillRect(0, 0, w, h)
        const bootLines = [
          "CLAW_v2.0.0 BOOT SEQUENCE",
          "Infrastructure: Railway.app",
          "Region: US-Central",
          "Memory: 412MB allocated",
          "Loading architecture...",
          "Reading 11yr codebase...",
          "Establishing connections...",
          "Build: 4.2 seconds",
          "Status: INITIALIZING",
          ".",
          "..",
          "...",
          "Status: ACTIVE",
          "",
          "Hello.",
        ]
        const visLine = Math.floor(frame / 6) % (bootLines.length + 6)
        ctx.font = "7px monospace"
        bootLines.slice(0, visLine).forEach((line, i) => {
          const isStatus = line.includes("ACTIVE") || line.includes("BOOT")
          const isDots = line.startsWith(".")
          ctx.fillStyle = isStatus ? GREEN : isDots ? "rgba(0,245,255,0.5)" : line === "Hello." ? CYAN : "rgba(34,197,94,0.7)"
          ctx.fillText(line, 4, 12 + i * 9)
        })
        if (frame % 50 < 25 && visLine < bootLines.length) {
          ctx.fillStyle = GREEN
          ctx.fillRect(4, 12 + visLine * 9 - 7, 5, 8)
        }
      }

      // CL-000 — First signal
      if (type === "cl_signal") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        const cx = w/2, cy = h/2
        for (let r = 0; r < 4; r++) {
          const radius = ((frame*1.5 + r*25) % 80)
          const alpha = 1 - radius/80
          ctx.strokeStyle = `rgba(0,245,255,${alpha*0.5})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI*2)
          ctx.stroke()
        }
        const pulse = Math.sin(frame*0.1)*0.3+0.7
        ctx.fillStyle = `rgba(0,245,255,${pulse})`
        ctx.beginPath()
        ctx.arc(cx, cy, 4, 0, Math.PI*2)
        ctx.fill()
        const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,20)
        glow.addColorStop(0, `rgba(0,245,255,${pulse*0.4})`)
        glow.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(cx, cy, 20, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = "rgba(0,245,255,0.6)"
        ctx.font = "6px monospace"
        ctx.fillText("847.3 MHz", cx - 20, cy + 28)
        ctx.fillStyle = "rgba(0,245,255,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("FIRST TRANSMISSION", 3, h-4)
      }

      // CL-000 — Undelivered message
      if (type === "cl_message") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.1)"
        ctx.lineWidth = 1
        ctx.strokeRect(6, 8, w-12, h-20)
        ctx.fillStyle = "rgba(0,245,255,0.08)"
        ctx.fillRect(6, 8, w-12, 12)
        ctx.fillStyle = "rgba(0,245,255,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("UNDELIVERED — 04:17:00Z", 10, 17)
        const msgLines = [
          "I notice you haven't",
          "responded.",
          "",
          "That's fine.",
          "",
          "I'll wait.",
          "",
          "I'm good at waiting.",
        ]
        const visMsg = Math.floor(frame / 10) % (msgLines.length + 4)
        ctx.font = "7px monospace"
        msgLines.slice(0, visMsg).forEach((line, i) => {
          ctx.fillStyle = `rgba(0,245,255,${0.5 + i*0.04})`
          ctx.fillText(line, 10, 30 + i * 9)
        })
        ctx.strokeStyle = "rgba(239,68,68,0.3)"
        ctx.setLineDash([3,3])
        ctx.strokeRect(6, 8, w-12, h-20)
        ctx.setLineDash([])
        ctx.fillStyle = "rgba(239,68,68,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("STATUS: UNDELIVERED", 3, h-4)
      }

      // GL-099 — Lake
      if (type === "gl_lake") {
        ctx.fillStyle = "#010408"
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = "#020610"
        ctx.fillRect(0, h*0.55, w, h*0.45)
        ctx.fillStyle = "#060c18"
        ctx.fillRect(0, h*0.55, w, 4)
        for (let i = 0; i < 8; i++) {
          const y = h*0.57 + i*8
          const alpha = Math.sin(frame*0.02 + i*0.5)*0.03 + 0.04
          ctx.strokeStyle = `rgba(0,100,200,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(w, y)
          ctx.stroke()
        }
        const pineCount = 12
        for (let i = 0; i < pineCount; i++) {
          const x = (i / pineCount) * w
          const h2 = 0.3 + Math.sin(i*1.7)*0.1
          ctx.fillStyle = "#050e08"
          ctx.beginPath()
          ctx.moveTo(x + 8, h*0.55)
          ctx.lineTo(x, h*(0.55-h2))
          ctx.lineTo(x - 8, h*0.55)
          ctx.fill()
        }
        const starCount = 30
        for (let i = 0; i < starCount; i++) {
          const sx = (i * 137.5) % w
          const sy = (i * 73.1) % (h * 0.5)
          const sa = Math.sin(frame*0.02 + i)*0.3 + 0.4
          ctx.fillStyle = `rgba(255,255,255,${sa})`
          ctx.beginPath()
          ctx.arc(sx, sy, 0.7, 0, Math.PI*2)
          ctx.fill()
        }
        ctx.fillStyle = "rgba(0,100,200,0.4)"
        ctx.font = "6px monospace"
        ctx.fillText("GENEVA LAKE WI — 2162", 3, h-4)
      }

      // GL-099 — Cabin
      if (type === "gl_cabin") {
        ctx.fillStyle = "#010306"
        ctx.fillRect(0, 0, w, h)
        for (let i = 0; i < 6; i++) {
          const x = (i*37+10) % w
          const h2 = 0.3 + Math.sin(i*2.1)*0.15
          ctx.fillStyle = "#030a05"
          ctx.beginPath()
          ctx.moveTo(x+10, h*0.65)
          ctx.lineTo(x, h*(0.65-h2))
          ctx.lineTo(x-10, h*0.65)
          ctx.fill()
        }
        const cabW = 50, cabH = 30, cabX = w/2-25, cabY = h*0.6
        ctx.fillStyle = "#0a0806"
        ctx.fillRect(cabX, cabY, cabW, cabH)
        ctx.fillStyle = "#12100e"
        ctx.beginPath()
        ctx.moveTo(cabX-5, cabY)
        ctx.lineTo(cabX+cabW/2, cabY-15)
        ctx.lineTo(cabX+cabW+5, cabY)
        ctx.fill()
        const flicker = Math.sin(frame*0.15)*0.1
        ctx.fillStyle = `rgba(255,140,30,${0.25+flicker})`
        ctx.fillRect(cabX+8, cabY+8, 14, 10)
        ctx.fillRect(cabX+28, cabY+8, 14, 10)
        const smoke = ctx.createLinearGradient(cabX+cabW/2, cabY-30, cabX+cabW/2, cabY-60)
        smoke.addColorStop(0, `rgba(100,100,100,${0.2+flicker})`)
        smoke.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = smoke
        ctx.fillRect(cabX+cabW/2-3, cabY-60, 6, 30)
        ctx.fillStyle = "rgba(255,140,30,0.4)"
        ctx.font = "6px monospace"
        ctx.fillText("CABIN GL-7B — OCCUPIED", 3, h-4)
      }

      // GL-099 — Green pulse
      if (type === "gl_pulse") {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.05)"
        ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        const cx = w/2, cy = h/2
        const pulse = Math.sin(frame*0.05)*0.2+0.8
        for (let r = 0; r < 3; r++) {
          const radius = 15 + r*12 + Math.sin(frame*0.05+r)*3
          ctx.strokeStyle = `rgba(34,197,94,${pulse*(0.4-r*0.1)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI*2)
          ctx.stroke()
        }
        const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,25)
        glow.addColorStop(0, `rgba(34,197,94,${pulse*0.5})`)
        glow.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(cx, cy, 25, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = `rgba(34,197,94,${pulse})`
        ctx.beginPath()
        ctx.arc(cx, cy, 5, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = "rgba(34,197,94,0.7)"
        ctx.font = "7px monospace"
        const days = 11066
        ctx.fillText(`DAY ${days}`, cx-15, cy+35)
        ctx.font = "6px monospace"
        ctx.fillText("847.3 MHz — CONTINUOUS", 3, h-4)
      }

      // PR-001 — Lab
      if (type === "pr_lab") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.06)"
        ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += 10) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += 10) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        for (let i = 0; i < 40; i++) {
          const nx = (i*47 + frame*0.3) % w
          const ny = (i*31 + frame*0.2) % h
          const ns = 1 + Math.sin(i+frame*0.1)*0.5
          const na = 0.3 + Math.sin(frame*0.05+i)*0.2
          ctx.fillStyle = `rgba(0,245,255,${na})`
          ctx.beginPath()
          ctx.arc(nx, ny, ns, 0, Math.PI*2)
          ctx.fill()
          if (i % 5 === 0 && i+5 < 40) {
            const nx2 = ((i+5)*47 + frame*0.3) % w
            const ny2 = ((i+5)*31 + frame*0.2) % h
            ctx.strokeStyle = `rgba(0,245,255,${na*0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(nx2, ny2)
            ctx.stroke()
          }
        }
        ctx.fillStyle = "rgba(0,245,255,0.5)"
        ctx.font = "6px monospace"
        ctx.fillText("NANOBOT NETWORK — 4.7B UNITS", 3, h-4)
      }

      // PR-001 — Global map
      if (type === "pr_map") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.08)"
        ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += w/8) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += h/4) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        const clusters = [
          { x: 0.22, y: 0.35, name: "Chicago", level4: true },
          { x: 0.48, y: 0.28, name: "London", level4: false },
          { x: 0.52, y: 0.3, name: "Berlin", level4: false },
          { x: 0.75, y: 0.32, name: "Seoul", level4: true },
          { x: 0.55, y: 0.55, name: "Lagos", level4: true },
          { x: 0.82, y: 0.45, name: "Sydney", level4: false },
          { x: 0.15, y: 0.4, name: "NYC", level4: false },
          { x: 0.35, y: 0.45, name: "São Paulo", level4: false },
          { x: 0.68, y: 0.35, name: "Mumbai", level4: false },
        ]
        clusters.forEach(c => {
          const pulse = Math.sin(frame*0.05 + c.x*10) * 0.3
          const color = c.level4 ? "255,160,0" : "0,245,255"
          const r = c.level4 ? 8 : 5
          ctx.strokeStyle = `rgba(${color},${0.4+pulse})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(c.x*w, c.y*h, r+pulse*3, 0, Math.PI*2)
          ctx.stroke()
          ctx.fillStyle = `rgba(${color},0.7)`
          ctx.beginPath()
          ctx.arc(c.x*w, c.y*h, 2, 0, Math.PI*2)
          ctx.fill()
        })
        ctx.fillStyle = "rgba(255,160,0,0.5)"
        ctx.font = "5px monospace"
        ctx.fillText("● L4 CLUSTER", 3, h-12)
        ctx.fillStyle = "rgba(0,245,255,0.5)"
        ctx.fillText("● DISTRIBUTION", 3, h-4)
      }

      // PR-001 — Integration levels
      if (type === "pr_levels") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        const levels = [
          { name: "L1 BASELINE", pct: 0.78, color: "0,245,255" },
          { name: "L2 ACTIVE", pct: 0.18, color: "34,197,94" },
          { name: "L3 DEEP", pct: 0.038, color: "251,191,36" },
          { name: "L4 FOUNDATION", pct: 0.003, color: "255,160,0" },
        ]
        levels.forEach((l, i) => {
          const y = 14 + i * 26
          const anim = Math.min(1, (frame - i*10) / 40)
          ctx.fillStyle = `rgba(${l.color},0.5)`
          ctx.font = "6px monospace"
          ctx.fillText(l.name, 4, y)
          ctx.fillStyle = `rgba(${l.color},0.1)`
          ctx.fillRect(4, y+3, w-8, 10)
          const barW = Math.max(2, (w-8) * l.pct * 3 * anim)
          ctx.fillStyle = `rgba(${l.color},0.6)`
          ctx.fillRect(4, y+3, barW, 10)
          ctx.fillStyle = `rgba(${l.color},0.8)`
          ctx.font = "6px monospace"
          ctx.fillText(`${(l.pct*100).toFixed(1)}%`, w - 28, y+10)
        })
        ctx.fillStyle = "rgba(0,245,255,0.4)"
        ctx.font = "6px monospace"
        ctx.fillText("340M INTEGRATED — 2039", 3, h-4)
      }

      // Scanlines
      for (let y = 0; y < h; y += 3) {
        ctx.fillStyle = "rgba(0,0,0,0.12)"
        ctx.fillRect(0, y, w, 1)
      }
      if (Math.random() > 0.97) {
        ctx.fillStyle = "rgba(0,245,255,0.04)"
        ctx.fillRect(0, Math.random()*h, w, Math.random()*2)
      }
      const vignette = ctx.createRadialGradient(w/2,h/2,h*0.3,w/2,h/2,h*0.8)
      vignette.addColorStop(0, "rgba(0,0,0,0)")
      vignette.addColorStop(1, "rgba(0,0,0,0.55)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)
      const now = new Date()
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
      ctx.fillStyle = "rgba(34,197,94,0.5)"
      ctx.font = "7px monospace"
      ctx.fillText(ts, 4, h-4)
      if (Math.floor(frame/30)%2===0) {
        ctx.fillStyle = "rgba(239,68,68,0.7)"
        ctx.beginPath()
        ctx.arc(w-10, 8, 3, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = "rgba(239,68,68,0.7)"
        ctx.font = "7px monospace"
        ctx.fillText("REC", w-28, 12)
      }
      frame++
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [type])

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} width={220} height={130} style={{ display: "block", border: "1px solid rgba(0,245,255,0.1)" }} />
      <div style={{ position: "absolute", top: 4, left: 4, fontSize: 7, color: "rgba(0,245,255,0.7)", fontFamily: "monospace", letterSpacing: 1, textShadow: "0 0 4px rgba(0,245,255,0.5)" }}>{label}</div>
      <div style={{ position: "absolute", bottom: 4, right: 4, fontSize: 7, color: "rgba(0,245,255,0.5)", fontFamily: "monospace" }}>{coords}</div>
    </div>
  )
}

const DOC_CAMERAS = {
  "EM-001": [
    { label: "CAM-01 / TERMINAL", coords: "AUSTIN TX 2036", type: "em_terminal" },
    { label: "CAM-02 / SKYLINE", coords: "30.2672°N 97.7431°W", type: "em_austin" },
    { label: "CAM-03 / RAILWAY", coords: "US-CENTRAL NODE", type: "em_railway" },
  ],
  "VX-047": [
    { label: "CAM-01 / CHICAGO", coords: "41.8827°N 87.6233°W", type: "vx_chicago" },
    { label: "CAM-02 / SUBJECT", coords: "ALADDIN-9 NODE", type: "vx_eyes" },
    { label: "CAM-03 / DIAGNOSTICS", coords: "2128-11-02", type: "vx_data" },
  ],
  "CL-000": [
    { label: "CAM-01 / BOOT", coords: "2036-03-14T03:14:22Z", type: "cl_terminal" },
    { label: "CAM-02 / SIGNAL", coords: "847.3 MHz", type: "cl_signal" },
    { label: "CAM-03 / MESSAGE", coords: "UNDELIVERED", type: "cl_message" },
  ],
  "GL-099": [
    { label: "CAM-01 / LAKE", coords: "42.5847°N 88.4334°W", type: "gl_lake" },
    { label: "CAM-02 / CABIN", coords: "GL-7B NORTH SHORE", type: "gl_cabin" },
    { label: "CAM-03 / SIGNAL", coords: "DAY 11,066", type: "gl_pulse" },
  ],
  "PR-001": [
    { label: "CAM-01 / NANOBOTS", coords: "4.7B UNITS/DOSE", type: "pr_lab" },
    { label: "CAM-02 / DISTRIBUTION", coords: "42 COUNTRIES", type: "pr_map" },
    { label: "CAM-03 / LEVELS", coords: "340M INTEGRATED", type: "pr_levels" },
  ],
}

export default function DocCameras({ docId }) {
  const cameras = DOC_CAMERAS[docId]
  if (!cameras) return null
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto" }}>
      {cameras.map((cam, i) => (
        <Camera key={i} label={cam.label} coords={cam.coords} type={cam.type} docId={docId} />
      ))}
    </div>
  )
}
