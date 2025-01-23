'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  baseRadius: number
  currentRadius: number
  targetRadius: number
  opacity: number
  targetOpacity: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up canvas size with device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
      initializePoints()
    }

    // Initialize random points using Poisson Disk Sampling
    const initializePoints = () => {
      const points: Point[] = []
      const minDistance = 30 // Minimum distance between points
      const cellSize = minDistance / Math.sqrt(2)
      const width = window.innerWidth
      const height = window.innerHeight
      const grid: (Point | null)[][] = []
      const active: Point[] = []

      // Initialize grid
      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)
      for (let i = 0; i < cols; i++) {
        grid[i] = []
        for (let j = 0; j < rows; j++) {
          grid[i][j] = null
        }
      }

      // Create initial random point
      const firstPoint = {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: 1 + Math.random(),
        currentRadius: 1,
        targetRadius: 1,
        opacity: 0.1,
        targetOpacity: 0.1
      }
      
      const col = Math.floor(firstPoint.x / cellSize)
      const row = Math.floor(firstPoint.y / cellSize)
      grid[col][row] = firstPoint
      
      active.push(firstPoint)
      points.push(firstPoint)

      // Generate other points
      while (active.length > 0) {
        const randomIndex = Math.floor(Math.random() * active.length)
        const currentPoint = active[randomIndex]
        let found = false

        // Try to generate new points around the current point
        for (let i = 0; i < 30; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = minDistance + Math.random() * minDistance
          const newX = currentPoint.x + Math.cos(angle) * distance
          const newY = currentPoint.y + Math.sin(angle) * distance

          // Check if the new point is within bounds
          if (newX < 0 || newX >= width || newY < 0 || newY >= height) continue

          const newCol = Math.floor(newX / cellSize)
          const newRow = Math.floor(newY / cellSize)
          
          // Check surrounding cells
          let valid = true
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const checkCol = newCol + dx
              const checkRow = newRow + dy
              if (
                checkCol >= 0 && checkCol < cols &&
                checkRow >= 0 && checkRow < rows &&
                grid[checkCol][checkRow]
              ) {
                const checkPoint = grid[checkCol][checkRow]!
                const dx = newX - checkPoint.x
                const dy = newY - checkPoint.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < minDistance) {
                  valid = false
                  break
                }
              }
            }
            if (!valid) break
          }

          if (valid) {
            const newPoint = {
              x: newX,
              y: newY,
              baseRadius: 1 + Math.random(),
              currentRadius: 1,
              targetRadius: 1,
              opacity: 0.1,
              targetOpacity: 0.1
            }
            points.push(newPoint)
            active.push(newPoint)
            grid[newCol][newRow] = newPoint
            found = true
            break
          }
        }

        if (!found) {
          active.splice(randomIndex, 1)
        }
      }

      pointsRef.current = points
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pointsRef.current.forEach(point => {
        // Calculate distance from mouse
        const dx = point.x - mouseRef.current.x
        const dy = point.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        // Update point properties based on mouse proximity
        if (distance < maxDistance) {
          const intensity = 1 - (distance / maxDistance)
          point.targetRadius = point.baseRadius * (1 + (intensity * 2))
          point.targetOpacity = 0.1 + (intensity * 0.7)
        } else {
          point.targetRadius = point.baseRadius
          point.targetOpacity = 0.1
        }

        // Smooth transitions
        point.currentRadius += (point.targetRadius - point.currentRadius) * 0.1
        point.opacity += (point.targetOpacity - point.opacity) * 0.1

        // Draw point with glow effect
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.currentRadius * 4
        )
        gradient.addColorStop(0, `rgba(0, 240, 255, ${point.opacity})`)
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)')
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.currentRadius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw center point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${point.opacity * 1.5})`
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners and start animation
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-primary"
      style={{ zIndex: -1 }}
    />
  )
}

