<template>
  <div
      class="breadcrumb-card d-md-flex align-items-center justify-space-between border-radius-10 p-25"
  >
    <div>
      <h5 class="mb-0">
        <v-icon :icon="pageTitleIcon" v-if="pageTitleIcon" />
        {{ pageTitle }}
      </h5>
      <span
          v-if="pageSubTitle"
          class="text-muted"
          style="font-size: 18px; margin-top: 5px; margin-right: 25px"
      >
        {{ pageSubTitle }}
      </span>
    </div>

    <!-- Breadcrumb Default -->
    <ol
        class="breadcrumb list-unstyled mt-0 mb-0 pl-0"
        v-if="!breadcrumbItems || breadcrumbItems.length === 0"
    >
      <li class="breadcrumb-item  position-relative">
        <RouterLink to="/dashboard" class=" position-relative">
          {{ pageTitle }}
        </RouterLink>
      </li>
    </ol>

    <!-- Breadcrumb Custom Items -->
    <ol
        class="breadcrumb list-unstyled mt-0 mb-0 pl-0"
        v-if="breadcrumbItems && breadcrumbItems.length"
    >
<!--      style="margin-right: -10px"-->
      <li
          class="breadcrumb-item d-inline-block position-relative"
          :style="{ 'margin-right': item.icon ? '' : '-10px' }"
          v-for="(item, index) in breadcrumbItems"
          :key="index"
      >
        <RouterLink
            v-if="item.to"
            :to="item.to"
            style="font-size: 14px"
        >
          <v-icon :icon="item.icon" v-if="item.icon" style="font-size: 15px"/>
          {{ item.text }}
        </RouterLink>

        <span v-else style="font-size: 16px">
          <v-icon :icon="item.icon" v-if="item.icon" style="font-size: 15px"/>
          {{ item.text }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {BreadcrumbItem} from "@/core/components/Layouts/page-title/page-title-models";

 defineProps<{
  breadcrumbItems?: BreadcrumbItem[]
  pageTitle?: string
  pageSubTitle?: string
  pageTitleIcon?: string
}>()
</script>
