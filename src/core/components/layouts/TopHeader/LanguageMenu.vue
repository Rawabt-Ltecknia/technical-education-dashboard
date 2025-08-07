<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <button
        class="language-menu-btn border-none rounded-circle position-relative"
        v-bind="props"
      >
        <i class="material-symbols-outlined">translate</i>
      </button>
    </template>

    <v-list class="language-menu-dropdown">
      <span class="title fw-semibold text-black d-block">Choose Language </span>
      <ul class="menu-body pl-0 mb-0 mt-0 list-unstyled">
        <li>
          <button type="button" class="d-flex align-items-center border-none">
            <v-img src="@/assets/images/flags/usa.svg" alt="usa" />
            English
          </button>
        </li>
      </ul>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
</script>
