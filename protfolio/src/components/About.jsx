import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
	const ref = useRef(null)
	useEffect(() => {
			const el = ref.current
			if (!el) return
			const cards = el.querySelectorAll('.card')
			try { console.log('[About] summary length:', (profile.summary || '').length, 'name:', profile.name) } catch {}
			// Ensure cards are visible immediately; animate subtly on scroll without hiding
			gsap.set(cards, { opacity: 1, y: 0 })
			gsap.to(cards, {
				y: 0,
				duration: 0.6,
				stagger: 0.12,
				ease: 'power1.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					once: true
				}
			})
	}, [])

	return (
			<section id="about" ref={ref} className="section py-16">
							<div className="max-w-6xl mx-auto px-6">
									<div className="text-center text-xs text-white/50 mb-3">About loaded: {profile?.name ? 'yes' : 'no'}</div>
									<div className="flex items-center justify-between mb-6">
										<div>
											<div className="inline-block px-3 py-1 rounded-full text-[11px] tracking-wider border border-neon/40 text-neon/90 bg-black/30">Who I Am</div>
											<h2 className="text-3xl sm:text-4xl font-bold mt-3">About Me</h2>
										</div>
										<div className="h-1 w-24 bg-neon/70 rounded-full shadow-glow" />
									</div>
									<div className="grid md:grid-cols-2 gap-8">
											<div className="card p-6 rounded-2xl border border-white/10 bg-white/5/50 backdrop-blur shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_28px_rgba(0,255,204,0.18)] transition-shadow">
						<div className="text-white/90 font-semibold mb-3">I’m <span className="text-neon">{profile.name}</span> — {profile.title}</div>
								{String(profile.summary || '')
						  .split('\n\n')
						  .map((para, idx) => (
							<p key={idx} className="text-white/80 mb-3 last:mb-0">{para}</p>
						  ))}
						<div className="mt-4 text-white/70">
							{profile.education?.map((e, i) => (
								<div key={i} className="flex items-center gap-2">
									<span className="text-neon">•</span>
									<span>{e.degree} — {e.college}{e.year ? ` (${e.year})` : ''}</span>
								</div>
							))}
						</div>
					</div>
											<div className="card p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur">
													<h3 className="font-semibold text-white/90 mb-3">Highlights & Links</h3>
													<ul className="space-y-2 text-white/75 text-sm">
														<li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon"></span><span>Python, ML/DL, and NLP enthusiast focused on real-world impact</span></li>
														<li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon"></span><span>Comfortable with React + Tailwind for clean, fast UIs</span></li>
														<li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon"></span><span>Building projects end‑to‑end: APIs, models, and UX</span></li>
													</ul>

													{/* Core skill chips */}
													<div className="mt-4">
														<div className="text-white/70 text-xs mb-2">Core skills</div>
														<div className="flex flex-wrap gap-2">
															{(profile.skills?.['Core Skills'] || []).slice(0,8).map((s) => (
																<span key={s} className="px-3 py-1.5 rounded-lg border border-neon/30 text-neon/90 bg-black/30 text-xs">{s}</span>
															))}
														</div>
													</div>

													{/* CTAs */}
													<div className="mt-5 flex flex-wrap gap-3">
														<a href="#contact" className="px-4 py-2 rounded-full bg-neon text-black text-sm font-semibold shadow-glow">Contact</a>
														<a href="/resume.pdf" className="px-4 py-2 rounded-full border border-neon text-neon text-sm hover:bg-neon hover:text-black transition-colors">Resume</a>
													</div>
					</div>
				</div>
			</div>
		</section>
	)
}
