import Image from 'next/image';
import { PARTNERS_DATA } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PartnerLogos() {
  if (!PARTNERS_DATA || PARTNERS_DATA.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-3xl font-bold text-center mb-12">Our Valued Partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PARTNERS_DATA.map((partner) => (
            <Card key={partner.id} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="relative h-20 w-full mb-4 flex justify-center items-center">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    data-ai-hint={partner.logoHint}
                    width={150}
                    height={75}
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
                <CardTitle className="font-headline text-xl">{partner.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{partner.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
