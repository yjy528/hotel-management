<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">

    <el-form-item label="入住日期">
      <el-col :span="6">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.comedate" @change="dateChangebirthday0" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" class="ff"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="离店日期">
      <el-col :span="6">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.godate" @change="dateChangebirthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="房间类型" >
      <el-select placeholder="请选择类型" v-model="form.category" >
        <el-option  v-for="item in categoryArr" :key="item" :value="item" >{{item}}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预定数量">
      <!--<el-input type="number" v-model="form.n"></el-input>-->
      <el-input-number v-model="form.n" :min="1" :max="10" label="预定数量"></el-input-number>
    </el-form-item>
    <el-form-item label="入住人姓名">
      <el-input type="text" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="联系人">
      <el-input type="text" v-model="form.contname"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input type="text" v-model="form.tel"></el-input>
    </el-form-item>
    <el-form-item label="留言">
      <el-input type="textarea" v-model="form.words"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button  @click="dialogVisible = false" type="reset">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    export default {
      data() {
        return {
          form:{
            comedate: '',
            godate: '',
            // cometime: '',
            // gotime: '',
            category: '',
            n: '',
            name: '',
            contname: '',
            tel: '',
            words: ''
          },
          categoryArr:[],
          dialogVisible: false,
        };
      },
      methods:{
        dateChangebirthday(val) {
          this.form.godate = val;
        },
        dateChangebirthday0(val) {
          this.form.comedate = val;
        },
        onSubmit() {
            var url="/api/addOrder";
            this.$http.post(url,this.form,{emulateJSON:true}).then(function(res){
              alert("成功预定");
              this.form={};
              // this.$router.replace('/');
            },function(res){
              console.log(res.status);
            });
        },
      },
      mounted: function () {
        // var url='/api/getdata0';
        this.$http.jsonp('http://172.16.49.72:3333/getdata0').then(response => {
          this.categoryArr = response.data;
        }, response => {
          console.log("error");
        });
      }
    }
</script>

<style scoped>
  .el-dialog{
    width:50% !important;
  }
  .el-container{
    text-align: left !important;
  }
</style>
