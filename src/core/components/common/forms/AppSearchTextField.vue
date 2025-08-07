<script lang="ts" setup>
import {withDefaults, defineProps, defineEmits,watch} from 'vue';
import {translation} from "@/plugins/i18n";
import {computed} from 'vue';

const props = withDefaults(
    defineProps<{
      modelValue?: any;
      label: string;
      placeholder?: string;
      rules?: ((value: any) => true | string)[] | ((value: any) => true | string) | undefined;
      variant?: "outlined" | "solo" | "filled" | "plain" | "underlined" | "solo-inverted" | "solo-filled" | undefined;
      disabled?: boolean;
      debounceDelay?: number;
      hideDetails?: boolean;
      clearable?: boolean;
      type?: string;
      prependIcon?: any;
      appendIcon?: any;
      prependInnerIcon?: any;
      appendInnerIcon?: any;
      hint?: string | undefined;
      color?: string | undefined;
      colLg?: number;
      colMd?: number;
      colSm?: number;
    }>(),
    {
      label: translation("SEARCH"),
      disabled: false,
      debounceDelay: 700,
      hideDetails: false,
      clearable: false,
      type: 'text',
      prependIcon: null,
      hint: '',
      color: 'primary',
      colLg: 4,
      colMd: 6,
      colSm: 12,
    }
);

const emit = defineEmits(["update:modelValue", "onSearch"]);

// let debounceTimeout: any = null;

let debounceTimeout: any = null;

watch(() => props.modelValue, (newVal) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit("onSearch", newVal);
  }, props.debounceDelay);
});

const normalizedRules = computed(() => {
  if (!props.rules) return [];
  if (typeof props.rules === 'function') return [props.rules];
  return props.rules;
});
</script>

<template>
  <v-col :lg="colLg" :md="colMd" :sm="colSm">
    <v-text-field :label="label"
                  :model-value="modelValue"
                  :rules="normalizedRules"
                  @update:model-value="$emit('update:modelValue', $event)"
                  :hide-details="hideDetails"
                  :type="type"
                  :variant="variant"
                  :color="color"
                  :clearable="clearable"
                  :placeholder="placeholder"
                  :prepend-icon="prependIcon"
                  :append-icon="appendIcon"
                  :prepend-inner-icon="prependInnerIcon"
                  :append-inner-icon="'mdi-magnify'"
                  :hint="hint"
                  @keyup.enter="$emit('onSearch',modelValue)"
                  @click:append-inner="$emit('onSearch', $event)"
                  :disabled="disabled">
    </v-text-field>
  </v-col>
</template>


<style lang="scss">
.v-field__field {
  padding: 2px;
}

.v-field--center-affix .v-label.v-field-label {
  right: 0 !important;
}
</style>


