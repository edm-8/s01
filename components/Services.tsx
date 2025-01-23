'use client'

import { motion } from 'framer-motion'

const services = [
  { title: 'GMP Systems Validation', icon: '🔍' },
  { title: 'Data Integrity Assessment', icon: '📊' },
  { title: 'Compliance Strategy', icon: '📈' },
  { title: 'Quality Management Systems', icon: '🏆' },
  { title: 'Digital Transformation', icon: '💻' },
  { title: 'Regulatory Guidance', icon: '📋' },
]

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center font-space-grotesk">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-space-grotesk">{service.title}</h3>
              <p className="text-gray-300 font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

