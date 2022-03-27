<template>
  <div class="todoCtn" :class="isdfCenter">
    <div v-if="!isCtn" @click="openBox" class="nullCtn">
      <p>
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
        添加任务
      </p>
    </div>
    <div v-if="isCtn">
      <div class="ctn" v-for="value in todoList" :key="value.id">
        <div>
          <el-checkbox v-model="value.isCheck" @change="toCheck"></el-checkbox>
        </div>
        <div @click="updataItem(value.id)">
          <p v-if="value.isEditShow" :class="value.isCheck==true?del:''">{{ value.content }}</p>
          <input
            type="text"
            :ref="value.id"
            @blur="editBlur"
            v-model="value.content"
            v-if="!value.isEditShow"
          />
        </div>
        <div>
          <button @click="deleteItem(value.id)">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </button>
          <button @click="updataItem(value.id)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "Content",
  computed: {
    isdfCenter() {
      return this.isCtn == true ? "" : "dfCenter";
    },
    todoCount() {
      return this.todoList.length;
    },
    isCtn() {
      return this.todoCount !== 0 ? true : false;
    },
    allCheck: {
      get() {
        //全部选中则全选为true
        let isCheckall = this.todoList.every((v) => {
          return v.isCheck == true;
        });
        if (isCheckall == true && this.todoCount > 0) {
          return true;
        } else {
          return false;
        }
      },
    },
  },
  data() {
    return {
      dfCenter: "dfCenter",
      todoList: JSON.parse(localStorage.getItem("todoList")) || [], //初始化数据
      myCotent: "",
      del:"del"
    };
  },
  methods: {
    // 添加
    addItem() {
      this.$bus.$on("getKeyWord", (res) => {
        this.myCotent = res; //赋值
        let todoItem = {
          id: nanoid(),
          isCheck: false,
          isEditShow: true, //控制编辑框
        };
        todoItem["content"] = this.myCotent; //创建内容
        this.todoList.push(todoItem); //添加数据
        this.sendCount();
      });
    },
    openBox() {
      console.log(this);
    },
    //删除
    deleteItem(val) {
      // console.log(val);
      this.$confirm("此操作将永久删除该事项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setTimeout(() => {
            this.todoList = this.todoList.filter((v) => {
              return v.id !== val;
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$bus.$emit("sendCheckFalse", false); //将全选状态赋值为false
          }, 300);
          this.sendCount();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除选中
    deleteChose() {
      let orCheck = this.todoList.every((v) => {
        return v.isCheck == false;
      });
      if (orCheck === false) {
        this.$confirm("此操作将永久删除该事项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            setTimeout(() => {
              this.todoList = this.todoList.filter((v) => {
                return v.isCheck !== true;
              });
              this.sendCount();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }, 100);
            this.$bus.$emit("sendCheckFalse", false); //将全选状态赋值为false
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          type: "error",
          message: "请您选择想要删除的任务项！",
        });
      }
    },
    //总数
    sendCount() {
      //发送count
      this.$bus.$emit("getCount", this.todoCount);
      // console.log(this.todoCount);
    },
    //全选
    toAllCheck() {
      this.$bus.$on("sendAllChose", (res) => {
        //接收全选选中状态
        // console.log(res);
        if (res) {
          this.todoList.forEach((v) => {
            v.isCheck = true;
          });
        } else {
          this.todoList.forEach((v) => {
            v.isCheck = false;
          });
        }
      });
    },
    toCheck() {
      //当点击勾选发送全选
      this.$bus.$emit("sendAllCheck", this.allCheck);
    },
    //反选
    oppoChose() {
      this.$bus.$on("sendOppoChose", (res) => {
        if (res == true) {
          this.todoList.forEach((v) => {
            v.isCheck = !v.isCheck;
          });
        } else {
          this.todoList.forEach((v) => {
            v.isCheck = false;
          });
        }
      });
    },
    // 编辑
    updataItem(val) {
      /*
        0.点击编辑显示输入框
        1.通过id遍历数组找到相应数据进行更新
      */
      this.todoList.forEach((v) => {
        if (val == v.id) {
          v.isEditShow = false;
        } else {
          v.isEditShow = true;
        }
      });
      this.$nextTick(() => {
        //注意[0]
        this.$refs[val][0].focus();
      });
    },
    editBlur() {
      this.todoList.forEach((v) => {
        v.isEditShow = true;
      });
    },
  },

  mounted() {
    this.$bus.$emit("sendAllCheck", this.allCheck); //发送全选选中状态
    this.addItem();
    this.sendCount();
    // this.deleteChose()
    this.$bus.$on("sendEvt", (res) => {
      if (res === true) {
        this.deleteChose();
        return false;
      }
    });
    this.toAllCheck(); //全选
    this.oppoChose();
  },
  watch: {
    todoList: {
      handler(newV) {
        localStorage.setItem("todoList", JSON.stringify(newV));
      },
    },
    deep: true,
    immediate: true,
  },
};
</script>

<style scoped lang="less">
.todoCtn {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
  overflow: scroll;
  .nullCtn {
    p {
      color: #a0c8e8;
      i {
        font-size: 30px;
        margin-right: 5px;
      }
    }
  }

  .ctn {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
    div {
      &:nth-child(1) {
        width: 10%;
        text-align: center;
      }
      &:nth-child(2) {
        flex: 1;
        overflow: hidden;
        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        input {
          border: 1px solid transparent;
          border-bottom-color: rgb(56, 56, 56);
          border-radius: 5px;
          width: 97%;
          // display: none;
          font-size: 19px;
          padding-left: 5px;
        }
      }
      &:nth-child(3) {
        width: 30%;
        text-align: center;
        height: 29px;
        display: flex;
        justify-content: space-around;
        button {
          width: 40%;
          height: 29px;
          color: #fff;
          border-radius: 70px;
          font-size: 17px;
          display: block;
        }
        button:nth-child(1) {
          background: red;
        }
        button:nth-child(2) {
          background: rgb(15, 117, 235);
        }
      }
    }
  }
}
.dfCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.del{
  text-decoration: line-through;
}
</style>
