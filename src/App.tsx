import { useEffect, useState } from 'react'
import './App.css'
import { getApiRoot, projectKey } from './commercetoolsConfig'
import RegistrationForm from './components/RegistrationForm'

function App() {
  const [projectDetails, setProjectDetails] = useState<{ limit: number } | null>(null)

  const getProject = async () => {
    try {
      const project = await getApiRoot().withProjectKey({ projectKey }).products().get().execute()

      // .customers()
      // .get()
      // .execute()

      setProjectDetails(project.body)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <div>
      {projectDetails?.limit}
      <RegistrationForm />
    </div>
  )
}
export default App
