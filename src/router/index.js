// 一级路由
import Home from './../components/home'
import List from './../components/demo/list'

export const routes = [
	{path:'/',name:'homeLink',component:Home},
	{path:'/list',name:'listLink',component:List}
]
