import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    AppState.projects = res.data
  }

  async create(data) {
    await api.post('api/projects', data)
    this.getAll()
  }
}

export const projectsService = new ProjectsService()
