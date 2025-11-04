import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, User, FolderGit2 } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-white">
            <Rocket className="w-5 h-5 text-blue-400" />
            <span className="font-semibold tracking-tight">MyPortfolio</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <div className="md:hidden flex items-center gap-3 text-white/80">
            <a href="#projects" aria-label="Projects"><FolderGit2 className="w-5 h-5" /></a>
            <a href="#about" aria-label="About"><User className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
