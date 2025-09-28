<script setup>
import { formatDate } from "~/src/date.js";
const route = useRoute();
const imageModalSrc = ref('');
const imageModalSrcReal = ref('');
provide('image', imageModalSrc);

function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection('posts').path(route.path).first();
})

useSeoMeta({
  "title": () => doc.value.title,
  "ogTitle": () => doc.value.title,
})

const imageModal = ref(false);
watch(() => imageModalSrc.value, () => {
  if (imageModalSrc.value !== '') {
    if (isMobile()) {
      window.open(imageModalSrc.value);
      imageModalSrc.value = '';
    } else {
      imageModal.value = true;
    }
  }
})
watch(() => imageModal.value, () => {
  if (imageModal.value === false) {
    imageModalSrcReal.value = imageModalSrc.value;
    imageModalSrc.value = '';
  }
})

</script>
<template>
  <IContainer fluid class="_padding:0">
    <IContainer v-if="doc" class="_padding:0">
      <h1 class="d5 _margin-top:3 _margin-bottom:2 _text-align:center">{{ doc.title }}</h1>
      <div class="_embed:16:9!">
        <iframe :src="`https://rumble.com/embed/${doc.vid}/?pub=4`"></iframe>
      </div>
      <ContentRenderer :value="doc" class="content-doc" />
      <div>
        Uploaded: {{ formatDate(doc.date) }}
      </div>
    </IContainer>
    <IModal v-model="imageModal" size="lg">
      <template #header> Image Preview </template>
      <NuxtImg densities="1x" :src="imageModalSrc || imageModalSrcReal" class="_image:responsive" v-if="imageModalSrc || imageModalSrcReal"/>
    </IModal>
  </IContainer>
</template>

<style lang="scss">
.modal-wrapper {
  z-index: 10000 !important;
  img {
    max-height: 80vh;
  }
}
.modal-wrapper .modal {
  width: initial !important;
  max-width: initial !important;
}

</style>
