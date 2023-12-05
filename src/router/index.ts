import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
    // routes,
    mode: 'hash',
    // router-link匹配默认样式
    // linkActiveClass: 'zys-active'
})

const router = createRouter();

function resetRouter() {
    const newRouter = createRouter();
    // @ts-ignore
    router.matcher = newRouter.matcher;
}

const initRoutes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@views/Login/Login.vue')
    }
];
const adminRoutes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'nativeMain'
    },

    // 嵌套路由
    {
        path: '/nativeMain',
        name: 'nativeMain',
        meta: {
            roles: ['admin', 'user']
        },
        component: () => import('@views/Main/NativeMain.vue'),
        children: [
            // {
            //     path: '',
            //     redirect: 'showPdf'
            // },
            // 父子组件双向绑定
            {
                path: 'parent',
                name: 'parent',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@/views/Communication/Parent.vue')
            },
            // 拖拽元素指令
            {
                path: 'dragDom',
                name: 'dragDom',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@views/Drag/DragDom.vue')
            },
            // 测试-element弹窗拖拽指令
            {
                path: 'dragDialog',
                name: 'dragDialog',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/Drag/DragDialog.vue')
            },
            // 节流和防抖
            {
                path: 'throttling',
                name: 'throttling',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@views/Throttling/Throttling.vue')
            },
            // iframe测试
            {
                path: 'iframe',
                name: 'iframe',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@views/Iframe/IframeParent.vue')
            },
            // websocket测试
            {
                path: 'websocketTest',
                name: 'websocketTest',
                component: () => import('@views/WebsocketTest/WebsocketTest.vue')
            },
            // 显示pdf
            {
                path: 'showPdf',
                name: 'showPdf',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/ShowPdf/ShowPdf.vue')
            },
            // 测试-权限指令
            {
                path: 'permission',
                name: 'permission',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/Permission/Permission.vue')
            },
            // 图片懒加载
            {
                path: 'lazyLoadImag',
                name: 'lazyLoadImag',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/LoadImg/LazyLoadImg.vue')
            },
            // 图片预加载
            {
                path: 'preloadImag',
                name: 'preloadImag',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/LoadImg/preloadImg.vue')
            },
            // 虚拟列表
            {
                path: 'virtualList',
                name: 'virtualList',
                meta: {roles: ['admin']},
                component: () => import('@views/VirtualList/VirtualList.vue')
            },
            {
                path: 'virtualList2',
                name: 'virtualList2',
                meta: {roles: ['admin']},
                component: () => import('@views/VirtualList/VirtualList2.vue')
            },
            // 大文件上传
            {
                path: 'bigFile',
                name: 'bigFile',
                component: () => import('@/views/BigFile/BigFile.vue')
            },
            // 并发处理
            {
                path: 'concurrent',
                name: 'concurrent',
                component: () => import('@views/Concurrent/Concurrent.vue')
            },
            // 换肤
            {
                path: 'changeSkin',
                name: 'changeSkin',
                component: () => import('@views/ChangeSkin/ChangeSkin.vue')
            },
            //
            {
                path: 'rightClick',
                name: 'rightClick',
                component: () => import('@views/RightClick/RightClick.vue')
            },
            // echarts封装使用
            {
                path: 'chartTest',
                name: 'chartTest',
                component: () => import('@views/ChartTest/ChartTest.vue')
            },
            // 递归树组件
            {
                path: 'zysTree',
                name: 'zysTree',
                component: () => import('@views/ZysTree/index.vue')
            },
        ]
    },
    // iframe测试
    {
        path: '/iframeSon',
        name: 'iframeSon',
        meta: {
            roles: ['admin', 'user']
        },
        component: () => import('../views/Iframe/IframeSon.vue')
    },
    // 对应404页面
    {
        path: '/404',
        name: '404',
        component: () => import('../views/Page404.vue')
    }
];
const userRoutes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: 'nativeMain'
    },
    // 嵌套路由
    {
        path: '/nativeMain',
        name: 'nativeMain',
        meta: {
            roles: ['admin', 'user']
        },
        component: () => import('@views/Main/NativeMain.vue'),
        children: [
            {
                // 拖拽元素指令
                path: 'dragDom',
                name: 'dragDom',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@views/Drag/DragDom.vue')
            },
            {
                // 测试-element弹窗拖拽指令
                path: 'dragDialog',
                name: 'dragDialog',
                meta: {
                    roles: ['admin']
                },
                component: () => import('@views/Drag/DragDialog.vue')
            },
            {
                // 节流和防抖
                path: 'throttling',
                name: 'throttling',
                meta: {
                    roles: ['admin', 'user']
                },
                component: () => import('@views/Throttling/Throttling.vue')
            }
        ]
    },
    // 对应404页面
    {
        path: '/404',
        name: '404',
        component: () => import('../views/Page404.vue')
    }
];

// 根据权限动态添加路由，同时防止刷新
function addRoleRoutes() {
    // const role = localStorage.getItem('role');
    // resetRouter();
    // if (!role) {
    //     router.addRoutes(initRoutes);
    //     return;
    // }
    // // 添加路由 addRoutes
    // router.addRoutes(role == 'admin' ? adminRoutes : userRoutes);

    router.addRoutes(adminRoutes);
}

addRoleRoutes();
export {initRoutes, adminRoutes, userRoutes, resetRouter, addRoleRoutes}

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // // 判断登录状态
        // if (!token) {
        //     Message.error('未登录！');
        //     next('/login');
        //     return;
        // }

        // // @ts-ignore
        // console.log(to.meta.roles);
        // // @ts-ignore
        // if (to.meta.roles.length == 0 || !to.meta.roles.includes(role)) {
        //     alert('无权限或页面不存在！');
        //     return;
        // }

        next();
    }
})

export default router
