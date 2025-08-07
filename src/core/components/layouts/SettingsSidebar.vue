<template>
  <div
      :class="[
      'settings-sidebar bg-white transition',
      { active: stateStoreInstance.settings },
    ]"
  >
    <div
        class="settings-header bg-gray d-flex align-items-center justify-space-between"
    >
      <div class="logo d-flex align-items-center">
        <v-img src="/assets/images/AppLogo.webp" alt="التعليم التقني" style="width: 35px"/>
        <h4 class="m-0 lh-1" style="font-size: 18px">
          {{translation("AppName_2")}}
        </h4>
      </div>
      <button
          type="button"
          class="close-btn"
          @click="stateStoreInstance.settingsBtn"
      >
        <i class="material-symbols-outlined"> close </i>
      </button>
    </div>
    <div class="settings-body">
      <div class="p-20">
        <span class="title d-block text-black fw-medium" v-if="!rtlMode"> من اليمين الي اليسار </span>
        <span class="title d-block text-black fw-medium" v-if="rtlMode"> من اليسار الي اليمين  </span>
        <!--        <RTLModeSwitch />-->
        <v-switch @click="toggleRTL" v-model="rtlMode"/>

      </div>
      <!--      <v-divider></v-divider>-->
      <!--      <div class="p-20">-->
      <!--        <span class="title d-block text-black fw-medium"> Dark Mode </span>-->
      <!--        <v-switch @click="toggleTheme"></v-switch>-->
      <!--      </div>-->
      <v-divider></v-divider>
      <div class="p-20 hide-sidebar">
        <span class="title d-block text-black fw-medium"> أخفاء القائمة </span>
        <v-switch
            :class="[{ active: stateStoreInstance.open }]"
            @click="stateStoreInstance.onChange"
        >
        </v-switch>
      </div>
      <v-divider></v-divider>
      <div class="p-20">
        <span class="title d-block text-black fw-medium">
          تظليم القائمة فقط
        </span>
        <v-switch @click="toggleOnlySidebarLightMode" v-model="isDarkMode"></v-switch>
      </div>
      <v-divider></v-divider>
      <div class="p-20">
        <a href="#" class="text-primary"> Rwabit Altaqnia </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import stateStore from "@/core/components/layouts/store";
import {translation} from "@/plugins/i18n";

const stateStoreInstance = stateStore;
const isDarkMode = ref(false);
const icon = ref("light_mode");
const rtlMode = ref(false);

onMounted(() => {
  const storedDarkMode = localStorage.getItem("dark-theme");
  if (storedDarkMode) {
    isDarkMode.value = storedDarkMode === "true";
    const element = document.getElementById("SidebarTheme");
    if (element) {
      element.classList.toggle("dark-theme", isDarkMode.value);
    }
  }

  // Check if the theme is saved in local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    icon.value = "dark_mode";
  }

  const savedRTLMode = localStorage.getItem("rtlMode");
  if (savedRTLMode === "true") {
    document.body.classList.add("rtl-enabled");
    rtlMode.value = true;
  } else if (savedRTLMode === "false") {
    document.body.classList.remove("rtl-enabled");
    rtlMode.value = false;
  } else {
    document.body.classList.add("rtl-enabled");
    rtlMode.value = true;
    localStorage.setItem("rtlMode", "true");
  }
});
const toggleOnlySidebarLightMode = () => {
  isDarkMode.value = !isDarkMode.value;
  const element = document.getElementById("SidebarTheme");

  if (element) {
    // Toggle the class on the element
    element.classList.toggle("dark-theme", isDarkMode.value);
  }

  localStorage.setItem("dark-theme", isDarkMode.value.toString());
};
const toggleRTL = () => {
  const body = document.body;
  const rtlClass = "rtl-enabled";

  if (body.classList.contains(rtlClass)) {
    body.classList.remove(rtlClass);
    rtlMode.value = false;
    localStorage.setItem("rtlMode", "false");
  } else {
    body.classList.add(rtlClass);
    rtlMode.value = true;
    localStorage.setItem("rtlMode", "true");
  }
};

const toggleTheme = () => {
  const body = document.body;
  const darkThemeClass = "dark-theme";

  if (body.classList.contains(darkThemeClass)) {
    body.classList.remove(darkThemeClass);
    icon.value = "light_mode";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add(darkThemeClass);
    icon.value = "dark_mode";
    localStorage.setItem("theme", "dark");
  }
};
</script>

<style lang="scss" scoped>
.settings-sidebar {
  bottom: 0;
  z-index: 99999;
  right: -100%;
  width: 300px;
  height: 100%;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
  box-shadow: #959da51f 0 8px 24px;

  .settings-body {
    padding-top: 80px;
    height: 100vh;
    overflow-y: scroll;

    .title {
      margin-bottom: 12px;
    }

    &::-webkit-scrollbar {
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
      width: 5px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-track {
      background: var(--whiteColor);
    }

    .buy-trezo-btn {
      padding: 10px 24px;
      border-radius: 30px;
      display: inline-block;
    }
  }

  .settings-header {
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 20px;
    position: absolute;
    justify-content: space-between;

    .logo {
      .v-img {
        margin-right: 8px;
      }
    }

    .close-btn {
      padding: 0;
      height: auto;
      min-width: auto;
      border-radius: 0;
      color: var(--blackColor);
    }
  }

  &.active {
    right: 0;
    opacity: 1;
    visibility: visible;
  }
}
</style>
