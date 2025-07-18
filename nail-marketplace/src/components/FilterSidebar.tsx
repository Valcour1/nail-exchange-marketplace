'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterState {
  nailTypes: string[];
  sizes: string[];
  trending: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const nailTypeOptions = [
    'Common Nail',
    'Finishing Nail',
    'Roofing Nail',
    'Framing Nail',
    'Brad Nail'
  ];

  const sizeOptions = [
    '1"',
    '1.25"',
    '2"',
    '2.5"',
    '3.25"',
    '3.5"'
  ];

  const trendingOptions = [
    { value: 'up', label: 'Trending Up', color: 'bg-green-100 text-green-700' },
    { value: 'down', label: 'Trending Down', color: 'bg-red-100 text-red-700' },
    { value: 'stable', label: 'Stable', color: 'bg-gray-100 text-gray-700' }
  ];

  const handleNailTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.nailTypes, type]
      : filters.nailTypes.filter(t => t !== type);

    onFilterChange({ ...filters, nailTypes: newTypes });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);

    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleTrendingChange = (trend: string, checked: boolean) => {
    const newTrending = checked
      ? [...filters.trending, trend]
      : filters.trending.filter(t => t !== trend);

    onFilterChange({ ...filters, trending: newTrending });
  };

  const clearAllFilters = () => {
    onFilterChange({ nailTypes: [], sizes: [], trending: [] });
  };

  const hasActiveFilters = filters.nailTypes.length > 0 || filters.sizes.length > 0 || filters.trending.length > 0;

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div>
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.nailTypes.map(type => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleNailTypeChange(type, false)}
                  />
                </Badge>
              ))}
              {filters.sizes.map(size => (
                <Badge key={size} variant="secondary" className="text-xs">
                  {size}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleSizeChange(size, false)}
                  />
                </Badge>
              ))}
              {filters.trending.map(trend => (
                <Badge key={trend} variant="secondary" className="text-xs">
                  {trend}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleTrendingChange(trend, false)}
                  />
                </Badge>
              ))}
            </div>
            <Separator className="mt-3" />
          </div>
        )}

        {/* Nail Type Filter */}
        <div>
          <Label className="text-sm font-medium">Nail Type</Label>
          <div className="space-y-3 mt-2">
            {nailTypeOptions.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.nailTypes.includes(type)}
                  onCheckedChange={(checked) => handleNailTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Size Filter */}
        <div>
          <Label className="text-sm font-medium">Size</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {sizeOptions.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Trending Filter */}
        <div>
          <Label className="text-sm font-medium">Market Trend</Label>
          <div className="space-y-3 mt-2">
            {trendingOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`trend-${option.value}`}
                  checked={filters.trending.includes(option.value)}
                  onCheckedChange={(checked) => handleTrendingChange(option.value, checked as boolean)}
                />
                <Label htmlFor={`trend-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
