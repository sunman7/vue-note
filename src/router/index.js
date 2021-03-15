import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      alias: "/notebooks",
      component: () => import("@/components/NotebookList.vue")
    },
    {
      path: "/login",
      component: () => import("@/components/Login.vue")
    },
    {
      path: "/notebook",
      component: () => import("@/components/NoteDetail.vue")
    },
    {
      path: "/trash",
      component: () => import("@/components/TrashDetail.vue")
    }
  ]

});
