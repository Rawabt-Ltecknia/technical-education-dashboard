<template>
  <v-dialog v-model="model" :max-width="maxWidth">
    <v-card class="pa-4" rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-icon class="me-2" :icon="dialogIcon" />
        <span>{{ title || "تأكيد" }}</span>
      </v-card-title>

      <v-card-text>
        {{ message || "هل أنت متأكد من إتمام هذه العملية؟" }}
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="onCancel">إلغاء</v-btn>
        <v-btn
            :color="buttonColor"
            :loading="loading"
            :disabled="loading"
            variant="flat"
            @click="onConfirm"
            width="35%"
        >

          <template v-slot:prepend v-if="confirmIcon">
            <v-icon color="white">
              <v-icon left>{{ confirmIcon }}</v-icon>
            </v-icon>
          </template>
          تأكيد
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch,defineProps, defineEmits,withDefaults } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  type?: string;  // لون الزر حسب النوع
  maxWidth?: number | string; // عرض الدايلوج
  loading?: boolean;           // حالة تحميل الزر
  confirmIcon?: string | null; // أيقونة زر التأكيد، null تعني لا أيقونة، undefined تعني استخدام افتراضي
}

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);
const props = withDefaults(defineProps<Props>(), {
  title: "تأكيد",
  message: "هل أنت متأكد من إتمام هذه العملية؟",
  type: "default",
  maxWidth: 400,
  loading: false,
  confirmIcon: undefined,
});
const model = ref(props.modelValue);

watch(
    () => props.modelValue,
    (val) => (model.value = val)
);

watch(model, (val) => emit("update:modelValue", val));

const knownTypes: Record<string, { color: string; icon: string }> = {
  delete: { color: "error", icon: "mdi-delete" },
  edit: { color: "warning", icon: "mdi-pencil" },
  warning: { color: "warning", icon: "mdi-alert" },
  success: { color: "success", icon: "mdi-check-circle" },
  info: { color: "info", icon: "mdi-information" },
};

const buttonColor = computed(() => {
  if (props.type && props.type.toLowerCase() in knownTypes) {
    return knownTypes[props.type.toLowerCase()].color;
  }
  return "primary";
});

const dialogIcon = computed(() => {
  if (props.type && props.type.toLowerCase() in knownTypes) {
    return knownTypes[props.type.toLowerCase()].icon;
  }
  return "mdi-help-circle";
});

// تحديد الأيقونة التي ستظهر في زر التأكيد
const confirmIconToUse = computed(() => {
  if (props.confirmIcon === null) return null;  // لا تظهر أي أيقونة
  if (typeof props.confirmIcon === "string") return props.confirmIcon;  // الأيقونة التي أرسلها المستخدم
  // إذا لم يرسل أي شيء استخدم الافتراضي حسب النوع
  if (props.type && props.type.toLowerCase() in knownTypes) {
    return knownTypes[props.type.toLowerCase()].icon;
  }
  return null;
});

function onConfirm() {
  emit("confirm");
  model.value = false;
}

function onCancel() {
  emit("cancel");
  model.value = false;
}
</script>
