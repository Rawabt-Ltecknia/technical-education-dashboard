<script setup lang="ts">


import {defineProps,defineEmits} from "vue"

const props = defineProps<IAlertProps>();
// const props = defineProps<IAlertProps>({
//   type: {
//     type: String,
//     default: 'info' // يمكن أن يكون: success, info, warning, error
//   },
//   color: {
//     type: String,
//     default: 'primary'
//   },
//   icon: {
//     type: String,
//     default: undefined
//   },
//   dismissible: {
//     type: Boolean,
//     default: true
//   },
//   defaultText: {
//     type: String,
//     default: 'حدث خطأ ما'
//   }
// });

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};


export interface IAlertProps {
  type?: "error" | "success" | "warning" | "info" | undefined;
  color?: string | undefined;
  variant: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain";
  icon: string;
  closable: boolean;
  defaultText?:string;
  title?:string;
}
</script>

<template>
  <v-alert
    border="start"
    :type="props.type"
    :color="color"
    :icon="icon"
    :title="title"
    :closable="closable"

  >
    <slot>{{ defaultText }}</slot>
  </v-alert>
<!--  @input="onClose"-->
<!--  v-bind="$attrs"-->
</template>

<style scoped lang="scss">

</style>
