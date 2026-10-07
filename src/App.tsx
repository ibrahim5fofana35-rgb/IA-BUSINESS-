import { Dashboard } from './components/Dashboard'
import { projects } from './data/projects'

export default function App() {
  return <Dashboard projects={projects} />
}
