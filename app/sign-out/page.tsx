"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SignOutPage() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect will happen automatically due to auth state change
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Redirect to home after successful sign out
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <LogOut className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign Out</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to complete the sign out process. You will be redirected to the home page.
          </p>
          
          <Button onClick={handleSignOut} className="w-full">
            Complete Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
