
"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BUSINESS_NAME } from '@/lib/constants';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If user is already defined and we're not loading, useEffect should have redirected.
  // This prevents flashing the login page if already logged in.
  if (user) {
     return <div className="flex items-center justify-center min-h-screen">Redirecting to dashboard...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <Image src="/logo.png" alt={`${BUSINESS_NAME} Logo`} width={80} height={80} className="mx-auto mb-4 rounded-full" />
          <CardTitle className="text-2xl font-bold">{BUSINESS_NAME} Admin</CardTitle>
          <CardDescription>Please sign in to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={signInWithGoogle} 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
