<template>
  <div class="todoTop">
    <div class="todoTle">
      <p>禾耳代办</p>
    </div>
    <div class="todoInput">
      <input
        type="text"
        v-model.trim="keyWord"
        placeholder="请输入代办事项"
        @keydown.enter="sendKeyWord()"
      />
      <button @click="sendKeyWord">
        <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
      </button>
    </div>
    <div class="todoPic">
      <!-- <button>搜索</button> -->
      <img src="../assets/images/20171004182722_NhaWs.jpeg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    sendKeyWord() {
      // console.log(this.keyWord);
      // 发送keyWord
      if (this.keyWord.length > 0) {
        this.$bus.$emit("getKeyWord", this.keyWord);
      }
      this.keyWord = "";
    },
  },
};
</script>

<style scoped lang="less">
.todoTop {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: rgba(135, 207, 235, 0.178);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .todoTle {
    text-align: center;
    width: 23%;
    p {
      font-family: cursive;
      font-size: 12px;
    }
  }
  .todoPic {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .todoInput {
    width: 60%;
    display: flex;
    align-items: center;
    input {
      width: 78%;
      height: 30px;
      padding-left: 10px;
    }
    button {
      height: 30px;
      i {
        color: rgb(175, 175, 175);
        line-height: 20px;
        margin-right: 7px;
        font-size: 14px;
        &:hover {
          color: #a25959;
        }
      }
    }
  }
}
</style>