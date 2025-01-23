'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import InteractiveBackground from '@/components/InteractiveBackground'
import Header from '@/components/Header'

export default function NutraceuticalsExpertise() {
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
            Nutraceuticals Expertise
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                Our nutraceuticals expertise specializes in navigating the complex regulatory landscape of dietary supplements and functional foods. We ensure your products meet all necessary quality and safety standards while helping you bring innovative health solutions to market.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold leading-relaxed">Key Focus Areas:</h2>
                <ul className="list-disc list-inside space-y-3">
                  <li className="leading-relaxed">FDA and FTC compliance for dietary supplements</li>
                  <li className="leading-relaxed">Good Manufacturing Practices (GMP) for nutraceuticals</li>
                  <li className="leading-relaxed">Label claim substantiation and marketing compliance</li>
                  <li className="leading-relaxed">Quality control for botanical ingredients</li>
                  <li className="leading-relaxed">Novel ingredient safety assessments</li>
                </ul>
              </div>
              <div className="pt-4">
                <a
                  href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-transparent border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition-opacity"
                >
                  Consult For Nutraceuticals Expertise
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
                src="/nu.jpg"
                alt="Nutraceuticals Expertise"
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

