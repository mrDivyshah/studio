
import type { Metadata } from 'next';
import Image from 'next/image';
import { OWNER_NAME, OWNER_BIO, BUSINESS_HISTORY, BUSINESS_MISSION, BUSINESS_VALUES, TESTIMONIALS, BUSINESS_NAME, OWNER_IMAGE_URL, OWNER_IMAGE_HINT } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${BUSINESS_NAME}, our mission, values, and what our clients say about us.`,
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold mb-4">About {BUSINESS_NAME}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the story behind {BUSINESS_NAME}, our commitment to excellence, and the values that drive us.
        </p>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{BUSINESS_HISTORY}</p>
          </CardContent>
        </Card>
      </section>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{BUSINESS_MISSION}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              {BUSINESS_VALUES.split(',').map(value => (
                <li key={value.trim()} className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  {value.trim()}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section className="bg-secondary py-16 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Meet Our Team</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-xl">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-md shrink-0">
              <Image
                src={OWNER_IMAGE_URL}
                alt={`Photo of ${OWNER_NAME}`}
                data-ai-hint={OWNER_IMAGE_HINT}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-headline text-2xl font-semibold mb-2">{OWNER_NAME}</h3>
              <p className="text-primary mb-4 font-medium">Founders & Experts</p>
              <p className="text-muted-foreground leading-relaxed">{OWNER_BIO}</p>
            </div>
          </div>
        </div>
      </section>

      {TESTIMONIALS && TESTIMONIALS.length > 0 && (
        <section>
          <h2 className="font-headline text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
