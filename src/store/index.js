import note from "./module/note";
import notebook from "./module/notebook";
import trash from "./module/trash";
import user from "./module/user";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    note, notebook, trash, user
  }
});

