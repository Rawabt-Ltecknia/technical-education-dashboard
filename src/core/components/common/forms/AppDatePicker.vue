<script lang="ts" setup>
import { ref, watch, computed,defineEmits,withDefaults,defineProps } from 'vue'
import {translation} from "@/plugins/i18n";
const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue?:  Date  | string|null;
    rules?:((value: any) => true | string)[] | undefined;
    variant?: "outlined" | "solo" | "filled" | "plain" | "underlined" | "solo-inverted" | "solo-filled";
    disabled?: boolean;
    hideDetails?: boolean;
    clearable?: boolean;
    type?: string;
    prependInnerIcon?: any;
    hint?: string | undefined;
    color?: string | undefined;
    colLg?: number;
    colMd?: number;
    colSm?: number;
  }>(),
  {
    label: translation("PICK_DATE"),
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

const emit = defineEmits(["update:modelValue","click:clear"]);
const menu = ref(false);
const value = ref(props.modelValue);


const formattedDate = computed(() => {
  return  value.value instanceof Date?
  value.value ? value.value.toLocaleDateString("en-CA") : "" 
  :value.value
});

watch(() => props.modelValue, (newVal) => {
  value.value = newVal;
});

watch(value, (newDate) => {
  emit("update:modelValue", newDate);
  menu.value = false;
});

const handleClear = () => {
  value.value = null;
  emit("update:modelValue", null);
  emit("click:clear");
};
</script>


<template>
  <v-col :lg="colLg" :md="colMd" :sm="colSm">
    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ props }">
        <v-text-field :label="label"
                      :model-value="formattedDate"
                      append-inner-icon="mdi-calendar"
                      :prepend-inner-icon="prependInnerIcon"

                      v-bind="props"
                      :rules="rules"
                      :hide-details="hideDetails"
                      :clearable="clearable"
                      @click:clear="handleClear()"
                      :type="type"
                      :variant="variant"
                      :hint="hint"
                      :color="color"
                      :disabled="disabled">
        </v-text-field>
      </template>

      <v-date-picker v-model="value" hide-header :color="color">
      </v-date-picker>
    </v-menu>
    </v-col>
</template>
