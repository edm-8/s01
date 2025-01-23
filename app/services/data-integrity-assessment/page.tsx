'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import InteractiveBackground from '@/components/InteractiveBackground'
import Header from '@/components/Header'

export default function DataIntegrityAssessment() {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <Header />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 pt-28">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-12 gradient-text leading-normal md:leading-normal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Data Integrity Assessment
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                Our Data Integrity Assessment service ensures that your data meets the highest standards of accuracy, consistency, and reliability. We employ advanced methodologies to evaluate your data management practices, identifying potential risks and providing actionable recommendations for improvement.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold leading-relaxed">Key Features:</h2>
                <ul className="list-disc list-inside space-y-3">
                  <li className="leading-relaxed">Comprehensive data flow analysis</li>
                  <li className="leading-relaxed">ALCOA+ principles implementation</li>
                  <li className="leading-relaxed">Risk-based data integrity assessment</li>
                  <li className="leading-relaxed">Automated data verification tools</li>
                  <li className="leading-relaxed">Regulatory compliance gap analysis</li>
                </ul>
              </div>
              <div className="pt-4">
                <a
                  href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-transparent border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-opacity"
                >
                  Schedule a Data Integrity Consultation
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 md:mt-0"
            >
              <Image
                src="/di.jpg"
                alt="Data Integrity Assessment"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

