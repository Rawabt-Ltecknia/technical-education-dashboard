<template>
  <Preloader v-if="loadingStore.$state.loading"/>
  <LeftSidebar v-if="shouldShowSidebar && !isNotFound"/>
  <div
      :class="[
      'main-content d-flex flex-column',
      { active: stateStoreInstance.open },
      { 'padding-minus': shouldShowPaddingLeftZero || isNotFound },
    ]"
  >
    <TopHeader v-if="shouldShowHeader && !isNotFound"/>
    <div :class="containerClass">

      <router-view/>
    </div>

    <!--    <MainFooter v-if="shouldShowFooter && !isNotFound" />-->
    <SettingsSidebar/>
  </div>

  <v-snackbar v-model="snackbarStore.show"
              auto-height
              :color="snackbarStore.type"
              :width="snackbarStore.width"
              :timeout="snackbarStore.timeout"
              :location="snackbarStore.location"
  >
    <v-row>
      <v-col cols="auto">
        <v-icon color="white">{{ snackbarStore.icon }}</v-icon>
      </v-col>
      <v-col cols="auto">
        <h6 style="font-size: 16px;color: white">{{ snackbarStore.message }}</h6>
      </v-col>
    </v-row>
    <template v-slot:actions>
      <v-btn
          icon="mdi-close"
          color="white"
          variant="text"
          @click="snackbarStore.show = false"
      />
    </template>
  </v-snackbar>

</template>

<script lang="ts" setup>
import {computed, onMounted, watchEffect} from "vue";
import {useRoute} from "vue-router";
import stateStore from "@/core/components/layouts/store";

import Preloader from "@/core/components/layouts/Preloader.vue";
import LeftSidebar from "@/core/components/layouts/LeftSidebar/index.vue";
import TopHeader from "@/core/components/layouts/TopHeader/index.vue";
import SettingsSidebar from "@/core/components/layouts/SettingsSidebar.vue";
import {useLoadingStore} from "@/stores/loading";
import {translation} from "@/plugins/i18n";
import {useSnackbarStore} from '@/stores/snackbar';

const loadingStore = useLoadingStore();
const snackbarStore = useSnackbarStore();

loadingStore.start("...   " + translation("LOADING"));

const stateStoreInstance = stateStore;
const route = useRoute();

const hiddenRoutes = [
  "/",
  "/features",
  "/team",
  "/faq",
  "/contact",
  "/errors/not-found",
  "/extra-pages/coming-soon",
  "/authentication/sign-in",
  "/authentication/sign-up",
  "/authentication/logout",
  "/authentication/forgot-password",
  "/authentication/reset-password",
  "/authentication/confirm-email",
  "/authentication/lock-screen",
];

const shouldShowSidebar = computed(
    () => !hiddenRoutes.includes(route.path)
);
const shouldShowHeader = computed(() => !hiddenRoutes.includes(route.path));
const shouldShowFooter = computed(() => !hiddenRoutes.includes(route.path));
const shouldShowPaddingLeftZero = computed(() =>
    hiddenRoutes.includes(route.path)
);

const isNotFound = computed(() =>
    route.matched.some((record) => record.path === "/:pathMatch(.*)*")
);

const containerClass = computed(() => ({
  "main-content-container": ![
    "/",
    "/features",
    "/team",
    "/faq",
    "/contact",
  ].includes(route.path),
}));

onMounted(() => {
  setTimeout(() => {
    loadingStore.stop();
  }, 500);

  watchEffect(() => {
    if (stateStoreInstance.open) {
      document.body.classList.remove("sidebar-show");
      document.body.classList.add("sidebar-hide");
    } else {
      document.body.classList.remove("sidebar-hide");
      document.body.classList.add("sidebar-show");
    }
  });
});

</script>

<style lang="scss" scoped>
.main-content {
  overflow: hidden;
  min-height: 100vh;
  transition: var(--transition);
  flex: 1; // يجعل الفوتر يلتصق بأسفل الصفحة

  padding: {
    top: 95px;
    left: 285px;
    right: 25px;

  }

  &.active {
    padding-left: 85px;
  }

  &.right-sidebar {
    padding: {
      left: 25px;
      right: 285px;
    }

    &.active {
      padding-right: 85px;
    }
  }

  &.hide-sidebar {
    padding-left: 85px;

    &.right-sidebar {
      padding: {
        left: 25px;
        right: 85px;
      }
    }
  }

  &.padding-minus {
    padding-left: 25px;
    padding-top: 0;
  }
}

@media only screen and (max-width: 767px) {
  .main-content {
    padding: {
      top: 0;
      left: 15px;
      right: 15px;
    }

    &.active {
      padding-left: 15px;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .main-content {
    padding: {
      top: 0;
      left: 25px;
      right: 25px;
    }

    &.active {
      padding-left: 25px;
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .main-content {
    padding: {
      top: 0;
      left: 25px;
      right: 25px;
    }

    &.active {
      padding-left: 25px;
    }
  }
}
</style>
