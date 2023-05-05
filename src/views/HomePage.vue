<template>
  <img alt="Vue logo" :src="src" height="400" />
</template>

<script setup>
import { ref, onMounted } from "vue";

const src = ref("");

onMounted(() => {
  src.value =
    "ipfs://bafybeiapythqlxnbmhmdrbyakb5fs6gt3pkgvwwgh37thmomhwm7xhxvk4/Screenshot_20210213-023316.png";
});
</script>
