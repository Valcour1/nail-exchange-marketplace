'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { OrderBook } from '@/components/OrderBook';
import { OrderForm } from '@/components/OrderForm';
import { OrderHistory } from '@/components/OrderHistory';
import { HeaderAuth } from '@/components/HeaderAuth';
import { useMarketplaceStore } from '@/store/marketplace';
import { NAIL_TYPES } from '@/types';
import type { NailType } from '@/types';

export default function TradePage() {
  const params = useParams();
  const router = useRouter();
  const { setSelectedNailType } = useMarketplaceStore();

  // Decode the nail type from URL
  const nailType = decodeURIComponent(params.nailType as string) as NailType;

  useEffect(() => {
    // Validate nail type and set it in store
    if (NAIL_TYPES.includes(nailType)) {
      setSelectedNailType(nailType);
    } else {
      // Redirect to home if invalid nail type
      router.push('/');
    }
  }, [nailType, setSelectedNailType, router]);

  if (!NAIL_TYPES.includes(nailType)) {
    return null; // Will redirect
  }

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

      {/* Trading Page Breadcrumb */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Marketplace
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{nailType} Trading</span>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book - Main Center (spans 2 columns) */}
          <div className="lg:col-span-2">
            <OrderBook />
          </div>

          {/* Order Form - Right Sidebar */}
          <div className="lg:col-span-1">
            <OrderForm />
          </div>
        </div>

        {/* Order History - Full Width Bottom */}
        <div className="mt-6">
          <OrderHistory />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Nail Exchange - Trading {nailType}</p>
            <p className="mt-1">Built with Next.js • Real-time order matching</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
