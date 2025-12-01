import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

export default function ReadyToTransform() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-white text-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">


          <h2 className="text-5xl lg:text-6xl font-display font-semibold leading-tight">
            Ready to Transform
            <br />
            <span className="gradient-text">Your Space?</span>
          </h2>

          <p className="text-xl text-black/90 leading-relaxed max-w-3xl mx-auto">
            Join 100+ satisfied clients who trust SEVA MANTRA for their premium cleaning needs.
            Get your free consultation today and experience the difference.
          </p>

          {/* Contact highlight */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="space-y-4">
              <div className="text-black/90">
                <div className="text-sm opacity-80">Call Now for Instant Quote</div>
                <a
                  href="tel:9209447145"
                  className="inline-block group"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'tel:9209447145';
                  }}
                >
                  <div className="text-3xl font-display font-bold animate-pulse bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-yellow-400 hover:to-pink-400 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:rotate-1 group-hover:animate-bounce">
                    📞 92094 47145
                  </div>
                </a>
              </div>
              <div className="text-black/80 text-sm">
                Available during business hours • Free Consultation • Pune & PCMC
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-12 py-6 bg-white text-slate-900 hover:bg-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button> */}
            {/* <Button 
              size="lg" 
              variant="outline" 
              className="text-xl px-8 py-6 bg-white text-slate-900 hover:bg-gray-100 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now
            </Button> */}
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
            <div className="text-center group">
              <div className="text-2xl font-display font-bold text-black mb-1 group-hover:scale-110 transition-transform duration-300">100+</div>
              <div className="text-black/70 text-sm">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-display font-bold text-black mb-1 group-hover:scale-110 transition-transform duration-300">5+</div>
              <div className="text-black/70 text-sm">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-display font-bold text-black mb-1 group-hover:scale-110 transition-transform duration-300">TATA</div>
              <div className="text-black/70 text-sm">Trusted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
