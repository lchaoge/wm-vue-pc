<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  	<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			  	<el-breadcrumb-item :to="{name:'checkupLink'}">巡检分数导入</el-breadcrumb-item>
			  	<el-breadcrumb-item>导入数据查看</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="rtl-custom-box mt15">
			<div class="box-hd">
				<div class="cont">
					<div class="form-horizontal">
						<el-form :inline="true" class="demo-form-inline">
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">导入批次：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-input v-model="pageData.tableObj.batch" :disabled="true" placeholder="请输入导入批次" />
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
							  				<el-input v-model="pageData.tableObj.statusName" :disabled="true" />
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
						    <el-table-column sortable prop="siteNo" label="门店号" min-width="110"></el-table-column>
						    <el-table-column sortable prop="siteName" label="门店名称" min-width="120"></el-table-column>
						    <el-table-column sortable prop="yearMonthStr" label="月份" min-width="120"></el-table-column>
						    <el-table-column sortable prop="score" label="分数" min-width="130"></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
		
		<el-row class="mb10">
			<el-col :span="24" class="text-center">
				<router-link :to="{name:'checkupLink'}">
					<el-button type="danger" icon="el-icon-circle-close-outline">关闭</el-button>
			  	</router-link>
			</el-col>
		</el-row>

	</el-main>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				pageData:{
					statusList:[
						{name:"全部",value:""},
			      		{name:"启用",value:1},
			      		{name:"禁用",value:0}
					],
					tableObj:{
						batch:"",
						yearMonthStr:"",
						status:"",
						statusName:"",
						mainId:"",
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
    	
    	},
    	mounted(){
			this.initFunc()
		},
		methods: {
			initFunc(){
				this.paramEvt()
				this.queryEvt()
			},
			paramEvt(){
				this.pageData.statusList.forEach((item)=>{
					if(this.$route.query.status == item.value){
						this.pageData.tableObj.statusName = item.name
					}
				})
				this.pageData.tableObj.batch = this.$route.query.batch
				this.pageData.tableObj.yearMonthStr = this.$route.query.yearMonthStr
				this.pageData.tableObj.status = this.$route.query.status
				this.pageData.tableObj.mainId = this.$route.query.mainId
			},
			queryEvt() {
				let obj = {
					mainId :this.pageData.tableObj.mainId,
					currentPage :this.pageData.tableObj.currentPage, 
					pageSize :this.pageData.tableObj.pageSize 
				}
				const loading = this.$loading({
				lock: true,
				spinner: 'wm-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
				})
				fetch(this.$api.urls.POST_INSPECTIONSCORE_QUERYITEM,{
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
						this.pageData.tableObj.list = res.model.map((item)=>{
							item.yearMonthStr = this.pageData.tableObj.yearMonthStr
							return item
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