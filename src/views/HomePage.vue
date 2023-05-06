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
import { db } from "../plugins/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import TesterSystem from "@/components/TesterSystem.vue";

const client = ref("cf");
const assets = ref([]);
const ready = ref(false);

onMounted(() => {
  getDataFromFB().then(() => {
    ipfsLocalOnline().then((id) => {
      if (id) {
        client.value = "local";
      } else {
        client.value = "w3";
      }
    });
    ready.value = true;
  });
});

async function ipfsLocalOnline() {
  try {
    // post to http://localhost:5001/api/v0/id to get status
    const response = await fetch("http://localhost:5001/api/v0/id", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getDataFromFB() {
  if (localStorage.getItem("assets")) {
    let array = JSON.parse(localStorage.getItem("assets"));
    shuffleArray(array);
    assets.value = array;
    console.log("using cached data");
    return;
  }
  const q = query(collection(db, "media"));
  const querySnapshot = await getDocs(q);
  const array = querySnapshot.docs.map((doc) => doc.data());
  assets.value = array;
  localStorage.setItem("assets", JSON.stringify(array));
}
</script>
