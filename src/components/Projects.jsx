import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    title: 'Neon Interface',
    description: 'Minimal UI with reactive motion and 3D accents.',
    tags: ['React', 'Three.js', 'GSAP'],
    link: '#'
  },
  {
    title: 'Realtime Visuals',
    description: 'Audio-reactive visualizations rendered in WebGL.',
    tags: ['WebGL', 'Framer Motion', 'Audio'],
    link: '#'
  },
  {
    title: 'Immersive Landing',
    description: 'Spline-powered 3D with smooth scroll experiences.',
    tags: ['Spline', 'GSAP', 'UX'],
    link: '#'
  }
]

function ProjectCard({ item, index }) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{
        background: 'radial-gradient(400px 200px at 50% 0%, rgba(56,189,248,0.12), transparent 70%)'
      }} />
      <div className="relative">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        <p className="mt-2 text-sm text-white/70">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="text-[11px] uppercase tracking-wide text-cyan-300/90 bg-cyan-300/10 border border-cyan-300/20 px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 h-32 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-600/10 group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-colors"/>
      </div>
      <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{
        boxShadow: '0 0 50px rgba(59,130,246,0.25)'
      }} />
    </motion.a>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = sectionRef.current
    if (!el) return

    const title = el.querySelector('[data-title]')
    gsap.fromTo(
      title,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%'
        }
      }
    )
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#0b0b12] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 data-title className="text-3xl sm:text-4xl font-semibold text-white">Selected Projects</h2>
        <p className="mt-2 text-white/60 max-w-2xl">Interactive explorations blending motion, code, and aesthetic systems.</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} item={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
