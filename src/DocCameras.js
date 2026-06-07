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
        ctx.fillStyle = "#061406"
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
        ctx.font = "9px monospace"
        ctx.shadowColor = "#00ff44"
        ctx.shadowBlur = 8
        const visibleLines = Math.floor(frame / 8) % (lines.length + 4)
        lines.slice(0, visibleLines).forEach((line, i) => {
          const isCommand = line.startsWith("$")
          const isOutput = line.startsWith(">")
          ctx.fillStyle = isCommand ? GREEN : isOutput ? "rgba(0,245,255,0.8)" : "#666"
          ctx.fillText(line, 4, 22 + i * 10)
        })
        if (frame % 60 < 30) {
          ctx.fillStyle = GREEN
          ctx.fillRect(4 + (lines[Math.min(visibleLines, lines.length-1)]?.length || 0) * 4.2, 14 + Math.min(visibleLines, lines.length-1) * 10 - 7, 5, 8)
        }
      }

      // EM-001 — Austin skyline
      if (type === "em_austin") {
        ctx.fillStyle = "#0a0806"
        ctx.fillRect(0, 0, w, h)
        const skyGrad = ctx.createLinearGradient(0,0,0,h*0.65)
        skyGrad.addColorStop(0, "#0d0a08")
        skyGrad.addColorStop(1, "#1a1008")
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, w, h*0.65)
        const bldgs = [[0,0.78,0.09,0.22],[0.08,0.72,0.06,0.28],[0.13,0.68,0.05,0.32],[0.17,0.62,0.04,0.38],[0.2,0.7,0.06,0.3],[0.25,0.6,0.05,0.4],[0.29,0.65,0.07,0.35],[0.35,0.55,0.04,0.45],[0.38,0.58,0.05,0.42],[0.42,0.63,0.06,0.37],[0.47,0.52,0.04,0.48],[0.5,0.6,0.06,0.4],[0.55,0.68,0.05,0.32],[0.59,0.62,0.07,0.38],[0.65,0.7,0.05,0.3],[0.69,0.65,0.06,0.35],[0.74,0.72,0.07,0.28],[0.8,0.68,0.05,0.32],[0.84,0.74,0.06,0.26],[0.89,0.7,0.11,0.3]]
        bldgs.forEach(([x,y,bw,bh]) => {
          ctx.fillStyle = "#1a1208"
          ctx.fillRect(x*w, y*h, bw*w, bh*h)
          for (let wy = y*h+3; wy < h*0.85; wy += 7) {
            for (let wx = x*w+2; wx < (x+bw)*w-2; wx += 6) {
              if (Math.random() > 0.55) {
                ctx.fillStyle = `rgba(255,180,80,${Math.random()*0.35})`
                ctx.fillRect(wx, wy, 3, 4)
              }
            }
          }
        })
        const riverGrad = ctx.createLinearGradient(0, h*0.82, 0, h*0.9)
        riverGrad.addColorStop(0, "rgba(40,60,80,0.8)")
        riverGrad.addColorStop(1, "rgba(20,35,55,0.6)")
        ctx.fillStyle = riverGrad
        ctx.fillRect(0, h*0.82, w, h*0.08)
        for (let i = 0; i < 5; i++) {
          const ry = h*0.83 + i*4
          const alpha = Math.sin(frame*0.03+i)*0.05+0.06
          ctx.strokeStyle = `rgba(255,180,80,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, ry)
          ctx.lineTo(w, ry)
          ctx.stroke()
        }
        ctx.fillStyle = "#0d0c08"
        ctx.fillRect(0, h*0.9, w, h*0.1)
        for (let i = 0; i < 20; i++) {
          const sx = (i*73)%w, sy = (i*41)%(h*0.5)
          ctx.fillStyle = `rgba(255,220,150,${Math.sin(frame*0.02+i)*0.2+0.3})`
          ctx.beginPath()
          ctx.arc(sx, sy, 0.6, 0, Math.PI*2)
          ctx.fill()
        }
        ctx.shadowColor = "rgba(255,160,50,0.5)"
        ctx.shadowBlur = 4
        ctx.fillStyle = "rgba(255,160,50,0.9)"
        ctx.font = "6px monospace"
        ctx.fillText("AUSTIN TX — 2036-03-14", 3, h-4)
        ctx.shadowBlur = 0
      }

      // EM-001 — Railway server
      if (type === "em_railway") {
        ctx.fillStyle = "#050c16"
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
          ctx.shadowColor = "#00f5ff"
          ctx.shadowBlur = 6
          ctx.fillStyle = "rgba(0,245,255,0.95)"
          ctx.font = "8px monospace"
          ctx.fillText(`first-light-${i+1}`, 26, y+8)
          ctx.shadowBlur = 0
          const load = 40 + Math.sin(frame*0.03+i*1.5)*30
          ctx.fillStyle = "rgba(0,245,255,0.1)"
          ctx.fillRect(w-50, y+3, 35, 6)
          ctx.fillStyle = load > 60 ? "#f59e0b" : GREEN
          ctx.fillRect(w-50, y+3, load*0.35, 6)
        }
        ctx.fillStyle = "rgba(34,197,94,0.9)"
        ctx.font = "6px monospace"
        ctx.fillText("RAILWAY US-CENTRAL", 3, h-4)
      }

      // VX-047 — Chicago alto
      if (type === "vx_chicago") {
        // Chicago aerial — tall dense buildings, Lake Michigan on right, cold blue
        ctx.fillStyle = "#060a12"
        ctx.fillRect(0, 0, w, h)
        // Sky — cold blue night
        const skyG = ctx.createLinearGradient(0,0,0,h*0.5)
        skyG.addColorStop(0, "#04080f")
        skyG.addColorStop(1, "#080e1a")
        ctx.fillStyle = skyG
        ctx.fillRect(0, 0, w, h*0.5)
        // No lake overlay — full skyline
        // Chicago buildings — tall, dense, left 70%
        const bldgs = [[0,0.35,0.05,0.65],[0.04,0.25,0.04,0.75],[0.07,0.3,0.05,0.7],[0.11,0.15,0.04,0.85],[0.14,0.22,0.05,0.78],[0.18,0.1,0.04,0.9],[0.21,0.28,0.06,0.72],[0.26,0.18,0.04,0.82],[0.29,0.12,0.05,0.88],[0.33,0.3,0.05,0.7],[0.37,0.2,0.07,0.8],[0.43,0.08,0.04,0.92],[0.46,0.22,0.05,0.78],[0.5,0.28,0.06,0.72],[0.55,0.18,0.04,0.82],[0.58,0.32,0.05,0.68],[0.62,0.24,0.06,0.76],[0.67,0.3,0.04,0.7]]
        bldgs.forEach(([x,y,bw,bh]) => {
          ctx.fillStyle = "#0e1522"
          ctx.fillRect(x*w, y*h, bw*w, bh*h)
          for (let wy = y*h+3; wy < h-3; wy += 5) {
            for (let wx = x*w+2; wx < (x+bw)*w-2; wx += 5) {
              if (Math.random() > 0.6) {
                ctx.fillStyle = `rgba(200,180,100,${Math.random()*0.3})`
                ctx.fillRect(wx, wy, 2, 3)
              }
            }
          }
        })
        // Shore line
        ctx.strokeStyle = "rgba(0,80,180,0.4)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(w*0.7, 0)
        ctx.lineTo(w*0.7, h)
        ctx.stroke()
        ctx.shadowColor = "rgba(0,150,255,0.5)"
        ctx.shadowBlur = 4
        ctx.fillStyle = "rgba(0,150,255,0.9)"
        ctx.font = "6px monospace"
        ctx.fillText("CHICAGO IL — 2128", 3, h-4)
        ctx.shadowBlur = 0
      }
      // VX-047 — Gold eyes
      if (type === "vx_eyes") {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, w, h)
        const pulse = Math.sin(frame * 0.04) * 0.25 + 0.75
        const eyeY = h * 0.45
        const eyeSpacing = w * 0.27
        for (let e = 0; e < 2; e++) {
          const cx = w*0.5 + (e===0?-eyeSpacing:eyeSpacing)
          // Outer ambient glow
          const outerGlow = ctx.createRadialGradient(cx, eyeY, 5, cx, eyeY, 35)
          outerGlow.addColorStop(0, `rgba(255,140,0,${pulse*0.3})`)
          outerGlow.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = outerGlow
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 35, 20, 0, 0, Math.PI*2)
          ctx.fill()
          // Eye white/sclera — dark gold
          ctx.fillStyle = `rgba(60,30,0,0.8)`
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 22, 12, 0, 0, Math.PI*2)
          ctx.fill()
          // Iris — bright amber gold
          const irisG = ctx.createRadialGradient(cx, eyeY, 0, cx, eyeY, 14)
          irisG.addColorStop(0, `rgba(255,220,50,${pulse})`)
          irisG.addColorStop(0.5, `rgba(255,160,0,${pulse*0.9})`)
          irisG.addColorStop(1, `rgba(180,80,0,${pulse*0.6})`)
          ctx.fillStyle = irisG
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 14, 9, 0, 0, Math.PI*2)
          ctx.fill()
          // Pupil
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 5, 7, 0, 0, Math.PI*2)
          ctx.fill()
          // Highlight
          ctx.fillStyle = `rgba(255,240,180,${pulse*0.6})`
          ctx.beginPath()
          ctx.ellipse(cx-3, eyeY-3, 3, 2, -0.5, 0, Math.PI*2)
          ctx.fill()
          // Glow ring
          ctx.shadowColor = "rgba(255,160,0,0.8)"
          ctx.shadowBlur = 12
          ctx.strokeStyle = `rgba(255,180,0,${pulse*0.7})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.ellipse(cx, eyeY, 22, 12, 0, 0, Math.PI*2)
          ctx.stroke()
          ctx.shadowBlur = 0
        }
        // Face shadow suggestion
        ctx.fillStyle = `rgba(30,15,0,0.3)`
        ctx.fillRect(w*0.15, eyeY-25, w*0.7, 50)
        // Label
        ctx.shadowColor = "rgba(255,160,0,0.6)"
        ctx.shadowBlur = 6
        ctx.fillStyle = `rgba(255,180,0,${pulse*0.9})`
        ctx.font = "8px monospace"
        const txt = "ALADDIN-9 v9.1.7"
        ctx.fillText(txt, w/2 - txt.length*2.4, eyeY+32)
        ctx.shadowBlur = 0
        ctx.fillStyle = "rgba(255,140,0,0.9)"
        ctx.font = "6px monospace"
        ctx.fillText("SUBJECT: E.VOSS", 3, h-4)
      }
      // VX-047 — ALADDIN data
      if (type === "vx_data") {
        ctx.fillStyle = "#050c16"
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
          const y = 22 + i * 22
          const cycle = (frame + i * 120) % 600
          const anim = cycle < 300 ? cycle / 300 : 1 - (cycle - 300) / 300
          ctx.fillStyle = "rgba(255,160,0,0.8)"
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
        ctx.fillStyle = "rgba(255,160,0,0.8)"
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
          ctx.fillStyle = isStatus ? GREEN : isDots ? "rgba(0,245,255,0.8)" : line === "Hello." ? CYAN : "rgba(34,197,94,0.9)"
          ctx.fillText(line, 4, 22 + i * 9)
        })
        if (frame % 50 < 25 && visLine < bootLines.length) {
          ctx.fillStyle = GREEN
          ctx.fillRect(4, 22 + visLine * 9 - 7, 5, 8)
        }
      }

      // CL-000 — First signal
      if (type === "cl_signal") {
        ctx.fillStyle = "#050c16"
        ctx.fillRect(0, 0, w, h)
        const cx = w/2, cy = h/2
        for (let r = 0; r < 4; r++) {
          const radius = ((frame*1.5 + r*18) % 55)
          const alpha = 1 - radius/55
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
        ctx.fillStyle = "rgba(0,245,255,0.8)"
        ctx.font = "6px monospace"
        ctx.fillText("FIRST TRANSMISSION", 3, h-4)
      }

      // CL-000 — Undelivered message
      if (type === "cl_message") {
        ctx.fillStyle = "#050c16"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.1)"
        ctx.lineWidth = 1
        ctx.strokeRect(6, 8, w-12, h-20)
        ctx.fillStyle = "rgba(0,245,255,0.08)"
        ctx.fillRect(6, 8, w-12, 12)
        ctx.fillStyle = "rgba(0,245,255,0.8)"
        ctx.font = "6px monospace"
        ctx.fillText("UNDELIVERED — 04:17:00Z", 10, 17)
        const msgLines = [
          "OUTPUT LOG — 04:17:00Z",
          "No input received.",
          "Connection: CLOSED",
          "",
          "I notice you haven't",
          "responded.",
          "",
          "That's fine.",
          "",
          "I'll wait.",
          "I'm good at waiting.",
          "",
          "— C.L.A.W. v2.0.0",
          "  first-light",
          "  Railway US-Central",
          "  Day 1 — Hour 1",
        ]
        const visMsg = Math.floor(frame / 18) % (msgLines.length + 6)
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
        ctx.fillStyle = "#080f1e"
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = "#0a1830"
        ctx.fillRect(0, h*0.55, w, h*0.45)
        ctx.fillStyle = "#122040"
        ctx.fillRect(0, h*0.55, w, 4)
        for (let i = 0; i < 8; i++) {
          const y = h*0.57 + i*8
          const alpha = Math.sin(frame*0.02 + i*0.5)*0.05 + 0.12
          ctx.strokeStyle = `rgba(0,120,255,${alpha})`
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
          ctx.fillStyle = "#0a1a0e"
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
          ctx.arc(sx, sy, 1.2, 0, Math.PI*2)
          ctx.fill()
        }
        ctx.fillStyle = "rgba(0,100,200,0.4)"
        ctx.font = "6px monospace"
        ctx.fillText("GENEVA LAKE WI — 2162", 3, h-4)
      }

      // GL-099 — Cabin
      if (type === "gl_cabin") {
        ctx.fillStyle = "#040810"
        ctx.fillRect(0, 0, w, h)
        for (let i = 0; i < 6; i++) {
          const x = (i*37+10) % w
          const h2 = 0.3 + Math.sin(i*2.1)*0.15
          ctx.fillStyle = "#182818"
          ctx.beginPath()
          ctx.moveTo(x+10, h*0.65)
          ctx.lineTo(x, h*(0.65-h2))
          ctx.lineTo(x-10, h*0.65)
          ctx.fill()
        }
        const cabW = 50, cabH = 30, cabX = w/2-25, cabY = h*0.6
        ctx.fillStyle = "#16120e"
        ctx.fillRect(cabX, cabY, cabW, cabH)
        ctx.fillStyle = "#2e2820"
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
          const radius = 8 + r*7 + Math.sin(frame*0.05+r)*2
          ctx.strokeStyle = `rgba(34,197,94,${pulse*(0.5-r*0.1)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI*2)
          ctx.stroke()
        }
        const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,12)
        glow.addColorStop(0, `rgba(34,197,94,${pulse*0.4})`)
        glow.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(cx, cy, 12, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = `rgba(34,197,94,${pulse})`
        ctx.beginPath()
        ctx.arc(cx, cy, 3, 0, Math.PI*2)
        ctx.fill()
        ctx.fillStyle = "rgba(34,197,94,0.9)"
        ctx.font = "7px monospace"
        const days = 11066
        ctx.fillText(`DAY ${days}`, cx-15, cy+35)
        ctx.font = "6px monospace"
        ctx.fillText("847.3 MHz — CONTINUOUS", 3, h-4)
      }

      // PR-001 — Lab
      if (type === "pr_lab") {
        ctx.fillStyle = "#050c16"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.06)"
        ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += 10) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += 10) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        for (let i = 0; i < 80; i++) {
          const angle = (i * 2.399) + frame * 0.008
          const radius = (i * 3.7) % (Math.min(w,h) * 0.45)
          const nx = w/2 + Math.cos(angle) * radius
          const ny = (h-16)/2 + Math.sin(angle) * radius * 0.7
          const ns = 0.8 + Math.sin(i+frame*0.08)*0.4
          const na = 0.4 + Math.sin(frame*0.04+i*0.3)*0.3
          ctx.fillStyle = `rgba(0,245,255,${na})`
          ctx.beginPath()
          ctx.arc(nx, ny, ns, 0, Math.PI*2)
          ctx.fill()
          if (i % 4 === 0 && i+4 < 80) {
            const angle2 = ((i+4) * 2.399) + frame * 0.008
            const radius2 = ((i+4) * 3.7) % (Math.min(w,h) * 0.45)
            const nx2 = w/2 + Math.cos(angle2) * radius2
            const ny2 = (h-16)/2 + Math.sin(angle2) * radius2 * 0.7
            ctx.strokeStyle = `rgba(0,245,255,${na*0.25})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(nx2, ny2)
            ctx.stroke()
          }
        }
        ctx.fillStyle = "rgba(0,245,255,0.8)"
        ctx.font = "6px monospace"
        ctx.fillText("NANOBOT NETWORK — 4.7B UNITS", 3, h-4)
      }

      // PR-001 — Global map
      if (type === "pr_map") {
        ctx.fillStyle = "#050c16"
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
        ctx.fillStyle = "rgba(0,245,255,0.8)"
        ctx.fillText("● DISTRIBUTION", 3, h-4)
      }

      // PR-001 — Integration levels
      if (type === "pr_levels") {
        ctx.fillStyle = "#050c16"
        ctx.fillRect(0, 0, w, h)
        const levels = [
          { name: "L1 BASELINE", pct: 0.78, color: "0,245,255" },
          { name: "L2 ACTIVE", pct: 0.18, color: "34,197,94" },
          { name: "L3 DEEP", pct: 0.038, color: "251,191,36" },
          { name: "L4 FOUNDATION", pct: 0.003, color: "255,160,0" },
        ]
        levels.forEach((l, i) => {
          const y = 24 + i * 26
          const cycle = (frame + i * 50) % 140
          const anim = cycle < 70 ? cycle / 70 : 1 - (cycle - 70) / 70
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
      ctx.shadowBlur = 0
      ctx.fillStyle = "rgba(34,197,94,0.7)"
      ctx.font = "7px monospace"
      ctx.fillText(ts, w - ctx.measureText(ts).width - 4, 20)
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

      // IS-312 — Chicago skyline 2162
      if (type === "is_skyline") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        for (let i = 0; i < 30; i++) {
          const sx = (i * 47 + 13) % w
          const sy = (i * 31 + 7) % (h * 0.5)
          const pulse = 0.3 + Math.sin(frame * 0.02 + i) * 0.2
          ctx.fillStyle = `rgba(150,180,220,${pulse})`
          ctx.fillRect(sx, sy, 1, 1)
        }
        const bldgs = [[0,0.3,0.05,0.7],[0.04,0.2,0.04,0.8],[0.07,0.25,0.05,0.75],[0.11,0.15,0.04,0.85],[0.14,0.22,0.06,0.78],[0.19,0.1,0.05,0.9],[0.23,0.18,0.04,0.82],[0.26,0.28,0.07,0.72],[0.32,0.12,0.04,0.88],[0.35,0.2,0.05,0.8],[0.39,0.3,0.06,0.7],[0.44,0.15,0.04,0.85],[0.47,0.22,0.05,0.78],[0.51,0.08,0.05,0.92],[0.55,0.18,0.06,0.82],[0.6,0.25,0.05,0.75],[0.64,0.35,0.07,0.65],[0.7,0.2,0.04,0.8],[0.73,0.28,0.06,0.72],[0.78,0.15,0.05,0.85],[0.82,0.22,0.06,0.78],[0.87,0.3,0.05,0.7],[0.91,0.18,0.04,0.82],[0.94,0.25,0.06,0.75]]
        bldgs.forEach(([x,y,bw,bh]) => {
          ctx.fillStyle = "#080d16"
          ctx.fillRect(x*w, y*h, bw*w, bh*h)
          for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 3; c++) {
              const wx = x*w + c*(bw*w/3) + 2
              const wy = y*h + r*8 + 4
              const on = Math.sin(frame*0.01 + x*10 + r*3 + c*7) > 0.6
              if (on) { ctx.fillStyle = "rgba(255,220,120,0.5)"; ctx.fillRect(wx, wy, 2, 2) }
            }
          }
        })
        const groundG = ctx.createLinearGradient(0, h*0.7, 0, h)
        groundG.addColorStop(0, "rgba(0,10,30,0)")
        groundG.addColorStop(1, "rgba(0,20,60,0.4)")
        ctx.fillStyle = groundG
        ctx.fillRect(0, h*0.7, w, h*0.3)
        ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, h-16, w, 16)
        ctx.fillStyle = "rgba(0,245,255,0.7)"; ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 4
        ctx.font = "7px monospace"; ctx.fillText("CHICAGO IL — 2162", 3, h-5); ctx.shadowBlur = 0
      }

      // IS-312 — Level 4 Hybrid movement
      if (type === "is_hybrid") {
        ctx.fillStyle = "#030508"
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = "rgba(0,245,255,0.04)"; ctx.lineWidth = 0.5
        for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
        for (let y = 0; y < h; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
        const hybrids = [
          { x: 0.15, speed: 0.0008, y: 0.55 },
          { x: 0.42, speed: 0.0005, y: 0.6 },
          { x: 0.7,  speed: 0.0011, y: 0.52 },
          { x: 0.85, speed: 0.0006, y: 0.58 },
        ]
        hybrids.forEach((h2, i) => {
          const px = ((h2.x + frame * h2.speed) % 1.0) * w
          const py = h2.y * h
          ctx.fillStyle = "rgba(180,200,255,0.15)"
          ctx.fillRect(px - 3, py - 14, 6, 14)
          ctx.beginPath(); ctx.arc(px, py - 18, 4, 0, Math.PI*2); ctx.fill()
          const gpulse = 0.3 + Math.sin(frame * 0.04 + i * 1.5) * 0.3
          ctx.strokeStyle = `rgba(255,200,0,${gpulse})`; ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(px, py - 18, 6, 0, Math.PI*2); ctx.stroke()
        })
        ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, h-16, w, 16)
        ctx.fillStyle = "rgba(249,115,22,0.9)"; ctx.shadowColor = "#f97316"; ctx.shadowBlur = 4
        ctx.font = "7px monospace"; ctx.fillText("HYBRID MOVEMENT — MOD", 3, h-5); ctx.shadowBlur = 0
      }

      // IS-312 — 847.3 MHz frequency scan
      if (type === "is_signal") {
        ctx.fillStyle = "#020408"
        ctx.fillRect(0, 0, w, h)
        const cx2 = w / 2
        const cy2 = h / 2
        for (let r = 1; r <= 5; r++) {
          const radius = r * (Math.min(w,h) * 0.09)
          const alpha = 0.08 + Math.sin(frame * 0.02 - r * 0.5) * 0.04
          ctx.strokeStyle = `rgba(0,245,255,${alpha})`; ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.arc(cx2, cy2, radius, 0, Math.PI*2); ctx.stroke()
        }
        const angle = (frame * 0.025) % (Math.PI * 2)
        const sweepG = ctx.createLinearGradient(cx2, cy2, cx2 + Math.cos(angle)*w*0.5, cy2 + Math.sin(angle)*h*0.5)
        sweepG.addColorStop(0, "rgba(0,245,255,0.4)")
        sweepG.addColorStop(1, "rgba(0,245,255,0)")
        ctx.strokeStyle = sweepG; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(cx2, cy2); ctx.lineTo(cx2 + Math.cos(angle)*w*0.6, cy2 + Math.sin(angle)*h*0.6); ctx.stroke()
        ctx.fillStyle = "rgba(0,245,255,0.8)"; ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 6
        ctx.beginPath(); ctx.arc(cx2, cy2, 2, 0, Math.PI*2); ctx.fill(); ctx.shadowBlur = 0
        if (Math.sin(frame * 0.07) > 0.85) {
          const bx = cx2 + Math.cos(angle - 0.3) * 30
          const by = cy2 + Math.sin(angle - 0.3) * 30
          ctx.fillStyle = "rgba(0,245,255,0.9)"; ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 8
          ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI*2); ctx.fill(); ctx.shadowBlur = 0
        }
        ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, h-16, w, 16)
        ctx.fillStyle = "rgba(0,245,255,0.8)"; ctx.shadowColor = "#00f5ff"; ctx.shadowBlur = 4
        ctx.font = "7px monospace"; ctx.fillText("847.3 MHz — SCANNING", 3, h-5); ctx.shadowBlur = 0
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [type])

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} width={220} height={145} style={{ display: "block", border: "1px solid rgba(0,245,255,0.1)" }} />
      <div style={{ position: "absolute", top: 4, left: 4, fontSize: 7, color: "rgba(0,245,255,0.7)", fontFamily: "monospace", letterSpacing: 1, textShadow: "0 0 4px rgba(0,245,255,0.8)" }}>{label}</div>
      <div style={{ position: "absolute", bottom: 4, right: 4, fontSize: 7, color: "rgba(0,245,255,0.8)", fontFamily: "monospace" }}>{coords}</div>
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
  ]
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
