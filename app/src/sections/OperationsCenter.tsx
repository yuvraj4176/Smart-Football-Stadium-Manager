import { useState } from 'react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import {
  Activity,
  CheckCircle2,
  Clock,
  Flame,
  Users,
  Wrench,
  CloudRain,
  Stethoscope,
  Shield,
  MapPin,
  Filter,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Radio,
  Siren,
} from 'lucide-react';

export function OperationsCenter() {
  const incidents = useStadiumStore((s) => s.incidents);
  const updateIncidentStatus = useStadiumStore((s) => s.updateIncidentStatus);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);

  const filteredIncidents = incidents.filter((inc) => {
    const severityMatch = filterSeverity === 'all' || inc.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || inc.status === filterStatus;
    return severityMatch && statusMatch;
  });

  const typeConfig = {
    medical: { icon: Stethoscope, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    security: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    crowd: { icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    technical: { icon: Wrench, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
    weather: { icon: CloudRain, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  };

  const severityConfig = {
    low: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Low' },
    medium: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium' },
    high: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High' },
    critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Critical' },
  };

  const statusConfig = {
    reported: { color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500', label: 'Reported' },
    responding: { color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500', label: 'Responding' },
    resolved: { color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500', label: 'Resolved' },
  };

  const openIncidents = incidents.filter((i) => i.status !== 'resolved').length;
  const criticalOpen = incidents.filter((i) => i.severity === 'critical' && i.status !== 'resolved').length;
  const respondingCount = incidents.filter((i) => i.status === 'responding').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Operations Center</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Incident management and operational intelligence</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5">
          <Radio className="h-4 w-4 text-red-600 animate-pulse" />
          <span className="text-xs font-medium text-red-700">Command Active</span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Open Incidents</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              <Siren className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{openIncidents}</p>
          <p className="text-xs text-zinc-500 mt-1">requiring attention</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Critical</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
              <Flame className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{criticalOpen}</p>
          <p className="text-xs text-orange-600 font-medium mt-1">priority response</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Responding</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{respondingCount}</p>
          <p className="text-xs text-blue-600 font-medium mt-1">teams dispatched</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Avg Response</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-zinc-900">3.2 min</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">-18% vs benchmark</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="h-4 w-4 text-zinc-400" />
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="reported">Reported</option>
          <option value="responding">Responding</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Incidents List */}
      <div className="space-y-3">
        {filteredIncidents.map((incident) => {
          const tConfig = typeConfig[incident.type];
          const sConfig = severityConfig[incident.severity];
          const stConfig = statusConfig[incident.status];
          const TypeIcon = tConfig.icon;
          const isExpanded = expandedIncident === incident.id;

          return (
            <div
              key={incident.id}
              className={`rounded-xl border ${isExpanded ? tConfig.border : 'border-zinc-200'} bg-white overflow-hidden transition-all`}
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                onClick={() => setExpandedIncident(isExpanded ? null : incident.id)}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tConfig.bg}`}>
                  <TypeIcon className={`h-5 w-5 ${tConfig.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 truncate">{incident.description}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sConfig.bg} ${sConfig.color}`}>
                      {sConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {incident.location}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {Math.round((Date.now() - incident.timestamp.getTime()) / 60000)}m ago
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${stConfig.color}`}>
                      <CircleDot className="h-2.5 w-2.5" />
                      {stConfig.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {incident.status !== 'resolved' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextStatus =
                          incident.status === 'reported' ? 'responding' : 'resolved';
                        updateIncidentStatus(incident.id, nextStatus);
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        incident.status === 'reported'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {incident.status === 'reported' ? 'Dispatch' : 'Resolve'}
                    </button>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className={`border-t ${tConfig.border} bg-zinc-50 px-4 py-3`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Incident Type</p>
                      <p className="text-sm text-zinc-800 capitalize">{incident.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm text-zinc-800">{incident.location}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Assigned Team</p>
                      <p className="text-sm text-zinc-800">{incident.assignedTo || 'Unassigned'}</p>
                    </div>
                  </div>

                  {incident.status === 'responding' && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                      <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
                      <p className="text-xs text-blue-700">
                        Response team <strong>{incident.assignedTo}</strong> is on site. ETA: 2 minutes.
                      </p>
                    </div>
                  )}

                  {incident.status === 'resolved' && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <p className="text-xs text-emerald-700">
                        Incident resolved by <strong>{incident.assignedTo}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Response Guide */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Emergency Response Protocols</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border border-red-100 bg-red-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-red-800">Medical</span>
            </div>
            <p className="text-xs text-red-700">Dispatch nearest medical team. Priority: life-threatening injuries first. Average response: 2.5 min.</p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-800">Security</span>
            </div>
            <p className="text-xs text-blue-700">Alert security detail. Maintain visual contact. Do not confront alone. Radio for backup immediately.</p>
          </div>
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-800">Crowd</span>
            </div>
            <p className="text-xs text-amber-700">Monitor density levels. Activate crowd control barriers. Redirect flow to less congested areas.</p>
          </div>
          <div className="rounded-lg border border-violet-100 bg-violet-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="h-4 w-4 text-violet-600" />
              <span className="text-xs font-semibold text-violet-800">Technical</span>
            </div>
            <p className="text-xs text-violet-700">Isolate affected systems. Notify tech team. If safety-critical, initiate manual backup procedures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
