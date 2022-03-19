<template>
  <div class="todoFoot">
    <div>
      <div>
        <input type="checkbox" v-model="check" @change="checkAll" name="" id="" />
        <span> 全选 </span>
      </div>
      <div>
        <input
          type="checkbox"
          v-model="oppoCheck"
          @click="oppoCheckAll"
          name=""
          id=""
        />
        <span> 反选 </span>
      </div>
    </div>
    <div>
      <p>
        共计：<span>{{ count }}</span>
      </p>
    </div>
    <div>
      <button @click="deleteChoseAll()">删除选中</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot",
  data() {
    return {
      count: "",
      check: false, //全选勾选状态
      oppoCheck: false,
    };
  },
  created() {
    this.$bus.$on("getCount", (res) => {
      this.count = res;
    });
// 接收全选
    this.$bus.$on("sendAllCheck", (res) => {
      //接收全选
      this.check = res;
    });
  },
  methods: {
    deleteChoseAll() {
      this.$bus.$emit("sendEvt", true);
      this.check = false;
      this.oppoCheck = false;
    },  
    checkAll(){     //全选
      this.$bus.$emit("sendAllChose", this.check);
    },              
    oppoCheckAll() {//反选
      this.$bus.$emit("sendOppoChose", !this.oppoCheck);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
.todoFoot {
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 50px;
  background: rgba(135, 207, 235, 0.178);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  > div {
    &:nth-child(1) {
      display: flex;
      align-items: center;
      width: 38%;
      div {
        span {
          margin-right: 5px;
        }
      }
    }
    &:nth-child(2) {
      flex: 1;
    }
    &:nth-child(3) {
      width: 25%;
      button {
        width: 70%;
        height: 29px;
        background: #ff0000;
        color: #fff;
        border-radius: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>