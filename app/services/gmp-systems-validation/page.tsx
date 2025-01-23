'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import InteractiveBackground from '@/components/InteractiveBackground'
import Header from '@/components/Header'

export default function GMPSystemsValidation() {
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
            GMP Systems Validation
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                Our GMP Systems Validation service ensures that your systems meet the highest standards of Good Manufacturing Practice. We employ cutting-edge methodologies and industry-leading expertise to validate your critical systems, guaranteeing compliance and operational excellence.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold leading-relaxed">Key Features:</h2>
                <ul className="list-disc list-inside space-y-3">
                  <li className="leading-relaxed">Comprehensive system assessment</li>
                  <li className="leading-relaxed">Risk-based validation approach</li>
                  <li className="leading-relaxed">Customized validation protocols</li>
                  <li className="leading-relaxed">Automated testing and verification</li>
                  <li className="leading-relaxed">Continuous compliance monitoring</li>
                </ul>
              </div>
              <div className="pt-4">
                <a
                  href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-transparent border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-opacity"
                >
                  Request a Validation Consultation
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
                src="/gi.jpg"
                alt="GMP Systems Validation"
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

