import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
      token: localStorage.getItem("token") || null, // 從 localStorage 讀取 token，避免刷新後遺失
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false, // 讀取管理者身份
    },
  },
  mutations: {
    setUser(state, userData) {
      state.user.token = userData.token;
      state.user.isAdmin = userData.isAdmin;
      localStorage.setItem("token", userData.token); // 存入 localStorage
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
      try {
        const response = await axios.post(
          "YOUR_BACKEND_API/auth/login",
          credentials
        );
        const { token, isAdmin } = response.data;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // 設定全域 Axios 頭部

        commit("setUser", { token, isAdmin });
        return true; // 登入成功
      } catch (error) {
        console.error("登入失敗:", error);
        return false; // 登入失敗
      }
    },
    logout({ commit }) {
      axios.defaults.headers.common["Authorization"] = ""; // 清除授權標頭
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user.token,
    isAdmin: (state) => state.user.isAdmin,
  },
});
