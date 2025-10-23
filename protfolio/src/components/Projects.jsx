import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    // Keep animation minimal and never hide content pre-scroll
    const el = ref.current
    if (!el) return
    gsap.to(el.querySelectorAll('.proj'), {
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    })
  }, [])

  const handleMouse = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = -((y / rect.height) - 0.5) * 10
    const ry = ((x / rect.width) - 0.5) * 14
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`
  }
  const resetMouse = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  const projects = profile.projects || []
  // Debug: log what we received so we can verify wiring in the browser console
  try { console.log('[Projects] items:', Array.isArray(projects) ? projects.length : 'not-array', projects) } catch {}

  return (
    <section id="projects" ref={ref} className="section min-h-[100svh] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured <span className="bg-gradient-to-r from-neon to-white bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">Here are some of my recent projects crafted with attention to ML, performance, and UX.</p>
        </div>

  {/* Debug line to confirm data wiring */}
  <div className="text-center text-xs text-white/50 mb-4">Loaded {Array.isArray(projects) ? projects.length : 0} projects</div>

  {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 && (
            <div className="col-span-full text-center text-white/70 border border-white/10 rounded-2xl p-8 bg-white/5">
              <p className="text-base">No projects found. If you just updated <code className="font-mono">src/data/content.js</code>, try a hard refresh.</p>
            </div>
          )}
          {projects.map((p, i) => (
            <article key={i} onMouseMove={handleMouse} onMouseLeave={resetMouse}
              className="proj group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors overflow-hidden will-change-transform">
              {/* Preview / Image */}
              <div className="relative h-44 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,204,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(0,255,204,0.08),transparent_40%)]">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover"/>
                ) : null}
                {p.year && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md border border-white/20 text-white/90 bg-black/40 backdrop-blur">{p.year}</span>
                )}
              </div>

              <div className="p-6">
                {/* Tech chips */}
                {p.tech && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-[11px] border border-white/15 text-white/80 bg-black/30">{t}</span>
                    ))}
                  </div>
                )}

                {/* Title + desc */}
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                {p.desc && <p className="mt-2 text-white/80 text-sm leading-relaxed">{p.desc}</p>}

                {/* Details bullets (optional) */}
                {Array.isArray(p.details) && p.details.length > 0 && (
                  <ul className="mt-3 space-y-2 text-white/75 text-sm">
                    {p.details.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon/90"></span>
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Links */}
                {(p.github || p.live || p.link) && (
                  <div className="mt-4 flex items-center gap-3 text-white/80">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-neon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.07-3.06.66-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.1.08 1.67 1.13 1.67 1.13.98 1.67 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .92-.29 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.14-5.04 5.41.39.34.73 1.01.73 2.05 0 1.48-.01 2.66-.01 3.02 0 .29.2.63.76.52A10.53 10.53 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z"/>
                        </svg>
                        <span className="text-xs">Code</span>
                      </a>
                    )}
                    {(p.live || p.link) && (
                      <a href={p.live || p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-neon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/>
                        </svg>
                        <span className="text-xs">Live</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
