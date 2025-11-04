import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import BackgroundCanvas from './components/BackgroundCanvas'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <div className="relative">
        {/* Three.js starfield background behind everything */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <BackgroundCanvas />
        </div>
        <Hero />
        <Projects />
        <About />

        <footer id="contact" className="bg-[#0b0b12] border-t border-white/10 py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-white/60">© {new Date().getFullYear()} MyPortfolio — Built with care.</p>
            <a href="#home" className="text-sm text-white/70 hover:text-white">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
