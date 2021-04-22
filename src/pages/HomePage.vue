<template>
  <div class="home container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <ProjectPhoto v-for="project in state.projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      projects: computed(() => AppState.projects)
    })
    onMounted(async() => {
      try {
        await projectsService.getAll()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
