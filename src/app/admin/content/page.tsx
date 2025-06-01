
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import * as Constants from '@/lib/constants'; // Import all exports

type EditableConstants = Pick<
  typeof Constants,
  | 'BUSINESS_NAME'
  | 'BUSINESS_SLOGAN'
  | 'OWNER_NAME'
  | 'OWNER_BIO'
  | 'OWNER_IMAGE_URL'
  | 'OWNER_IMAGE_HINT'
  | 'SITE_HERO_IMAGE_URL'
  | 'SITE_HERO_IMAGE_HINT'
  | 'BUSINESS_HISTORY'
  | 'BUSINESS_MISSION'
  | 'BUSINESS_VALUES'
  | 'BUSINESS_PHONE'
  | 'OWNER_EMAIL'
  | 'OWNER_WHATSAPP_NUMBER'
  | 'BUSINESS_ADDRESS_LINE1'
  | 'BUSINESS_ADDRESS_LINE2'
>;

type BusinessHours = {
  MonSat: string;
  Sun: string;
};

const initialFormState: EditableConstants & { BUSINESS_HOURS_MonSat: string; BUSINESS_HOURS_Sun: string } = {
  BUSINESS_NAME: '',
  BUSINESS_SLOGAN: '',
  OWNER_NAME: '',
  OWNER_BIO: '',
  OWNER_IMAGE_URL: '',
  OWNER_IMAGE_HINT: '',
  SITE_HERO_IMAGE_URL: '',
  SITE_HERO_IMAGE_HINT: '',
  BUSINESS_HISTORY: '',
  BUSINESS_MISSION: '',
  BUSINESS_VALUES: '',
  BUSINESS_PHONE: '',
  OWNER_EMAIL: '',
  OWNER_WHATSAPP_NUMBER: '',
  BUSINESS_ADDRESS_LINE1: '',
  BUSINESS_ADDRESS_LINE2: '',
  BUSINESS_HOURS_MonSat: '',
  BUSINESS_HOURS_Sun: '',
};


export default function SiteContentPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      BUSINESS_NAME: Constants.BUSINESS_NAME,
      BUSINESS_SLOGAN: Constants.BUSINESS_SLOGAN,
      OWNER_NAME: Constants.OWNER_NAME,
      OWNER_BIO: Constants.OWNER_BIO,
      OWNER_IMAGE_URL: Constants.OWNER_IMAGE_URL,
      OWNER_IMAGE_HINT: Constants.OWNER_IMAGE_HINT,
      SITE_HERO_IMAGE_URL: Constants.SITE_HERO_IMAGE_URL,
      SITE_HERO_IMAGE_HINT: Constants.SITE_HERO_IMAGE_HINT,
      BUSINESS_HISTORY: Constants.BUSINESS_HISTORY,
      BUSINESS_MISSION: Constants.BUSINESS_MISSION,
      BUSINESS_VALUES: Constants.BUSINESS_VALUES,
      BUSINESS_PHONE: Constants.BUSINESS_PHONE,
      OWNER_EMAIL: Constants.OWNER_EMAIL,
      OWNER_WHATSAPP_NUMBER: Constants.OWNER_WHATSAPP_NUMBER,
      BUSINESS_ADDRESS_LINE1: Constants.BUSINESS_ADDRESS_LINE1,
      BUSINESS_ADDRESS_LINE2: Constants.BUSINESS_ADDRESS_LINE2,
      BUSINESS_HOURS_MonSat: Constants.BUSINESS_HOURS.MonSat,
      BUSINESS_HOURS_Sun: Constants.BUSINESS_HOURS.Sun,
    });
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading content settings...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveChanges = async () => {
    // In a real app, this would be an API call.
    // Here, we'll just show a toast and log it.
    // To actually change constants.ts, you'd need a build step or file system access on the server.
    
    // This toast signifies the intent to save. The actual file change would be handled by your backend/build process
    // or, in this simulated environment, by the AI applying changes to `constants.ts`.
    toast({
      title: "Changes Prepared (UI Only)",
      description: "Content changes have been prepared. In a real app, this would be saved to a database and/or trigger a site rebuild to update constants. For this demo, the AI will update the constants.ts file.",
    });
    console.log("Attempting to save content (simulated):", formData);

    // The AI will generate a <changes> block to modify src/lib/constants.ts
    // The content below is what it would look like conceptually,
    // but the AI will generate the actual XML based on the current formData.
  };


  const formSections = [
    {
      title: 'Business Information',
      fields: [
        { name: 'BUSINESS_NAME', label: 'Business Name', component: 'input' },
        { name: 'BUSINESS_SLOGAN', label: 'Slogan / Tagline', component: 'textarea' },
      ]
    },
    {
      title: 'Owner & Team Section',
      fields: [
        { name: 'OWNER_NAME', label: 'Owner/Team Name', component: 'input' },
        { name: 'OWNER_BIO', label: 'Owner/Team Bio', component: 'textarea', rows: 4 },
        { name: 'OWNER_IMAGE_URL', label: 'Owner/Team Image URL', component: 'input', placeholder: 'https://placehold.co/300x300.png' },
        { name: 'OWNER_IMAGE_HINT', label: 'Owner/Team Image AI Hint', component: 'input', placeholder: 'team photo professional' },
      ]
    },
    {
      title: 'Hero Section',
      fields: [
        { name: 'SITE_HERO_IMAGE_URL', label: 'Hero Image URL', component: 'input', placeholder: 'https://placehold.co/600x600.png' },
        { name: 'SITE_HERO_IMAGE_HINT', label: 'Hero Image AI Hint', component: 'input', placeholder: 'abstract marketing vibrant' },
      ]
    },
    {
      title: 'About Us Content',
      fields: [
        { name: 'BUSINESS_HISTORY', label: 'Business History', component: 'textarea', rows: 4 },
        { name: 'BUSINESS_MISSION', label: 'Business Mission', component: 'textarea', rows: 3 },
        { name: 'BUSINESS_VALUES', label: 'Business Values (comma-separated)', component: 'input' },
      ]
    },
    {
      title: 'Contact & Hours',
      fields: [
        { name: 'BUSINESS_PHONE', label: 'Business Phone', component: 'input' },
        { name: 'OWNER_EMAIL', label: 'Business Email', component: 'input' },
        { name: 'OWNER_WHATSAPP_NUMBER', label: 'WhatsApp Number', component: 'input' },
        { name: 'BUSINESS_ADDRESS_LINE1', label: 'Address Line 1', component: 'input' },
        { name: 'BUSINESS_ADDRESS_LINE2', label: 'Address Line 2', component: 'input' },
        { name: 'BUSINESS_HOURS_MonSat', label: 'Hours: Monday-Saturday', component: 'input' },
        { name: 'BUSINESS_HOURS_Sun', label: 'Hours: Sunday', component: 'input' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Site Content Management</h1>
        <p className="text-muted-foreground">Edit various text content and image URLs displayed across your website.</p>
      </section>

      {formSections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map(field => (
              <div key={field.name} className="space-y-1">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.component === 'input' && (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                  />
                )}
                {field.component === 'textarea' && (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] || ''}
                    onChange={handleInputChange}
                    rows={field.rows || 3}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardFooter className="pt-6">
          <Button onClick={handleSaveChanges} size="lg">
            <Save className="mr-2 h-4 w-4" /> Save All Changes (Updates constants.ts)
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-8 bg-destructive/10 border-destructive">
        <CardHeader>
            <CardTitle className="text-base text-destructive">Important Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-destructive/80">
            <p>
                <strong>File-Based "Database":</strong> Changes made and "saved" here will attempt to modify the <code>src/lib/constants.ts</code> file directly.
                This is a simulation for development purposes.
            </p>
            <p>
                <strong>Production Systems:</strong> In a live production environment, content should be managed via a proper database and backend API. Modifying source files directly is not a standard production practice.
            </p>
            <p>
                <strong>Build Process:</strong> For changes in <code>constants.ts</code> to be reflected site-wide, Next.js typically requires a re-render or, in some cases, a rebuild, especially if values are deeply imported or cached. Fast Refresh helps in development.
            </p>
            <p>
                <strong>Image URLs:</strong> This panel allows updating image URLs. Actual image file uploads are not supported and would require server-side handling and file storage.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
