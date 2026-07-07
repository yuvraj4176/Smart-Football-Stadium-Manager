import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  Bus,
  Train,
  Car,
  Footprints,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Filter,
  Route,
  ShieldCheck,
} from 'lucide-react';

export function TransportHub() {
  const transport = useStadiumStore((s) => s.transport);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRoutes = transport.filter((route) => {
    const statusMatch = filterStatus === 'all' || route.status === filterStatus;
    const typeMatch = filterType === 'all' || route.type === filterType;
    return statusMatch && typeMatch;
  });

  const typeConfig = {
    shuttle: { icon: Car, label: 'Shuttle', color: 'text-violet-600', bg: 'bg-violet-50' },
    subway: { icon: Train, label: 'Subway', color: 'text-blue-600', bg: 'bg-blue-50' },
    bus: { icon: Bus, label: 'Bus', color: 'text-amber-600', bg: 'bg-amber-50' },
    walking: { icon: Footprints, label: 'Walking', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  };

  const statusConfig = {
    operational: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Operational' },
    delayed: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Delayed' },
    suspended: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Suspended' },
  };

  const totalLoad = transport.reduce((sum, t) => sum + t.currentLoad, 0);
  const totalCapacity = transport.reduce((sum, t) => sum + t.capacity, 0);
  const overallLoadPct = Math.round((totalLoad / totalCapacity) * 100);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Transportation Hub</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Real-time public transit and shuttle monitoring</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Active Routes</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <Route className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{transport.length}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {transport.filter((t) => t.status === 'operational').length} operational
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Passengers</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{totalLoad.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 mt-1">of {totalCapacity.toLocaleString()} capacity</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">System Load</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
              <ShieldCheck className="h-4 w-4 text-violet-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{overallLoadPct}%</p>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-zinc-100">
            <div
              className="h-1.5 rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${overallLoadPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Avg Wait</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">
            {Math.round(transport.reduce((sum, t) => sum + t.eta, 0) / transport.length)} min
          </p>
          <p className="text-xs text-zinc-500 mt-1">Average across all routes</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-zinc-400" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="subway">Subway</option>
          <option value="shuttle">Shuttle</option>
          <option value="bus">Bus</option>
          <option value="walking">Walking</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="operational">Operational</option>
          <option value="delayed">Delayed</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => {
          const tConfig = typeConfig[route.type];
          const sConfig = statusConfig[route.status];
          const TypeIcon = tConfig.icon;
          const StatusIcon = sConfig.icon;
          const loadPct = Math.round((route.currentLoad / route.capacity) * 100);

          return (
            <div
              key={route.id}
              className={`rounded-xl border ${sConfig.border} bg-white p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tConfig.bg}`}>
                    <TypeIcon className={`h-5 w-5 ${tConfig.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900">{route.name}</h4>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${sConfig.color} mt-0.5`}>
                      <StatusIcon className="h-3 w-3" />
                      {sConfig.label}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="flex items-center gap-1 text-sm font-bold text-zinc-900">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    {route.eta} min
                  </span>
                  <p className="text-[10px] text-zinc-500">ETA to next departure</p>
                </div>
              </div>

              {/* Route stops */}
              <div className="flex items-center gap-2 mb-3 px-1">
                {route.route.map((stop, idx) => (
                  <div key={stop} className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      <span className="text-xs text-zinc-600">{stop}</span>
                    </div>
                    {idx < route.route.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-zinc-300" />
                    )}
                  </div>
                ))}
              </div>

              {/* Load bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-zinc-500">Capacity</span>
                  <span className="text-[11px] font-medium text-zinc-700">
                    {route.currentLoad} / {route.capacity}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      loadPct > 90 ? 'bg-red-500' : loadPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${loadPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transport Tips */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-zinc-900 mb-3">Travel Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-emerald-800">Best Option Now</p>
              <p className="text-xs text-emerald-700 mt-1">Metro Line Red has the shortest wait time (4 min) and good availability.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-100 p-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-amber-800">Delay Alert</p>
              <p className="text-xs text-amber-700 mt-1">City Loop Bus is delayed by 8 minutes due to traffic. Consider alternatives.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 border border-blue-100 p-3">
            <Users className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-800">Less Crowded</p>
              <p className="text-xs text-blue-700 mt-1">Pedestrian walkway has low traffic. 12-minute walk from Fan Zone to Main Gate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
