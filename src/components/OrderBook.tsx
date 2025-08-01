'use client';

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

export function OrderBook() {
  const { selectedNailType, getOrderBook } = useMarketplaceStore();
  const orderBook = getOrderBook(selectedNailType);

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  // Calculate spread
  const bestBid = orderBook.bids[0]?.price || 0;
  const bestAsk = orderBook.asks[0]?.price || 0;
  const spread = bestAsk > 0 && bestBid > 0 ? bestAsk - bestBid : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Order Book - {selectedNailType}</CardTitle>
        {spread > 0 && (
          <div className="text-sm text-muted-foreground">
            Spread: {formatPrice(spread)}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
          {/* Bids (Buy Orders) */}
          <div className="border-r">
            <div className="p-4 border-b bg-green-50 dark:bg-green-950/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400">
                Bids (Buyers)
              </h3>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBook.bids.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                        No buy orders
                      </TableCell>
                    </TableRow>
                  ) : (
                    orderBook.bids.map((level, index) => (
                      <TableRow
                        key={`bid-${level.price}`}
                        className="hover:bg-green-50 dark:hover:bg-green-950/10 cursor-pointer"
                      >
                        <TableCell className="font-mono text-green-600 dark:text-green-400">
                          {formatPrice(level.price)}
                        </TableCell>
                        <TableCell className="font-mono">
                          {level.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {level.orderCount}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Asks (Sell Orders) */}
          <div>
            <div className="p-4 border-b bg-red-50 dark:bg-red-950/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400">
                Asks (Sellers)
              </h3>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBook.asks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                        No sell orders
                      </TableCell>
                    </TableRow>
                  ) : (
                    orderBook.asks.map((level, index) => (
                      <TableRow
                        key={`ask-${level.price}`}
                        className="hover:bg-red-50 dark:hover:bg-red-950/10 cursor-pointer"
                      >
                        <TableCell className="font-mono text-red-600 dark:text-red-400">
                          {formatPrice(level.price)}
                        </TableCell>
                        <TableCell className="font-mono">
                          {level.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {level.orderCount}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
