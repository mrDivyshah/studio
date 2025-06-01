import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Electro Hub.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="font-semibold text-xl text-foreground pt-4">1. Introduction</h2>
          <p>Welcome to Electro Hub. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you fill out a contact form, such as your name, email address, phone number, and message content.</p>
          <p>We may also collect non-personal information, such as browser type, operating system, and browsing patterns through cookies and similar technologies to improve our website.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Improve our website and services.</li>
            <li>Communicate with you about products, services, and promotions, if you opt-in.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="font-semibold text-xl text-foreground pt-4">4. Disclosure of Your Information</h2>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">5. Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
          
          <h2 className="font-semibold text-xl text-foreground pt-4">6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 className="font-semibold text-xl text-foreground pt-4">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us using the information on our Contact page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
