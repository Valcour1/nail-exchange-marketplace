'use client';

import { useMarketplaceStore } from '@/store/marketplace';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';

export function HeaderAuth() {
  const { currentUser, setCurrentUser } = useMarketplaceStore();

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium">{currentUser.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatCurrency(currentUser.balance)}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button variant="outline" className="text-sm">
        <User className="h-4 w-4 mr-2" />
        Login
      </Button>
    </Link>
  );
}
