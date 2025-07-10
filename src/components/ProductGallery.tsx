'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMarketplaceStore } from '@/store/marketplace';
import { NAIL_TYPES, type NailType } from '@/types';
import { FilterSidebar } from '@/components/FilterSidebar';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Nail product data with images and descriptions
const nailProducts: Array<{
  type: NailType;
  image: string;
  description: string;
  uses: string[];
  trending: 'up' | 'down' | 'stable';
}> = [
  {
    type: 'Common Nail 3.5"' as NailType,
    image: '/nail-sizes.svg',
    description: 'Heavy-duty nails for general construction and framing work',
    uses: ['Framing', 'Construction', 'General building'],
    trending: 'up'
  },
  {
    type: 'Common Nail 2.5"' as NailType,
    image: '/nail-sizes.svg',
    description: 'Medium-duty common nails for lighter construction work',
    uses: ['Light framing', 'Sheathing', 'General repairs'],
    trending: 'stable'
  },
  {
    type: 'Finishing Nail 2"' as NailType,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop&crop=center',
    description: 'Small head nails for trim work and finishing touches',
    uses: ['Trim work', 'Molding', 'Cabinet installation'],
    trending: 'up'
  },
  {
    type: 'Roofing Nail 1.25"' as NailType,
    image: '/roofing-nail.svg',
    description: 'Galvanized nails with large heads for roofing applications',
    uses: ['Roofing', 'Shingles', 'Underlayment'],
    trending: 'down'
  },
  {
    type: 'Framing Nail 3.25"' as NailType,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop&crop=center',
    description: 'Heavy-duty framing nails for structural applications',
    uses: ['Structural framing', 'Heavy construction', 'Deck building'],
    trending: 'up'
  },
  {
    type: 'Brad Nail 1"' as NailType,
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop&crop=center',
    description: 'Thin nails for delicate work and precision applications',
    uses: ['Fine woodworking', 'Picture frames', 'Delicate trim'],
    trending: 'stable'
  }
];

export function ProductGallery() {
  const { getOrderBook } = useMarketplaceStore();

  // Filter state
  const [filters, setFilters] = useState({
    nailTypes: [] as string[],
    sizes: [] as string[],
    trending: [] as string[]
  });

  const formatPrice = (price: number) => `${(price / 100).toFixed(2)}`;

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return nailProducts.filter(product => {
      // Filter by nail type
      if (filters.nailTypes.length > 0) {
        const productType = product.type.split(' ').slice(0, -1).join(' '); // Remove size from type
        if (!filters.nailTypes.some(filterType => productType.includes(filterType))) {
          return false;
        }
      }

      // Filter by size
      if (filters.sizes.length > 0) {
        const productSize = product.type.match(/[\d.]+"/)?.[0]; // Extract size like "3.5""
        if (!productSize || !filters.sizes.includes(productSize)) {
          return false;
        }
      }

      // Filter by trending
      if (filters.trending.length > 0) {
        if (!filters.trending.includes(product.trending)) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const getTrendingIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendingColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-100 text-green-700';
      case 'down':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Trade Spare Building Nails
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional marketplace for buying and selling surplus construction nails.
          Browse our product categories and start trading.
        </p>
      </div>

      {/* Ready to Start Trading CTA */}
      <div className="text-center py-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Ready to Start Trading?</h3>
        <p className="text-muted-foreground mb-4">
          Click on any product to view its live order book and place trades
        </p>
        <div className="text-sm text-muted-foreground">
          • Real-time order matching • Professional trading interface • Secure transactions
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                Products ({filteredProducts.length})
              </h3>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length === nailProducts.length
                  ? 'Showing all products'
                  : `Filtered from ${nailProducts.length} total products`
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No products match your filters
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filter criteria to see more products
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => {
          const orderBook = getOrderBook(product.type);
          const bestBid = orderBook.bids[0]?.price || 0;
          const bestAsk = orderBook.asks[0]?.price || 0;
          const hasMarket = bestBid > 0 || bestAsk > 0;

          return (
            <Link
              key={product.type}
              href={`/trade/${encodeURIComponent(product.type)}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.type}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getTrendingColor(product.trending)}>
                      {getTrendingIcon(product.trending)}
                      <span className="ml-1 capitalize">{product.trending}</span>
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{product.type}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Market Data */}
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium mb-2">Current Market</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Best Bid:</span>
                        <div className="font-mono text-green-600">
                          {bestBid > 0 ? formatPrice(bestBid) : '-'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Best Ask:</span>
                        <div className="font-mono text-red-600">
                          {bestAsk > 0 ? formatPrice(bestAsk) : '-'}
                        </div>
                      </div>
                    </div>
                    {!hasMarket && (
                      <div className="text-xs text-muted-foreground mt-2">
                        No active orders - be the first to trade!
                      </div>
                    )}
                  </div>


                </CardContent>
              </Card>
            </Link>
              );
              })
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
