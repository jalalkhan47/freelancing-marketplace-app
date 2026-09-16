import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Order, ORDERS } from '../data/orders';

export type { Milestone, Order } from '../data/orders';

type OrdersContextType = {
  orders: Order[];
  submitDelivery: (orderId: string, note: string) => void;
  updateMilestoneStatus: (orderId: string, milestoneId: string, status: 'Pending' | 'In Progress' | 'Completed') => void;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(ORDERS);

  const submitDelivery = (orderId: string, note: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, progress: Math.min(100, o.progress + 20), status: o.progress + 20 >= 100 ? 'Completed' : o.status }
          : o
      )
    );
  };

  const updateMilestoneStatus = (orderId: string, milestoneId: string, status: 'Pending' | 'In Progress' | 'Completed') => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, milestones: o.milestones.map((m) => (m.id === milestoneId ? { ...m, status } : m)) }
          : o
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, submitDelivery, updateMilestoneStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}