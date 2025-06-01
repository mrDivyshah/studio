import Image from 'next/image';
import { PARTNERS_DATA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PartnerLogos() {
  if (!PARTNERS_DATA || PARTNERS_DATA.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-secondary/30 rounded-xl">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-12 md:mb-16">Our Valued Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {PARTNERS_DATA.map((partner) => (
            <Card key={partner.id} className="bg-card text-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 border-transparent hover:border-primary/20">
              <CardHeader className="p-2 items-center">
                <div className="relative h-16 w-full mb-4 flex justify-center items-center">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    data-ai-hint={partner.logoHint}
                    width={120} 
                    height={60}  
                    style={{ objectFit: 'contain' }}
                    className="rounded-md"
                  />
                </div>
                <CardTitle className="font-headline text-lg font-semibold text-foreground">{partner.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <CardDescription className="text-xs text-muted-foreground leading-snug">{partner.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
