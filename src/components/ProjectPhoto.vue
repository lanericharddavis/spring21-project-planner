<template>
  <div class="project-photo col-md-3">
    <div class=" position-relative">
      <router-link :to="{name: 'ProjectDetails', params: {id: project.id}}">
        <img :src="project.imgUrl" alt="Project Cover Image">
        <img class="rounded-circle small-img position-absolute" :src="project.creator.picture" alt="Creator Photo">
        <div class="text-left">
          <h4>{{ project.title }}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectPhoto',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
 img{
   width: 100%
 }

 .small-img{
   width: 1em;
   left: 0;
   top: 5px
 }
</style>
