import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Construction className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This page is currently under development. Please continue the conversation to help us build out this section with the specific content you need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Request Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
