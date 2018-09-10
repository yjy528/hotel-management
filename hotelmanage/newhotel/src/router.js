
// 引入（路由）组件。
import first from './components/index'
import second from './components/order'
import third from './components/search'
// import fourth from './components/'
// import details from './components/details'

// 定义路由
export default [
	{
		path:'/first',
		component:first
	},
	{
		path:'/second',
		component:second
	},
	{
		path:'/third',
		component:third
    },
	{
		path:'/',
		redirect:'/first'
	},
	{
		path:'*',
		redirect:'/first'
	}
]
