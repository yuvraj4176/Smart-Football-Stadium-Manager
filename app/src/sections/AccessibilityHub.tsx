import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  Accessibility,
  Ear,
  Eye,
  Brain,
  Move,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Info,
  Phone,
  Heart,
  HelpingHand,
  Navigation,
} from 'lucide-react';

export function AccessibilityHub() {
  const services = useStadiumStore((s) => s.accessibility);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredServices =
    filterType === 'all' ? services : services.filter((s) => s.type === filterType);

  const typeConfig = {
    wheelchair: { icon: Accessibility, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Wheelchair' },
    hearing: { icon: Ear, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', label: 'Hearing' },
    visual: { icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Visual' },
    sensory: { icon: Brain, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200', label: 'Sensory' },
    mobility: { icon: Move, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', label: 'Mobility' },
  };

  const statusConfig = {
    available: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Available' },
    'in-use': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'In Use' },
    unavailable: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Unavailable' },
  };

  const availableCount = services.filter((s) => s.status === 'available').length;
  const inUseCount = services.filter((s) => s.status === 'in-use').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Accessibility Hub</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Inclusive services and support for all fans</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5">
          <Heart className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Inclusive Stadium</span>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Available</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{availableCount}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Ready to assist</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">In Use</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{inUseCount}</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Currently active</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Service Types</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Accessibility className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{new Set(services.map((s) => s.type)).size}</p>
          <p className="text-xs text-zinc-500 mt-1">Different categories</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Help Line</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
              <Phone className="h-4 w-4 text-violet-600" />
            </div>
          </div>
          <p className="text-lg font-bold text-zinc-900">1-800-HELP</p>
          <p className="text-xs text-violet-600 font-medium mt-1">24/7 support</p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
          }`}
        >
          All Services
        </button>
        {(['wheelchair', 'hearing', 'visual', 'sensory', 'mobility'] as const).map((type) => {
          const config = typeConfig[type];
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => {
          const tConfig = typeConfig[service.type];
          const sConfig = statusConfig[service.status];
          const TypeIcon = tConfig.icon;
          const StatusIcon = sConfig.icon;

          return (
            <div
              key={service.id}
              className={`rounded-xl border ${tConfig.border} bg-white p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tConfig.bg}`}>
                    <TypeIcon className={`h-5 w-5 ${tConfig.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900">{service.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${sConfig.bg} ${sConfig.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {sConfig.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${tConfig.bg} ${tConfig.color}`}>
                        {tConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 mt-3 leading-relaxed">{service.description}</p>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs text-zinc-500">{service.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessibility Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-4">
            <Navigation className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-zinc-900">Accessible Routes</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-blue-50 border border-blue-100 p-3">
              <HelpingHand className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Wheelchair Accessible Entrances</p>
                <p className="text-xs text-blue-700 mt-1">All 4 main entrances are wheelchair accessible with ramps and elevators. Dedicated accessible lanes at security checkpoints.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
              <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-900">Accessible Seating</p>
                <p className="text-xs text-emerald-700 mt-1">Over 500 wheelchair-accessible seats distributed across all sections. Companion seating available adjacent to all accessible positions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm font-semibold text-zinc-900">How to Request Assistance</h3>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">1</div>
              <p className="text-xs text-zinc-700">Contact the Accessibility Hub at Level 2 - East Concourse, open 3 hours before kickoff.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">2</div>
              <p className="text-xs text-zinc-700">Call the dedicated accessibility hotline: <strong>1-800-HELP-FAN</strong> (available 24/7).</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">3</div>
              <p className="text-xs text-zinc-700">Use the AI Stadium Assistant chat for instant guidance on accessible routes and services.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">4</div>
              <p className="text-xs text-zinc-700">Look for Accessibility Stewards wearing blue vests stationed throughout the stadium.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
