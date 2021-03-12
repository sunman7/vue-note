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
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="updateNote" @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-model:value="curNote.content" v-show="!isShowPreview"
                    @keydown="statusText='正在输入...'" @input="updateNote" placeholder="输入内容, 支持 markdown 语法">

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
  import note from "@/api/note";
  import NoteSideBar from "./NoteSideBar";
  import auth from "@/api/auth";
  import Bus from "@/helpers/bus";
  import _ from "lodash";
  import MarkdownIt from "markdown-it";
  const md = new MarkdownIt();

  export default {

    components: {
      NoteSideBar
    },
    data() {
      return {
        curNote: {},
        statusText: "未更新",
        notes: [],
        isShowPreview: false,
      };
    },
    methods: {
      updateNote: _.debounce(function () {
        note.updateNote({noteId: this.curNote.id}, {
          title: this.curNote.title,
          content: this.curNote.content
        }).then(data => {
          this.statusText = "已保存";
        }).catch(err => {
          this.statusText = "保存出错";
        });
      }, 300),
      deleteNote() {
        note.deleteNote({noteId: this.curNote.id}).then(res => {
          this.$message.success(res.msg);
          this.notes.splice(this.notes.indexOf(this.curNote), 1);
          this.$router.replace({path: "/notebook"});
        });
      }
    },
    computed: {
      previewContent() {
        return md.render(this.curNote.content || "");
      }
    },
    created() {
      auth.getInfo().then(
        res => {
          if (!res.isLogin) {
            this.$router.push({path: "/login"});
          }
        }
      );
      Bus.$once("update:notes", val => {
        this.curNote = val.find(note => note.id == this.$route.query.noteId) || {};
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.curNote = this.notes.find(note => note.id == to.query.noteId) || {};
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
