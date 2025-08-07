<script lang="ts" setup>
import { withDefaults,defineProps,defineEmits} from 'vue';
import {translation} from "@/plugins/i18n";
import { computed,ref,watch } from 'vue';
const props = withDefaults(
  defineProps<{
    modelValue?: File | File[] | null;
    currentFileUrl?: string | null | undefined;
    currentFileName?: string;
    label?: string;
    placeholder?: string;
    rules?: ((value: any) => true | string)[];
    multiple?: boolean;
    accept?: string;
    counter?: boolean;
    showSize?: boolean;
    variant?: "outlined" | "solo" | "filled" | "plain" | "underlined" | "solo-inverted" | "solo-filled";
    disabled?: boolean;
    hideDetails?: boolean;
    clearable?: boolean;
    hint?: string;
    prependInnerIcon?: string | undefined;
    dialogMaxWidth?: string | number;
    dialogMaxHeight?: string | number;
    canPreview?: boolean;
    color?: string;
    colLg?: number;
    colMd?: number;
    colSm?: number;
  }>(),
  {
    label: translation("SELECT_FILE"),
    placeholder: '',
    currentFileUrl: '',
    rules: () => [],
    multiple: false,
    accept: '',
    counter: false,
    showSize: false,
    disabled: false,
    hideDetails: false,
    clearable: true,
    appendIcon: 'mdi-upload',
    prependInnerIcon: 'mdi-paperclip',
    hint: '',
    canPreview: true,
    dialogMaxWidth: 600,
    dialogMaxHeight: 600,
    color: 'primary',
    colLg: 4,
    colMd: 6,
    colSm: 12,
  }
);

const dialog = ref(false);
const fileUrl = ref<string | null>(null);
const previewSource = ref<'file' | 'url'>('file');

const emit = defineEmits(["update:modelValue", "change", "preview"]);

function onFileChange(files: File | File[] | null) {
  emit('update:modelValue', files);
  emit('change', files);
}

const previewIcon = computed(() => {
  if (!props.canPreview) return '';
  return props.modelValue ? 'mdi-eye' : '';
});

watch(() => props.modelValue, (file) => {
  if (file instanceof File) {
    const reader = new FileReader();
    reader.onload = () => {
      fileUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    fileUrl.value = props.currentFileUrl || null;
  }
}, {immediate: true});

function openPreview(source: 'file' | 'url' = 'file') {
  previewSource.value = source;
  dialog.value = true;
}

const previewFileName = computed(() => {
  if (props.currentFileName) {
    return props.currentFileName;
  }
  if (!props.currentFileUrl) return '';
  const fullName = props.currentFileUrl.split('/').pop()?.split('?')[0] ?? '';
  const lastDotIndex = fullName.lastIndexOf('.');
  if (lastDotIndex === -1) return fullName;
  const name = fullName.substring(0, lastDotIndex);
  const ext = fullName.substring(lastDotIndex);
  if (fullName.length <= 30) return fullName;
  const truncatedName = name.slice(0, 30 - ext.length - 3);
  return `${truncatedName}...${ext}`;
});

const normalizedRules = computed(() => {
  if (!props.rules) return [];
  if (typeof props.rules === 'function') return [props.rules];
  return props.rules;
});
</script>

<template>
  <v-col :lg="colLg" :md="colMd" :sm="colSm">
    <v-file-input
      :model-value="modelValue"
      @update:model-value="onFileChange"
      :label="label"
      :placeholder="placeholder"
      :rules="normalizedRules"
      :multiple="multiple"
      :accept="accept"
      :counter="counter"
      :show-size="showSize"
      :variant="variant"
      :disabled="disabled"
      :hide-details="hideDetails"
      :clearable="clearable"
      :prepend-inner-icon="prependInnerIcon"
      :append-icon="previewIcon"
      @click:append="openPreview('file')"
      prepend-icon=""
      :hint="hint"
      :color="color"
    />
    <v-row v-if="props.currentFileUrl" align="center" style="margin-top: -30px;margin-left: 1px" >
      <v-col cols="auto">
      <span style="font-size: 0.9rem; color: #555;cursor: pointer"  @click="openPreview('url')" >
         {{translation("CURRENT_FILE")}}: <strong>{{ previewFileName }}</strong>
      </span>
        <button type="button" @click="openPreview('url')" >
          <v-icon size="18"
                  color="primary" class="mx-2" icon="mdi-eye-outline">
          </v-icon>
        </button>
      </v-col>
      <v-col md="1" lg="1" sm="1">

<!--        <v-btn icon="" variant="text" :title="'Preview ' + previewFileName">-->
<!--          <v-icon>mdi-eye</v-icon>-->
<!--        </v-btn>-->
      </v-col>
    </v-row>
    <v-dialog v-model="dialog"
              :max-width="dialogMaxWidth"
              :style="{ height: dialogMaxHeight }"
              content-class="centered-dialog"

    >
      <v-card class="rounded-lg shadow-lg" >
        <v-card-title class="d-flex justify-space-between align-center">
          <span>{{translation("FILE_PREVIEW")}}</span>
            <v-icon size="18" color="primary" @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <template v-if="previewSource === 'file' && modelValue && fileUrl">
            <img
              v-if="modelValue?.type.startsWith('image/')"
              :src="fileUrl"
              alt="Preview"
              style="max-width: 100%; width: 100%; height: auto"
            />
            <iframe
              v-else-if="modelValue?.type === 'application/pdf'"
              :src="fileUrl"
              width="100%"
              height="400px"
            />
            <div v-else>  {{translation("FILE_TYPE_NOT_SUPPORTED")}}</div>
          </template>

          <template v-else-if="previewSource === 'url' && props.currentFileUrl">
            <img
              v-if="props.currentFileUrl.endsWith('.jpg') || props.currentFileUrl.endsWith('.png') || props.currentFileUrl.endsWith('.jpeg')"
              :src="props.currentFileUrl"
              alt="Preview"
              style="max-width: 100%; width: 100%; height: auto"
            />
            <iframe
              v-else-if="props.currentFileUrl.endsWith('.pdf')"
              :src="props.currentFileUrl"
              width="100%"
              height="400px"
            />
            <div v-else>   {{translation("FILE_TYPE_NOT_SUPPORTED")}}.</div>
          </template>

          <template v-else>
            <div> {{translation("NO_PREVIEW_AVAILABLE")}}</div>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            variant="text"
            density="comfortable"
            @click="dialog = false"
            title="Close"
          >
            <v-icon start color="primary">mdi-close</v-icon> {{translation("CLOSE")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<style scoped lang="scss">
.v-input {
  padding: 2px;
}

.centered-dialog {
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

</style>
