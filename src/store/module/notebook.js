import Notebook from "../../api/notebooks";
import {Message} from "element-ui";

const state = {
  notebooks: null,
  curBookId: null,
};
const getters = {
  notebooks: state => state.notebooks || [],
  curBook: state => {
    if (!Array.isArray(state.notebooks)) return {};
    if (!state.curBookId) return state.notebooks[0] || {};
    return state.notebooks.find(notebook => notebook.id == state.curBookId);
  }
};
const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks;
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook);
  },
  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {};
    notebook.title = payload.title;
  },
  deleteNoteBook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId);
  },
  setCurBook(state, payload) {
    state.curBookId = payload.curBookId;
  }
};
const actions = {
  getNotebooks({commit}) {
    return Notebook.getAll()
      .then(res => {
        commit("setNotebooks", {notebooks: res.data});
      });
  },
  addNotebook({commit}, {title}) {
    return Notebook.addNotebook({title})
      .then(res => {
        commit("addNotebook", {notebook: res.data});
        Message.success(res.msg);
      });
  },
  updateNotebook({commit}, {notebookId, title}) {
    return Notebook.updateNotebook(notebookId, {title})
      .then(res => {
        commit("updateNotebook", {notebookId, title});
        Message.success(res.msg);
      });
  },
  deleteNotebook({commit}, {notebookId}) {
    return Notebook.deleteNotebook(notebookId)
      .then(res => {
        commit("deleteNoteBook", {notebookId});
        Message.success(res.msg);
      });
  },

};
export default {
  state,
  actions,
  getters,
  mutations
};
