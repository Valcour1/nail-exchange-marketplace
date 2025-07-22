'use client';

import { useState, useMemo } from 'react';
import { useMarketplaceStore } from '@/store/marketplace';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarketDepthData {
  price: number;
  cumulativeVolume: number;
  volume: number;
}

export function MarketDepthChart() {
  const { selectedNailType, getOrderBook } = useMarketplaceStore();
  const orderBook = getOrderBook(selectedNailType);
  const [hoveredData, setHoveredData] = useState<{
    price: number;
    volume: number;
    cumulative: number;
    side: 'bid' | 'ask';
  } | null>(null);

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  // Process order book data for visualization
  const chartData = useMemo(() => {
    const bids: MarketDepthData[] = [];
    const asks: MarketDepthData[] = [];

    // Process bids (descending price order, cumulative from highest to lowest)
    let cumulativeBidVolume = 0;
    orderBook.bids
      .slice()
      .reverse()
      .forEach((level) => {
        cumulativeBidVolume += level.quantity;
        bids.push({
          price: level.price,
          cumulativeVolume: cumulativeBidVolume,
          volume: level.quantity,
        });
      });

    // Process asks (ascending price order, cumulative from lowest to highest)
    let cumulativeAskVolume = 0;
    orderBook.asks.forEach((level) => {
      cumulativeAskVolume += level.quantity;
      asks.push({
        price: level.price,
        cumulativeVolume: cumulativeAskVolume,
        volume: level.quantity,
      });
    });

    return { bids: bids.reverse(), asks };
  }, [orderBook]);

  // Calculate chart dimensions and scales
  const width = 600;
  const height = 300;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const allPrices = [
    ...chartData.bids.map(d => d.price),
    ...chartData.asks.map(d => d.price)
  ];
  const allVolumes = [
    ...chartData.bids.map(d => d.cumulativeVolume),
    ...chartData.asks.map(d => d.cumulativeVolume)
  ];

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const maxVolume = Math.max(...allVolumes);

  const priceRange = maxPrice - minPrice || 1;

  // Scale functions
  const scaleX = (price: number) => padding + ((price - minPrice) / priceRange) * chartWidth;
  const scaleY = (volume: number) => height - padding - (volume / maxVolume) * chartHeight;

  // Generate path data
  const generatePath = (data: MarketDepthData[], side: 'bid' | 'ask') => {
    if (data.length === 0) return '';

    let path = '';

    if (side === 'bid') {
      // Start from bottom left
      path = `M ${padding} ${height - padding}`;

      // Draw bid curve
      data.forEach((point, index) => {
        const x = scaleX(point.price);
        const y = scaleY(point.cumulativeVolume);

        if (index === 0) {
          path += ` L ${x} ${height - padding}`;
        }
        path += ` L ${x} ${y}`;
      });
    } else {
      // Start from the last bid point or center
      const startX = chartData.bids.length > 0
        ? scaleX(chartData.bids[chartData.bids.length - 1].price)
        : padding + chartWidth / 2;

      path = `M ${startX} ${height - padding}`;

      // Draw ask curve
      data.forEach((point) => {
        const x = scaleX(point.price);
        const y = scaleY(point.cumulativeVolume);
        path += ` L ${x} ${y}`;
      });

      // Close to bottom right
      if (data.length > 0) {
        const lastX = scaleX(data[data.length - 1].price);
        path += ` L ${lastX} ${height - padding}`;
      }
    }

    return path;
  };

  const bidPath = generatePath(chartData.bids, 'bid');
  const askPath = generatePath(chartData.asks, 'ask');

  // Generate grid lines
  const gridLines = [];
  const priceSteps = 5;
  const volumeSteps = 4;

  // Vertical grid lines (price)
  for (let i = 0; i <= priceSteps; i++) {
    const price = minPrice + (priceRange * i) / priceSteps;
    const x = scaleX(price);
    gridLines.push(
      <g key={`v-grid-${i}`}>
        <line
          x1={x}
          y1={padding}
          x2={x}
          y2={height - padding}
          stroke="#e5e7eb"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x={x}
          y={height - padding + 15}
          textAnchor="middle"
          fontSize="10"
          fill="#6b7280"
        >
          {formatPrice(price)}
        </text>
      </g>
    );
  }

  // Horizontal grid lines (volume)
  for (let i = 0; i <= volumeSteps; i++) {
    const volume = (maxVolume * i) / volumeSteps;
    const y = scaleY(volume);
    gridLines.push(
      <g key={`h-grid-${i}`}>
        <line
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x={padding - 5}
          y={y}
          textAnchor="end"
          fontSize="10"
          fill="#6b7280"
          dominantBaseline="middle"
        >
          {volume.toLocaleString()}
        </text>
      </g>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse position to price
    const price = minPrice + ((mouseX - padding) / chartWidth) * priceRange;

    // Find closest data point
    let closestPoint: MarketDepthData | null = null;
    let minDistance = Infinity;
    let side: 'bid' | 'ask' = 'bid';

    // Check bids
    chartData.bids.forEach((point) => {
      const x = scaleX(point.price);
      const y = scaleY(point.cumulativeVolume);
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance < minDistance && distance < 20) {
        minDistance = distance;
        closestPoint = point;
        side = 'bid';
      }
    });

    // Check asks
    chartData.asks.forEach((point) => {
      const x = scaleX(point.price);
      const y = scaleY(point.cumulativeVolume);
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance < minDistance && distance < 20) {
        minDistance = distance;
        closestPoint = point;
        side = 'ask';
      }
    });

    if (closestPoint) {
      setHoveredData({
        price: (closestPoint as MarketDepthData).price,
        volume: (closestPoint as MarketDepthData).volume,
        cumulative: (closestPoint as MarketDepthData).cumulativeVolume,
        side,
      });
    } else {
      setHoveredData(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Market Depth - {selectedNailType}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Cumulative order volume visualization
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            width={width}
            height={height}
            className="border rounded-lg bg-white dark:bg-gray-900"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredData(null)}
          >
            {/* Grid lines */}
            {gridLines}

            {/* Market depth areas */}
            {bidPath && (
              <path
                d={bidPath}
                fill="rgba(34, 197, 94, 0.2)"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
                className="cursor-pointer"
              />
            )}

            {askPath && (
              <path
                d={askPath}
                fill="rgba(239, 68, 68, 0.2)"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
                className="cursor-pointer"
              />
            )}

            {/* Data points */}
            {chartData.bids.map((point, index) => (
              <circle
                key={`bid-point-${index}`}
                cx={scaleX(point.price)}
                cy={scaleY(point.cumulativeVolume)}
                r="3"
                fill="rgb(34, 197, 94)"
                className="cursor-pointer"
              />
            ))}

            {chartData.asks.map((point, index) => (
              <circle
                key={`ask-point-${index}`}
                cx={scaleX(point.price)}
                cy={scaleY(point.cumulativeVolume)}
                r="3"
                fill="rgb(239, 68, 68)"
                className="cursor-pointer"
              />
            ))}

            {/* Axis labels */}
            <text
              x={width / 2}
              y={height - 5}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              fontWeight="500"
            >
              Price
            </text>

            <text
              x={15}
              y={height / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              fontWeight="500"
              transform={`rotate(-90 15 ${height / 2})`}
            >
              Cumulative Volume
            </text>
          </svg>

          {/* Tooltip */}
          {hoveredData && (
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 border rounded-lg p-3 shadow-lg">
              <div className={`text-sm font-medium ${
                hoveredData.side === 'bid' ? 'text-green-600' : 'text-red-600'
              }`}>
                {hoveredData.side === 'bid' ? 'Bid' : 'Ask'}
              </div>
              <div className="text-sm space-y-1">
                <div>Price: {formatPrice(hoveredData.price)}</div>
                <div>Volume: {hoveredData.volume.toLocaleString()}</div>
                <div>Cumulative: {hoveredData.cumulative.toLocaleString()}</div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 bg-opacity-30 border-2 border-green-500 rounded"></div>
              <span>Bids (Buy Orders)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 bg-opacity-30 border-2 border-red-500 rounded"></div>
              <span>Asks (Sell Orders)</span>
            </div>
          </div>

          {/* Market info */}
          {orderBook.bids.length === 0 && orderBook.asks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">No market data</p>
                <p className="text-sm">Place orders to see market depth</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
