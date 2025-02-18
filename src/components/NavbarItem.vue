<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/reservation"
        >會議室預約</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/reservation"
              >會議室預約</router-link
            >
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/room-management"
              >會議室管理</router-link
            >
          </li>
          <li class="nav-item">
            <button
              class="btn btn-outline-light ms-3"
              v-if="isAuthenticated"
              @click="logout"
            >
              登出
            </button>
            <router-link v-else class="btn btn-outline-light ms-3" to="/login"
              >登入</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.router.push("/login");
    },
  },
};
</script>
