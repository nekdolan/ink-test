<script setup>
import Sidebar from "~/components/sidebar.vue";
const appConfig = useAppConfig();
const { siteUrl } = appConfig;
const route = useRoute();
const router = useRouter();
const navigationHistory = ref([]);
const skipHistory = ref(false);
const open = ref(false);

useSeoMeta({
  "ogImage": () => `${siteUrl}/images/social/meta.webp`,
  "twitterCard": "summary_large_image",
  "twitterImage": () => `${siteUrl}/images/social/meta.webp`,
  "author": "Penny Bradley",
  "creator": "Penny Bradley"
});

watch(() => route.fullPath, (newRoute, oldRoute) => {
  if (skipHistory.value) {
    skipHistory.value = false;
    return;
  }
  navigationHistory.value.push(oldRoute)
})
const safeGoBack = (event) => {
  skipHistory.value = true;
  event.target.blur();
  const previousRoute = navigationHistory.value.pop();
  if (previousRoute) {
    router.push(previousRoute);
  } else {
    router.push('/');
  }
}
const currentYear = computed(() => {
  const date = new Date();
  return date.getFullYear();
})
</script>

<template>
  <ILayout class="_height:100vh">
    <Sidebar
        v-model="open"
        :collapse="true"
        collapse-position="fixed"
        size="lg"
        screen-type="mobile"
        @close="open = false"
        class="_xl:hidden"
    />
    <ILayoutHeader>
      <IContainer class="header-container">
        <INavbar fluid :collapse="false" color="transparent">
          <INavbarBrand to="/">&nbsp;</INavbarBrand>
          <IHamburgerMenu v-model="open" animation="close" class="_xl:hidden" />
        </INavbar>
      </IContainer>
    </ILayoutHeader>
    <IContainer>
      <ILayout vertical class="main-layout">
        <ILayoutAside key="aside1" class="_xl:visible _hidden">
          <Sidebar
              screen-type="desktop"
              :collapse="false"
              size="lg"
          />
        </ILayoutAside>
        <ILayoutContent>
          <IContainer id="main-container" class="_margin-top:1">
            <IButton v-show="navigationHistory.length" @click="safeGoBack" circle size="sm" color="dark" class="button-back _text-decoration:none!"><</IButton>
            <NuxtPage :key="route.fullPath" />
          </IContainer>
        </ILayoutContent>
      </ILayout>
    </IContainer>
    <ILayoutFooter>
      <IContainer>
        <IRow>
          <IColumn class="_font-size:xs _margin-top:2 _margin-x:1 _margin-bottom:1">
            This entire site is Copyright ©Penny Bradley 2025-{{ currentYear }}, Inc. All rights reserved.<br />
            URL: {{ siteUrl }}
          </IColumn>
        </IRow>
      </IContainer>
    </ILayoutFooter>
  </ILayout>
</template>

<style lang="scss">
@import '@inkline/inkline/css/mixins/_index.scss';
.hamburger-menu {
  background-color: #fff;
  --hamburger-menu--padding: 5px;
}
.navbar {
  height: 130px;
  --navbar--border-width: 0;
  --navbar--box-shadow: none;
  .navbar-brand {
    width: 500px;
    height: 100px;
    @include breakpoint-down('sm') {
      width: 220px;
      margin-right: 0;
      padding-right: 0;
    }
  }
}
body {
  background-image: url('/images/layout/black.png');
  background-repeat: repeat-x;
  background-position: top left;
}
body > div > main.layout {
  //background-image: url('/images/layout/earth-in-space-bg.webp');
  background-image: url('/images/layout/mars-in-space-bg.webp');
  background-repeat: no-repeat;
  background-position: top center;
}
.header-container {
  background-image: url('/images/layout/logo-title-small.webp');
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  height: 130px;
  @include breakpoint-up('md') {
    background-image: url('/images/layout/logo-title.webp');
  }
}
#main-container .button-back {
  position: absolute;
  top: 20px;
  right: 15px;

  & + .back-button-container {
    display: none;
  }
}
.layout-content {
  margin-right: 50px;
  @include breakpoint-down('lg') {
    margin-right: 0;
  }
}
.main-layout {
  background-color: #fff;
  border-radius: 5px;
}
p {
  margin-top: var(--p--margin-bottom, var(--margin-bottom));
}
p.title, span.title {
  font-size: 1.5rem;
}
img[hspace] {
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>
