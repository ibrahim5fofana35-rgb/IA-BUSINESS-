import type { Project } from '../types'

interface Props {
  projects: Project[]
}

export function SummaryCards({ projects }: Props) {
  const counts = {
    total: projects.length,
    'on-track': projects.filter((p) => p.status === 'on-track').length,
    'at-risk': projects.filter((p) => p.status === 'at-risk').length,
    delayed: projects.filter((p) => p.status === 'delayed').length,
  }

  const cards = [
    { label: 'Total Projects', value: counts.total, color: 'var(--accent)' },
    { label: 'On Track', value: counts['on-track'], color: 'var(--green)' },
    { label: 'At Risk', value: counts['at-risk'], color: 'var(--yellow)' },
    { label: 'Delayed', value: counts.delayed, color: 'var(--red)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{c.label}</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: c.color }}>{c.value}</div>
        </div>
      ))}
    </div>
  )
}
