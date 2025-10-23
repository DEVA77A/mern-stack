import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
	const ref = useRef(null)
  const CONTACT = profile.contact
	const formRef = useRef(null)
	const [status, setStatus] = useState('idle') // idle | sending | sent | error
	const [error, setError] = useState('')
	useEffect(() => {
		const el = ref.current
		try {
			console.log('[Contact] contact:', CONTACT)
		} catch {}
			// Ensure fields are visible immediately; only apply a gentle motion
			const fields = el.querySelectorAll('.field')
			gsap.set(fields, { opacity: 1, y: 0 })
			gsap.to(fields, {
				y: 0,
				stagger: 0.1,
				duration: 0.4,
				ease: 'power1.out',
				scrollTrigger: { trigger: el, start: 'top 85%', once: true }
			})
		// Do not hide contact items before scroll; just add a gentle shift
		const items = el.querySelectorAll('.contact-item')
		gsap.set(items, { opacity: 1, y: 0 })
		gsap.to(items, {
			y: 0,
			stagger: 0.08,
			duration: 0.5,
			ease: 'power1.out',
			scrollTrigger: { trigger: el, start: 'top 90%', once: true }
		})
	}, [])


		const getHandle = (url) => {
			try {
				if (!url) return ''
				const u = new URL(url)
				const parts = u.pathname.replace(/\/$/, '').split('/').filter(Boolean)
				return parts[parts.length - 1] || u.host
			} catch {
				return url
			}
		}

		const LINKS = [
			CONTACT?.email ? { key: 'email', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`,
				icon: (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
						<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/>
					</svg>
				) } : null,
			CONTACT?.phone ? { key: 'phone', label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone}`,
				icon: (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
						<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.26c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.6 21 3 12.4 3 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.26 1L6.6 10.8Z"/>
					</svg>
				) } : null,
			CONTACT?.github ? { key: 'github', label: 'GitHub', value: getHandle(CONTACT.github), href: CONTACT.github,
				icon: (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
						<path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.07-3.06.66-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.1.08 1.67 1.13 1.67 1.13.98 1.67 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .92-.29 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.14-5.04 5.41.39.34.73 1.01.73 2.05 0 1.48-.01 2.66-.01 3.02 0 .29.2.63.76.52A10.53 10.53 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z"/>
					</svg>
				) } : null,
			CONTACT?.linkedin ? { key: 'linkedin', label: 'LinkedIn', value: 'Profile', href: CONTACT.linkedin,
				icon: (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
						<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.98h4v12H3v-12Zm7 0h3.8v1.64h.06c.53-.95 1.83-1.96 3.76-1.96 4.02 0 4.76 2.65 4.76 6.1v6.22h-4v-5.52c0-1.32-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.62h-4v-12Z"/>
					</svg>
				) } : null,
			CONTACT?.leetcode ? { key: 'leetcode', label: 'LeetCode', value: getHandle(CONTACT.leetcode), href: CONTACT.leetcode,
				icon: (
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
						<path d="M8 5 5 8l6 6-6 6 3 3 9-9L8 5Zm9 7h5v4h-5v-4Z"/>
					</svg>
				) } : null,
		].filter(Boolean)

			const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

			const hasEmailJs = Boolean(serviceId && templateId && publicKey)

			const handleSubmit = async (e) => {
				e.preventDefault()
				setError('')
				if (status === 'sending') return
				const form = formRef.current
				const name = form?.from_name?.value?.trim()
				const fromEmail = form?.from_email?.value?.trim()
				const message = form?.message?.value?.trim()
				if (!name || !fromEmail || !message) {
					setError('Please fill your name, email, and message.')
					return
				}
				setStatus('sending')
				try {
					if (hasEmailJs) {
						await emailjs.send(
							serviceId,
							templateId,
							{
								from_name: name,
								from_email: fromEmail,
								message,
								to_email: CONTACT?.email || 'you@example.com',
								to_name: profile.name
							},
							{ publicKey }
						)
						setStatus('sent')
						form.reset()
					} else {
						// Fallback to mailto if EmailJS not configured
						const subject = encodeURIComponent(`Portfolio message from ${name}`)
						const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${fromEmail})`)
						window.location.href = `mailto:${CONTACT?.email}?subject=${subject}&body=${body}`
						setStatus('sent')
					}
				} catch (err) {
					console.error('Send failed', err)
					setError('Sorry, failed to send. Please try again or email me directly.')
					setStatus('error')
				}
			}

	return (
		<section id="contact" ref={ref} className="section min-h-[100svh] py-24">
			<div className="max-w-6xl mx-auto px-6">
				<div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur">
								<div className="flex items-center justify-between mb-2">
						<h2 className="text-3xl sm:text-4xl font-bold">Contact</h2>
						<div className="h-1 w-24 bg-neon/70 rounded-full shadow-glow" />
					</div>
								<div className="text-center text-xs text-white/50 mb-6">Loaded {LINKS.length} contact links</div>

					<div className="grid md:grid-cols-2 gap-6">
												{/* Quick links / info card */}
												<div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
														<div className="text-white/80 mb-4">Let’s connect. I’m open to internships, collaborations, and interesting AI/ML projects.</div>

																					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
																						{LINKS.length === 0 && (
																							<div className="col-span-full text-white/70 text-sm border border-white/10 rounded-2xl p-4 bg-white/5">No contact links found. Update your links in <code className="font-mono">src/data/content.js</code>.</div>
																						)}
															{LINKS.map((l) => (
																<a key={l.key} href={l.href} target={l.key === 'email' || l.key === 'phone' ? undefined : '_blank'} rel="noreferrer"
																	 className="contact-item group p-4 rounded-2xl border border-white/10 bg-black/30 hover:bg-black/50 transition-colors flex items-center gap-3">
																	<div className="shrink-0 w-9 h-9 rounded-xl grid place-items-center text-neon bg-neon/10 border border-neon/30">
																		{l.icon}
																	</div>
																	<div className="min-w-0">
																		<div className="text-white/90 text-sm font-semibold leading-none">{l.label}</div>
																		<div className="text-white/60 text-xs truncate">{l.value}</div>
																	</div>
																</a>
															))}
														</div>
												</div>

						{/* Form card */}
												<div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
														<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
																<input name="from_name" required className="field w-full px-4 py-3 rounded-xl bg-black/30 border border-neon/40 focus:border-neon outline-none text-white placeholder:text-white/40" placeholder="Your name"/>
																<input name="from_email" type="email" required className="field w-full px-4 py-3 rounded-xl bg-black/30 border border-neon/40 focus:border-neon outline-none text-white placeholder:text-white/40" placeholder="Your email"/>
																<textarea name="message" rows="5" required className="field w-full px-4 py-3 rounded-xl bg-black/30 border border-neon/40 focus:border-neon outline-none text-white placeholder:text-white/40" placeholder="Message"/>
																<div className="flex items-center gap-3">
																	<button type="submit" disabled={status==='sending'} onClick={() => {
																		const tl = gsap.timeline()
																		tl.to('#send-btn', { scale: 0.96, duration: 0.06 })
																			.to('#send-btn', { scale: 1, duration: 0.2, ease: 'back.out(2)' })
																	}} id="send-btn" className="px-6 py-3 rounded-full bg-neon text-black font-semibold shadow-glow hover:shadow-[0_0_40px_rgba(0,255,204,0.8)] transition disabled:opacity-60">
																		{status==='sending' ? 'Sending...' : 'Send'}
																	</button>
																	{!hasEmailJs && <span className="text-xs text-white/50">Using email app (configure EmailJS to send directly)</span>}
																</div>
																{status==='sent' && <div className="text-green-400 text-sm">Thanks! Your message has been sent.</div>}
																{status==='error' && <div className="text-red-400 text-sm">{error}</div>}
														</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
