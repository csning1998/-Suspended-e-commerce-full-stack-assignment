<script setup lang="ts">
import SearchBar from "@/components/common/SearchBar.vue";
import UserProfileView2 from "@/views/UserProfileView2.vue";
</script>

<template>
  <h1>Testing Searchbar</h1>
  <p>
    ------------------------------------------------------------------------------------------------------
  </p>
  <SearchBar />

  <h1>Testing UserProfileView2</h1>
  <p>
    ------------------------------------------------------------------------------------------------------
  </p>
  <UserProfileView2 />
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 30px;
}

p {
  text-align: center;
  margin: 6px;
}
</style>
