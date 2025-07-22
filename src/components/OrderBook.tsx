'use client';

import { useState, useEffect } from 'react';
import { useMarketplaceStore } from '@/store/marketplace';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketDepthChart } from '@/components/MarketDepthChart';

export function OrderBook() {
  const { selectedNailType, getOrderBook, initializeSampleData } = useMarketplaceStore();
  const [mounted, setMounted] = useState(false);
  const orderBook = getOrderBook(selectedNailType);

  const formatPrice = (price: number) => `${(price / 100).toFixed(2)}`;

  // Calculate spread
  const bestBid = orderBook.bids[0]?.price || 0;
  const bestAsk = orderBook.asks[0]?.price || 0;
  const spread = bestAsk > 0 && bestBid > 0 ? bestAsk - bestBid : 0;

  // Calculate maximum quantity for scaling bars
  const maxQuantity = Math.max(
    ...orderBook.bids.map(level => level.quantity),
    ...orderBook.asks.map(level => level.quantity),
    1
  );

  useEffect(() => {
    setMounted(true);
    initializeSampleData();
  }, [initializeSampleData]);

  // Pad arrays to same length for side-by-side display
  const maxRows = Math.max(orderBook.bids.length, orderBook.asks.length);
  const paddedBids: (typeof orderBook.bids[0] | null)[] = [...orderBook.bids];
  const paddedAsks: (typeof orderBook.asks[0] | null)[] = [...orderBook.asks];

  while (paddedBids.length < maxRows) {
    paddedBids.push(null);
  }
  while (paddedAsks.length < maxRows) {
    paddedAsks.push(null);
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="orderbook" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="depth">Market Depth</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook" className="mt-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Order Book - {selectedNailType}</CardTitle>
              {mounted && spread > 0 && (
                <div className="text-sm text-muted-foreground">
                  Spread: {formatPrice(spread)}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <div className="overflow-y-auto max-h-[600px]">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead className="text-center">Size</TableHead>
                        <TableHead className="text-center">Bid</TableHead>
                        <TableHead className="text-center">Ask</TableHead>
                        <TableHead className="text-center">Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!mounted ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : maxRows === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No orders
                          </TableCell>
                        </TableRow>
                      ) : (
                        Array.from({ length: maxRows }, (_, index) => {
                          const bid = paddedBids[index];
                          const ask = paddedAsks[index];
                          const bidBarWidth = bid ? (bid.quantity / maxQuantity) * 100 : 0;
                          const askBarWidth = ask ? (ask.quantity / maxQuantity) * 100 : 0;

                          return (
                            <TableRow
                              key={`row-${index}`}
                              className="hover:bg-muted/30 cursor-pointer relative"
                            >
                              {/* Bid Size */}
                              <TableCell className="relative text-center">
                                {bid && (
                                  <>
                                    <div
                                      className="absolute top-0 right-0 bottom-0 bg-green-100 dark:bg-green-900/30 opacity-60"
                                      style={{ width: `${bidBarWidth}%` }}
                                    />
                                    <div className="relative font-mono">
                                      {bid.quantity.toLocaleString()}
                                    </div>
                                  </>
                                )}
                              </TableCell>

                              {/* Bid Price */}
                              <TableCell className="relative text-center">
                                {bid && (
                                  <>
                                    <div
                                      className="absolute top-0 right-0 bottom-0 bg-green-100 dark:bg-green-900/30 opacity-60"
                                      style={{ width: `${bidBarWidth}%` }}
                                    />
                                    <div className="relative font-mono text-green-600 dark:text-green-400">
                                      {formatPrice(bid.price)}
                                    </div>
                                  </>
                                )}
                              </TableCell>

                              {/* Ask Price */}
                              <TableCell className="relative text-center">
                                {ask && (
                                  <>
                                    <div
                                      className="absolute top-0 left-0 bottom-0 bg-red-100 dark:bg-red-900/30 opacity-60"
                                      style={{ width: `${askBarWidth}%` }}
                                    />
                                    <div className="relative font-mono text-red-600 dark:text-red-400">
                                      {formatPrice(ask.price)}
                                    </div>
                                  </>
                                )}
                              </TableCell>

                              {/* Ask Size */}
                              <TableCell className="relative text-center">
                                {ask && (
                                  <>
                                    <div
                                      className="absolute top-0 left-0 bottom-0 bg-red-100 dark:bg-red-900/30 opacity-60"
                                      style={{ width: `${askBarWidth}%` }}
                                    />
                                    <div className="relative font-mono">
                                      {ask.quantity.toLocaleString()}
                                    </div>
                                  </>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depth" className="mt-4">
          <MarketDepthChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
