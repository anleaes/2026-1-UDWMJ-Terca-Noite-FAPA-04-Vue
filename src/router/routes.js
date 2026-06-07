const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // HOME
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
      },

      // CATEGORIAS
      {
        path: 'categorias',
        name: 'CategoryPage',
        component: () => import('pages/CategoryPage.vue'),
      },

      // ITENS
      {
        path: 'itens',
        name: 'ItensPage',
        component: () => import('pages/ItensPage.vue'),
      },

      // USUÁRIOS
      {
        path: 'usuarios',
        name: 'UserPage',
        component: () => import('pages/UserPage.vue'),
      },

      // LEILOEIROS
      {
        path: 'leiloeiros',
        name: 'Auctioneer',
        component: () => import('pages/AuctioneerPage.vue'),
      },

      // LEILAO
      {
        path: 'leilao',
        name: 'Auction',
        component: () => import('pages/AuctionPage.vue'),
      },
    ],
  },

  // ROTAS DE ERRO (boa prática)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
