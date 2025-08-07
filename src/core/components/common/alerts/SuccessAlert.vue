<script setup lang="ts">


import {ref, defineProps, defineEmits,onMounted} from "vue";
import {translation} from "@/plugins/i18n";

const props = defineProps<{
  text?: string,
  title?: string,
}>();

const emit = defineEmits(['close']);
const textContent = ref('')

const onClose = () => {
  emit('close');
};

onMounted(() => {
  if (props.text) {
    textContent.value = props.text
  } else {
    textContent.value = translation("SOME_SUCCESS")
  }
})

</script>

<template>
  <v-alert
      border="start"
      type="success"
      icon="mdi mdi-check-circle-outline"
      @click:close="onClose()"
      :title="title"
      :closable="true"
      :text="textContent"
  >
    <slot></slot>
  </v-alert>
</template>

<style scoped lang="scss">

</style>
