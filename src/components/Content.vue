<template>
  <div class="todoCtn" :class="isdfCenter">
    <div v-if="!isCtn" class="nullCtn">
      <p>
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
        添加任务
      </p>
    </div>
    <div v-if="isCtn">
      <div class="ctn" v-for="value in todoList" :key="value.id">
        <div>
          <label for="check"></label>
          <input type="checkbox" name="" v-model="value.isCheck" id="check" />
        </div>
        <div>
          <p>{{ value.content }}</p>
        </div>
        <div>
          <button @click="deleteItem(value.id)">删除</button>
        </div>
      </div>
    </div>
    <!-- <button @click="deleteChose">shanc</button> -->
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
  },
  data() {
    return {
      dfCenter: "dfCenter",
      todoList: JSON.parse(localStorage.getItem("todoList")) || [], //初始化数据
      myCotent: "",
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
        };
        todoItem["content"] = this.myCotent; //创建内容
        this.todoList.push(todoItem); //添加数据
        this.sendCount();
      });
    },
    //删除
    deleteItem(val) {
      if (confirm("您确定要删除吗？？") == true) {
        setTimeout(() => {
          this.todoList = this.todoList.filter((v) => {
            return v.id !== val;
          });
        }, 300);

        this.sendCount();
      }
    },
    //删除选中
    deleteChose() {
      setTimeout(() => {
        this.todoList = this.todoList.filter((v) => {
          return v.isCheck !== true;
        });
      }, 500);
    },
    sendCount() {
      //发送count
      this.$bus.$emit("getCount", this.todoCount);
      // console.log(this.todoCount);
    },
  },

  // this.$bus.$emit("sendEvn",this.deleteChose())  ,
  mounted() {
    this.addItem();
    this.sendCount();
    // this.deleteChose()
    this.$bus.$on("sendEvt", (res) => {
      if (res === true) {
        this.deleteChose();
        return false;
      }
    });
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
      }
      &:nth-child(3) {
        width: 20%;
        text-align: center;
        height: 29px;

        button {
          width: 70%;
          height: 29px;
          background: red;
          color: #fff;
          border-radius: 5px;
          font-size: 12px;
          display: block;
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
</style>
