<template>
  <div class="todoFoot">
    <div>
      <div>
        <el-checkbox v-model="check" @change="checkAll">全选</el-checkbox>
      </div>
      <div>
        <el-checkbox v-model="oppoCheck" @change="oppoCheckAll"
          >反选</el-checkbox
        >
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
      // key: 0, //标记刷新
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
    //接收删除选中后的全选状态
    this.$bus.$on("sendCheckFalse",res=>{
      this.check=res
    })
  },
  methods: {
    deleteChoseAll() {
      this.$bus.$emit("sendEvt", true);
      this.oppoCheck = false;
      // this.key = new Date();//刷新
    },
    checkAll() {
      //全选
      this.$bus.$emit("sendAllChose", this.check);
    },
    oppoCheckAll() {
      //反选
      this.$bus.$emit("sendOppoChose", !this.oppoCheck);
    },
  },
  mounted() {},
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
        margin-right: 14px;
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