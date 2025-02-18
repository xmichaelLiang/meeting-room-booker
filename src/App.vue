<template>
  <div id="app">
    <!-- 如果已登入，才顯示 Navbar -->
    <Navbar v-if="isAuthenticated" />

    <!-- 主要內容區域 -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/NavbarItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]), // 檢查是否已登入
  },
};
</script>

<style>
/* 可加入全域樣式 */
</style>
