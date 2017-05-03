import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },


    {
        path: '/',
        component: Home,
        name: '成绩管理',
        iconCls: 'el-icon-message',
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '成绩导入' },
            { path: '/search', component: Table, name: '成绩查询' },
            { path: '/add', component: Table, name: '成绩新增' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/form', component: Form, name: '信息发布' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-handshake-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '问题协作' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据分析',
        iconCls: 'fa fa-area-chart',
        children: [
            { path: '/echarts', component: echarts, name: '成绩分布' },
            { path: '/echarts', component: echarts, name: '公众平台数据' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-question-circle',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '使用帮助' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '超级管理员',
        iconCls: 'fa fa-superpowers',
        children: [
            { path: '/page6', component: Page6, name: '权限管理' },
            { path: '/page6', component: Page6, name: '清空数据' }
        ]
    },


    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;