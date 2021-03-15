<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/notebook?notebookId=${notebook.id}`"
                       class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="()=> onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="() =>onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyTime}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import auth from "@/api/auth";
  import notebooks from "../api/notebooks";
  import {mapActions, mapGetters, mapState} from "vuex";


  export default {
    data() {
      return {};
    },
    created() {
      // auth.getInfo().then(
      //   res => {
      //     if (!res.isLogin) {
      //       this.$router.push({path: "/login"});
      //     }
      //   }
      // );
      this.checkLogin({path: "/login"}); //未登录就跳转
      this.getNotebooks();
    },
    computed: {
      ...mapGetters(["notebooks"])
    },
    methods: {
      ...mapActions(["getNotebooks", "addNotebook", "updateNotebook", "deleteNotebook", "checkLogin"]),
      onCreate() {
        this.$prompt("请输入新笔记本名字", "创建笔记本", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: "笔记本标题不为空，长度不超过30个字符"
        }).then(({value}) => {
          this.addNotebook({title: value});
        });
      },
      onEdit(notebook) {
        let title = "";
        this.$prompt("请输入新笔记本名字", "修改笔记本", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: notebook.title,
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: "笔记本标题不为空，长度不超过30个字符"
        }).then(({value}) => {
          title = value;
          this.updateNotebook({notebookId: notebook.id, title});
        });
      },
      onDelete(notebook) {
        this.$confirm("你确认要删除笔记本吗?", "删除笔记本", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.deleteNotebook({notebookId: notebook.id});
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../assets/css/notebook-list);
</style>
