<script lang="ts" setup>
import { ref, watch, computed, getCurrentInstance,defineEmits,withDefaults,defineProps } from 'vue'
import {translation} from "@/plugins/i18n";
  const props = withDefaults(
    defineProps<{
      label?: string;
      modelValue?: any;
      rules?: string[] | boolean[] | ((v: string | null) => true | string)[] ;
      variant?: "outlined" | "solo" | "filled" | "plain" | "underlined" | "solo-inverted" | "solo-filled" | undefined;
      disabled?: boolean;
      hideDetails?: boolean;
      clearable?: boolean;
      prependInnerIcon?: any;
      type?: string;
      hint?: string | undefined;
      color?: string | undefined;
      colLg?: number;
      colMd?: number;
      colSm?: number;
    }>(),
    {
      label: translation("PICK_TIME"),
      disabled: false,
      hideDetails: false,
      clearable: false,
      type: 'text',
      color: 'primary',
      colLg: 4,
      colMd: 6,
      colSm: 12,
    }
  );
  const emit = defineEmits(["update:modelValue"]);
  const menu = ref(false);
  const value = ref(props.modelValue);

  watch(value, (newTime) => {
    value.value = newTime;
    emit("update:modelValue", newTime);
  });
</script>
<template>
  <v-col :lg="colLg" :md="colMd" :sm="colSm">
    <v-menu v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            width="10"
            min-width="auto">
      <template v-slot:activator="{ props: menuProps }">
        <v-text-field
            v-model="value"
            v-bind="menuProps"
            :label="label"
            :prepend-inner-icon="prependInnerIcon"
            append-inner-icon="mdi-clock-time-four-outline"
            :color="color"
            :disabled="disabled"
            :variant="variant"
            :rules="rules"
            :type="type"
            :hide-details="hideDetails"
        ></v-text-field>
      </template>

      <v-time-picker
          v-model="value"
          format="ampm"
          ampm-in-title
          full-width
          rounded="lg"
          :color="color"
      />
    </v-menu>
  </v-col>
</template>
