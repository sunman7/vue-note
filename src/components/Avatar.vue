<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>

  export default {
    data() {
      return {
        user: {
          username: "Hwt"
        },
        slug: "H"
      };
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
