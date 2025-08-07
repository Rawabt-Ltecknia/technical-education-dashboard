<script lang="ts" setup>
import { ref, watch, computed, getCurrentInstance,defineEmits,withDefaults,defineProps } from 'vue'
import {translation} from "@/plugins/i18n";
const emit = defineEmits(['update:modelValue', 'onRefresh'])

const props = withDefaults(
    defineProps<{
      modelValue?: any;
      label: string;
      placeholder?: string;
      loading?: boolean;
      rules?: ((value: any) => true | string)[] |((value: any) => true | string)| undefined;
      variant?: "outlined" | "solo" | "filled" | "plain" | "underlined" | "solo-inverted" | "solo-filled" | undefined;
      itemValue?: string;
      itemText?: string;
      returnObject?: boolean;
      items: any[] | undefined;
      disabled?: boolean;
      clearable?: boolean;
      hideDetails?: boolean;
      multiple?: boolean;
      chips?: boolean;
      closableChips?: boolean;
      color?: string | undefined;
      prependIcon?: any;
      appendIcon?: any;
      prependInnerIcon?: any;
      appendInnerIcon?: any;
      colLg?: number;
      colMd?: number;
      colSm?: number;
    }>(),
    {
      label: translation("ENTER"),
      itemValue: 'value',
      itemText: 'text',
      returnObject: false,
      items: function () {
        return []
      },
      disabled: false,
      clearable: false,
      hideDetails: false,
      multiple: false,
      chips: false,
      closableChips: false,
      color: 'primary',
      colLg: 4,
      colMd: 6,
      colSm: 12,
    }
);
const internalValue = ref(props.modelValue)

watch(
    () => props.modelValue,
    (val) => {
      internalValue.value == 0 ?
          internalValue.value = "select" :
          internalValue.value = val
    }
)
watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

const handleRefresh = () => {
  emit('onRefresh')
}

const instance = getCurrentInstance()
const hasOnRefreshListener = computed(() => {
  return !!instance?.vnode.props?.onOnRefresh
})

const computedPrependInnerIcon = computed(() => {
  if (hasOnRefreshListener.value) return 'mdi-refresh';
  return props.appendInnerIcon;
});

const normalizedRules = computed(() => {
  if (!props.rules) return [];
  if (typeof props.rules === 'function') return [props.rules];
  return props.rules;
});
</script>
<template>
  <v-col :lg="colLg" :md="colMd" :sm="colSm">

    <v-autocomplete :label="label"
                    v-model="internalValue"
                    :rules="normalizedRules"
                    :items="items"
                    :variant="variant"
                    :clearable="clearable"
                    :multiple="multiple"
                    :item-value="itemValue"
                    :item-title="itemText"
                    :disabled="disabled"
                    :hide-details="hideDetails"
                    :return-object="returnObject"
                    :color="color"
                    :chips="chips"
                    :closable-chips="closableChips"
                    :append-icon="appendIcon"
                    :prepend-icon="prependIcon"
                    :prepend-inner-icon="prependInnerIcon"
                    :append-inner-icon="computedPrependInnerIcon === 'mdi-refresh' ? '' : computedPrependInnerIcon"
                    :loading="loading"
    >
      <template #append-inner v-if="hasOnRefreshListener">
        <v-icon
            class="me-2"
            @click="handleRefresh"
            title="Refresh"
            style="cursor: pointer"
        >
          mdi-refresh
        </v-icon>
      </template>
    </v-autocomplete>
  </v-col>
</template>


<!--<style lang="scss">
  .v-field__input {
    padding: 8px;
  }
</style>-->

