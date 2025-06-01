import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BUSINESS_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${BUSINESS_NAME}.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

          <h2 className="font-semibold text-xl text-foreground pt-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the {BUSINESS_NAME} website (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">2. Use of the Service</h2>
          <p>You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Service. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the Service.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">3. Intellectual Property</h2>
          <p>All content included on the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Service, is the property of {BUSINESS_NAME} or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">4. Service Information</h2>
          <p>We strive to ensure that all information on the Service, including service descriptions and prices, is accurate and up-to-date. However, we do not warrant that service descriptions or other content of this Service is accurate, complete, reliable, current, or error-free. If a service offered by the Service itself is not as described, your sole remedy is to discuss this with us.</p>
          
          <h2 className="font-semibold text-xl text-foreground pt-4">5. Limitation of Liability</h2>
          <p>In no event shall {BUSINESS_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">6. Changes to Terms</h2>
          <p>{BUSINESS_NAME} reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">7. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us using the information on our Contact page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
