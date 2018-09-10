<template>
<div>
  <div style="margin-top: 15px; padding:0 25%; height: 100px;">
    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" id="searchmain">
      <el-select v-model="select" slot="prepend" placeholder="请选择" >
        <el-option label="联系人" value="1"></el-option>
        <el-option label="联系电话" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="checkmethod"></el-button>
    </el-input>
  </div>
  <div>
    <el-card class="box-card" v-show="danArr">
      <table align="center" border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse" width="100%" height="400px">
         <tr>
          <td>订单号</td>
          <td>入住日期</td>
          <td>离店日期</td>
          <td>房间类型</td>
          <td>预定数量</td>
          <td>入住人</td>
          <td>联系人</td>
          <td>联系电话</td>
          <td>留言</td>
        </tr>
        <tr>
          <td>{{danArr._id}}</td>
          <td>{{danArr.comedate}}</td>
          <td>{{danArr.godate}}</td>
          <td>{{danArr.category}}</td>
          <td>{{danArr.n}}</td>
          <td>{{danArr.name}}</td>
          <td>{{danArr.contname}}</td>
          <td>{{danArr.tel}}</td>
          <td>{{danArr.words}}</td>
        </tr>
      </table>
    </el-card>

    <!--<el-table-->
      <!--:data="danArr"-->
      <!--height="500"-->
      <!--border-->
      <!--style="width: 100%;">-->
      <!--<el-table-column-->
        <!--prop="_id"-->
        <!--label="单号">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="comedate"-->
        <!--label="入住日期">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="godate"-->
        <!--label="离店日期">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="category"-->
        <!--label="房间类型">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="n"-->
        <!--label="预定数量">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="入住人">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="contname"-->
        <!--label="联系人">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="tel"-->
        <!--label="联系电话">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="words"-->
        <!--label="留言">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          input5: '',
          select: '',
          danArr:{}
        }
      },
      methods:{
        checkmethod(){
          // console.log($("#searchmain").val());
          var s=$("#searchmain").val();
          var url="/api/search";
          this.$http.jsonp("http://172.16.49.72:3333/search/"+s).then(response => {
            console.log(response.data[0]);
            this.danArr = response.data[0];
          },function(res){
            console.log(res.status);
          });
        }
      }
    }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
