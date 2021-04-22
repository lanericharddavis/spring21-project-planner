<template>
  <div class="project-photo col-md-3">
    <div class=" position-relative">
      <img :src="project.imgUrl" alt="Project Cover Image">
      <img class="rounded-circle small-img position-absolute" :src="project.creator.picture" alt="Creator Photo">
      <div class="text-left">
        <h4>{{ project.title }}</h4>
      </div>
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
  },
  components: {}
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
