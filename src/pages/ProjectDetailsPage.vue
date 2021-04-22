<template>
  <!-- Adding the v-if prevents the page from trying to load before the data returns -->
  <div class="project-details" v-if="state.project">
    <h1>Hello Project Details</h1>
    {{ state.project.creator.name }}
  </div>
  <div v-else class="text-center">
    <h1>Loading...</h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'ProjectDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      project: computed(() => AppState.activeProject)
    })

    onMounted(async() => {
      try {
        await projectsService.getActive(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
