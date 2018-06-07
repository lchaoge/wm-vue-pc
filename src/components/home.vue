<template>
	<el-main>
		<div class="container-fluid">
			<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'homeLink'}"><i class="glyphicon glyphicon-home"></i>首页</el-breadcrumb-item>
			</el-breadcrumb>			
		</div>
		<div class="box-bd pr mt15">
			<div class="tab-content custom-content">
				<div class="tab-pane in active">
					<h1 style="font-size: 30px;line-height: 50px;margin:20px 0;">欢迎进入物美系统！</h1>
					<div class="mb10">
						<router-link :to="{name:'listLink'}">
					  	<el-button type="success">列表</el-button>
					  </router-link>
					  
					</div>
					
				</div>
			</div>
		</div>
	</el-main>
</template>
