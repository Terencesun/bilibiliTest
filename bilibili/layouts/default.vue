<template>
  <div class="bilibili-container">
    <div class="bgimage"></div>
    <div class="logo"></div>
    <nuxt/>
  </div>
</template>

<style lang="less">
  html {
    font-family: 'Segoe UI';
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .bilibili-container {
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1;
    }

    &:after {
      content: '';
      display: flex;
      position: absolute;
      top: 5vh;
      left: 5vh;
      width: 200px;
      height: 90px;
      background-image: url('../assets/bilibili.png');
      background-size: 200px 90px;
      z-index: 2;
    }

    .bgimage {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('../assets/background.png');
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(1px);
      z-index: 0;
    }
  }

</style>
