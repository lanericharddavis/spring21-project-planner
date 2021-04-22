<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               id="title"
               aria-describedby="helpId"
               placeholder="Title..."
               v-model="state.newProject.title"
        >
        <label for="imgUrl">Image</label>
        <input type="text"
               class="form-control"
               name="imgUrl"
               id="imgUrl"
               aria-describedby="helpId"
               placeholder="Image Url..."
               v-model="state.newProject.imgUrl"
        >
      </div>
      <button type="submit" class="btn btn-success">
        Create
      </button>
    </form>
    <h2>My Projects</h2>
    <div class="row">
      <ProjectPhoto v-for="project in state.myProjects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Notification from '../utils/Notification'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      newProject: {},
      myProjects: computed(() => AppState.myProjects)
    })
    return {
      state,
      account: computed(() => AppState.account),
      async create() {
        try {
          await projectsService.create(state.newProject)
          state.newProject = {}
          Notification.toast('Successfully Created Project', 'success')
        } catch (error) {
          logger.log(error)
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
