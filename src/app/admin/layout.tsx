
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Briefcase, Settings, Palette, FileText } from 'lucide-react'; // Added Palette, FileText
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BUSINESS_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Admin - ${BUSINESS_NAME}`,
  description: `Admin panel for ${BUSINESS_NAME}.`,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="text-lg font-bold">
            {BUSINESS_NAME} Admin
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col space-y-2 border-r p-4 pt-6">
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/admin">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/admin/content">
              <FileText className="mr-2 h-4 w-4" />
              Site Content
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/admin/services">
              <Briefcase className="mr-2 h-4 w-4" />
              Manage Services
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link href="/admin/appearance">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </Link>
          </Button>
          {/* Add more admin navigation links here */}
          {/* <Button variant="ghost" className="justify-start" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Site Settings
            </Link>
          </Button> */}
        </aside>
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
