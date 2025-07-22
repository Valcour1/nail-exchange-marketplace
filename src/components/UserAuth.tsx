'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplaceStore } from '@/store/marketplace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NAIL_TYPES } from '@/types';

export function UserAuth() {
  const router = useRouter();
  const { currentUser, users, setCurrentUser, addUser } = useMarketplaceStore();
  const [userName, setUserName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) return;

    if (isSignUp) {
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userName,
        balance: 100000, // $1000 starting balance in cents
        nails: Object.fromEntries(NAIL_TYPES.map(type => [type, 100])), // 100 of each nail type
      };

      addUser(newUser);
      setCurrentUser(newUser);
    } else {
      // Sign in existing user
      const existingUser = users.find(u => u.name === userName);
      if (existingUser) {
        setCurrentUser(existingUser);
      } else {
        alert('User not found. Please sign up first.');
        return;
      }
    }

    setUserName('');
    // Navigate back to main page after successful login
    router.push('/');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  if (currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{currentUser.name}</h3>
              <p className="text-sm text-muted-foreground">
                Balance: {formatCurrency(currentUser.balance)}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          <div>
            <h4 className="font-medium mb-2">Nail Inventory</h4>
            <div className="grid grid-cols-1 gap-2">
              {NAIL_TYPES.map(nailType => (
                <div key={nailType} className="flex justify-between items-center">
                  <span className="text-sm">{nailType}</span>
                  <Badge variant="secondary">
                    {currentUser.nails[nailType] || 0}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => router.push('/')}
              className="w-full"
            >
              Go to Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In / Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="flex-1"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </Button>
          </div>

          {isSignUp && (
            <p className="text-xs text-muted-foreground">
              New users start with $1,000 and 100 nails of each type
            </p>
          )}
        </form>

        {users.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Existing Users</h4>
            <div className="space-y-1">
              {users.map(user => (
                <Button
                  key={user.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentUser(user);
                    router.push('/');
                  }}
                >
                  {user.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
