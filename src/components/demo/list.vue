<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  <el-breadcrumb-item>列表</el-breadcrumb-item>
			</el-breadcrumb>			
		</div>
		<div class="rtl-custom-box mt15">
			<div class="box-hd">
				<div class="cont" :class="{'condition-box':pageOpt.showCond}">
					<div class="form-horizontal">
						<el-form :inline="true" :model="pageData.tableObj" class="demo-form-inline">
							<el-row>
							  <el-col :span="6">
						  		<el-col :span="8"><label class="control-label">条件1：</label></el-col>
						  		<el-col :span="16">
						  			<el-form-item>
							  			<el-input v-model="pageData.tableObj.query1" placeholder="请输入条件1" clearable />
								    </el-form-item>
						  		</el-col>
							  </el-col>
							  <el-col :span="6">
						  		<el-col :span="8"><label class="control-label">条件2：</label></el-col>
						  		<el-col :span="16">
						  			<el-form-item>
							  			<el-select v-model="pageData.tableObj.query2">
									      <el-option v-for="item in pageData.statusList" :key="item.value" :label="item.name" :value="item.value"></el-option>
									    </el-select>
								    </el-form-item>
						  		</el-col>
							  </el-col>
							  <el-col :span="6">
						  			<el-col :span="8"><label class="control-label">日期选择器：</label></el-col>
						  		<el-col :span="16">
						  			<el-form-item>
							  			<el-date-picker v-model="pageData.tableObj.query3" type="date" placeholder="选择日期"></el-date-picker>
								    </el-form-item>
						  		</el-col>
							  </el-col>
								<el-col :span="6" v-if="!pageOpt.showCond">
						  			<el-col :span="8"><label class="control-label">年：</label></el-col>
						  		<el-col :span="16">
						  			<el-form-item>
							  			<el-date-picker v-model="pageData.tableObj.query4" type="year" placeholder="选择年"></el-date-picker>
								    </el-form-item>
						  		</el-col>
							  </el-col>
								<el-col :span="6" class="text-center" v-if="pageOpt.showCond">
						  		<el-form-item>
								    <el-button type="primary" @click.stop="queryEvt" icon="el-icon-search">查询</el-button>
										<el-button type="primary" @click.stop="toggleCond" icon="el-icon-arrow-up">展开</el-button>
								  </el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
						  			<el-col :span="8"><label class="control-label">月：</label></el-col>
						  		<el-col :span="16">
						  			<el-form-item>
							  			<el-date-picker v-model="pageData.tableObj.query5" type="month" placeholder="选择月"></el-date-picker>
								    </el-form-item>
						  		</el-col>
							  </el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
						  			<el-col :span="2"><label class="control-label">多选框：</label></el-col>
						  		<el-col :span="22">
						  			<el-form-item>
							  			<el-checkbox-group v-model="pageData.tableObj.query6">
												<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
												<el-checkbox label="地推活动" name="type"></el-checkbox>
												<el-checkbox label="线下主题活动" name="type"></el-checkbox>
												<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
											</el-checkbox-group>
								    </el-form-item>
						  		</el-col>
							  </el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
						  			<el-col :span="2"><label class="control-label">单选框：</label></el-col>
						  		<el-col :span="22">
						  			<el-form-item>
							  			<el-radio-group v-model="pageData.tableObj.query7">
												<el-radio label="线上品牌商赞助"></el-radio>
												<el-radio label="线下场地免费"></el-radio>
											</el-radio-group>
								    </el-form-item>
						  		</el-col>
							  </el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="text-center">
						  		<el-form-item>
								    <el-button type="primary" @click.stop="queryEvt" icon="el-icon-search">查询</el-button>
										<el-button type="primary" @click.stop="toggleCond" icon="el-icon-arrow-up">收起</el-button>
								  </el-form-item>
							  </el-col>
							</el-row>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<div class="box-bd pr mt15">
			<div class="tab-content custom-content">
				<div class="tab-pane in active">
					<el-row class="mb10">
						<el-col :span="12">
							<el-button type="primary" icon="el-icon-edit-outline" @click.stop="pageData.addDialog.dialogFormVisible = true">新建</el-button>
						</el-col>
					</el-row>
					<div class="table-responsive">
						<el-table border :data="pageData.tableObj.list" style="width: 100%">
					    <el-table-column sortable prop="id" label="列表1" min-width="90"></el-table-column>
					    <el-table-column sortable prop="siteNo" label="列表2" min-width="90"></el-table-column>
					    <el-table-column sortable prop="shopNo" label="列表3" min-width="130"></el-table-column>
					    <el-table-column sortable prop="shopName" label="列表4" min-width="130"></el-table-column>
					    <el-table-column sortable prop="chargeName" label="列表5" min-width="150"></el-table-column>
					    <el-table-column sortable prop="shopType" label="列表6" min-width="120"></el-table-column>
					    <el-table-column sortable prop="statusName" label="列表7" min-width="90"></el-table-column>
					    <el-table-column sortable prop="creator" label="列表8" min-width="110"></el-table-column>
					    <el-table-column sortable prop="created" label="列表9" min-width="120"></el-table-column>
					    <el-table-column fixed="right" label="操作" min-width="100">
					      <template slot-scope="scope">
					        <el-button @click.stop.native.prevent="showUpdate(scope.$index, scope)" type="text" size="small">编辑</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
					</div>
					<div class="page">
						 <div class="block p15 text-center">
					    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
					    	:current-page="pageData.tableObj.currentPage" 
					    	:page-sizes="pageData.tableObj.pageArray"
					      :page-size="pageData.tableObj.pageSize"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="pageData.tableObj.totalRows">
					    </el-pagination>
					  </div>
					</div>
				</div>
			</div>
		</div>
		<!--新增-->
		<el-dialog title="新增" :visible.sync="pageData.addDialog.dialogFormVisible" width="50%" :before-close="clearEvt">
		  <el-form class="form-horizontal">
		  	<el-row>
		  		<el-col :span="12">
		  			<el-form-item>
				    	<el-col :span="8">
				    		<label class="control-label">条件1：</label>
				    	</el-col>
				    	<el-col :span="16">
				    		<el-input v-model="pageData.addDialog.create.query1" auto-complete="off"></el-input>
				    	</el-col>
				    </el-form-item>
		  		</el-col>
		  		<el-col :span="12">
		  			<el-form-item>
				    	<el-col :span="8">
				    		<label class="control-label">条件2：</label>
				    	</el-col>
				    	<el-col :span="16">
				    		<el-select v-model="pageData.addDialog.create.query2">
				    			<el-option label="全部" value=""></el-option>
						      <el-option v-for="item in pageData.shopTypeList" :key="item.shopType" :label="item.induName+item.shopType" :value="item.shopType"></el-option>
						    </el-select>
				    	</el-col>
				    </el-form-item>
		  		</el-col>
		  	</el-row>
		  </el-form>
	  	<el-table border :data="pageData.addDialog.create.list" max-height="490" style="width: 100%;margin-bottom: 10px;">
		    <el-table-column sortable prop="shopName" label="列表1"></el-table-column>
	      <el-table-column label="列表2">
		      <template slot-scope="scope">
		      	<el-input v-model="scope.row.chargeName"></el-input>
		      </template>
		    </el-table-column>
		  </el-table>
		    <div class="text-center">
		    	<el-button type="primary" icon="el-icon-star-on" v-if="!pageData.addDialog.isUpdate" @click.stop="addEvt">新增</el-button>
		    	<el-button type="primary" icon="el-icon-star-on" v-if="pageData.addDialog.isUpdate" @click.stop="updateEvt">修改</el-button>
		    	<el-button icon="el-icon-circle-close-outline" @click.stop="clearEvt">取消</el-button>
		    </div>
		</el-dialog>
	</el-main>
</template>

<script>
export default {
    data() {
      return {
				pageOpt: {showCond: true},
      	options:[],
      	addDialogDisabled:false,
      	pageData:{
      		statusList:[ // 状态
	      		{name:"全部",value:"-1"},
	      		{name:"启用",value:"1"},
	      		{name:"禁用",value:"0"}
      		],
      		shopTypeList:[], // 小店类型
      		tableObj:{
      			query1 :"", 
      			query2 :"", 
      			query3 :"", 
      			query4 :"", 
      			query5 :"", 
      			query6 :[], 
      			query7 :"", 
      			currentPage: 1,
      			pageSize: 10,
      			totalPage: 1, // 多少页
      			totalRows: 1, // 总数
      			pageArray:[10,20,30,40,50],
      			list: []
      		},
      		addDialog:{
      			tableHeight:0,
      			isUpdate:false,
      			dialogFormVisible:false,
      			create:{
      				siteNo:"",
      				shopType:"",
      				list:[]
      			},
      			formLabelWidth:'120px',
      		}
      	}
      }
    },
    created(){
			let height = document.documentElement.clientHeight
			this.pageData.addDialog.tableHeight = height*0.4
    },
    computed:{
    	
    },
    methods: {
    	initFunc(){
    		
    	},
    	addEvt(){
    		if(this.pageData.addDialog.create.query1 == ""){
					this.$message({
						message: '请输入门条件1!',
						type: 'warning'
					})
					return false
				}	
    		var obj = this.pageData.addDialog.create.list
    		
    		fetch(this.$api.urls.POST_PARTNER_CREATE,{
        	method:'post',
        	headers:{
      			"Content-type":"application/json",
      		},
    			credentials: "include",
        	body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(res=>{
        	if(res.success){
        		this.pageData.addDialog.dialogFormVisible = false
        		this.$alert('新增成功', '提示', {
		          confirmButtonText: '确定',
		          type: 'success',
		          center: true,
		          callback: action => {
				        this.queryEvt()  	
				        this.clearEvt()
		          }
		        })
        	}else{
        		this.$message.error(res.message)
        	}
        }).catch(err=>{
        	this.$message.error("系统错误："+err)
        })
    		
    	},
    	clearEvt(){
    		this.pageData.addDialog.dialogFormVisible = true
			},
			toggleCond() {
				this.pageOpt.showCond = !this.pageOpt.showCond
      },
      queryEvt() {
      	const loading = this.$loading({
          lock: true,
          spinner: 'wm-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      	let obj = {
      		siteNo :this.pageData.tableObj.query1, 
					shopType :this.pageData.tableObj.query2, 
					status :this.pageData.tableObj.query3, 
					mandt :this.pageData.tableObj.query4, 
					currentPage :this.pageData.tableObj.currentPage, 
					pageSize :this.pageData.tableObj.pageSize 
      	}
        fetch(this.$api.urls.POST_PARTNER_QUERYSITESHOP,{
        	method:'post',
        	headers:{
      			"Content-type":"application/json",
      		},
      		credentials: "include",
        	body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(res=>{
        	setTimeout(() => {
	          loading.close();
	        }, 500)
	        if(res.success){
	        	this.pageData.tableObj.currentPage = res.model.currentPage // 页码当前
      			this.pageData.tableObj.pageSize = res.model.pageSize // 单页行数
      			this.pageData.tableObj.totalPage = res.model.pageCount // 多少页
      			this.pageData.tableObj.totalRows = res.model.count // 总数
      			const data =res.model.data
	        	
	        	this.pageData.tableObj.list = data
	        }else{
	        	this.$message.error(res.message)
	        }
        }).catch(err=>{
        	setTimeout(() => {
	          loading.close();
	        }, 500)
        	this.$message.error("系统错误："+err)
        })
        
      },
      handleSizeChange(val) {
        this.pageData.tableObj.pageSize = val // 单页行数
        this.queryEvt()
      },
      handleCurrentChange(val) {
        this.pageData.tableObj.currentPage = val // 当前页
        this.queryEvt()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
