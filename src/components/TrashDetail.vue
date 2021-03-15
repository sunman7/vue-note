<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title" placement="bottom">
        回收站
      </h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title.length > 7? note.title.substring(0,7) +"...": note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-empty" v-if="!curTrashNote.id">回收站为空</div>
      <div class="note-bar" v-if="curTrashNote.id">
        <div>
          <span>创建日期:{{curTrashNote.createdAtFriendly}}</span>
          <span>|</span>
          <span>更新日期:{{curTrashNote.updatedAtFriendly}}</span>
          <span>|</span>
          <span>所属笔记本:{{belongTo}}</span>
        </div>
        <div>
          <a @click="onRevert" class="btn action">恢复</a>
          <a @click="onDelete" class="btn action">彻底删除</a>
        </div>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>

</template>
<script>
  import {mapGetters, mapActions} from "vuex";
  import MarkdownIt from "markdown-it";

  const md = new MarkdownIt();
  export default {
    data() {
      return {};
    },
    created() {
      this.checkLogin({path: "/login"});
      this.getNotebooks();
      this.getTrashNotes()
        .then(() => {
          this.$store.commit("setCurTrashNote", {curTrashNoteId: this.$route.query.noteId});
          console.log(this.curTrashNote);
        });
    },
    computed: {
      ...mapGetters(["trashNotes", "curTrashNote", "belongTo"]),
      compiledMarkdown() {
        return md.render(this.curTrashNote.content || "");
      }
    },
    methods: {

      ...mapActions(["checkLogin", "deleteTrashNote", "revertTrashNote", "getTrashNotes", "getNotebooks"]),
      onDelete() {
        this.deleteTrashNote({noteId: this.curTrashNote.id});
      },
      onRevert() {
        this.revertTrashNote({noteId: this.curTrashNote.id});
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit("setCurTrashNote", {curTrashNoteId: to.query.noteId});
      // this.curNote = this.notes.find(note => note.id == to.query.noteId) || {};
      next();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../assets/css/note-detail.less);
  @import url(../assets/css/note-sidebar.less);

  #trash {
    display: flex;
    align-items: stretch;
    background: #fff;
    flex: 1;

    .note-bar {
      .action {
        float: right;
        margin-left: 10px;
        padding: 10px;
        font-size: 20px;
      }
    }
  }
</style>
