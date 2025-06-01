
"use client";

// import type { Metadata } from 'next'; // Metadata needs careful handling with client components
import Link from 'next/link';
import { Home, Briefcase, Settings, Palette, FileText, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BUSINESS_NAME } from '@/lib/constants';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Image from 'next/image';

// It's better to set metadata in specific page.tsx files for admin section
// or use a static export if layout doesn't change much based on route.
// export const metadata: Metadata = {
//   title: `Admin - ${BUSINESS_NAME}`,
//   description: `Admin panel for ${BUSINESS_NAME}.`,
// };

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading Admin Area...</div>;
  }

  if (!user && pathname !== '/admin/login') {
    // This primarily acts as a fallback if useEffect doesn't redirect immediately.
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Redirecting to Login...</div>;
  }

  // Render login page without the full admin layout chrome if user is not logged in and on login page
  if (!user && pathname === '/admin/login') {
    return <main className="flex-1">{children}</main>;
  }
  
  // If user exists OR (it's the login page AND user is null but not loading - this case is handled above, so this is mainly for user === true)
  if (user) {
      return (
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/admin" className="flex items-center gap-2 group">
                 <Image 
                    src="/logo.png" 
                    alt={`${BUSINESS_NAME} logo`} 
                    width={40} 
                    height={40}
                    className="h-8 w-auto group-hover:opacity-80 transition-opacity"
                  />
                <span className="text-lg font-bold group-hover:text-primary transition-colors">{BUSINESS_NAME} Admin</span>
              </Link>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">View Site</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={async () => {
                  await signOutUser();
                  // router.push('/admin/login') will be handled by the effect hook
                }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>
          {pathname !== '/admin/login' ? (
            <div className="flex flex-1">
              <aside className="hidden md:flex w-64 flex-col space-y-1 border-r p-4 pt-6">
                <Button variant={pathname === "/admin" ? "secondary" : "ghost"} className="justify-start" asChild>
                  <Link href="/admin"><Home className="mr-2 h-4 w-4" />Dashboard</Link>
                </Button>
                <Button variant={pathname === "/admin/content" ? "secondary" : "ghost"} className="justify-start" asChild>
                  <Link href="/admin/content"><FileText className="mr-2 h-4 w-4" />Site Content</Link>
                </Button>
                <Button variant={pathname === "/admin/services" ? "secondary" : "ghost"} className="justify-start" asChild>
                  <Link href="/admin/services"><Briefcase className="mr-2 h-4 w-4" />Manage Services</Link>
                </Button>
                <Button variant={pathname === "/admin/appearance" ? "secondary" : "ghost"} className="justify-start" asChild>
                  <Link href="/admin/appearance"><Palette className="mr-2 h-4 w-4" />Appearance</Link>
                </Button>
              </aside>
              <main className="flex-1 p-6 lg:p-8 bg-muted/10">{children}</main>
            </div>
          ) : (
             // This case should ideally not be hit if user is logged in
             <main className="flex-1 p-6 lg:p-8 bg-muted/40 flex items-center justify-center">{children}</main>
          )}
        </div>
      );
  }
  
  // Fallback if user is null and path is /admin/login (handled by initial block) or other unexpected state
  return <main className="flex-1">{children}</main>;
}

export default function AdminLayout({ children }: { children: ReactNode; }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
