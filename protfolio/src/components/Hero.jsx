import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

function splitText(element) {
	const text = element.textContent || ''
	element.textContent = ''
	const frag = document.createDocumentFragment()
	const chars = text.split('')
	chars.forEach((ch, i) => {
		const span = document.createElement('span')
		if (ch === ' ') {
			// Preserve spaces, but remove extra gap right after a comma ("Hi, …")
			const prev = chars[i - 1]
			span.innerHTML = '&nbsp;'
			if (prev === ',') {
				// no extra margin after comma space
				span.style.marginRight = '0'
			} else {
				span.style.marginRight = '0.15em'
			}
		} else {
			span.textContent = ch
		}
		span.style.display = 'inline-block'
		span.style.willChange = 'transform, opacity'
		frag.appendChild(span)
	})
	element.appendChild(frag)
}

export default function Hero() {
	const ref = useRef(null)

	useEffect(() => {
		const el = ref.current
		const titleLine = el.querySelector('.hero-title-primary')
		const subline = el.querySelector('.hero-title-subline')
		const subtitle = el.querySelector('.hero-sub')
		// Animate only the first line characters
		if (titleLine) splitText(titleLine)

		const tl = gsap.timeline()
		tl.from(titleLine ? titleLine.querySelectorAll('span') : [], {
			yPercent: 120,
			opacity: 0,
			stagger: 0.03,
			ease: 'expo.out',
			duration: 1.1
		})
			.from(subline, { opacity: 0, y: 10, duration: 0.6 }, '-=0.6')
			.from(subtitle, { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
			.from('.floating', { y: -10, opacity: 0, stagger: 0.1 }, '-=0.5')

		gsap.to('.floating', {
			y: 10,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
			duration: 2.2
		})
	}, [])

	return (
		<section id="hero" ref={ref} className="section min-h-[100svh] grid place-items-center relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,204,0.2),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(0,255,204,0.1),transparent_40%)]">
			<div className="absolute inset-0 pointer-events-none" aria-hidden>
				<div className="floating absolute w-72 h-72 rounded-full blur-3xl opacity-30" style={{
					background: 'conic-gradient(from 90deg at 50% 50%, rgba(0,255,204,0.2), transparent)'
				}} />
			</div>

					<div className="max-w-6xl mx-auto px-6 text-center pt-24 relative z-10">
						<h1 className="hero-title font-extrabold tracking-tight leading-[1.15]">
							<span className="hero-title-primary word-space tracking-wide block text-4xl sm:text-6xl lg:text-7xl">Hi, I’m Devanand A</span>
							<span className="hero-title-subline block mt-2 text-neon neon-text opacity-100 relative z-10 text-2xl sm:text-3xl">Aspiring AI/ML Engineer</span>
						</h1>
				<p className="hero-sub mt-6 text-white/70 text-lg max-w-2xl mx-auto">
					I craft intelligent systems, sleek UIs, and fluid motion. Futuristic. Fast. Functional.
				</p>
				<div className="mt-10 flex items-center justify-center gap-4">
					<a href="#projects" className="px-6 py-3 rounded-full bg-neon text-black font-semibold shadow-glow hover:shadow-[0_0_40px_rgba(0,255,204,0.8)] transition-shadow">View Projects</a>
					<a href="#contact" className="px-6 py-3 rounded-full border border-neon text-neon hover:bg-neon hover:text-black transition-colors">Contact Me</a>
					<a href="/resume.pdf" download className="px-6 py-3 rounded-full border border-neon/70 text-neon hover:bg-neon hover:text-black transition-colors">Download Resume</a>
				</div>
			</div>
		</section>
	)
}
