<script setup>
import Post from '~/components/post.vue'
const route = useRoute();
</script>
<template>
  <Post :path="route.path" />
</template>

<style lang="scss">
</style>
