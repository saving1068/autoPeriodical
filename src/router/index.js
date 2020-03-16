import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
	redirect:{
		name:'layout'
	}
	},
	{
		path: '/layout',
		name: 'layout',
		component:() => import('@/views/layout'),
		redirect:{
			name:'home'
		},
		children:[
			{
				path: '/home',//首页
				name: 'home',
				meta:{
					title:'首页'
				},
				component:() => import('@/views/Home'),
			},
			{//权限页面
				path: '/power',
				name: 'power',
				meta:{
					title:'菜单管理'
				},
				component:() => import('@/views/power'),
			},
			{//角色
				path: '/role',
				name: 'role',
				meta:{
					title:'角色管理'
				},
				component:() => import('@/views/role'),
			},
			{//用户
				path: '/user',
				name: 'user',
				meta:{
					title:'用户管理'
				},
				component:() => import('@/views/user'),
			},
			{//字典
				path: '/dictionaries',
				name: 'dictionaries',
				meta:{
					title:'字段管理'
				},
				component:() => import('@/views/dictionaries'),
			},
		]
	},
	{
        path: '/admin',
        name: 'admin',
        meta: {title: '账户管理'},
        hidden: true,
        component: () => import('@/views/admin'),
        redirect: '/admin/login',
        children: [
            {
                path: 'login',
                name: 'login',
                meta: {title: '账户登录'},
                component: () => import('@/views/admin/login')
            },
            {
                path: 'register',
                name: 'register',
                meta: {title: '账户注册'},
                component: () => import('@/views/admin/register'),
            },
			{
			    path: 'findPasswords',
			    name: 'findPasswords',
			    meta: {title: '忘记密码'},
			    component: () => import('@/views/admin/findPasswords'),
			}
        ]
    }
]



const router = new VueRouter({
  
  routes
})
// console.log(router)
// router.beforeEachh((to, from, next) => {
// 	console.log(to,from,next)
// 	// ...
//   })
export default router
