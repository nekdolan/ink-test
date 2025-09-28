<script setup>
const route = useRoute();
const { data: categories } = await useAsyncData('categories', () => useCategories())
const openCategory = categories.value.find(({items}) => items.find(({uri}) => uri === route.path ))
const open = ref([openCategory ? openCategory.id : categories.value[0].id]);
const props = defineProps(['screenType']);
const emit = defineEmits(['close']);
const navbar = categories;
function isPathUrl(path = '') {
  return path.startsWith('http');
}
</script>

<template>
  <ISidebar color="dark" :class="props.screenType">
    <INav vertical size="md">
      <ICollapsible
        v-model="open"
        color="transparent"
        size="md"
        :key="category.id"
        v-for="category in navbar"
      >
        <ICollapsibleItem :title="category.label" :name="category.id">
          <INavItem
            :active="route.path === item.uri"
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
    --collapsible--header--color: #dc7749;
    --collapsible--icon--color: var(--collapsible--header--color, #dc7749);
    --collapsible--body--padding: 0;
    --collapsible--header--border-bottom-left-radius: 0;
    --collapsible--header--border-bottom-right-radius: 0;
    .collapsible-header:hover, .collapsible-header[aria-expanded="true"] {
      --collapsible--header--border-color: #dc7749;
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