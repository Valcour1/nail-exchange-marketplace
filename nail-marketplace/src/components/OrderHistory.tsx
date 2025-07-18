'use client';

import { useMarketplaceStore } from '@/store/marketplace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function OrderHistory() {
  const { currentUser, getUserOrders, cancelOrder, trades } = useMarketplaceStore();

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Sign in to view your orders</p>
        </CardContent>
      </Card>
    );
  }

  const userOrders = getUserOrders(currentUser.id);
  const userTrades = trades.filter(
    trade => userOrders.some(order => order.id === trade.buyOrderId || order.id === trade.sellOrderId)
  );

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-700">Active</Badge>;
      case 'filled':
        return <Badge className="bg-green-100 text-green-700">Filled</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'buy' ? (
      <Badge className="bg-green-100 text-green-700">Buy</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700">Sell</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Active Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {userOrders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No orders placed yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Nail Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Filled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userOrders
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{getTypeBadge(order.type)}</TableCell>
                        <TableCell className="font-medium">{order.nailType}</TableCell>
                        <TableCell className="font-mono">
                          {order.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono">
                          {formatPrice(order.price)}
                        </TableCell>
                        <TableCell className="font-mono">
                          {order.filled || 0} / {order.quantity}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-sm">
                          {formatDate(order.timestamp)}
                        </TableCell>
                        <TableCell>
                          {order.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelOrder(order.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trade History */}
      <Card>
        <CardHeader>
          <CardTitle>Your Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          {userTrades.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No trades executed yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTrades
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((trade) => {
                      const userOrder = userOrders.find(
                        order => order.id === trade.buyOrderId || order.id === trade.sellOrderId
                      );
                      const isBuy = userOrder?.type === 'buy';
                      const total = trade.quantity * trade.price;

                      return (
                        <TableRow key={trade.id}>
                          <TableCell>
                            {isBuy ? getTypeBadge('buy') : getTypeBadge('sell')}
                          </TableCell>
                          <TableCell className="font-mono">
                            {trade.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatPrice(trade.price)}
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatPrice(total)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(trade.timestamp)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
