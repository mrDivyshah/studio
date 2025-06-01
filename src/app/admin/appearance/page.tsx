
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Palette, RefreshCw } from 'lucide-react';

interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  muted: string;
  mutedForeground: string;
}

const initialThemeColors: ThemeColors = {
  background: '',
  foreground: '',
  primary: '',
  primaryForeground: '',
  secondary: '',
  secondaryForeground: '',
  accent: '',
  accentForeground: '',
  card: '',
  cardForeground: '',
  border: '',
  input: '',
  ring: '',
  muted: '',
  mutedForeground: '',
};

// Helper to extract HSL value part, e.g., "40 50% 96%" from "hsl(40 50% 96%)" or just "40 50% 96%"
const getHslValue = (cssVarValue: string): string => {
  const trimmedValue = cssVarValue.trim();
  const match = trimmedValue.match(/^hsl\((.*)\)$/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return trimmedValue; // Assume it's already the value part if no hsl() wrapper
};


export default function AppearancePage() {
  const [themeColors, setThemeColors] = useState<ThemeColors>(initialThemeColors);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const fetchCurrentTheme = () => {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      setThemeColors({
        background: getHslValue(rootStyles.getPropertyValue('--background')),
        foreground: getHslValue(rootStyles.getPropertyValue('--foreground')),
        primary: getHslValue(rootStyles.getPropertyValue('--primary')),
        primaryForeground: getHslValue(rootStyles.getPropertyValue('--primary-foreground')),
        secondary: getHslValue(rootStyles.getPropertyValue('--secondary')),
        secondaryForeground: getHslValue(rootStyles.getPropertyValue('--secondary-foreground')),
        accent: getHslValue(rootStyles.getPropertyValue('--accent')),
        accentForeground: getHslValue(rootStyles.getPropertyValue('--accent-foreground')),
        card: getHslValue(rootStyles.getPropertyValue('--card')),
        cardForeground: getHslValue(rootStyles.getPropertyValue('--card-foreground')),
        border: getHslValue(rootStyles.getPropertyValue('--border')),
        input: getHslValue(rootStyles.getPropertyValue('--input')),
        ring: getHslValue(rootStyles.getPropertyValue('--ring')),
        muted: getHslValue(rootStyles.getPropertyValue('--muted')),
        mutedForeground: getHslValue(rootStyles.getPropertyValue('--muted-foreground')),
      });
       toast({
        title: "Theme Loaded",
        description: "Current theme colors loaded into form.",
      });
    }
  };
  
  useEffect(() => {
    fetchCurrentTheme();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading theme settings...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThemeColors(prev => ({ ...prev, [name]: value }));
  };

  const applyThemeChanges = () => {
    Object.entries(themeColors).forEach(([key, value]) => {
      // Convert kebab-case to CSS variable name
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      if (value.trim() !== '') { // Only set if value is not empty
        // For HSL values, they are typically stored directly in globals.css without hsl()
        // So we add hsl() when setting them via JS, unless they already include it.
        const finalValue = value.includes('hsl(') ? value : `hsl(${value})`;
        document.documentElement.style.setProperty(cssVarName, finalValue);
      } else {
         // If value is empty, remove the inline style to revert to stylesheet
        document.documentElement.style.removeProperty(cssVarName);
      }
    });
    toast({
      title: "Theme Preview Updated",
      description: "Color changes applied for live preview on this page. These are not saved permanently.",
    });
  };
  
  const resetToDefaultStyles = () => {
    // Remove all inline styles set by this component
    Object.keys(themeColors).forEach((key) => {
       const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
       document.documentElement.style.removeProperty(cssVarName);
    });
    // Re-fetch from computed (stylesheet) values
    fetchCurrentTheme();
    toast({
      title: "Theme Reset",
      description: "Preview reverted to stylesheet defaults.",
    });
  };


  const colorFields: Array<{ key: keyof ThemeColors; label: string; description: string }> = [
    { key: 'background', label: 'Background', description: 'e.g., 0 0% 100% (for white)' },
    { key: 'foreground', label: 'Foreground (Text)', description: 'e.g., 222.2 47.4% 11.2% (for dark text)' },
    { key: 'card', label: 'Card Background', description: 'e.g., 0 0% 100%' },
    { key: 'cardForeground', label: 'Card Foreground (Text)', description: 'e.g., 222.2 47.4% 11.2%' },
    { key: 'primary', label: 'Primary Accent', description: 'e.g., 25 90% 68%' },
    { key: 'primaryForeground', label: 'Primary Foreground (Text on Primary)', description: 'e.g., 220 15% 15%' },
    { key: 'secondary', label: 'Secondary Accent', description: 'e.g., 30 70% 90%' },
    { key: 'secondaryForeground', label: 'Secondary Foreground (Text on Secondary)', description: 'e.g., 220 15% 35%' },
    { key: 'accent', label: 'Accent (e.g. Buttons)', description: 'e.g., 220 15% 20%' },
    { key: 'accentForeground', label: 'Accent Foreground (Text on Accent)', description: 'e.g., 0 0% 98%' },
    { key: 'muted', label: 'Muted Background', description: 'e.g., 40 30% 92%' },
    { key: 'mutedForeground', label: 'Muted Foreground (Text)', description: 'e.g., 220 10% 45%' },
    { key: 'border', label: 'Border Color', description: 'e.g., 40 20% 85%' },
    { key: 'input', label: 'Input Background', description: 'e.g., 0 0% 100%' },
    { key: 'ring', label: 'Focus Ring Color', description: 'e.g., 25 90% 68%' },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Site Appearance</h1>
        <p className="text-muted-foreground">Customize the look and feel of your website. Changes are previewed live but are not saved permanently without manual CSS updates.</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Light Theme Colors</CardTitle>
          <CardDescription>
            Enter HSL values (e.g., "H S% L%"). For example, for white background, use "0 0% 100%".
            These changes apply a live preview. To make them permanent, update <code>src/app/globals.css</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorFields.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  name={key}
                  value={themeColors[key]}
                  onChange={handleInputChange}
                  placeholder={description}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={applyThemeChanges}>
            <Palette className="mr-2 h-4 w-4" /> Apply Preview
          </Button>
          <Button variant="outline" onClick={resetToDefaultStyles}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Preview
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
            <CardTitle className="text-base">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
                <strong>Live Preview Only:</strong> Changes made here modify the current page view for demonstration. They are not saved to your project files.
            </p>
            <p>
                <strong>Making Changes Permanent:</strong> To permanently apply these colors, you must manually copy the HSL values into the corresponding CSS variables in <code>src/app/globals.css</code>.
            </p>
            <p>
                <strong>Dark Theme:</strong> This tool currently only previews changes for the light theme. Dark theme customization would require similar inputs for variables under the <code>.dark</code> selector in <code>globals.css</code>.
            </p>
            <p>
                <strong>Persistence:</strong> For a production system where theme changes are saved and applied globally, you would need backend integration to store theme preferences and a mechanism to dynamically load these styles.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
