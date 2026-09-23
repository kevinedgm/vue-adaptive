// Vue Router stays in the consuming app. The library does not force a router dependency.
export const routes = [
  {
    path: '/tinas',
    component: () => import('@/views/TinasView.vue'),
    meta: { adaptive: 'native-detail' },
  },
  {
    path: '/directorio',
    component: () => import('@/views/DirectoryView.vue'),
    meta: { adaptive: 'directory' },
  },
  {
    path: '/configuracion',
    component: () => import('@/views/SettingsView.vue'),
    meta: { adaptive: 'settings' },
  },
]
