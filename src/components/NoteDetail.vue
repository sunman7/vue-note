<template>
    <div></div>
</template>

<script type="text/ecmascript-6">
    export default {
      created(){
        auth.getInfo().then(
          res =>{
            if(!res.isLogin){
              this.$router.push({path:"/login"})
            }
          }
        )
      }
    };
</script>

<style scoped>

</style>
