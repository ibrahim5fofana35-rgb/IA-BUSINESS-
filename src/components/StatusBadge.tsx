import { statusConfig, type ProjectStatus } from '../types'

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = statusConfig[status]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: cfg.color,
        background: cfg.bg,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.color }} />
      {cfg.label}
    </span>
  )
}
