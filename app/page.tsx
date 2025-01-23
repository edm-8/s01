'use client'

import { motion } from 'framer-motion'
import BackgroundMatrix from '../components/BackgroundMatrix'
import Header from '../components/Header'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <BackgroundMatrix />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
              Streamlining Regulatory Compliance for Digital Systems
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 text-center">
              Enterprise-grade validation solutions for pharma and biotech, simplified.
            </p>

            {/* Value Blocks */}
            <div className="grid gap-4 mb-12">
              {/* Expertise Block */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary-dark/50 backdrop-blur-sm rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-2 text-secondary">Expertise That Matters</h2>
                <p className="text-white/80">
                  Bringing pharmaceutical validation experience to your critical systems.
                </p>
              </motion.div>

              {/* Smart Compliance Block */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-dark/50 backdrop-blur-sm rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-2 text-secondary">Smart Compliance</h2>
                <p className="text-white/80">
                  Risk-based approaches that save time and resources while meeting FDA requirements.
                </p>
              </motion.div>

              {/* Modern Solutions Block */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary-dark/50 backdrop-blur-sm rounded-lg p-6"
              >
                <h2 className="text-xl font-bold mb-2 text-secondary">Modern Solutions</h2>
                <p className="text-white/80">
                  Digital-first validation strategies built for today's technology landscape.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center mb-12">
              <a
                href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-transparent border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center"
              >
                Explore Our Approach
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Bottom Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-white/80">
                Helping clients validate systems with confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

