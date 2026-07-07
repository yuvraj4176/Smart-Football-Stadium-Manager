import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  MapPin,
  Navigation,
  Clock,
  Accessibility,
  Footprints,
  ArrowRight,
  Search,
  Star,
  Info,
} from 'lucide-react';
import { navigationRoutes } from '@/data/stadiumData';

export function NavigationMap() {
  const zones = useStadiumStore((s) => s.zones);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showRouteFinder, setShowRouteFinder] = useState(false);

  const activeRoute = navigationRoutes.find((r) => r.id === selectedRoute);

  const allLocations = [
    ...new Set([
      ...zones.map((z) => z.name),
      ...navigationRoutes.flatMap((r) => [r.from, r.to]),
    ]),
  ];

  const handleFindRoute = () => {
    if (fromLocation && toLocation) {
      const matched = navigationRoutes.find(
        (r) =>
          r.from.toLowerCase().includes(fromLocation.toLowerCase()) &&
          r.to.toLowerCase().includes(toLocation.toLowerCase())
      );
      if (matched) {
        setSelectedRoute(matched.id);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Navigation & Wayfinding</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Interactive stadium maps and route guidance</p>
        </div>
        <button
          onClick={() => setShowRouteFinder(!showRouteFinder)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          <Navigation className="h-4 w-4" />
          Route Finder
        </button>
      </div>

      {/* Route Finder */}
      {showRouteFinder && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="">Select starting point</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">To</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="">Select destination</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleFindRoute}
              disabled={!fromLocation || !toLocation}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Search className="h-4 w-4" />
              Find Route
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Stadium Map Visualization */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Stadium Map</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Live zone occupancy visualization</p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { color: 'bg-emerald-500', label: 'Low' },
                { color: 'bg-blue-500', label: 'Moderate' },
                { color: 'bg-amber-500', label: 'High' },
                { color: 'bg-red-500', label: 'Critical' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <div className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
                  <span className="text-[10px] text-zinc-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stadium Map */}
          <div className="relative aspect-[4/3] w-full rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Pitch */}
              <rect x="30" y="30" width="40" height="40" rx="2" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="8" fill="none" stroke="#10b981" strokeWidth="0.3" />
              <line x1="50" y1="30" x2="50" y2="70" stroke="#10b981" strokeWidth="0.3" />
              <rect x="28" y="38" width="2" height="24" rx="0.5" fill="#10b981" fillOpacity="0.1" />
              <rect x="70" y="38" width="2" height="24" rx="0.5" fill="#10b981" fillOpacity="0.1" />

              {/* Zones */}
              {zones.map((zone) => {
                const colorMap = {
                  low: '#10b981',
                  moderate: '#3b82f6',
                  high: '#f59e0b',
                  critical: '#ef4444',
                };
                const color = colorMap[zone.crowdDensity];
                const isActive = activeRoute && (activeRoute.from.includes(zone.name) || activeRoute.to.includes(zone.name));

                return (
                  <g key={zone.id}>
                    <rect
                      x={zone.coordinates.x - 8}
                      y={zone.coordinates.y - 5}
                      width="16"
                      height="10"
                      rx="1.5"
                      fill={color}
                      fillOpacity={isActive ? 0.5 : 0.2}
                      stroke={color}
                      strokeWidth={isActive ? 0.8 : 0.3}
                      className="transition-all duration-300 cursor-pointer hover:fill-opacity-40"
                    />
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y + 1}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill={color}
                      fontWeight="600"
                    >
                      {zone.currentOccupancy > 1000
                        ? `${(zone.currentOccupancy / 1000).toFixed(1)}k`
                        : zone.currentOccupancy}
                    </text>
                  </g>
                );
              })}

              {/* Route path if active */}
              {activeRoute && (
                <path
                  d={`M ${zones.find((z) => activeRoute.from.includes(z.name))?.coordinates.x || 30} ${zones.find((z) => activeRoute.from.includes(z.name))?.coordinates.y || 30} Q 50 50 ${zones.find((z) => activeRoute.to.includes(z.name))?.coordinates.x || 70} ${zones.find((z) => activeRoute.to.includes(z.name))?.coordinates.y || 70}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeDasharray="2 1"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Map overlay labels */}
            <div className="absolute bottom-3 left-3 rounded-md bg-white/90 backdrop-blur px-2 py-1 border border-zinc-200">
              <p className="text-[10px] text-zinc-500">MetLife Stadium • 82,500 capacity</p>
            </div>
          </div>
        </div>

        {/* Route Details / Quick Routes */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Popular Routes</h3>
            <div className="space-y-2">
              {navigationRoutes.slice(0, 5).map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selectedRoute === route.id
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Navigation className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      <span className="text-xs font-medium text-zinc-700 truncate">{route.from}</span>
                      <ArrowRight className="h-3 w-3 shrink-0 text-zinc-300" />
                      <span className="text-xs font-medium text-zinc-700 truncate">{route.to}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 ml-5">
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <Footprints className="h-3 w-3" />
                      {route.distance}m
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {route.estimatedTime} min
                    </span>
                    {route.accessibility && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600">
                        <Accessibility className="h-3 w-3" />
                        Accessible
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Route Detail */}
          {activeRoute && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-emerald-900 mb-3">Route Details</h3>
              <div className="space-y-2">
                {activeRoute.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-700">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-emerald-800">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-xs font-medium text-emerald-800">Recommended</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs text-emerald-700">Low crowd route</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
