import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";
import Test from "../components/Test";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Test
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/notebooks",
      component: NotebookList
    },
    {
      path: "/notebook",
      component: NoteDetail
    },
    {
      path: "/trash",
      component: TrashDetail
    }
  ]

});
