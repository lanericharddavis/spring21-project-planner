import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    AppState.projects = res.data
  }

  async getActive(id) {
    const res = await api.get('api/projects/' + id)
    AppState.activeProject = res.data
  }

  async getMyProjects() {
    const res = await api.get(`api/projects?creatorId=${AppState.account.id}`)
    AppState.myProjects = res.data
  }

  async create(data) {
    const res = await api.post('api/projects', data)
    router.push({ name: 'ProjectDetails', params: { id: res.data.id } })
    // this.getAll()
  }
}

export const projectsService = new ProjectsService()
