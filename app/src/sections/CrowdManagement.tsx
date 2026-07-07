import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Info,
  Flame,
  TrendingUp,
  MapPin,
  Thermometer,
  Droplets,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { crowdDensityHistory } from '@/data/stadiumData';

export function CrowdManagement() {
  const zones = useStadiumStore((s) => s.zones);
  const alerts = useStadiumStore((s) => s.alerts);
  const resolveAlert = useStadiumStore((s) => s.resolveAlert);
  const [filterDensity, setFilterDensity] = useState<string>('all');

  const filteredZones =
    filterDensity === 'all' ? zones : zones.filter((z) => z.crowdDensity === filterDensity);

  const severityConfig = {
    critical: { icon: Flame, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  };

  const densityConfig = {
    low: { color: 'bg-emerald-500', label: 'Low', text: 'text-emerald-700', bg: 'bg-emerald-50' },
    moderate: { color: 'bg-blue-500', label: 'Moderate', text: 'text-blue-700', bg: 'bg-blue-50' },
    high: { color: 'bg-amber-500', label: 'High', text: 'text-amber-700', bg: 'bg-amber-50' },
    critical: { color: 'bg-red-500', label: 'Critical', text: 'text-red-700', bg: 'bg-red-50' },
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Crowd Management</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Real-time crowd monitoring and density analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={filterDensity}
            onChange={(e) => setFilterDensity(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option value="all">All Zones</option>
            <option value="low">Low Density</option>
            <option value="moderate">Moderate</option>
            <option value="high">High Density</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Density Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(['low', 'moderate', 'high', 'critical'] as const).map((density) => {
          const count = zones.filter((z) => z.crowdDensity === density).length;
          const config = densityConfig[density];
          return (
            <div key={density} className="rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium uppercase tracking-wider ${config.text}`}>{config.label}</span>
                <div className={`h-3 w-3 rounded-full ${config.color}`} />
              </div>
              <p className="text-2xl font-bold text-zinc-900">{count} zones</p>
              <p className="text-xs text-zinc-500 mt-1">
                {zones
                  .filter((z) => z.crowdDensity === density)
                  .reduce((sum, z) => sum + z.currentOccupancy, 0)
                  .toLocaleString()}{' '}
                people
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Zone Density List */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-900">Zone Occupancy Overview</h3>
            <div className="flex items-center gap-3">
              {(['low', 'moderate', 'high', 'critical'] as const).map((d) => (
                <div key={d} className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${densityConfig[d].color}`} />
                  <span className="text-[10px] text-zinc-500 capitalize">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {filteredZones
              .sort((a, b) => b.currentOccupancy / b.capacity - a.currentOccupancy / a.capacity)
              .map((zone) => {
                const pct = Math.round((zone.currentOccupancy / zone.capacity) * 100);
                const config = densityConfig[zone.crowdDensity];
                return (
                  <div
                    key={zone.id}
                    className="flex items-center gap-4 rounded-lg border border-zinc-100 p-3 hover:bg-zinc-50 transition-colors"
                  >
                    <div className={`h-10 w-1 rounded-full ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-900 truncate">{zone.name}</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-zinc-500">
                          {zone.currentOccupancy.toLocaleString()} / {zone.capacity.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-400">|</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Thermometer className="h-3 w-3" />
                          {zone.temperature}°C
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Droplets className="h-3 w-3" />
                          {zone.humidity}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-zinc-900">{pct}%</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="space-y-4">
          {/* Active Alerts */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-900">Active Alerts</h3>
              <span className="text-xs text-zinc-500">{alerts.filter((a) => !a.resolved).length} open</span>
            </div>
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {alerts
                .filter((a) => !a.resolved)
                .map((alert) => {
                  const config = severityConfig[alert.severity];
                  const Icon = config.icon;
                  return (
                    <div
                      key={alert.id}
                      className={`rounded-lg border ${config.border} ${config.bg} p-3`}
                    >
                      <div className="flex items-start gap-2.5">
                        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-zinc-800">{alert.message}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                              <MapPin className="h-2.5 w-2.5" />
                              {zones.find((z) => z.id === alert.zoneId)?.name || alert.zoneId}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              {Math.round((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="shrink-0 rounded p-1 hover:bg-white/50 transition-colors"
                          title="Resolve"
                        >
                          <CheckCircle className="h-4 w-4 text-zinc-400 hover:text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              {alerts.filter((a) => !a.resolved).length === 0 && (
                <div className="text-center py-6">
                  <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">All alerts resolved</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Flow Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Peak Inbound</span>
                <span className="text-xs font-medium text-zinc-700">16:30 - 17:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Avg Entry Rate</span>
                <span className="text-xs font-medium text-zinc-700">850/min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Current Flow</span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <TrendingUp className="h-3 w-3" />
                  Steady
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Predicted Full</span>
                <span className="text-xs font-medium text-zinc-700">18:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Entrance Flow Trends</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={crowdDensityHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="northEntrance" name="North" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="southEntrance" name="South" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="eastEntrance" name="East" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="westEntrance" name="West" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
