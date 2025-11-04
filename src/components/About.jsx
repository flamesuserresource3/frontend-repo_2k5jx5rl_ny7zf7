import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%'
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#0b0b12] py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="reveal text-3xl sm:text-4xl font-semibold text-white">About</h2>
        <p className="reveal mt-4 text-white/70">
          I specialize in crafting immersive web experiences that feel alive. My focus is performance-first animations, 3D interactions, and clean, minimal design systems.
        </p>
        <div className="reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm text-white/60">Core</div>
            <div className="mt-2 text-white">React, TypeScript, Tailwind</div>
          </div>
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm text-white/60">Motion</div>
            <div className="mt-2 text-white">Framer Motion, GSAP</div>
          </div>
          <div className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="text-sm text-white/60">3D</div>
            <div className="mt-2 text-white">Three.js, Spline</div>
          </div>
        </div>
      </div>
    </section>
  )
}
