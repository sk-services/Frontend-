import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Users,
  Award,
  Clock,
  Shield,
  Target,
  Eye,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Happy Clients" }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Quality Assurance",
      description: "We maintain the highest standards in every project, ensuring spotless results every time."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Professional Team",
      description: "Our trained and experienced professionals deliver reliable, consistent service."
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Timely Service",
      description: "We respect your schedule and deliver on time, every time, without compromising quality."
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
                About
                <br />
                <span className="gradient-text">SEVA MANTRA</span>
                <br />
                Services
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Your trusted partner for pristine and hygienic spaces. We specialize in delivering
                spotless, professional cleaning solutions across Pune, PCMC, and surrounding IT hubs.
              </p>
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl" onClick={() => (window as any).openChatbot?.()}>
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="lg:justify-self-end">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop"
                  alt="Professional cleaning team"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">Our Story</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Founded with a vision to transform workspaces across Pune and PCMC, SEVA MANTRA
              has grown to become a trusted name in professional cleaning solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                We started with a simple mission: to provide exceptional cleaning services that exceed
                expectations. Today, we're proud to serve offices, restaurants, and industrial facilities
                with the same dedication to quality and professionalism.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our team of trained professionals uses advanced equipment and eco-friendly solutions
                to deliver spotless, hygienic environments. We understand that every space is unique,
                which is why we offer customized cleaning plans tailored to your specific needs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Trusted by industry leaders including TATA, we continue to set new standards in the
                cleaning industry through innovation, reliability, and unwavering commitment to excellence.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600">
                    To deliver exceptional cleaning solutions that create healthier, more productive environments
                    for businesses across Pune and PCMC.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-50 p-3 rounded-lg flex-shrink-0">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">Our Vision</h3>
                  <p className="text-slate-600">
                    To be the leading provider of innovative, sustainable cleaning solutions that set
                    new industry standards for quality and service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <Card key={index} className="border-0 bg-white hover:shadow-xl transition-all duration-500">
                <CardContent className="p-10 text-center">
                  <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-6 text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">Our Impact</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <div className="text-5xl font-display font-semibold gradient-text">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-display font-semibold text-slate-900">Our Commitment</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              What sets us apart in the cleaning industry
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Trained Professionals</h4>
                    <p className="text-slate-600">
                      Our team undergoes rigorous training and certification to ensure the highest service standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Advanced Equipment</h4>
                    <p className="text-slate-600">
                      State-of-the-art cleaning technology and eco-friendly products for superior results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Flexible Scheduling</h4>
                    <p className="text-slate-600">
                      We work around your business hours to minimize disruption to your operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Quality Assurance</h4>
                    <p className="text-slate-600">
                      Every project includes quality inspection to ensure we meet our high standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop"
                alt="Professional cleaning equipment"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl font-display font-semibold">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-slate-300">
            Contact us today to learn more about our services and get a free consultation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-4 bg-white text-slate-900 hover:bg-gray-100 rounded-xl"
              onClick={() => window.location.href = 'tel:9209447145'}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
