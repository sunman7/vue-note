import auth from "../../api/auth";

const state = {
  user: null,
};
const getters = {
    username: state => state.user === null ? "未登录" : state.user.username,
    slug: state => state.user === null ? "未" : state.username.charAt[0],
  }
;
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};
const actions = {
  login({commit}, {username, password}) {
    return auth.login({usernmae, password})
      .then(res => {
        console.log(res);
        commit("setUser", {user: res.data});
      });
  },
  register({commit}, {username, password}) {
    return auth.register({usernmae, password})
      .then(res => {
        console.log(res);
        commit("setUser", {user: res.data});
      });
  }

};
export default {
  state,
  actions,
  getters,
  mutations
};
