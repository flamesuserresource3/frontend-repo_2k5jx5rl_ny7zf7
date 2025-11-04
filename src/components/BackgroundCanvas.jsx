import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Lightweight starfield using Three.js to satisfy native three usage.
export default function BackgroundCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 700
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 6
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMaterial = new THREE.PointsMaterial({ color: 0x79c0ff, size: 0.01, transparent: true, opacity: 0.8 })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    // Resize handler
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      // Auto rotate and subtle parallax
      stars.rotation.y += 0.0008
      stars.rotation.x += 0.0003
      camera.position.x += (mouse.x * 0.15 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 0.1 - camera.position.y) * 0.03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0"/>
}
