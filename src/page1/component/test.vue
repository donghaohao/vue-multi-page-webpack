<script>
  export default {
    props: {
      myName: {
        type: String,
        default: 'Hello',
      },
      myAge: {
        type: Number,
        default: 20,
      },
    },
  }
</script>
<template>
  <div>
    <h1>Hello,{{myName}}</h1>
    <p>your age is {{myAge}}</p>
    <img src="../images/1.jpg">
    <div class="pic"></div>
  </div>
</template>
<style scoped>
  h1 {
    color: red;
  }
  p {
    color: purple;
  }
  img {
    width: 200px;
    height: 200px;
  }
  .pic {
    width: 100px;
    height: 60px;
    background: url(../images/2.jpg);
    background-size: cover;
  }
</style>
