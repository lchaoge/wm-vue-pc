<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{name:'scoreMemberLink'}">员工评分表</el-breadcrumb-item>
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
							  		<el-col :span="8"><label class="control-label">申请单号：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-input v-model="pageData.tableObj.orderNo" :disabled="true" placeholder="请输入申请单号" />
									    </el-form-item>
							  		</el-col>
								</el-col>
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
							  		<el-col :span="8"><label class="control-label">OA单号：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-input v-model="pageData.tableObj.oaId" :disabled="true" placeholder="请输入OA单号" />
									    </el-form-item>
							  		</el-col>
								</el-col>

							</el-row>
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">状态：</label></el-col>
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

		<div class="box-bd pr">
			<div class="tab-content custom-content">
				<div class="tab-pane in active">
					<div class="table-responsive">
						<el-table border :data="pageData.tableObj.list" style="width: 100%">
					    <el-table-column sortable prop="employeeNo" label="员工编号" min-width="90"></el-table-column>
					    <el-table-column sortable prop="employeeName" label="员工姓名" min-width="110"></el-table-column>
					    <el-table-column sortable prop="partnerTeamName" label="组织名称" min-width="120"></el-table-column>
					    <el-table-column sortable prop="skillScore" label="工作技能(60%)" min-width="120"></el-table-column>
					    <el-table-column sortable prop="efficiencyScore" label="工作效果(20%)" min-width="130"></el-table-column>
					    <el-table-column sortable prop="attendanceScore" label="出勤情况(10%)" min-width="120"></el-table-column>
					    <el-table-column sortable prop="serviceScore" label="顾客服务(10%)" min-width="120"></el-table-column>
					    <el-table-column sortable prop="finalScore" label="最终得分(月评分)" min-width="120"></el-table-column>
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
		<el-row class="mb10">
			<el-col :span="24" class="text-center">
				<el-button type="success" icon="el-icon-edit-outline" @click.stop="saveEvt">提交</el-button>
				<router-link :to="{name:'scoreMemberLink'}">
					<el-button type="danger" icon="el-icon-circle-close-outline" >取消</el-button>
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
					oaStatusList:[
						{name:"全部",value:""},
			      		{name:"提交",value:"0"},
			      		{name:"驳回",value:"1"},
			      		{name:"已审批",value:"2"},
			      		{name:"未提交",value:"3"}
					],
					tableObj:{
		      			mainId:"",
			      		orderNo:"",
			      		siteNo:"",
			      		yearMonthStr:"",
			      		oaId:"",
			      		oaStatus:"",
						status:"",
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
				this.pageData.tableObj.mainId = this.$route.query.mainId;
				this.pageData.tableObj.orderNo = this.$route.query.orderNo;
	      		this.pageData.tableObj.siteNo = this.$route.query.siteNo;
	      		this.pageData.tableObj.yearMonthStr = this.$route.query.yearMonthStr;
	      		this.pageData.tableObj.oaId = this.$route.query.oaId;
	      		this.pageData.tableObj.oaStatus = this.$route.query.oaStatus;
				this.pageData.tableObj.status = this.$route.query.status;
				this.queryEvt()
			},
			queryEvt(){
				let obj = {
					mainId:this.pageData.tableObj.mainId,
					currentPage: this.pageData.tableObj.currentPage,
		      		pageSize: this.pageData.tableObj.pageSize
				}
				const loading = this.$loading({
		          lock: true,
		          spinner: 'wm-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        })
		        fetch(this.$api.urls.POST_EMPLOYEESCORE_QUERYITEMBYMANAGER,{
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

			        	this.pageData.tableObj.list = res.model.data;
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
			saveEvt(){
				if(this.pageData.tableObj.status!=0){
					this.$message({
						message: '提交状态必须是已提交!',
						type: 'warning'
					})
					return false
				}
				let isSave = this.pageData.tableObj.list.some((item)=>{
					console.log(item.finalScore)
					return item.finalScore=="" || item.finalScore == null
				})
				if(isSave){
					this.$message({
						message: '您有未填写的评分!',
						type: 'warning'
					})
					return false
				}
				let obj = {
					mainId:this.pageData.tableObj.mainId
				}
				const loading = this.$loading({
		          lock: true,
		          spinner: 'wm-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        })
		        fetch(this.$api.urls.POST_EMPLOYEESCORE_SUBMITOAFLOW,{
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
			        	this.$alert(res.message, '提示', {
			        		center: true,
				        	dangerouslyUseHTMLString: true,
				        	callback: action => {
					           this.$router.push({
									name:'scoreMemberLink'
					           })
					        }
				        })
			        }else{
			        	this.$message.error(res.message)
			        }
		        }).catch(err=>{
		        	setTimeout(() => {
			          loading.close()
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
