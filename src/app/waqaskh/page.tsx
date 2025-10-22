'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const AdminContent = () => (
  <Card className="max-w-2xl w-full text-center shadow-lg">
    <CardHeader>
      <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
        <ShieldCheck className="h-10 w-10" />
      </div>
      <CardTitle className="text-3xl font-bold mt-4">Admin Panel</CardTitle>
      <CardDescription>This is the control center for your AI application.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 text-muted-foreground">
      <p>Features like traffic analytics, content management, branding customization, and AI API configuration are available here.</p>
      <p>This panel allows for full administrative control, ensuring brand consistency and data privacy.</p>
      <div className="text-center pt-4">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem('isAdminAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Could not access sessionStorage', error);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Waqas' && password === 'Khalid') {
      try {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
      } catch (error) {
        console.error('Could not access sessionStorage', error);
      }
      setIsAuthenticated(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome, Admin!',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {isAuthenticated ? (
        <AdminContent />
      ) : (
        <Card className="max-w-sm w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Waqas"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Khalid"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
             <div className="text-center pt-4">
                <Button asChild variant="link">
                  <Link href="/">Return to Home</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
