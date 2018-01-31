<script>
  import Test from './component/test.vue'
  export default {
    data() {
      return {
        msg: 'hello world!!',
        name: 'xixi',
        age: 24,
      };
    },
    components: {
      Test,
    },
    created() {
      ['4', '5', '6'].forEach(value => {
        console.log(value)
      })
    },
  }
</script>
<template>
  <div>
    <h1>webpack2222222222</h1>
    <Test :my-name="name" :my-age="age"></Test>
    <div>
      <h1>个人信息page2</h1>
      <p>我的个人信息啊啊啊啊啊！</p>
      <p class="app"></p>
    </div>
  </div>
</template>
<style scoped>
  h1 {
    color: purple;
  }
</style>
