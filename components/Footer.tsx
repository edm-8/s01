import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-primary-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-space-grotesk">ARV Consulting</h3>
            <p className="text-gray-400 font-inter">Elevating GMP Compliance Through Advanced Data Integrity Solutions</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-space-grotesk">Services</h4>
            <ul className="space-y-2 font-inter">
              <li><Link href="/services/gmp-validation">GMP Systems Validation</Link></li>
              <li><Link href="/services/data-integrity">Data Integrity Assessment</Link></li>
              <li><Link href="/services/compliance-strategy">Compliance Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-space-grotesk">Resources</h4>
            <ul className="space-y-2 font-inter">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/whitepapers">Whitepapers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-space-grotesk">Contact</h4>
            <p className="text-gray-400 font-inter">info@arvconsulting.com</p>
            <p className="text-gray-400 font-inter">+1 (000) 000-0000</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 font-inter">
          © 2025 ARV Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

