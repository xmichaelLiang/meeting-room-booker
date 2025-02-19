import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      token: localStorage.getItem("token") || null,
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
    },
  },
  mutations: {
    setUser(state, userData) {
      state.user.token = userData.token;
      state.user.isAdmin = userData.isAdmin;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("isAdmin", JSON.stringify(userData.isAdmin));
    },
    logout(state) {
      state.user.token = null;
      state.user.isAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      // TODO: 模擬測試資料
      const testAccounts = [
        { username: "admin", password: "123456", isAdmin: true },
        { username: "user", password: "123456", isAdmin: false },
      ];

      const matchedUser = testAccounts.find(
        (user) =>
          user.username === credentials.username &&
          user.password === credentials.password
      );

      if (matchedUser) {
        // 假設登入成功，生成一個隨機的 "token"
        const fakeToken =
          "fake-jwt-token-" + Math.random().toString(36).substring(2);

        commit("setUser", { token: fakeToken, isAdmin: matchedUser.isAdmin });
        return true; // 登入成功
      } else {
        console.error("登入失敗: 帳號或密碼錯誤");
        return false; // 登入失敗
      }
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user.token,
    isAdmin: (state) => state.user.isAdmin,
  },
});
