'use client'

import { useEffect, useRef } from 'react'
import { complianceSnippets, regulatorySnippets, complianceTerms } from '../utils/code-snippets'

interface CodeSnippet {
  x: number
  y: number
  content: string
  opacity: number
  speed: number
}

interface Branch {
  startX: number
  startY: number
  endX: number
  endY: number
  controlPoints: { x: number; y: number }[]
  pulsePositions: number[]
  width: number
  opacity: number
  synapseType: 'excitatory' | 'inhibitory'
}

interface Neuron {
  x: number
  y: number
  size: number
  branches: Branch[]
  pulsePhase: number
  connections: number[]
  type: 'sensory' | 'motor' | 'interneuron'
}

interface TextSnippet {
  x: number
  y: number
  content: string
  opacity: number
  speed: number
}

const createTextSnippets = (canvas: HTMLCanvasElement, count: number): TextSnippet[] => {
  return Array(count).fill(0).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    content: [...complianceSnippets, ...regulatorySnippets, ...complianceTerms][Math.floor(Math.random() * (complianceSnippets.length + regulatorySnippets.length + complianceTerms.length))],
    opacity: 0.1 + Math.random() * 0.3,
    speed: 0.2 + Math.random() * 0.3
  }))
}

export default function BackgroundMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelRatio = window.devicePixelRatio || 1
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Create neurons
    const neurons: Neuron[] = []
    const neuronCount = 20

    // Helper function to create curved branches
    const createBranch = (startX: number, startY: number, angle: number, length: number): Branch => {
      const endX = startX + Math.cos(angle) * length
      const endY = startY + Math.sin(angle) * length

      const controlPoints = []
      const controlPointCount = 3
      for (let i = 0; i < controlPointCount; i++) {
        const t = (i + 1) / (controlPointCount + 1)
        const perpDistance = (Math.random() - 0.5) * length * 0.5
        const perpX = Math.cos(angle + Math.PI/2) * perpDistance
        const perpY = Math.sin(angle + Math.PI/2) * perpDistance
        const x = startX + (endX - startX) * t + perpX
        const y = startY + (endY - startY) * t + perpY
        controlPoints.push({ x, y })
      }

      return {
        startX,
        startY,
        endX,
        endY,
        controlPoints,
        pulsePositions: Array(3).fill(0).map(() => Math.random()),
        width: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        synapseType: Math.random() > 0.5 ? 'excitatory' : 'inhibitory'
      }
    }

    // Create neurons with branches
    for (let i = 0; i < neuronCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const branchCount = 4 + Math.floor(Math.random() * 4)
      const branches: Branch[] = []

      for (let j = 0; j < branchCount; j++) {
        const angle = (j / branchCount) * Math.PI * 2 + Math.random() * 0.5
        const length = 100 + Math.random() * 150
        branches.push(createBranch(x, y, angle, length))
      }

      neurons.push({
        x,
        y,
        size: 4 + Math.random() * 3,
        branches,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        type: ['sensory', 'motor', 'interneuron'][Math.floor(Math.random() * 3)] as 'sensory' | 'motor' | 'interneuron'
      })
    }

    // Create connections between nearby neurons
    neurons.forEach((neuron, i) => {
      const maxConnections = 2 + Math.floor(Math.random() * 2)
      const distances = neurons
        .map((other, index) => ({
          index,
          distance: Math.hypot(other.x - neuron.x, other.y - neuron.y)
        }))
        .filter(d => d.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxConnections)

      neuron.connections = distances.map(d => d.index)
    })

    const drawCurvedPath = (branch: Branch, ctx: CanvasRenderingContext2D) => {
      ctx.beginPath()
      ctx.moveTo(branch.startX, branch.startY)

      const points = [
        { x: branch.startX, y: branch.startY },
        ...branch.controlPoints,
        { x: branch.endX, y: branch.endY }
      ]

      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      )
    }

    const drawSynapse = (x: number, y: number, type: 'excitatory' | 'inhibitory', ctx: CanvasRenderingContext2D) => {
      const size = 6
      const color = type === 'excitatory' ? '#FF6B6B' : '#4ECDC4'

      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `${color}CC`)
      gradient.addColorStop(1, `${color}00`)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const textSnippets = createTextSnippets(canvas, 15)

    const drawTextSnippets = (ctx: CanvasRenderingContext2D, time: number) => {
      textSnippets.forEach(snippet => {
        ctx.save()
        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(0, 240, 255, ${snippet.opacity})`
        ctx.fillText(snippet.content, snippet.x, snippet.y)
        ctx.restore()

        snippet.y += snippet.speed
        if (snippet.y > canvas.height) {
          snippet.y = 0
          snippet.x = Math.random() * canvas.width
        }
      })
    }

    const drawNeuralNetwork = (time: number) => {
      ctx.save()

      // Calculate subtle offset based on mouse position
      const maxOffset = 5
      const offsetX = (mouseX / canvas.width - 0.5) * maxOffset
      const offsetY = (mouseY / canvas.height - 0.5) * maxOffset

      // Draw branches and connections
      neurons.forEach(neuron => {
        // Apply subtle offset to neuron position
        const neuronX = neuron.x + offsetX * Math.sin(time * 0.001 + neuron.pulsePhase)
        const neuronY = neuron.y + offsetY * Math.cos(time * 0.001 + neuron.pulsePhase)

        // Draw branches
        neuron.branches.forEach(branch => {
          const gradient = ctx.createLinearGradient(
            branch.startX + offsetX * Math.sin(time * 0.001), branch.startY + offsetY * Math.cos(time * 0.001),
            branch.endX + offsetX * Math.sin(time * 0.001 + Math.PI), branch.endY + offsetY * Math.cos(time * 0.001 + Math.PI)
          )
          gradient.addColorStop(0, `rgba(0, 102, 255, ${branch.opacity})`)
          gradient.addColorStop(1, `rgba(0, 240, 255, ${branch.opacity * 0.5})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = branch.width
          ctx.beginPath();
          ctx.moveTo(branch.startX + offsetX * Math.sin(time * 0.001), branch.startY + offsetY * Math.cos(time * 0.001));

          const points = [
            { x: branch.startX + offsetX * Math.sin(time * 0.001), y: branch.startY + offsetY * Math.cos(time * 0.001) },
            ...branch.controlPoints.map(p => ({ x: p.x + offsetX * Math.sin(time * 0.001), y: p.y + offsetY * Math.cos(time * 0.001) })),
            { x: branch.endX + offsetX * Math.sin(time * 0.001 + Math.PI), y: branch.endY + offsetY * Math.cos(time * 0.001 + Math.PI) }
          ]

          for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2
            const yc = (points[i].y + points[i + 1].y) / 2
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
          }

          ctx.quadraticCurveTo(
            points[points.length - 2].x,
            points[points.length - 2].y,
            points[points.length - 1].x,
            points[points.length - 1].y
          )
          ctx.stroke()

          // Draw pulses along the branch
          branch.pulsePositions.forEach((pos, i) => {
            branch.pulsePositions[i] = (pos + 0.002) % 1
            const t = branch.pulsePositions[i]

            // Calculate point position along the curved path
            const allPoints = [
              { x: branch.startX + offsetX * Math.sin(time * 0.001), y: branch.startY + offsetY * Math.cos(time * 0.001) },
              ...branch.controlPoints.map(p => ({ x: p.x + offsetX * Math.sin(time * 0.001), y: p.y + offsetY * Math.cos(time * 0.001) })),
              { x: branch.endX + offsetX * Math.sin(time * 0.001 + Math.PI), y: branch.endY + offsetY * Math.cos(time * 0.001 + Math.PI) }
            ]
            const segmentIndex = Math.floor(t * (allPoints.length - 1))
            const segmentT = (t * (allPoints.length - 1)) % 1

            const p1 = allPoints[segmentIndex]
            const p2 = allPoints[Math.min(segmentIndex + 1, allPoints.length - 1)]

            const x = p1.x + (p2.x - p1.x) * segmentT
            const y = p1.y + (p2.y - p1.y) * segmentT

            const glow = ctx.createRadialGradient(
              x, y, 0,
              x, y, 4
            )
            glow.addColorStop(0, `rgba(255, 140, 0, ${0.8 - t * 0.5})`)
            glow.addColorStop(1, 'rgba(255, 140, 0, 0)')

            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fill()
          })

          // Draw synapse at the end of each branch
          drawSynapse(branch.endX + offsetX * Math.sin(time * 0.001 + Math.PI), branch.endY + offsetY * Math.cos(time * 0.001 + Math.PI), branch.synapseType, ctx)
        })

        // Draw connections to other neurons
        neuron.connections.forEach(targetIndex => {
          const target = neurons[targetIndex]
          const targetX = target.x + offsetX * Math.sin(time * 0.001 + target.pulsePhase)
          const targetY = target.y + offsetY * Math.cos(time * 0.001 + target.pulsePhase)

          const gradient = ctx.createLinearGradient(
            neuronX, neuronY,
            targetX, targetY
          )
          gradient.addColorStop(0, `rgba(0, 102, 255, ${0.2 + Math.sin(time * 0.001 + neuron.pulsePhase) * 0.1})`)
          gradient.addColorStop(1, `rgba(0, 240, 255, ${0.2 + Math.sin(time * 0.001 + neurons[targetIndex].pulsePhase) * 0.1})`)

          ctx.beginPath()
          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5
          ctx.moveTo(neuronX, neuronY)
          ctx.lineTo(targetX, targetY)
          ctx.stroke()
        })

        // Draw neuron cell body
        // Use neuronX, neuronY in place of neuron.x, neuron.y in the existing cell body drawing code
        let cellColor
        switch (neuron.type) {
          case 'sensory':
            cellColor = '#FFD700'
            break
          case 'motor':
            cellColor = '#FF6347'
            break
          case 'interneuron':
            cellColor = '#00CED1'
            break
        }
        const cellGradient = ctx.createRadialGradient(
          neuronX, neuronY, 0,
          neuronX, neuronY, neuron.size
        )
        cellGradient.addColorStop(0, cellColor)
        cellGradient.addColorStop(1, '#0066FF')

        ctx.fillStyle = cellGradient
        ctx.beginPath()
        ctx.arc(neuronX, neuronY, neuron.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw outer glow
        const outerGlow = ctx.createRadialGradient(
          neuronX, neuronY, 0,
          neuronX, neuronY, neuron.size * 3
        )
        outerGlow.addColorStop(0, `rgba(0, 102, 255, ${0.4 + Math.sin(neuron.pulsePhase) * 0.2})`)
        outerGlow.addColorStop(1, 'rgba(0, 102, 255, 0)')

        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(neuronX, neuronY, neuron.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      drawTextSnippets(ctx, time)

      const drawCredit = () => {
        ctx.save();
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.textAlign = 'right';
        ctx.fillText('Visualization by v0', canvas.width - 10, canvas.height - 10);
        ctx.restore();
      };

      drawCredit();
      ctx.restore()
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawNeuralNetwork(time)
      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  )
}

