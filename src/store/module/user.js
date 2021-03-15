import auth from "../../api/auth";
import router from "@/router";
import {Message} from "element-ui";

const state = {
  user: null,
};
const getters = {
    username: state => state.user === null ? "未登录" : state.user.username,
    slug: state => state.user === null ? "未" : state.user.username.charAt(0),
  }
;
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};
const actions = {
  login({commit}, {username, password}) {
    return auth.login({username, password})
      .then(res => {
        commit("setUser", {user: res.data});
      });
  },
  register({commit}, {username, password}) {
    return auth.register({username, password})
      .then(res => {
        commit("setUser", {user: res.data});
      });
  },
  checkLogin({commit}, payload) {
    return auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          Message.info("请先登录");
          router.push(payload);
        } else {
          commit("setUser", {user: res.data});
        }
      });
  }

};
export default {
  state,
  actions,
  getters,
  mutations
};
