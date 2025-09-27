<script setup>
const route = useRoute();
const appConfig = useAppConfig();

const videos = await queryCollection('videos')
    .orWhere(query => query
        .where('public','=', true)
    )
    .select('path', 'title', 'date', 'category', 'short')
    .order('date', 'DESC')
    .all();

const categories = computed(() => appConfig.navbar.map(category => {
  const list = videos.filter(video => category.id === video.category);
  const navVideos = list.map(video => ({
    "label": video.short,
    "uri": video.path
  }))
  return {
    ...category,
    items: [...category.items, ...navVideos]
  }
}));
const openCategory = computed(() => {
  const category = categories.value.find(({items}) => items.find(({uri}) => route.path.endsWith(uri)));
  return [category ? category.id : categories.value[0].id];
});
const open = ref([]);
const props = defineProps(['screenType']);
const navbar = categories;
function isPathUrl(path = '') {
  return path.startsWith('http');
}
</script>

<template>
  <ISidebar color="dark" :class="props.screenType">
    <INav vertical size="md">
      <ICollapsible
        :model-value="open.length ? open : openCategory"
        @update:model-value="val => open = val"
        color="transparent"
        size="md"
        :key="category.id"
        v-for="category in navbar"
      >
        <ICollapsibleItem :title="category.label" :name="category.id">
          <INavItem
            :active="route.path.endsWith(item.uri)"
            :to="isPathUrl(item.uri) ? undefined : item.uri"
            :href="isPathUrl(item.uri) ? item.uri : undefined"
            :target="isPathUrl(item.uri) ? '_blank' : undefined"
            :key="item.uri"
            v-for="item in category.items"
          > {{ item.label }} </INavItem>
        </ICollapsibleItem>
      </ICollapsible>
    </INav>
  </ISidebar>
</template>

<style lang="scss">
@import '@inkline/inkline/css/mixins/_index.scss';

.mobile {
  .sidebar {
    max-width: 80%;
    --sidebar--width: 23rem;
    --sidebar--border-bottom-left-radius: 0;
    --sidebar--border-top-left-radius: 0;
  }
}
.desktop .sidebar {
  position: relative !important;
}
.desktop.sidebar-wrapper {
  background-color: #1C2A38;
  border-radius: 4px;
  //border-bottom-right-radius: 4px;
  //border-top-right-radius: 4px;
}
.sidebar {
  font-weight: bold;
  --sidebar--background: #1C2A38;
  --sidebar--border-color: #1C2A38;
  img {
    min-width: 150px;
  }
  .sidebar-content {
    overflow: inherit;
  }
  .nav .collapsible {
    --collapsible--header--border-width: 0 0 1px 0;
    --collapsible--header--color: #E6A04D;
    --collapsible--icon--color: var(--collapsible--header--color, #E6A04D);
    --collapsible--body--padding: 0;
    --collapsible--header--border-bottom-left-radius: 0;
    --collapsible--header--border-bottom-right-radius: 0;
    .collapsible-header:hover, .collapsible-header[aria-expanded="true"] {
      --collapsible--header--border-color: #E6A04D;
    }
  }
  .nav-item {
    --nav--color: #F2E8DC;
    --nav--active--color: #3C7FA6;
    &:hover {
      background-color: #3C7FA6;
      --nav--color: #1C2A38;
      --nav--active--color: #1C2A38;
    }
  }
}
</style>