<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <span v-if="!curBook.id" class="notebook-title">无笔记本</span>
    <el-dropdown v-if="curBook.id" class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title.length > 4? curBook.title.substring(0,4) +"..." : curBook.title}} <i
        class="iconfont icon-down"></i>
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
          <span class="title">{{note.title.length > 7? note.title.substring(0,7) +"...": note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import notebooks from "@/api/notebooks";
  import {mapState, mapGetters, mapActions} from "vuex";

  export default {
    created() {
      this.getNotebooks()
        .then(() => {
          this.$store.commit("setCurBook", {curBookId: this.$route.query.notebookId});
          if (this.curBook.id) return this.getNotes({notebookId: this.curBook.id});
        }).then(() => {
        this.$store.commit("setCurNote", {curNoteId: this.$route.query.noteId});
        this.$router.replace({
          path: "/notebook",
          query: {
            noteId: this.curNote.id,
            notebookId: this.curBook.id
          }
        });
      });
      // notebooks.getAll().then(
      //   res => {
      //     this.notebooks = res.data;
      //     this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) //通过点击笔记本进来的
      //       || this.notebooks[0] || {}; //如果直接点进来的
      //     return note.getAll({notebookId: this.curBook.id});
      //   }).then(res => {
      //   this.notes = res.data;
      //   this.$emit("update:notes", this.notes);
      //   Bus.$emit("update:notes", this.notes);
      // });
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(["notes", "notebooks", "curBook", "curNote"])
    },
    methods: {
      ...mapActions(["getNotebooks", "getNotes", "addNote"]),
      handleCommand(notebookId) {
        if (notebookId === "trash") {
          return this.$router.push({path: "/trash"});
        }
        this.$store.commit("setCurBook", {curBookId: notebookId});
        this.getNotes({notebookId})
          .then(() => {
            this.$store.commit("setCurNote", {});
            this.$router.replace({
              path: "/notebook",
              query: {
                noteId: this.curNote.id,
                notebookId: this.curBook.id
              }
            });
          });

        // this.curBook = this.notebooks.find(notebook => notebook.id == notebookId);
        // note.getAll({notebookId}).then(
        //   res => {
        //     this.notes = res.data;
        //   }
        // );
      },
      onAddNote() {
        this.addNote({notebookId: this.curBook.id});

      }
    },


  };

</script>


<style lang="less">
  @import url(../assets/css/note-sidebar.less);

</style>


