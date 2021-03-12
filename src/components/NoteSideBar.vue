<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title}} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{notebook.title}}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/notebook?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import notebooks from "@/api/notebooks";
  import Bus from "@/helpers/bus";
  import note from "@/api/note";

  window.Note = note;
  export default {
    created() {
      notebooks.getAll().then(
        res => {
          this.notebooks = res.data;
          this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) //通过点击笔记本进来的
            || this.notebooks[0] || {}; //如果直接点进来的
          return note.getAll({notebookId: this.curBook.id});
        }).then(res => {
        this.notes = res.data;
        this.$emit("update:notes", this.notes);
        Bus.$emit("update:notes", this.notes);
      });
    },
    data() {
      return {
        notebooks: [],
        notes: [],
        curBook: {}
      };
    },

    methods: {
      handleCommand(notebookId) {
        if (notebookId === "trash") {
          return this.$router.push({path: "/trash"});
        }
        this.curBook = this.notebooks.find(notebook => notebook.id == notebookId);
        note.getAll({notebookId}).then(
          res => {
            this.notes = res.data;
          }
        );
      },
      addNote() {
        note.addNote({notebookId: this.curBook.id}).then(
          res => {
            console.log(res);
            this.notes.unshift(res.data);
          }
        );
      }
    },


  };

</script>


<style lang="less">
  @import url(../assets/css/note-sidebar.less);

</style>


