'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ComplianceModelViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true

    // Create a group to hold all objects
    const group = new THREE.Group()
    scene.add(group)

    // Create central sphere (representing the core compliance system)
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32)
    const coreMaterial = new THREE.MeshPhongMaterial({ color: 0x0066FF, emissive: 0x0066FF, emissiveIntensity: 0.2 })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(core)

    // Create orbiting spheres (representing different compliance modules)
    const moduleCount = 5
    const moduleGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const moduleMaterial = new THREE.MeshPhongMaterial({ color: 0x00F0FF, emissive: 0x00F0FF, emissiveIntensity: 0.5 })

    for (let i = 0; i < moduleCount; i++) {
      const angle = (i / moduleCount) * Math.PI * 2
      const radius = 2
      const module = new THREE.Mesh(moduleGeometry, moduleMaterial)
      module.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
      group.add(module)

      // Create connecting lines
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6E00FF, transparent: true, opacity: 0.5 })
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        module.position
      ])
      const line = new THREE.Line(lineGeometry, lineMaterial)
      group.add(line)
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      group.rotation.y += 0.005
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-[400px] rounded-lg overflow-hidden" />
}

export default ComplianceModelViewer

