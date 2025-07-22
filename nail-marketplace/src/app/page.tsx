'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle } from 'lucide-react';
import { ProductGallery } from '@/components/ProductGallery';
import { HeaderAuth } from '@/components/HeaderAuth';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight">
                Nail Exchange
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional marketplace for spare building nails
              </p>
            </div>

            {/* Header Navigation */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Search Box */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search nails..."
                  className="pl-10 w-full sm:w-64"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                <Button variant="ghost" className="text-sm">
                  Marketplace
                </Button>

                <Button variant="ghost" className="text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>

                <HeaderAuth />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <ProductGallery />
      </main>

      {/* Market Info Section */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="market">Market Info</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Market Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Products:</span>
                    <span className="font-mono">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Markets:</span>
                    <span className="font-mono">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trading Status:</span>
                    <span className="font-mono text-green-600">Live</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Trading Tips</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Check market trends before trading</li>
                  <li>• Use limit orders for better prices</li>
                  <li>• Monitor inventory levels regularly</li>
                  <li>• Join during peak construction seasons</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Popular Categories</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>🔨 Common nails - High volume</div>
                  <div>🏠 Framing nails - Seasonal demand</div>
                  <div>🏠 Roofing nails - Weather dependent</div>
                  <div>✨ Finishing nails - Steady trade</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-bold">About Nail Exchange</h2>
              <p className="text-muted-foreground text-lg">
                Nail Exchange is the premier marketplace for trading spare building nails.
                Our platform connects construction professionals, contractors, and DIY enthusiasts
                looking to buy or sell surplus nail inventory.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">For Sellers</h3>
                  <p className="text-sm text-muted-foreground">
                    Turn your excess nail inventory into cash. List your surplus nails
                    and connect with buyers who need exactly what you have.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">For Buyers</h3>
                  <p className="text-sm text-muted-foreground">
                    Find the exact nails you need at competitive prices. Access
                    real-time market data and place orders instantly.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="help" className="mt-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-center">How It Works</h2>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-semibold">1. Sign Up</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create your account to start trading. New users get $1,000 credit and sample inventory.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-semibold">2. Browse Products</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click on any nail type to view its live order book and current market prices.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-semibold">3. Place Orders</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submit buy or sell orders. Our matching engine automatically executes trades.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h3 className="font-semibold">4. Manage Portfolio</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track your orders, view trade history, and manage your nail inventory.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

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
