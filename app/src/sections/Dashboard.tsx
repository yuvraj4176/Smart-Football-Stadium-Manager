import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Bus,
  Sun,
  Wind,
  Droplets,
  Eye,
  MapPin,
  Clock,
  Activity,
  Leaf,
  Zap,
  Droplet,
  Trash2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { hourlyAttendance } from '@/data/stadiumData';

export function Dashboard() {
  const zones = useStadiumStore((s) => s.zones);
  const alerts = useStadiumStore((s) => s.alerts);
  const matches = useStadiumStore((s) => s.matches);
  const weather = useStadiumStore((s) => s.weather);
  const sustainability = useStadiumStore((s) => s.sustainability);

  const totalCapacity = zones.reduce((sum, z) => sum + z.capacity, 0);
  const totalOccupancy = zones.reduce((sum, z) => sum + z.currentOccupancy, 0);
  const occupancyRate = Math.round((totalOccupancy / totalCapacity) * 100);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const criticalAlerts = activeAlerts.filter((a) => a.severity === 'critical');
  const warningAlerts = activeAlerts.filter((a) => a.severity === 'warning');

  const liveMatch = matches.find((m) => m.status === 'live');
  const upcomingMatch = matches.find((m) => m.status === 'upcoming');

  const highDensityZones = zones.filter(
    (z) => z.crowdDensity === 'high' || z.crowdDensity === 'critical'
  );

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Stadium Operations Dashboard</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Real-time overview of all stadium systems</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5">
          <Activity className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">All Systems Operational</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Attendance</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{totalOccupancy.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">{occupancyRate}% capacity</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Active Alerts</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{activeAlerts.length}</p>
          <div className="flex items-center gap-2 mt-1">
            {criticalAlerts.length > 0 && (
              <span className="text-xs text-red-600 font-medium">{criticalAlerts.length} critical</span>
            )}
            {warningAlerts.length > 0 && (
              <span className="text-xs text-amber-600 font-medium">{warningAlerts.length} warning</span>
            )}
            {activeAlerts.length === 0 && (
              <span className="text-xs text-emerald-600 font-medium">All clear</span>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Avg Wait Time</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
              <Clock className="h-4 w-4 text-violet-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">4.2 min</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">-12% vs last match</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Transport</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50">
              <Bus className="h-4 w-4 text-cyan-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">5 routes</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-emerald-600 font-medium">4 operational</span>
            <span className="text-xs text-amber-600 font-medium">1 delayed</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Attendance Build-up</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Hourly fan arrivals since gates opened</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-zinc-500">Cumulative</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={hourlyAttendance}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }}
                formatter={(value: number) => [value.toLocaleString(), 'Attendance']}
              />
              <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} fill="url(#attendanceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weather & Match Info */}
        <div className="space-y-4">
          {/* Weather Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Weather Conditions</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <Sun className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">{weather.temperature}°C</p>
                <p className="text-xs text-zinc-500">{weather.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-zinc-50 p-2.5 text-center">
                <Droplets className="h-3.5 w-3.5 text-blue-500 mx-auto mb-1" />
                <p className="text-xs font-semibold text-zinc-700">{weather.humidity}%</p>
                <p className="text-[10px] text-zinc-500">Humidity</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-2.5 text-center">
                <Wind className="h-3.5 w-3.5 text-cyan-500 mx-auto mb-1" />
                <p className="text-xs font-semibold text-zinc-700">{weather.windSpeed} km/h</p>
                <p className="text-[10px] text-zinc-500">Wind</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-2.5 text-center">
                <Eye className="h-3.5 w-3.5 text-zinc-500 mx-auto mb-1" />
                <p className="text-xs font-semibold text-zinc-700">{weather.visibility} km</p>
                <p className="text-[10px] text-zinc-500">Visibility</p>
              </div>
            </div>
          </div>

          {/* Live Match */}
          {liveMatch && (
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Live Now</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-lg font-bold text-zinc-900">{liveMatch.homeTeam}</p>
                </div>
                <div className="text-center px-3">
                  <p className="text-2xl font-bold text-emerald-700">
                    {liveMatch.score?.home} - {liveMatch.score?.away}
                  </p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">82&apos;</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-zinc-900">{liveMatch.awayTeam}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-emerald-200">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span className="text-[11px] text-emerald-700">{liveMatch.venue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-emerald-600" />
                  <span className="text-[11px] text-emerald-700">{liveMatch.attendance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {!liveMatch && upcomingMatch && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Next Match</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-zinc-900">{upcomingMatch.homeTeam}</p>
                <span className="text-xs text-zinc-400">vs</span>
                <p className="text-base font-bold text-zinc-900">{upcomingMatch.awayTeam}</p>
              </div>
              <p className="text-xs text-zinc-500 mt-2">{upcomingMatch.venue}</p>
            </div>
          )}
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Crowd Density by Zone */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Crowd Density by Zone</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Real-time occupancy levels</p>
            </div>
          </div>
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {highDensityZones.map((zone) => {
              const pct = Math.round((zone.currentOccupancy / zone.capacity) * 100);
              const barColor =
                zone.crowdDensity === 'critical'
                  ? 'bg-red-500'
                  : zone.crowdDensity === 'high'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500';
              return (
                <div key={zone.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-zinc-700">{zone.name}</span>
                    <span className="text-xs text-zinc-500">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100">
                    <div
                      className={`h-2 rounded-full ${barColor} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainability Quick View */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Sustainability Metrics</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Environmental performance today</p>
            </div>
            <Leaf className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="space-y-3">
            {sustainability.slice(0, 4).map((metric) => (
              <div key={metric.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50">
                  {metric.category === 'energy' && <Zap className="h-4 w-4 text-amber-500" />}
                  {metric.category === 'water' && <Droplet className="h-4 w-4 text-blue-500" />}
                  {metric.category === 'waste' && <Trash2 className="h-4 w-4 text-emerald-500" />}
                  {metric.category === 'carbon' && <Leaf className="h-4 w-4 text-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-700">{metric.label}</span>
                    <span className="text-xs text-zinc-500">
                      {metric.value.toLocaleString()} {metric.unit}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        metric.changePercent > 0 && metric.category === 'waste'
                          ? 'bg-emerald-500'
                          : metric.changePercent < 0
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
