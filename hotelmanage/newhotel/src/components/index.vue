<template>
<div class="body">
  <el-container>
    <el-header style="height: 100px;">小橘子酒店</el-header>
    <el-tabs :tab-position="tabPosition" style="height: 100px; ">
      <el-tab-pane label="首页" style="color:white;">
        <el-container>
          <el-aside id="left"><img src="/static/img/qiantai_02.png" alt=""></el-aside>
          <el-container>
            <el-main>
              <el-table
                :data="tableData3"
                height="500"
                border
                style="width: 100%;">
                <el-table-column
                  prop="category"
                  label="房间类型">
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="面积">
                </el-table-column>
                <el-table-column
                  prop="bedcount"
                  label="床位数">
                </el-table-column>
                <el-table-column
                  prop="breakfast"
                  label="早餐">
                </el-table-column>
                <el-table-column
                  prop="network"
                  label="网络">
                </el-table-column>
                <el-table-column
                  prop="television"
                  label="电视">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格（元/每天）">
                </el-table-column>
                <el-table-column
                  prop="_id"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="dialogVisible = true" type="text" size="small">免费预订</el-button>
                    <el-dialog
                      title="提示"
                      :visible.sync="dialogVisible"
                      width="30%"
                      :before-close="handleClose">
                      <Formone></Formone>
                    </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer style="height: 100px;">Footer</el-footer>
          </el-container>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="在线预定">
        <el-container>
          <el-main >
            <Formone></Formone>
          </el-main>
          <el-aside width="50%">
            <img src="/static/img/timg.jpg" alt="" style="width: 90%;">
          </el-aside>
        </el-container>

      </el-tab-pane>
      <el-tab-pane label="订单查询">
        <!--<el-container>-->

          <Search></Search>
          <!--<img src="/static/img/room.jpg" alt="" style="width: 80%" height="500px">-->

        <!--</el-container>-->
      </el-tab-pane>
      <el-tab-pane label="关于我们">
        <el-main>
          <img src="/static/img/hotel.jpg" alt="" style="width: 80%" height="500px">
        </el-main>
      </el-tab-pane>
    </el-tabs>

  </el-container>

</div>
</template>

<script>
  import Formone from "./order";
  import Search from "./search";
  export default {
    components:{
      Formone,
      Search
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData3:[],
        tabPosition:"center",
        dialogVisible: false,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

    },
    mounted: function () {
      // GET /someUrl
      this.$http.jsonp('http://172.16.49.72:3333/getdata').then(response => {
        // console.log(response.data);
        // get body data
        this.tableData3 = response.data;
      }, response => {
        console.log("error");
      });
    },

  }
</script>

<style scoped>
  .el-table{
    height:50px;
    line-height: 50px;

  }
  .el-table__body{
    background-color: rgba(0,0,0,0.3);
  }
  .el-tabs__nav{
    width:100%;
    clear:both !important;
  }
  .el-header, .el-footer {
    background-color: rgba(179,192,290,0.1);
    color: #ffff00;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
  }

  .el-container {
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  #left{
    width:20%;
    /*margin-top:5%;*/
    /*margin-left:5%;*/
  }
  #left img{
    width:100%;
    /*height:90%;*/
  }
  .el-table th, .el-table tr{
    background: rgba(0,0,0,0.3);
  }
</style>
