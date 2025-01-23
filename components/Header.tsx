'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const menuItems = [
  {
    title: 'Services',
    submenu: [
      { title: 'GMP Systems Validation', description: 'Next-gen compliance for manufacturing processes' },
      { title: 'Data Integrity Assessment', description: 'Cutting-edge data management practices' },
      { title: 'Compliance Strategy', description: 'Innovative approaches to regulatory challenges' },
      { title: 'Quality Management Systems', description: 'Agile QMS for the digital era' },
    ]
  },
  {
    title: 'Expertise',
    submenu: [
      { title: 'Pharmaceutical', description: 'Streamlined solutions for drug development and manufacturing' },
      { title: 'Biotechnology', description: 'Adaptive compliance for rapid biotech advancements' },
      { title: 'Nutraceuticals', description: 'Navigating the evolving landscape of dietary supplements' },
    ]
  },
  { title: 'Contact' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary bg-opacity-50' : 'bg-transparent'} backdrop-filter backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold tracking-tighter">
              <span className="text-secondary">A</span>
              <span className="text-accent">R</span>
              <span className="text-highlight">V</span>
            </div>
            <span className="text-white text-sm font-semibold tracking-wider">CONSULTING</span>
          </Link>
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                {!item.submenu && (
                  <Link
                    href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white hover:text-secondary transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
                {item.submenu && (
                  <button
                    className="text-white hover:text-secondary transition-colors flex items-center"
                    onMouseEnter={() => setActiveSubmenu(item.title)}
                    onClick={() => setActiveSubmenu(activeSubmenu === item.title ? null : item.title)}
                  >
                    {item.title}
                    {item.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                  </button>
                )}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-64 bg-primary rounded-lg shadow-lg overflow-hidden"
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={`/${item.title.toLowerCase()}/${subitem.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-secondary/10 transition-colors"
                          >
                            <div className="font-semibold">{subitem.title}</div>
                            <div className="text-xs text-white/70">{subitem.description}</div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          <a
            href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block px-6 py-2 bg-white text-primary rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Free Consultation
            </motion.button>
          </a>
          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary bg-opacity-50 backdrop-filter backdrop-blur-sm"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <button
                    className="text-white hover:text-secondary transition-colors w-full text-left flex justify-between items-center"
                    onClick={() => setActiveSubmenu(activeSubmenu === item.title ? null : item.title)}
                  >
                    {item.title}
                    {item.submenu && <ChevronDown className={`w-4 h-4 transform transition-transform ${activeSubmenu === item.title ? 'rotate-180' : ''}`} />}
                  </button>
                  {item.submenu && activeSubmenu === item.title && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}/${subitem.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="https://app.squareup.com/appointments/book/wys5yhrk7z4q2o/LF2P17Y759WW7/start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-primary rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 w-full"
                >
                  Free Consultation
                </motion.button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

