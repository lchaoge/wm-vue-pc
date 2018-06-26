// 一级路由
import Home from './../components/home'
import List from './../components/demo/list'
import Add from './../components/demo/add'

// 登录
import login from './../components/user/login'

export const routes = [
	{path:'/',name:'homeLink',component:Home},
	{path:'/list',name:'listLink',component:List},
	{path:'/add',name:'addLink',component:Add},
	{path:'/login',name:'loginLink',component:login}
]
