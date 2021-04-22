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

  async getByProfileId(id) {
    const res = await api.get(`api/projects?creatorId=${id}`)
    AppState.activeProjects = res.data
  }

  async create(data) {
    const res = await api.post('api/projects', data)
    router.push({ name: 'ProjectDetails', params: { id: res.data.id } })
    // this.getAll()
  }

  async addPhoto(projectId, photo) {
    await api.post(`api/projects/${projectId}/photos`, photo)
    this.getActive(projectId)
  }
}

export const projectsService = new ProjectsService()
