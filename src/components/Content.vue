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
          <button>删除</button>
        </div>
      </div>
    </div>
    <prop-ups/>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import PropUps from "../components/PropUps.vue"
export default {
  name: "Content",
  computed: {
    isdfCenter() {
      return this.isCtn == true ? "" : "dfCenter";
    },
  },
  data() {
    return {
      dfCenter: "dfCenter",
      isCtn: true,
      todoList: JSON.parse(localStorage.getItem("todoList"))||[],//初始化数据
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
      });
    },
  },
  mounted() {
    this.addItem();
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
  components:{
      PropUps
  }
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
        button {
          width: 70%;
          height: 29px;
          background: red;
          color: #fff;
          border-radius: 5px;
          font-size: 12px;
          opacity: 0;
          &:hover {
            opacity: 1;
          }
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
