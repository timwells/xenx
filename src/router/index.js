import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

import { getCurrentUser } from '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/energy',
    children: [
      {
        path: '/energy',
        name: 'Energy',
        component: () => import(/* webpackChunkName: "energy" */ '@/views/Energy.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
        meta: { requiresAuth: true }
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
            meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
            meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
            meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
            meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() { return h(resolveComponent('router-view'))},
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
            meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() { return h(resolveComponent('router-view')) },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
        meta: { requiresAuth: true }
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
        meta: { requiresAuth: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: {
      render() { return h(resolveComponent('router-view')) },
    },
    children: [
      {
        path: 'sign-in',
        name: 'Auth-sign-in',
        component: () => import('@/views/auth/Login'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => { return record.meta.requiresAuth;});
  if(requiresAuth && !await getCurrentUser()) {
    next('/auth/sign-in');
  } else {
    next();
  }
})

export default router
