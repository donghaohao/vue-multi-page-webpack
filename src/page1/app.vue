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
      });
    },
  }
</script>
<template>
  <div>
    <h1>webpack1111111111</h1>
    <Test :my-name="name" :my-age="age"></Test>
    <div>
      <img src="./images/1.jpg"></img>
      <img src="./images/bin.svg"></img>
      <div>
        <h1>个人信息page1</h1>
        <p>我的个人信息啊啊啊啊啊！</p>
        <p class="app"></p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import "./css/app.css";
  h1 {
    color: yellow;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>
