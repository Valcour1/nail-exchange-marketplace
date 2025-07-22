export interface Order {
  id: string;
  userId: string;
  type: 'buy' | 'sell';
  nailType: string;
  quantity: number;
  price: number; // price per nail in cents
  timestamp: Date;
  status: 'active' | 'filled' | 'cancelled';
  filled?: number; // partially filled quantity
}

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  quantity: number;
  price: number;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  balance: number; // in cents
  nails: Record<string, number>; // nail type -> quantity
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
  orderCount: number;
}

export interface OrderBook {
  bids: OrderBookLevel[]; // buy orders, highest price first
  asks: OrderBookLevel[]; // sell orders, lowest price first
}

export const NAIL_TYPES = [
  'Common Nail 3.5"',
  'Common Nail 2.5"',
  'Finishing Nail 2"',
  'Roofing Nail 1.25"',
  'Framing Nail 3.25"',
  'Brad Nail 1"',
] as const;

export type NailType = typeof NAIL_TYPES[number];
