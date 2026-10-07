import type { Project } from '../types'
import { StatusBadge } from './StatusBadge'

function daysUntil(dateStr: string): number {
  const now = new Date('2026-10-07T00:00:00Z')
  const deadline = new Date(dateStr + 'T00:00:00Z')
  return Math.round((deadline.getTime() - now.getTime()) / 86400000)
}

export function ProjectCard({ project }: { project: Project }) {
  const days = daysUntil(project.deadline)
  const overdue = days < 0 && project.status !== 'completed'
  const urgent = days >= 0 && days <= 7 && project.status !== 'completed'
  const needsAttention = project.status === 'delayed' || project.status === 'at-risk' || overdue

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: needsAttention ? '1px solid var(--red)' : '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20,
        transition: 'background 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface)')}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{project.name}</h3>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {project.client} · {project.owner}
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--bg)', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${project.progress}%`,
              background: project.status === 'delayed' ? 'var(--red)' : project.status === 'at-risk' ? 'var(--yellow)' : 'var(--green)',
              borderRadius: 999,
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      {/* Tasks + Deadline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12 }}>
        <span style={{ color: 'var(--text-muted)' }}>
          Tasks: <span style={{ color: 'var(--text)' }}>{project.tasksDone}/{project.tasksTotal}</span>
        </span>
        <span
          style={{
            fontWeight: 600,
            color: overdue ? 'var(--red)' : urgent ? 'var(--yellow)' : 'var(--text-muted)',
          }}
        >
          {overdue
            ? `${Math.abs(days)}d overdue`
            : project.status === 'completed'
              ? 'Delivered'
              : `${days}d left`}
        </span>
      </div>

      {/* Blockers */}
      {project.blockers.length > 0 && (
        <div
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 8,
            padding: '10px 12px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            ⚠ Needs Attention
          </div>
          {project.blockers.map((b, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: i < project.blockers.length - 1 ? 4 : 0 }}>
              • {b}
            </div>
          ))}
        </div>
      )}

      {/* Last update */}
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
        Last updated {project.lastUpdate}
      </div>
    </div>
  )
}
