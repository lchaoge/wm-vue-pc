<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			  <el-breadcrumb-item>巡检分数导入</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="rtl-custom-box mt15">
			<div class="box-hd">
				<div class="cont">
					<div class="form-horizontal">
						<el-form :inline="true" class="demo-form-inline">
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">月份：</label></el-col>
							  		<el-col :span="16">
							  			<el-date-picker v-model="pageData.tableObj.yearMonthStr" value-format="yyyy-MM" type="month" placeholder="请选择日期"></el-date-picker>	
							  		</el-col>
								</el-col>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">状态：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-select v-model="pageData.tableObj.status">
										      <el-option v-for="item in pageData.statusList" :label="item.name" :value="item.value" :key="item.value"></el-option>
										    </el-select>
									    </el-form-item>
							  		</el-col>
							  	</el-col>
								<el-col :span="12">
							  		<el-col :span="4"><label class="control-label">导入时间：</label></el-col>
							  		<el-col :span="20">
							  			<el-col :span="10">
							  				<el-date-picker v-model="pageData.tableObj.startTime" value-format="yyyy-MM-dd" align="right" type="date" placeholder="请选择日期"></el-date-picker>	
							  			</el-col>
							  			<el-col :span="2" class="text-center" style="line-height: 40px;">-</el-col>
							  			<el-col :span="10">
							  				<el-date-picker v-model="pageData.tableObj.endTime" value-format="yyyy-MM-dd" align="right" type="date" placeholder="请选择日期"></el-date-picker>	
							  			</el-col>
							  		</el-col>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="text-center">
							  		<el-form-item>
									    <el-button type="primary" @click.stop="queryEvt" icon="el-icon-search">查询</el-button>
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
						<el-col :span="24" class="text-right">
							<el-button type="primary" plain icon="el-icon-upload" @click="uploadEvt">导入</el-button>
						</el-col>
					</el-row>
					<div class="table-responsive">
						<el-table border :data="pageData.tableObj.list" style="width: 100%">
					    <el-table-column sortable prop="batch" label="导入批次" min-width="90"></el-table-column>
					    <el-table-column sortable prop="siteNum" label="导入门店数" min-width="110"></el-table-column>
					    <el-table-column sortable prop="yearMonthStr" label="月份" min-width="120"></el-table-column>
					    <el-table-column sortable prop="statusName" label="状态" min-width="120"></el-table-column>
					    <el-table-column sortable prop="created" label="导入时间" min-width="130"></el-table-column>
					    <el-table-column sortable prop="creatorName" label="提交人" min-width="110"></el-table-column>
					    <el-table-column fixed="right" label="操作" min-width="100">
					      <template slot-scope="scope">
					        <el-button @click.stop="detailEvt(scope.$index, scope)" type="text" size="small">查看详情</el-button>
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

	</el-main>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				pageData:{
					statusList:[
						{name:"全部",value:""},
			      		{name:"启用",value:1},
			      		{name:"禁用",value:0}
					],
					tableObj:{
      					yearMonthStr :"", //  月份
						status :"", //  状态
						startTime :"", //  开始时间
						endTime :"", //  结束时间
						pageSize :10, //  单页行数
						currentPage :1, //  当前页吗
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
    methods: {
    	initFunc(){
    		this.queryEvt()
    	},
		queryEvt() {
      	let obj = {
      		yearMonthStr :this.pageData.tableObj.yearMonthStr,
			status :this.pageData.tableObj.status,
			startTime :this.pageData.tableObj.startTime, 
			endTime :this.pageData.tableObj.endTime, 
			currentPage :this.pageData.tableObj.currentPage, 
			pageSize :this.pageData.tableObj.pageSize 
      	}
      	if(this.$api.compareDate(obj.startTime,obj.endTime)){
      		this.$message({
	          message: '开始时间不能大于结束时间!',
	          type: 'warning'
	        })
	        return false
      	}
      	const loading = this.$loading({
          lock: true,
          spinner: 'wm-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        fetch(this.$api.urls.POST_INSPECTIONSCORE_QUERYMAIN,{
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
	        	
	        	this.pageData.tableObj.list = res.model.data.map((item)=>{
	        		if(item.status === 0){
	        			item.statusName = "禁用"
	        		}else{
	        			item.statusName = "启用"
	        		}
	        		item.yearMonthStr = this.$api.monthFormat(item.yearMonthStr)
	        		item.created = this.$api.dateFormat("yyyy-MM-dd",item.created)
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
      detailEvt(index,item){
      	this.$router.push({name:'checkupDetailLink',query:{
      		batch:item.row.batch,
      		yearMonthStr:item.row.yearMonthStr,
      		status:item.row.status,
      		mainId:item.row.id
      	}})
      },
      uploadEvt(){
      	this.$router.push({name:'checkupUploadLink'})
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