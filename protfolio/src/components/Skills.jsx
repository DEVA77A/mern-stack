import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chips = el.querySelectorAll('.skill-chip')
    try { console.log('[Skills] items:', chips.length, Object.keys(profile.skills || {})) } catch {}

    // Ensure chips are visible immediately (avoid gsap.from hiding them before scroll)
    gsap.set(chips, { opacity: 1, y: 0 })
    gsap.to(chips, {
      y: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    })
  }, [])

  return (
    <section id="skills" ref={ref} className="section py-16 pt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Skills</h2>
            <div className="h-1 w-24 bg-neon/70 rounded-full shadow-glow" />
          </div>

          <div className="mb-4 text-center text-xs text-white/50">Loaded {Object.keys(profile.skills || {}).length} skill groups</div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.keys(profile.skills || {}).length === 0 && (
              <div className="col-span-full text-center text-white/70 border border-white/10 rounded-2xl p-8 bg-white/5">
                <p className="text-base">No skills found. Check <code className="font-mono">src/data/content.js</code>.</p>
              </div>
            )}

            {Object.entries(profile.skills).map(([group, items]) => (
              <div
                key={group}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_rgba(0,255,204,0.25)]"
              >
                <div className="text-white/90 font-semibold mb-3 tracking-wide">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="skill-chip px-3 py-1.5 rounded-lg border border-neon/30 text-neon/90 bg-black/30"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
