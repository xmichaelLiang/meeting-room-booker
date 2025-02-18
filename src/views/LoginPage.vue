<template>
  <div class="container">
    <h2 class="my-4">請登入</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">帳號</label>
        <input v-model="username" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">登入</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.router.push("/reservation");
      } catch (error) {
        alert("登入失敗");
      }
    },
  },
};
</script>
