<template>
  <!-- Adding the v-if prevents the page from trying to load before the data returns -->
  <div class="project-details container" v-if="state.project">
    <div class="row mt-3">
      <div class="col-12 project-header">
        <div class="d-flex">
          <router-link :to="{name: 'Account', params: {id: state.project.creator.id}}">
            <img class="rounded-circle" :src="state.project.creator.picture" alt="Creator image">
          </router-link>
          <div class="ml-3 d-flex flex-column justify-content-center">
            <h3 class="text-secondary">
              {{ state.project.creator.name }}
            </h3>
            <h3 class="m-0">
              {{ state.project.title }}
            </h3>
          </div>
        </div>
      </div>
      <!-- The v-if here prevents people who are not the creator from accessing the form within this div -->
      <div class="col-12" v-if="state.account.id === state.project.creatorId">
        <form @submit.prevent="addPhoto">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Title..."
                   v-model="state.newPhoto.title"
            >
            <label for="imgUrl">Image Url</label>
            <input type="text"
                   class="form-control"
                   name="imgUrl"
                   id="imgUrl"
                   aria-describedby="helpId"
                   placeholder="Image Url..."
                   v-model="state.newPhoto.imgUrl"
                   required
            >
          </div>
          <button class="btn btn-success" type="submit">
            Add Photo
          </button>
        </form>
      </div>
      <div class="col-3" v-for="photo in state.project.photos" :key="photo.id">
        <img class="w-100" :src="photo.imgUrl" alt="">
        <p>{{ photo.title }}</p>
        <button v-if="state.account.id === state.project.creatorId">
          Delete
        </button>
      </div>
    </div>
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
      newPhoto: {},
      project: computed(() => AppState.activeProject),
      // USER has a few bonus properties such as user.isAuthenticated
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
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
      route,
      async addPhoto() {
        try {
          await projectsService.addPhoto(route.params.id, state.newPhoto)
          state.newPhoto = {}
          Notification.toast('Added Photo', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.project-header {
  img {
    width: 100px;
  }
}
</style>
