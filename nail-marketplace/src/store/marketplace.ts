import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, Trade, User, OrderBook, NailType } from '@/types';

interface MarketplaceState {
  // User state
  currentUser: User | null;
  users: User[];

  // Market data
  orders: Order[];
  trades: Trade[];
  selectedNailType: NailType;

  // Actions
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  setSelectedNailType: (nailType: NailType) => void;
  placeOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
  getOrderBook: (nailType: NailType) => OrderBook;
  getUserOrders: (userId: string) => Order[];
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to match orders and create trades
const matchOrders = (orders: Order[], newOrder: Order): { updatedOrders: Order[], newTrades: Trade[] } => {
  const updatedOrders = [...orders];
  const newTrades: Trade[] = [];
  let remainingQuantity = newOrder.quantity;

  // Find matching orders (opposite type, same nail type)
  const matchingOrders = updatedOrders
    .filter(order =>
      order.type !== newOrder.type &&
      order.nailType === newOrder.nailType &&
      order.status === 'active' &&
      (newOrder.type === 'buy' ? order.price <= newOrder.price : order.price >= newOrder.price)
    )
    .sort((a, b) => newOrder.type === 'buy' ? a.price - b.price : b.price - a.price);

  for (const matchingOrder of matchingOrders) {
    if (remainingQuantity <= 0) break;

    const availableQuantity = matchingOrder.quantity - (matchingOrder.filled || 0);
    const tradeQuantity = Math.min(remainingQuantity, availableQuantity);

    if (tradeQuantity > 0) {
      // Create trade
      const trade: Trade = {
        id: generateId(),
        buyOrderId: newOrder.type === 'buy' ? newOrder.id : matchingOrder.id,
        sellOrderId: newOrder.type === 'sell' ? newOrder.id : matchingOrder.id,
        quantity: tradeQuantity,
        price: matchingOrder.price,
        timestamp: new Date(),
      };

      newTrades.push(trade);
      remainingQuantity -= tradeQuantity;

      // Update matching order
      const orderIndex = updatedOrders.findIndex(o => o.id === matchingOrder.id);
      const filledQuantity = (matchingOrder.filled || 0) + tradeQuantity;
      updatedOrders[orderIndex] = {
        ...matchingOrder,
        filled: filledQuantity,
        status: filledQuantity >= matchingOrder.quantity ? 'filled' : 'active',
      };
    }
  }

  // Add the new order with filled quantity
  const finalOrder: Order = {
    ...newOrder,
    filled: newOrder.quantity - remainingQuantity,
    status: remainingQuantity <= 0 ? 'filled' : 'active',
    quantity: newOrder.quantity,
  };

  updatedOrders.push(finalOrder);

  return { updatedOrders, newTrades };
};

// Sample orders for testing market depth
const sampleOrders: Order[] = [
  // Buy orders (bids) for Common Nail 3.5"
  { id: 'sample-1', userId: 'demo-user-1', type: 'buy', nailType: 'Common Nail 3.5"', quantity: 1000, price: 495, timestamp: new Date(), status: 'active' },
  { id: 'sample-2', userId: 'demo-user-2', type: 'buy', nailType: 'Common Nail 3.5"', quantity: 1500, price: 490, timestamp: new Date(), status: 'active' },
  { id: 'sample-3', userId: 'demo-user-3', type: 'buy', nailType: 'Common Nail 3.5"', quantity: 800, price: 485, timestamp: new Date(), status: 'active' },
  { id: 'sample-4', userId: 'demo-user-4', type: 'buy', nailType: 'Common Nail 3.5"', quantity: 2000, price: 480, timestamp: new Date(), status: 'active' },
  { id: 'sample-5', userId: 'demo-user-5', type: 'buy', nailType: 'Common Nail 3.5"', quantity: 1200, price: 475, timestamp: new Date(), status: 'active' },

  // Sell orders (asks) for Common Nail 3.5"
  { id: 'sample-6', userId: 'demo-user-6', type: 'sell', nailType: 'Common Nail 3.5"', quantity: 900, price: 505, timestamp: new Date(), status: 'active' },
  { id: 'sample-7', userId: 'demo-user-7', type: 'sell', nailType: 'Common Nail 3.5"', quantity: 1300, price: 510, timestamp: new Date(), status: 'active' },
  { id: 'sample-8', userId: 'demo-user-8', type: 'sell', nailType: 'Common Nail 3.5"', quantity: 750, price: 515, timestamp: new Date(), status: 'active' },
  { id: 'sample-9', userId: 'demo-user-9', type: 'sell', nailType: 'Common Nail 3.5"', quantity: 1800, price: 520, timestamp: new Date(), status: 'active' },
  { id: 'sample-10', userId: 'demo-user-10', type: 'sell', nailType: 'Common Nail 3.5"', quantity: 1100, price: 525, timestamp: new Date(), status: 'active' },

  // Orders for other nail types
  { id: 'sample-11', userId: 'demo-user-11', type: 'buy', nailType: 'Finishing Nail 2"', quantity: 500, price: 320, timestamp: new Date(), status: 'active' },
  { id: 'sample-12', userId: 'demo-user-12', type: 'sell', nailType: 'Finishing Nail 2"', quantity: 600, price: 330, timestamp: new Date(), status: 'active' },
];

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      users: [],
      orders: sampleOrders,
      trades: [],
      selectedNailType: 'Common Nail 3.5"',

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),

      addUser: (user) => set((state) => ({
        users: [...state.users, user],
      })),

      setSelectedNailType: (nailType) => set({ selectedNailType: nailType }),

      placeOrder: (orderData) => set((state) => {
        const newOrder: Order = {
          ...orderData,
          id: generateId(),
          timestamp: new Date(),
          status: 'active',
        };

        const { updatedOrders, newTrades } = matchOrders(state.orders, newOrder);

        return {
          orders: updatedOrders,
          trades: [...state.trades, ...newTrades],
        };
      }),

      cancelOrder: (orderId) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        ),
      })),

      getOrderBook: (nailType) => {
        const state = get();
        const activeOrders = state.orders.filter(
          order => order.nailType === nailType && order.status === 'active'
        );

        // Group by price level
        const bidMap = new Map<number, { quantity: number; orderCount: number }>();
        const askMap = new Map<number, { quantity: number; orderCount: number }>();

        activeOrders.forEach(order => {
          const remainingQuantity = order.quantity - (order.filled || 0);
          if (remainingQuantity <= 0) return;

          const map = order.type === 'buy' ? bidMap : askMap;
          const existing = map.get(order.price) || { quantity: 0, orderCount: 0 };
          map.set(order.price, {
            quantity: existing.quantity + remainingQuantity,
            orderCount: existing.orderCount + 1,
          });
        });

        const bids = Array.from(bidMap.entries())
          .map(([price, data]) => ({ price, ...data }))
          .sort((a, b) => b.price - a.price);

        const asks = Array.from(askMap.entries())
          .map(([price, data]) => ({ price, ...data }))
          .sort((a, b) => a.price - b.price);

        return { bids, asks };
      },

      getUserOrders: (userId) => {
        const state = get();
        return state.orders.filter(order => order.userId === userId);
      },
    }),
    {
      name: 'nail-marketplace-storage',
    }
  )
);
