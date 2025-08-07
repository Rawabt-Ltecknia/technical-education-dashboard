<template>
  <div ref="editor"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import { defineProps } from 'vue'
import {BreadcrumbItem} from "@/core/components/Layouts/page-title/page-title-models";

const props=defineProps<{
  height:  string | undefined | null
}>()
const editor = ref<HTMLElement | null>(null);
let quill: any = null;

onMounted(async () => {
  if (typeof window !== "undefined") {
    const Quill = (await import("quill")).default;
    import("quill/dist/quill.snow.css");

    if (editor.value) {
      quill = new Quill(editor.value, {
        theme: "snow",
        placeholder: "Insert text here ...",
        modules: {
          // toolbar: [
          //   [{ header: [1, 2, false] }],
          //   ["bold", "italic", "underline"],
          //   [{ list: "ordered" }, { list: "bullet" }],
          //   ["link"],
          // ],
        },
      });
      editor.value.style.height = props.height??"150px";
    }
  }
});

onBeforeUnmount(() => {
  if (quill) {
    quill = null;
  }
});
</script>
