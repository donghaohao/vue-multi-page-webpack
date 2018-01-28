<script>
  import Test from './component/test.vue'
  import One from './images/1.jpg'
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
  <Test :my-name="name" :my-age="age"></Test>
  <img :src="One"></img>
  <div>
    <h1>个人信息page1</h1>
    <p>我的个人信息啊啊啊啊啊！</p>
    <p class="app"></p>
  </div>
</template>
<style src="./css/app.css"></style>
