'use client';

import { UserAuth } from '@/components/UserAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { HeaderAuth } from '@/components/HeaderAuth';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Nail Exchange
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional marketplace for spare building nails
              </p>
            </div>

            {/* Header Navigation */}
            <div className="flex items-center gap-4">
              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search nails..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Navigation Links */}
              <Link href="/">
                <Button variant="ghost" className="text-sm">
                  Marketplace
                </Button>
              </Link>

              <Button variant="ghost" className="text-sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </Button>

              <HeaderAuth />
            </div>
          </div>
        </div>
      </header>

      {/* Login Page Breadcrumb */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Marketplace
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Login</span>
          </div>
          <div className="mt-1">
            <h2 className="text-xl font-semibold">
              Sign In / Sign Up
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to start trading spare building nails
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to Nail Exchange</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your account or create a new one to start trading spare building nails
            </p>
          </div>

          <UserAuth />

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>By signing in, you agree to our terms of service and privacy policy.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Nail Exchange - Connecting buyers and sellers of spare building nails</p>
            <p className="mt-1">Built with Next.js • Real-time order matching</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
