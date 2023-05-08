<template>
  <v-card class="ma-2">
    <v-card-text>
      <v-img
        :src="src"
        aspect-ratio="1"
        transition="scale-transition"
        cover
        @click="dialog = true"
        @error="src = bkup_src"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="primary"
              style="width: 100%"
              size="64"
              mx-auto
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card-text>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          <img
            :src="src"
            style="max-width: 90vw; max-height: 90vh"
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
const bkup_src = ref("");
const dialog = ref(false);

function openInTab() {
  window.open(src.value, "_blank");
}

onMounted(() => {
  loadImgURL(props.item.cid, props.item.filename).then((url) => {
    console.log(props.client);
    if (props.client === "local") {
      src.value = url.local;
      bkup_src.value = url.w3;
    } else {
      src.value = url.w3;
      bkup_src.value = url.cf;
    }
  });
});
</script>
