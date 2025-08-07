<script setup lang="ts">


import {ref,defineProps,defineEmits} from "vue";

const props = defineProps<{
  text?: string,
  title?: string,
}>();

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};

</script>

<template>
  <v-alert
    border="start"
    type="info"
    icon="mdi mdi-information-outline"
    @click:close="onClose()"
    :title="title"
    :closable="true"
    :text="text"
  >
    <template v-if="text">
      {{text}}
    </template>
    <slot v-else></slot>
  </v-alert>
</template>

<style scoped lang="scss">

</style>
