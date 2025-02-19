<template>
  <div class="container mt-5">
    <h2>登入系統</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">帳號</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          placeholder="輸入帳號"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="輸入密碼"
        />
      </div>
      <button class="btn btn-primary" type="submit">登入</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      const success = await this.login({
        username: this.username,
        password: this.password,
      });
      if (success) {
        this.router.push("/reservation");
      } else {
        this.errorMessage = "登入失敗，請確認帳號與密碼";
      }
    },
  },
};
</script>
