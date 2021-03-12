<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
  import auth from "@/api/auth";
  import bus from "@/helpers/bus";

  export default {
    data() {
      return {
        username: "未登录"
      };
    },
    created() {
      bus.$on("userInfo", data => this.username = data.username);
      auth.getInfo().then(res => {
        if (res.isLogin) {
          this.username = res.data.username;
        }
      });
    },
    computed: {
      slug() {
        return this.username.charAt(0);
      }
    }
  };
</script>

<style scoped>

  span {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
    background: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 24px;
    margin-top: 15px;
  }
</style>
