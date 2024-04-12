// src/store/index.js
import { createStore } from 'vuex';
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    fetchUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('setUser', null);
        }
      });
    },
  },
  getters: {
    user: (state) => state.user,
  }
});