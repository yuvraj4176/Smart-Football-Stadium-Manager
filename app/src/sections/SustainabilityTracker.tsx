import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  Leaf,
  Zap,
  Droplet,
  Trash2,
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  Target,
  Recycle,
  Wind,
  Sun,
  TreePine,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export function SustainabilityTracker() {
  const sustainability = useStadiumStore((s) => s.sustainability);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMetrics =
    selectedCategory === 'all'
      ? sustainability
      : sustainability.filter((m) => m.category === selectedCategory);

  const categoryConfig = {
    energy: { icon: Zap, color: '#f59e0b', bg: 'bg-amber-50', label: 'Energy' },
    water: { icon: Droplet, color: '#3b82f6', bg: 'bg-blue-50', label: 'Water' },
    waste: { icon: Trash2, color: '#10b981', bg: 'bg-emerald-50', label: 'Waste' },
    carbon: { icon: Leaf, color: '#22c55e', bg: 'bg-green-50', label: 'Carbon' },
  };

  const trendIcon = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
    if (trend === 'down' && change < 0) return <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />;
    if (trend === 'up' && change < 0) return <TrendingUp className="h-3.5 w-3.5 text-red-500" />;
    if (trend === 'down' && change > 0) return <TrendingDown className="h-3.5 w-3.5 text-red-500" />;
    return <Minus className="h-3.5 w-3.5 text-zinc-400" />;
  };

  const wasteData = [
    { name: 'Recycled', value: 84, color: '#10b981' },
    { name: 'Composted', value: 12, color: '#22c55e' },
    { name: 'Landfill', value: 4, color: '#ef4444' },
  ];

  const energyHistory = [
    { hour: '10:00', consumption: 32000, renewable: 55 },
    { hour: '11:00', consumption: 35000, renewable: 58 },
    { hour: '12:00', consumption: 38000, renewable: 60 },
    { hour: '13:00', consumption: 42000, renewable: 59 },
    { hour: '14:00', consumption: 45000, renewable: 61 },
    { hour: '15:00', consumption: 47000, renewable: 62 },
    { hour: '16:00', consumption: 48000, renewable: 62 },
    { hour: '17:00', consumption: 48700, renewable: 63 },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Sustainability Tracker</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Environmental performance and green initiatives</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5">
          <Award className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Green Stadium Certified</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white'
              : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
          }`}
        >
          All Categories
        </button>
        {(['energy', 'water', 'waste', 'carbon'] as const).map((cat) => {
          const config = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((metric) => {
          const config = categoryConfig[metric.category];
          const Icon = config.icon;
          const progressPct = Math.min((metric.value / metric.target) * 100, 100);
          const isPositive =
            (metric.category === 'waste' || metric.category === 'carbon')
              ? metric.changePercent > 0
              : metric.changePercent < 0;

          return (
            <div key={metric.id} className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg}`}>
                    <Icon className="h-5 w-5" style={{ color: config.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900">{metric.label}</h4>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{metric.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {trendIcon(metric.trend, metric.changePercent)}
                  <span
                    className={`text-xs font-medium ${
                      isPositive ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {metric.changePercent > 0 ? '+' : ''}
                    {metric.changePercent}%
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between mb-2">
                <p className="text-2xl font-bold text-zinc-900">
                  {metric.value.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-500 ml-1">{metric.unit}</span>
                </p>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Target className="h-3 w-3" />
                  Target: {metric.target.toLocaleString()}
                </div>
              </div>

              <div className="h-2.5 w-full rounded-full bg-zinc-100">
                <div
                  className="h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%`, backgroundColor: config.color }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1.5">{Math.round(progressPct)}% of target achieved</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Energy Consumption Chart */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Energy Consumption Trend</h3>
              <p className="text-xs text-zinc-500 mt-0.5">kWh consumption and renewable % today</p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-zinc-500">62% renewable</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={energyHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar yAxisId="left" dataKey="consumption" name="Consumption (kWh)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="renewable" name="Renewable %" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Diversion */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Waste Diversion Breakdown</h3>
              <p className="text-xs text-zinc-500 mt-0.5">How waste is processed</p>
            </div>
            <div className="flex items-center gap-2">
              <Recycle className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-zinc-500">84% diverted</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Green Initiatives */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Green Stadium Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <TreePine className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-900">Carbon Neutral Goal</p>
              <p className="text-xs text-emerald-700 mt-1">Targeting net-zero by 2030 through offsets and renewable energy.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <Wind className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Renewable Energy</p>
              <p className="text-xs text-blue-700 mt-1">62% of stadium power from solar and wind sources today.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-4">
            <Droplet className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-900">Water Conservation</p>
              <p className="text-xs text-amber-700 mt-1">Rainwater harvesting and smart irrigation reduce usage by 35%.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-violet-100 bg-violet-50 p-4">
            <Recycle className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-violet-900">Zero Waste Target</p>
              <p className="text-xs text-violet-700 mt-1">84% diversion rate with goal of 90% by tournament end.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
