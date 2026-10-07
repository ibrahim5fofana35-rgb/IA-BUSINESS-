export type ProjectStatus = 'on-track' | 'at-risk' | 'delayed' | 'completed'

export interface Project {
  id: string
  name: string
  client: string
  owner: string
  status: ProjectStatus
  progress: number
  deadline: string
  lastUpdate: string
  tasksTotal: number
  tasksDone: number
  blockers: string[]
}

export const statusConfig: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  'on-track': { label: 'On Track', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  'at-risk': { label: 'At Risk', color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  delayed: { label: 'Delayed', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  completed: { label: 'Completed', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
}
