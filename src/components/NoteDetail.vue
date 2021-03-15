<template>
  <div id="note" class="detail">
    <note-side-bar @update:notes="val => notes = val"></note-side-bar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{curNote.createdAtFriendly}}</span>
          <span> 更新日期: {{curNote.updatedAtFriendly}}</span>
          <span> {{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-model:value="curNote.content" v-show="!isShowPreview"
                    @keydown="statusText='正在输入...'" @input="onUpdateNote" placeholder="输入内容, 支持 markdown 语法">

          </textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
            <h1>阿斯蒂</h1>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import NoteSideBar from "./NoteSideBar";
  import auth from "@/api/auth";
  import _ from "lodash";
  import MarkdownIt from "markdown-it";
  import {mapState, mapGetters, mapActions} from "vuex";

  const md = new MarkdownIt();

  export default {

    components: {
      NoteSideBar
    },
    data() {
      return {
        statusText: "未更新",
        isShowPreview: false,
      };
    },
    methods: {
      ...mapActions(["updateNote", "deleteNote", "checkLogin"]),
      onUpdateNote: _.debounce(function () {
        this.updateNote({
          noteId: this.curNote.id,
          title: this.curNote.title,
          content: this.curNote.content
        }).then(data => {
          this.statusText = "已保存";
        }).catch(err => {
          this.statusText = "保存出错";
        });
      }, 300),
      onDeleteNote() {
        this.deleteNote({noteId: this.curNote.id}).then(res => {
          this.$router.replace({path: "/notebook"});
        });
      }
    },
    computed: {
      ...mapGetters(["notes", "curNote"]),
      previewContent() {
        return md.render(this.curNote.content || "");
      }
    },
    created() {
      this.checkLogin({path: "/login"});
      // Bus.$once("update:notes", val => {
      //   this.curNote = val.find(note => note.id == this.$route.query.noteId) || {};
      // });
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit("setCurNote", {curNoteId: to.query.noteId});
      // this.curNote = this.notes.find(note => note.id == to.query.noteId) || {};
      next();
    }
  };
</script>

<style lang="less">
  @import url(../assets/css/note-detail.less);

  #note {
    display: flex;
    align-items: stretch;
    background: #fff;
    flex: 1;
  }
</style>
