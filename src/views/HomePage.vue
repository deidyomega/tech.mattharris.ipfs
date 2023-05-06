<template>
  <v-container>
    <v-row v-if="ready">
      <v-col v-for="item in assets" :key="item.cid" cols="12" sm="4">
        <v-lazy
          :min-height="200"
          :options="{ threshold: 0.5 }"
          transition="fade-transition"
        >
          <TesterSystem :client="client" :item="item"></TesterSystem>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
img {
  width: 500px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { create } from "ipfs-http-client";
import { db } from "../plugins/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import TesterSystem from "@/components/TesterSystem.vue";

const client = ref(create({ url: "http://127.0.0.1:5001/api/v0" }));
const assets = ref([]);
const ready = ref(false);

onMounted(() => {
  getDataFromFB().then(() => {
    try {
      client.value
        .isOnline()
        .then(() => {
          console.log("online");
          ready.value = true;
        })
        .catch(() => {
          console.log("offline (catch))");
          client.value = false;
          ready.value = true;
        });
    } catch (error) {
      console.log("offline (try/catch)");
      client.value = false;
      ready.value = true;
    }
  });
});

async function getDataFromFB() {
  if (localStorage.getItem("assets")) {
    assets.value = JSON.parse(localStorage.getItem("assets"));
    console.log("using cached data");
    return;
  }
  const q = query(collection(db, "media"));

  const querySnapshot = await getDocs(q);

  const array = querySnapshot.docs.map((doc) => doc.data());
  assets.value = array;

  // save the values to local storage
  localStorage.setItem("assets", JSON.stringify(array));
}
</script>
