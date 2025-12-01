import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield
} from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Phone",
      value: "92094 47145",
      description: "Available during business hours for emergency services"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Service Areas",
      value: "Pune, PCMC & IT Hubs",
      description: "Complete coverage across the region"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Business Hours",
      value: "Business Hours",
      description: "Flexible scheduling to fit your needs"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      text: "Quick Response Time"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-600" />,
      text: "Trusted by Industry Leaders"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
      text: "100% Satisfaction Guarantee"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-display font-semibold text-slate-900 leading-tight">
                Get in
                <br />
                <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Ready to transform your space? Contact us today for a free consultation
                and discover how we can help create a cleaner, healthier environment.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-slate-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=600&fit=crop"
                alt="Contact SEVA MANTRA"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">Contact Information</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple ways to reach us for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 bg-slate-50 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-10 text-center">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-slate-900">
                    {info.title}
                  </h3>
                  <div className="text-2xl font-display font-semibold text-slate-900 mb-2">
                    {info.value}
                  </div>
                  <p className="text-slate-600">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl font-display font-semibold text-slate-900">
                  Request a Quote
                </h2>
                <p className="text-xl text-slate-600">
                  Fill out the form below and we'll get back to you within 24 hours with a customized quote.
                </p>
              </div>

              <Card className="border-0 bg-white shadow-xl">
                <CardContent className="p-10">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name</label>
                        <Input placeholder="Adarsh" className="h-12 rounded-xl border-slate-200" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                        <Input placeholder="Dhawale" className="h-12 rounded-xl border-slate-200" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input type="email" placeholder="example@gmail.com" className="h-12 rounded-xl border-slate-200" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone</label>
                      <Input type="tel" placeholder="+91 98765 43210" className="h-12 rounded-xl border-slate-200" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Service Type</label>
                      <select className="w-full h-12 rounded-xl border border-slate-200 px-4 bg-white text-slate-700">
                        <option>Select a service</option>
                        <option>Commercial Cleaning</option>
                        <option>Restaurant Cleaning</option>
                        <option>Industrial Cleaning</option>
                        <option>Office Deep Cleaning</option>
                        <option>Home Cleaning</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Property Size</label>
                      <Input placeholder="e.g., 2000 sq ft | 2bhk | 3bhk" className="h-12 rounded-xl border-slate-200" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Message</label>
                      <Textarea
                        placeholder="Tell us about your cleaning requirements..."
                        className="min-h-32 rounded-xl border-slate-200"
                      />
                    </div>

                    <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl text-lg">
                      Send Message
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Side */}
            <div className="space-y-8">
              <div className="bg-slate-900 text-white rounded-3xl p-10">
                <h3 className="text-3xl font-display font-semibold mb-6">
                  Why Choose Us?
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours Availability</h4>
                      <p className="text-slate-300">Emergency cleaning services available during business hours</p>
                    </div>
                  </div>

                  {/* <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Professional Team at Your Service</h4>
                      <p className="text-slate-300">Complimentary site visit an customized cleaning plan</p>
                    </div>
                  </div> */}

                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Trusted by TATA</h4>
                      <p className="text-slate-300">Proven track record with industry leaders</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Premium Quality Chemicals</h4>
                      <p className="text-slate-300">Best chemicals to ensure better hygiene</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700">
                  <h4 className="font-semibold mb-4">Quick Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <a
                        href="tel:9209447145"
                        className="text-lg font-semibold hover:text-green-400 transition-colors duration-300 cursor-pointer transform hover:scale-105"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = 'tel:9209447145';
                        }}
                      >
                        92094 47145
                      </a>
                    </div>
                    <div className="text-slate-300 text-sm">
                      Available during business hours • Pune, PCMC & IT Hubs
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h4 className="text-2xl font-display font-semibold text-slate-900 mb-6">
                  Service Areas
                </h4>
                <div className="space-y-4 text-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Pune City</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>PCMC (Pimpri-Chinchwad)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>IT Hubs & Corporate Parks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Industrial Areas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Commercial Districts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      {/* <section className="py-32 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl font-display font-semibold">
            Need Emergency Cleaning?
          </h2>
          <p className="text-xl text-blue-100">
            We're available during business hours for urgent cleaning requirements
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <a 
              href="tel:9209447145" 
              className="block group"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'tel:9209447145';
              }}
            >
              <div className="text-3xl font-display font-semibold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent hover:from-green-400 hover:to-blue-400 transition-all duration-500 cursor-pointer transform hover:scale-110 group-hover:animate-pulse">
                📞 92094 47145
              </div>
            </a>
            <div className="text-blue-200">Emergency Hotline • Always Available</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-white text-white hover:bg-white/10 rounded-xl">
              Send Message
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
