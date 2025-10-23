import React, { useEffect, useRef } from 'react'

export default function CursorTrail() {
	const canvasRef = useRef(null)
	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d', { alpha: true })

		let width = 0
		let height = 0
		let dpr = 1

		function resize() {
			width = window.innerWidth
			height = window.innerHeight
			dpr = Math.min(window.devicePixelRatio || 1, 2)
			canvas.style.width = width + 'px'
			canvas.style.height = height + 'px'
			canvas.width = Math.floor(width * dpr)
			canvas.height = Math.floor(height * dpr)
			ctx.setTransform(1, 0, 0, 1, 0, 0)
			ctx.scale(dpr, dpr)
		}

		resize()

		const particles = []
		const max = 40
		const cursor = { x: -9999, y: -9999 } // hidden off-screen until moved

		function addParticle(x, y) {
			particles.push({ x, y, alpha: 1, r: 3 + Math.random() * 2, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6 })
			if (particles.length > max) particles.shift()
		}

		function drawCursorGlow() {
			if (cursor.x < 0 || cursor.y < 0) return
			ctx.save()
			ctx.beginPath()
			ctx.arc(cursor.x, cursor.y, 12, 0, Math.PI * 2)
			ctx.fillStyle = 'rgba(0,255,204,0.35)'
			ctx.shadowColor = 'rgba(0,255,204,0.9)'
			ctx.shadowBlur = 18
			ctx.fill()
			ctx.restore()
		}

		function draw() {
			ctx.clearRect(0, 0, width, height)
			drawCursorGlow()
			for (const p of particles) {
				p.x += p.vx; p.y += p.vy; p.alpha *= 0.96
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(0,255,204,${p.alpha})`
				ctx.shadowColor = 'rgba(0,255,204,0.8)'
				ctx.shadowBlur = 10
				ctx.fill()
			}
			requestAnimationFrame(draw)
		}
		draw()

		function onMove(e) {
			cursor.x = e.clientX; cursor.y = e.clientY
			for (let i = 0; i < 2; i++) addParticle(cursor.x, cursor.y)
		}

		window.addEventListener('pointermove', onMove)
		window.addEventListener('resize', resize)
		return () => {
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return <canvas id="cursor-canvas" ref={canvasRef} />
}
