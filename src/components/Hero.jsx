import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Parallax light glow based on mouse
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 100
      const y = (e.clientY / innerHeight) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="home" ref={containerRef} className="relative min-h-[90vh] w-full overflow-hidden bg-[#0b0b12]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Neon gradient overlay that doesn't block interaction */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px 300px at var(--mx,50%) var(--my,50%), rgba(14,165,233,0.12), transparent 70%), radial-gradient(600px 400px at 80% 20%, rgba(168,85,247,0.12), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 flex flex-col items-start">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-semibold leading-tight text-white"
        >
          Futuristic, Minimal, Personal
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
            Creative Developer
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-5 max-w-xl text-white/70"
        >
          I craft interactive experiences with code, motion, and 3D. Explore selected works and the tools behind them.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 flex items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] transition-shadow"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-full border border-white/15 text-white/80 hover:text-white px-6 py-3 text-sm"
          >
            About me
          </a>
        </motion.div>
      </div>
    </section>
  )
}
