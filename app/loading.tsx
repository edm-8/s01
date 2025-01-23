'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="relative">
        {/* Neural network nodes */}
        <div className="flex space-x-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-secondary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Connecting lines */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="h-0.5 w-full bg-gradient-to-r from-secondary to-accent absolute top-1/2 transform -translate-y-1/2"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center mt-8 text-white/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <p className="text-lg font-space-grotesk">Loading</p>
        </motion.div>
      </div>
    </div>
  )
}

