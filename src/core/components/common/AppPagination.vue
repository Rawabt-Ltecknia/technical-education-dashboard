<script setup lang="ts">
import {computed, watch, ref, withDefaults, defineEmits, defineProps} from 'vue';
import {translation} from "@/plugins/i18n";

const props = withDefaults(
    defineProps<{
      modelValue: number; // current page
      totalItems: number;
      itemsPerPage: number;
      enableItemsPerPage?: boolean | undefined | null;
      pageButtonCount?: number;
      enableGoToPage?: boolean;

    }>(),
    {
      pageButtonCount: 6,
      enableItemsPerPage: true,
      enableGoToPage: true,
    }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'update:itemsPerPage', value: number): void;
}>();

const pageInput = ref(props.modelValue);

const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.itemsPerPage)
);

const computeEnableGoToPage = computed(() => {
      if (props.enableGoToPage === undefined || props.enableGoToPage === null) {
        return true;
      }
      return props.enableGoToPage;
    }
);

watch(() => props.modelValue, (val) => {
  pageInput.value = val;
});

const cc = [
    {text: '10', value: 10},
    {text: '20', value: 20},
    {text: '50', value: 50},
    {text: '100', value: 100},
    {text: '200', value: 200},
    // {text: translation("PAGINATION.VIEW_ALL"), value: -1},
]

const goToPage = () => {
  if (pageInput.value < 1 || isNaN(pageInput.value) ||  pageInput.value === null || pageInput.value === undefined) {
    pageInput.value = 1;
  }
  if (pageInput.value > totalPages.value) {
    pageInput.value = totalPages.value;
  }
  const page = Math.min(Math.max(1, pageInput.value), totalPages.value);
  emit('update:modelValue', page);
};
</script>
<template>
  <div class="d-flex flex-wrap align-center ga-4"
  v-if="totalPages > 0"
  >
    <!-- Select items per page -->
    <div class="d-flex align-center ga-2">
      <span>عرض</span>
      <v-select
          :items="cc"
          item-value="value"
          item-title="text"
          :model-value="itemsPerPage"
          @update:model-value="emit('update:itemsPerPage', $event)"
          density="compact"
          hide-details
          v-if="enableItemsPerPage"
          style="width: 100px"
      />
      <span>
        {{ translation("PAGINATION.ITEMS_PER_PAGE") }}
      </span>
    </div>

    <!-- AppPagination Controls -->
    <div class="d-flex align-center ga-2">
      <v-pagination :model-value="modelValue" :length="totalPages"
                    next-icon="mdi mdi-chevron-left"
                    prev-icon="mdi mdi-chevron-right"
                    last-icon="mdi mdi-chevron-double-left"
                    first-icon="mdi mdi-chevron-double-right"
                    :total-visible="pageButtonCount"
                    @update:model-value=" a => emit('update:modelValue', a)"/>

    </div>

    <!-- Page input -->
    <div class="d-flex align-center ga-2">
      <v-text-field
          v-model.number="pageInput"
          type="number"
          density="compact"
          hide-details
          v-if="computeEnableGoToPage"
          style="width: 150px"
          @keyup.enter="goToPage"
          append-inner-icon="mdi mdi-arrow-left-bold"
          @click:append-inner="goToPage"
      />
      <span>
        {{ translation("PAGINATION.OF_TOTAL", {total: totalItems}) }}
        {{ translation("PAGINATION.PAGE") }}
      </span>
    </div>
  </div>
</template>
