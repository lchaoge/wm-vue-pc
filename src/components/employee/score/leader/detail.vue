<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{name:'scoreLeaderLink'}">员工评分</el-breadcrumb-item>
			  <el-breadcrumb-item>评分表详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="rtl-custom-box mt15">
			<div class="box-hd">
				<div class="cont">
					<div class="form-horizontal">
						<el-form :inline="true" class="demo-form-inline">
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">门店编号：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-input v-model="pageData.tableObj.siteNo" :disabled="true" placeholder="请输入门店编号" />
									    </el-form-item>
							  		</el-col>
								</el-col>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">月份：</label></el-col>
							  		<el-col :span="16">
							  			<el-date-picker v-model="pageData.tableObj.yearMonthStr" :disabled="true" value-format="yyyy-MM" type="month" placeholder="请选择日期"></el-date-picker>	
							  		</el-col>
								</el-col>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">状态：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-select v-model="pageData.tableObj.status" :disabled="true">
										      <el-option v-for="item in pageData.statusList" :label="item.name" :value="item.value" :key="item.value"></el-option>
										    </el-select>
									    </el-form-item>
							  		</el-col>
							  	</el-col>
							  	<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">审批状态：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-select v-model="pageData.tableObj.oaStatus" :disabled="true">
										      <el-option v-for="item in pageData.oaStatusList" :label="item.name" :value="item.value" :key="item.value"></el-option>
										    </el-select>
									    </el-form-item>
							  		</el-col>
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
					<div class="table-responsive">
						<el-table border :data="pageData.tableObj.list" style="width: 100%">
					    <el-table-column sortable prop="employeeNo" label="员工编号" min-width="90"></el-table-column>
					    <el-table-column sortable prop="employeeName" label="员工姓名" min-width="110"></el-table-column>
					    <el-table-column sortable prop="partnerTeamName" label="组织名称" min-width="120"></el-table-column>
					    <el-table-column sortable label="工作技能(60%)" min-width="120">
					    	<template slot-scope="scope">
					    		<span v-if="!pageData.isDetail">{{scope.row.skillScore}}%</span>
					    		<el-input v-if="pageData.isDetail" v-model="scope.row.skillScore" @input="validateEvt(scope.row.skillScore,60,'工作技能',scope.row)" :maxlength="2" :max="60" :min="1" placeholder="请输入工作技能" clearable />
						    </template>
					    </el-table-column>
					    <el-table-column sortable label="工作效果(20%)" min-width="130">
					    	<template slot-scope="scope">
					    		<span v-if="!pageData.isDetail">{{scope.row.efficiencyScore}}%</span>
					    		<el-input v-if="pageData.isDetail" v-model="scope.row.efficiencyScore" @input="validateEvt(scope.row.efficiencyScore,20,'工作效果',scope.row)" :maxlength="2" max="20" min="1" placeholder="请输入工作效果" clearable />
						    </template>
					    </el-table-column>
					    <el-table-column sortable label="出勤情况(10%)" min-width="120">
					    	<template slot-scope="scope">
					    		<span v-if="!pageData.isDetail">{{scope.row.attendanceScore}}%</span>
					    		<el-input v-if="pageData.isDetail" v-model="scope.row.attendanceScore" @input="validateEvt(scope.row.attendanceScore,10,'出勤情况',scope.row)" :maxlength="2" max="10" min="1" placeholder="请输入出勤情况" clearable />
						    </template>
					    </el-table-column>
					    <el-table-column sortable label="顾客服务(10%)" min-width="120">
					    	<template slot-scope="scope">
					    		<span v-if="!pageData.isDetail">{{scope.row.serviceScore}}%</span>
					    		<el-input v-if="pageData.isDetail" v-model="scope.row.serviceScore" @input="validateEvt(scope.row.serviceScore,10,'顾客服务',scope.row)" :maxlength="2" max="10" min="1" placeholder="请输入顾客服务" clearable />
						    </template>
					    </el-table-column>
					    <el-table-column sortable label="最终得分(月评分)" min-width="120">
					    	<template slot-scope="scope">
					    		<span>{{scope.row.finalScore}}%</span>
						    </template>
					    </el-table-column>
					  </el-table>
					</div>
					<!--<div class="page">
						 <div class="block p15 text-center">
					    <el-pagination 
					    	@size-change="handleSizeChange"
					    	@current-change="handleCurrentChange" 
					    	:current-page="pageData.tableObj.currentPage" 
					    	:page-sizes="pageData.tableObj.pageArray"
					        :page-size="pageData.tableObj.pageSize"
					        layout="total, sizes, prev, pager, next, jumper"
					        :total="pageData.tableObj.totalRows">
					    </el-pagination>
					  </div>
					</div>-->
				</div>
			</div>
		</div>
		
		<el-row class="mb10">
			<el-col :span="24" class="text-center">
				<el-button type="success" icon="el-icon-edit-outline"  v-if="pageData.isDetail" @click.stop="addEvt">提交</el-button>
				<router-link :to="{name:'scoreLeaderLink'}">
					<el-button type="danger" icon="el-icon-circle-close-outline">取消</el-button>	
				</router-link>
			</el-col>
		</el-row>
	
		
	</el-main>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				pageData:{
					isDetail:false,
					statusList:[
						{name:"全部",value:""},
			      		{name:"启用",value:1},
			      		{name:"禁用",value:0}
					],
					oaStatusList:[
						{name:"全部",value:""},
			      		{name:"提交",value:0},
			      		{name:"驳回",value:1},
			      		{name:"已审批",value:2},
			      		{name:"未提交",value:3}
					],
					tableObj:{
						mainId:"",
		      			siteNo:"",
			      		yearMonthStr:"",
			      		status:"", // 状态
			      		oaStatus:"",
		      			currentPage: 1,
		      			pageSize: 10,
		      			totalPage: 1, // 多少页
		      			totalRows: 1, // 总数
		      			pageArray:[10,20,30,40,50],
		      			list: []
		      		},
				}
			}
		},
		created(){
			this.initFunc()
		},
		methods:{
			initFunc(){
				this.pageData.tableObj.mainId = this.$route.query.mainId
				this.pageData.tableObj.siteNo = this.$route.query.siteNo
	      		this.pageData.tableObj.yearMonthStr = this.$route.query.yearMonthStr
	      		this.pageData.tableObj.status = this.$route.query.status
	      		this.pageData.tableObj.oaStatus = this.$route.query.oaStatus
				this.queryEvt()
			},
			queryEvt(){
				let obj = {
					mainId:this.pageData.tableObj.mainId,
//					currentPage: this.pageData.tableObj.currentPage,
//		      		pageSize: this.pageData.tableObj.pageSize
				}
				const loading = this.$loading({
		          lock: true,
		          spinner: 'wm-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        })
		        fetch(this.$api.urls.POST_EMPLOYEESCORE_QUERYITEMBYLEADER,{
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
			        	this.pageData.tableObj.list = res.model
			        	if(this.pageData.tableObj.list.length>0){
			        		this.pageData.isDetail = this.pageData.tableObj.list.every((item)=>{
								return item.finalScore ==""
							})
			        	}
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
			validateEvt(value,max,name,item){
				
				if(!value) {
					this.$message.error(name+'不能为空')
					return false
		        }
				if(!/^[1-9]\d*$/.test(value)) {
					this.$message.error(name+'必须是正整数')
					return false
		        }
				if(value<1){
					this.$message.error(name+'必须大于等于1')
					return false
				}
				if(value>max){
					this.$message.error(name+'必须小于等于'+max)
					return false
				}
				item.finalScore = parseInt(item.skillScore) + parseInt(item.efficiencyScore) + parseInt(item.attendanceScore) + parseInt(item.serviceScore)
				
			},
			addEvt(){
				let obj = this.pageData.tableObj.list.map((item)=>{
					return {
						id :item.id,
						skillScore :item.skillScore,
						efficiencyScore :item.efficiencyScore,
						attendanceScore :item.attendanceScore,
						serviceScore :item.serviceScore,
						finalScore :item.finalScore
					}
				})
				let isAdd = obj.some((item)=>{
					return item.finalScore=="" || item.finalScore == null
				})
				if(isAdd){
					this.$message({
						message: '请填写评分!',
						type: 'warning'
					})
					return false
				}
				const loading = this.$loading({
		          lock: true,
		          spinner: 'wm-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        })
		        fetch(this.$api.urls.POST_EMPLOYEESCORE_UPDATEITEMS,{
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
			        	this.$alert("提交成功", '提示', {
			        		center: true,
				        	dangerouslyUseHTMLString: true,
				        	callback: action => {
					           this.$router.go(0)		
					        }
				        })
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