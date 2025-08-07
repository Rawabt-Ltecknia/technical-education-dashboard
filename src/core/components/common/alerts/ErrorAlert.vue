<script setup lang="ts">


import {ref} from "vue";
import {defineProps,defineEmits} from "vue"

const props = defineProps<{
  text?: string,
  title?: string,
}>();

const emit = defineEmits(['close']);
const textContent = ref('')
const onClose = () => {
  emit('close');
};

</script>

<template>
  <v-alert
    border="start"
    type="error"
    icon="mdi-cancel"
    @click:close="onClose()"
    :title="title"
    :closable="true"
  >
    <slot></slot>
  </v-alert>
</template>

<style scoped lang="scss">

</style>
