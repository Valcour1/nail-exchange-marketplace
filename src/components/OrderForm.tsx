'use client';

import { useState } from 'react';
import { useMarketplaceStore } from '@/store/marketplace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NAIL_TYPES } from '@/types';

export function OrderForm() {
  const { currentUser, selectedNailType, setSelectedNailType, placeOrder, getOrderBook } = useMarketplaceStore();
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const orderBook = getOrderBook(selectedNailType);
  const bestBid = orderBook.bids[0]?.price || 0;
  const bestAsk = orderBook.asks[0]?.price || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please sign in to place orders');
      return;
    }

    const quantityNum = parseInt(quantity);
    const priceNum = Math.round(parseFloat(price) * 100); // Convert to cents

    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price');
      return;
    }

    placeOrder({
      userId: currentUser.id,
      type: orderType,
      nailType: selectedNailType,
      quantity: quantityNum,
      price: priceNum,
    });

    // Clear form
    setQuantity('');
    setPrice('');
  };

  const formatPrice = (price: number) => (price / 100).toFixed(2);

  const handleMarketOrder = (type: 'buy' | 'sell') => {
    const targetPrice = type === 'buy' ? bestAsk : bestBid;
    if (targetPrice > 0) {
      setOrderType(type);
      setPrice(formatPrice(targetPrice));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Nail Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="nail-type">Nail Type</Label>
          <Select value={selectedNailType} onValueChange={setSelectedNailType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NAIL_TYPES.map((nailType) => (
                <SelectItem key={nailType} value={nailType}>
                  {nailType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Market Info */}
        <div className="bg-muted p-3 rounded-lg">
          <div className="text-sm font-medium mb-2">Current Market</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Best Bid: </span>
              <span className="font-mono text-green-600">
                {bestBid > 0 ? `$${formatPrice(bestBid)}` : '-'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Best Ask: </span>
              <span className="font-mono text-red-600">
                {bestAsk > 0 ? `$${formatPrice(bestAsk)}` : '-'}
              </span>
            </div>
          </div>
        </div>

        <Tabs value={orderType} onValueChange={(value) => setOrderType(value as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buy-quantity">Quantity</Label>
                <Input
                  id="buy-quantity"
                  type="number"
                  placeholder="Number of nails"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buy-price">Price per nail ($)</Label>
                <Input
                  id="buy-price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.01"
                  min="0.01"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!currentUser}
                >
                  Place Buy Order
                </Button>
                {bestAsk > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleMarketOrder('buy')}
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Market Buy
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>

          <TabsContent value="sell" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sell-quantity">Quantity</Label>
                <Input
                  id="sell-quantity"
                  type="number"
                  placeholder="Number of nails"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-price">Price per nail ($)</Label>
                <Input
                  id="sell-price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.01"
                  min="0.01"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={!currentUser}
                >
                  Place Sell Order
                </Button>
                {bestBid > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleMarketOrder('sell')}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Market Sell
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {!currentUser && (
          <div className="text-sm text-muted-foreground text-center p-2 bg-amber-50 dark:bg-amber-950/20 rounded">
            Sign in to place orders
          </div>
        )}
      </CardContent>
    </Card>
  );
}
