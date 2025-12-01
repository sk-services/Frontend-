import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg">
                <img
                  src="/skcleanlogo.png"
                  alt="SEVA MANTRA Logo"
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-white">SEVA MANTRA</h3>
              </div>
            </div>
            <p className="text-white text-sm">
              Your Partner for Pristine & Hygienic Spaces
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/sk_servicespune"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#FF8C00] text-white hover:scale-110 transition-all duration-300 hover:shadow-lg"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919209447145"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#007BFF] text-white hover:scale-110 transition-all duration-300 hover:shadow-lg"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex justify-center space-x-8">
              <Link to="/" className="text-white hover:text-[#FF8C00] transition-colors text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-[#FF8C00] transition-colors text-sm font-medium">
                About Us
              </Link>
              <Link to="/contact" className="text-white hover:text-[#FF8C00] transition-colors text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-right">
            <div className="flex items-center justify-end space-x-2">
              <Phone className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white text-sm">92094 47145</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <MapPin className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-white text-sm">Pune, PCMC & IT Hubs</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d1cff0] mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white text-sm">
              © 2024 SEVA MANTRA. All rights reserved.
            </p>

            {/* Social Media Links - Footer */}
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">Follow us:</span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com/sk_servicespune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#FF8C00] text-white hover:scale-110 transition-all duration-300 hover:shadow-lg"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/919209447145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#007BFF] text-white hover:scale-110 transition-all duration-300 hover:shadow-lg"
                  title="Chat with us on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
