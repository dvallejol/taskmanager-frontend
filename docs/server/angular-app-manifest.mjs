
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/taskmanager-frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/taskmanager-frontend"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5487, hash: 'a761b2a12dc6da74a107209f7644c992fcc0a2aa2257c1e8272af2bf89cd3bc0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1603, hash: 'c61d6345f16d39015aa44dd96771d4cb7d634812673164da336a6b3f436f5017', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 17008, hash: 'dc28b49518cf62eaaa21adc8ca9a2e1896ad80580d9d56d7a59171a9e9a645d0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
