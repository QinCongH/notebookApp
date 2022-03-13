<template>
  <div id="app">
    <Top />
    <Content />
    <Foot />
  </div>
</template>
<script>
import Content from "./components/Content.vue";
import Foot from "./components/Foot.vue";
import Top from "./components/Top.vue";
export default {
  components: {
    Content,
    Foot,
    Top,
  },
  name: "App",
  mounted() {
  },
};
</script>

<style scoped lang="less">
#app {
  width: 100%;
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
}
</style>
