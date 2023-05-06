<template>
  <v-card class="ma-2">
    <v-card-text>
      <v-img v-if="!is_loading" :src="src" @click="dialog = true" />
      <v-progress-circular
        v-else
        indeterminate
        size="64"
        style="width: 100%"
        mx-auto
        color="primary"
      ></v-progress-circular>
    </v-card-text>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <img
            :src="src"
            style="max-width: 90vh; max-height: 90vh"
            @click="openInTab"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { loadImgURL } from "../helpers";

const props = defineProps(["item", "client"]);
const src = ref("");
const is_loading = ref(true);
const dialog = ref(false);

function openInTab() {
  window.open(src.value, "_blank");
}

onMounted(() => {
  loadImgURL(
    props.client,
    props.item.cid,
    "image/" + props.item.ext,
    props.item.filename
  ).then((url) => {
    src.value = url;
    is_loading.value = false;
  });
});
</script>
