import { Instagram, MessageCircle } from 'lucide-react';

export default function FloatingSocialButtons() {
  return (
    <div className="fixed right-6 z-40 flex flex-col space-y-4" style={{ bottom: '25%' }}>
      {/* Instagram Button */}
      <a 
        href="https://instagram.com/sk_servicespune" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
        title="Follow us on Instagram"
      >
        <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <Instagram className="w-6 h-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
            Follow us on Instagram
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/919209447145" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative"
        title="Chat with us on WhatsApp"
      >
        <div className="p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      </a>

      {/* Connecting line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-300 via-transparent to-green-300 opacity-30"></div>
    </div>
  );
}
