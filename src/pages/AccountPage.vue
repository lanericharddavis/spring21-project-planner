<template>
  <div class="about text-center" v-if="state.activeProfile">
    <!-- Render the active profile picture and name -->
    <div class="col-12 project-header">
      <div class="d-flex">
        <img class="rounded-circle" :src="state.activeProfile.picture" alt="Creator image">
        <div class="ml-3 d-flex flex-column justify-content-center">
          <h3 class="text-secondary">
            {{ state.activeProfile.name }}
          </h3>
          <h3 class="m-0">
            Projects: {{ state.activeProjects.length }}
          </h3>
        </div>
      </div>
    </div>
    <form @submit.prevent="create" v-if="state.user.isAuthenticated && state.activeProfile.id === state.account.id">
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
      <ProjectPhoto v-for="project in state.activeProjects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      newProject: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeProjects: computed(() => AppState.activeProjects),
      activeProfile: computed(() => AppState.activeProfile)
    })

    onMounted(async() => {
      await projectsService.getByProfileId(route.params.id)
      await accountService.getProfile(route.params.id)
    })

    return {
      state,
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
