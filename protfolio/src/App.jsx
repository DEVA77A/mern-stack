import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import CursorTrail from './components/CursorTrail.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
	const containerRef = useRef(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Fade in the root container explicitly to avoid GSAP selector warnings
			if (containerRef.current) {
				gsap.from(containerRef.current, { opacity: 0, duration: 0.6 })
			}
			const sections = gsap.utils.toArray('.section')
			if (sections && sections.length) {
				sections.forEach((sec) => {
					gsap.to(sec, {
						backgroundPositionY: '+=120',
						ease: 'none',
						scrollTrigger: {
							trigger: sec,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						}
					})
				})
			}
		}, containerRef)
		return () => ctx.revert()
	}, [])

	return (
			<div ref={containerRef} className="page font-display">
				<CursorTrail />
			<nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<a href="#hero" className="text-white/90 hover:text-white font-semibold tracking-wide">DEVA</a>
					<div className="hidden sm:flex gap-6 text-sm">
						<a href="#about" className="text-white/70 hover:text-neon">About</a>
						<a href="#skills" className="text-white/70 hover:text-neon">Skills</a>
						<a href="#projects" className="text-white/70 hover:text-neon">Projects</a>
						<a href="#contact" className="text-white/70 hover:text-neon">Contact</a>
						<a href="/resume.pdf" className="text-neon hover:text-white">Resume</a>
					</div>
				</div>
			</nav>

			<main>
				<Hero />
				<About />
				<Skills />
				<Projects />
				<Contact />
			</main>

			<footer className="py-12 text-center text-white/50 text-sm">© {new Date().getFullYear()} Deva — Built with React, Tailwind, GSAP</footer>
		</div>
	)
}
