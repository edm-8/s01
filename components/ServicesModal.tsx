import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const services = [
  { 
    title: 'GMP Systems Validation',
    description: 'Ensure your systems meet GMP standards with our comprehensive validation services.',
    icon: '🔍'
  },
  { 
    title: 'Data Integrity Assessment',
    description: 'Evaluate and enhance your data management practices to maintain regulatory compliance.',
    icon: '📊'
  },
  { 
    title: 'Compliance Strategy',
    description: 'Develop a robust compliance strategy tailored to your organization\'s unique needs.',
    icon: '📈'
  },
  { 
    title: 'Quality Management Systems',
    description: 'Implement and optimize quality management systems to streamline your operations.',
    icon: '🏆'
  },
  { 
    title: 'Digital Transformation',
    description: 'Modernize your compliance processes with cutting-edge digital solutions.',
    icon: '💻'
  },
  { 
    title: 'Regulatory Guidance',
    description: 'Navigate complex regulatory landscapes with our expert guidance and support.',
    icon: '📋'
  },
]

export default function ServicesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-primary-dark rounded-lg p-8 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold gradient-text">Our Services</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-primary/50 rounded-lg p-6 hover:bg-primary/70 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white/80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

