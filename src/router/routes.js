const routes = [
  // rotas não autenticadas
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'confirmation', name: 'confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'new-password', name: 'newPassword', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'resetPassword', component: () => import('pages/ResetPassword.vue') },
    ],
  },
  // rotas não autenticadas - clean main layout
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'product-public/:id', name: 'product-public', component: () => import('pages/product/Public.vue') },
    ],
  },
  // rotas autenticadas
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'category', name: 'category', component: () => import('pages/category/List.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/Form.vue') },
      { path: 'product', name: 'product', component: () => import('pages/product/List.vue') },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/product/Form.vue') },
      { path: 'form-config/:id?', name: 'form-config', component: () => import('pages/config/Form.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
