<template>
  <div id="note" class="detail">
    <note-side-bar></note-side-bar>
    <div id="note-detail">
      <div class="note-bar">
        <span>创建日期:</span>
        <span>更新日期:</span>
        <span>已保存</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
    </div>
    <div class="note-title">
      <input type="text">
    </div>
    <div class="editor">
      <textare v-show="true"></textare>
      <div class="preview mark-down" v-show="false"></div>
    </div>

  </div>
</template>

<script>
  import NoteSideBar from "./NoteSideBar";
  import auth from "@/api/auth";

  export default {

    components: {
      NoteSideBar
    },
    created() {
      auth.getInfo().then(
        res => {
          if (!res.isLogin) {
            this.$router.push({path: "/login"});
          }
        }
      );
    }
  };
</script>

<style lang="less" scoped>

  #note {
    display: flex;
    align-items: stretch;
    background: #fff;
    flex: 1;
  }
</style>
