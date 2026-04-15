import './App.css'
import { Tabs } from './shared/components/Tabs'
import { TaskContainer } from './features/taskManagement'
import { Layout } from './shared/components/Layout'

function App() {
  return (
    <Layout>
      <Tabs defaultTab='tasks'>
        <Tabs.List>
          <Tabs.Tab id="tasks">Panel de Tareas</Tabs.Tab>
          <Tabs.Tab id="projects">Panel de Proyectos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel id='tasks'>
            <TaskContainer />
          </Tabs.Panel>
          <Tabs.Panel id="projects">
            <p style={{ color: "#94a3b8", padding: "32px", textAlign: "center" }}>
              Próximamente: Módulo de Proyectos
            </p>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Layout>
  )
}

export default App