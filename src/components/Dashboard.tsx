import { useMemo, useState } from 'react'
import type { Project, ProjectStatus } from '../types'
import { SummaryCards } from './SummaryCards'
import { ProjectCard } from './ProjectCard'

interface Props {
  projects: Project[]
}

type FilterKey = 'all' | ProjectStatus | 'needs-attention'

export function Dashboard({ projects }: Props) {
  const [filter, setFilter] = useState<FilterKey>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    if (filter === 'needs-attention') {
      return projects.filter((p) => p.status === 'delayed' || p.status === 'at-risk')
    }
    return projects.filter((p) => p.status === filter)
  }, [projects, filter])

  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'needs-attention', label: 'Needs Attention' },
    { key: 'on-track', label: 'On Track' },
    { key: 'at-risk', label: 'At Risk' },
    { key: 'delayed', label: 'Delayed' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Title */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Project Dashboard</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Status of every ongoing project at a glance
        </p>
      </div>

      {/* Summary */}
      <SummaryCards projects={projects} />

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {filterOptions.map((opt) => {
          const active = filter === opt.key
          return (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: active ? 'var(--accent)' : 'var(--surface)',
                color: active ? '#fff' : 'var(--text-muted)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 14 }}>
          No projects match this filter.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
