<template>
  <q-layout view="hHh lpR fFf">
    <!-- SIDEBAR -->
    <q-drawer v-model="drawer" show-if-above bordered>
      <q-list padding>

        <!-- HOME -->
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Página da Home</q-item-section>
        </q-item>

        <q-separator />

        <!-- ACESSO -->
        <q-item-label header>Acesso</q-item-label>

        <q-item clickable v-ripple to="/leilao">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>Login de Usuário</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin">
          <q-item-section avatar>
            <q-icon name="admin_panel_settings" />
          </q-item-section>
          <q-item-section>Login de Administrador</q-item-section>
        </q-item>

        <q-separator />

        <!-- LEILÃO -->
        <q-item-label header>Leilão</q-item-label>

        <q-item clickable v-ripple to="/categorias">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Gerenciar Categorias</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/itens">
          <q-item-section avatar>
            <q-icon name="inventory_2" />
          </q-item-section>
          <q-item-section>Gerenciar Itens</q-item-section>
        </q-item>

        <q-separator />

        <!-- PESSOAS -->
        <q-item-label header>Pessoas</q-item-label>

        <q-item clickable v-ripple to="/usuarios">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Gerenciar Usuários</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/leiloeiros">
          <q-item-section avatar>
            <q-icon name="engineering" />
          </q-item-section>
          <q-item-section>Gerenciar Leiloeiros</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <!-- TOP BAR -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          Sistema de Leilão
        </q-toolbar-title>

        <!-- NOTIFICAÇÕES -->
        <q-btn 
          flat 
          round 
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" 
          @click="toggleDarkMode"
          class="q-ml-sm"
        >
          <q-tooltip>{{ $q.dark.isActive ? 'Modo Claro' : 'Modo Escuro' }}</q-tooltip>
        </q-btn>
        
        <q-btn flat round icon="notifications">
          <q-badge
            v-if="notifications.length"
            color="red"
            floating
          >
            {{ notifications.length }}
          </q-badge>

          <q-menu>
            <q-card style="width: 340px">

              <q-card-section class="text-h6">
                Notificações
              </q-card-section>

              <q-separator />

              <q-card-section v-if="notifications.length === 0">
                Nenhuma notificação
              </q-card-section>

              <q-list v-else padding>

                <q-item
                  v-for="(n, i) in notifications"
                  :key="i"
                >

                  <q-item-section
                    avatar
                    v-if="n.image"
                  >
                    <q-img
                      :src="n.image"
                      style="width: 56px; height: 56px; border-radius: 8px"
                      fit="cover"
                    />
                  </q-item-section>

                  <q-item-section>

                    <q-item-label class="text-bold">
                      {{ n.title }}
                    </q-item-label>

                    <q-item-label caption>
                      {{ n.message }}
                    </q-item-label>

                    <q-item-label
                      caption
                      class="text-grey"
                    >
                      {{ n.date }} • {{ n.time }}
                    </q-item-label>

                  </q-item-section>

                </q-item>

              </q-list>

            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- CONTEÚDO -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

// Instanciação do Quasar e variáveis de controle
const $q = useQuasar()
const drawer = ref(true)

// Array de notificações limpo e fechado corretamente
const notifications = ref([
  {
    title: 'Novo item anunciado',
    message: 'iPhone 14 disponível no leilão',
    image: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-purple-220907-geo_inline.jpg.large.jpg',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString().slice(0, 5),
  }
])

// Função para alternar o modo escuro global
function toggleDarkMode() {
  $q.dark.toggle()
}
</script>