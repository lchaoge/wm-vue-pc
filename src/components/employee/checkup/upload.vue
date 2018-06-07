<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			  	<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			  	<el-breadcrumb-item :to="{name:'checkupLink'}">巡检分数导入</el-breadcrumb-item>
			  	<el-breadcrumb-item>文件上传</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="rtl-custom-box mt15">
			<div class="box-hd">
				<div class="cont">
					<div class="form-horizontal">
						<el-form :inline="true" class="demo-form-inline">
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">模板下载：</label></el-col>
							  		<el-col :span="16">
							  			<el-form-item>
								  			<el-button type="text" @click="downloadEvt">巡检分数导入模板.xls</el-button>
									    </el-form-item>
							  		</el-col>
							  	</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
							  		<el-col :span="8"><label class="control-label">数据导入：</label></el-col>
							  		<el-col :span="16">
							  			<el-upload
											  class="upload-demo"
											  ref="upload"
											  :action="fileAction"
											  :limit="1"
  											:on-exceed="handleExceed"
											  :file-list="fileList"
											  :auto-upload="false">
											  <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload">选取文件</el-button>
											  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
											  <div slot="tip" class="el-upload__tip">支持扩展名：.csv，大小不超过50MB</div>
											</el-upload>
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
					    <el-table-column sortable prop="no" label="序号" min-width="90"></el-table-column>
					    <el-table-column sortable prop="siteNo" label="门店号" min-width="110"></el-table-column>
					    <el-table-column sortable prop="siteName" label="门店名称" min-width="120"></el-table-column>
					    <el-table-column sortable prop="yearMonthStr" label="月份" min-width="120"></el-table-column>
					    <el-table-column sortable prop="score" label="分数" min-width="130"></el-table-column>
					    <el-table-column sortable prop="created" label="导入时间" min-width="110"></el-table-column>
					    <el-table-column sortable prop="creatorName" label="导入人" min-width="110"></el-table-column>
					    <el-table-column sortable prop="desc" label="导入结果" min-width="110"></el-table-column>
					  </el-table>
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
				fileList: [],
				fileAction:"",
				pageData:{
					tableObj:{
						list:[]
					},
					
				}
			}
		},
		created(){
			this.fileAction = this.$api.urls.POST_INSPECTIONSCORE_UPLOADFILE
    },
    methods: {
    	downloadEvt(){
    		window.location.href="./static/file/导入模板.csv"
    	},
    	 handleExceed(files, fileList) {
        this.$message.warning(`您只能选择一个文件!`);
      },
    	submitUpload() {
				let filedata = new FormData()
				let file = this.$refs.upload.uploadFiles[0].raw
        filedata.append('filedata', file)
        if(this.beforeAvatarUpload(file)){
        	this.handleChange(filedata)	
        }else{
        	this.$refs.upload.uploadFiles = []
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    	handleChange(file) {
    		const loading = this.$loading({
          lock: true,
          spinner: 'wm-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
		    fetch(this.$api.urls.POST_INSPECTIONSCORE_UPLOADFILE, {
	        method: 'POST',
	        credentials: 'include',
	        body: file,
		    })
        .then(res => res.json())
        .then(res => {
          setTimeout(() => {
	          loading.close();
	        }, 500)
	        if(res.success){
	        	this.pageData.tableObj.list = res.model.map((item)=>{
	        		item.yearMonthStr = this.$api.monthFormat(item.yearMonthStr)
	        		return item
	        	})
	        }else{
	        	this.$message.error(res.message)
	        }
        })	
        .catch(err=>{
        	setTimeout(() => {
	          loading.close();
	        }, 500)
        	this.$message.error("系统错误："+err)
        })
        
      },
     	
     	// 上传前对文件的大小的判断
      beforeAvatarUpload (file) {
        var fileName=new Array()
        fileName =file.name.split('.');
        const extension = fileName[fileName.length-1] === 'csv'
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension) {
          this.$message({
              message: '上传模板只能是csv格式!',
              type: 'warning'
          });
        }
        if (!isLt2M) {
          this.$message({
              message: '上传模板大小不能超过 10MB!',
              type: 'warning'
          });
        }
        
        return extension && isLt2M
      },
     
		}
	}
</script>

<style>
	.upload-demo .el-upload__input {
    display: none;
	}
</style>
