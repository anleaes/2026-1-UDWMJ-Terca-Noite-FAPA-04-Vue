<template>
  <q-page class="bg-grey-2">
    <!-- HERO -->
    <div class="bg-primary text-white q-pa-xl">
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-7">
          <div class="text-h3 text-weight-bold q-mb-md">Leilão Online</div>

          <div class="text-subtitle1 q-mb-lg">
            Adquira relíquias em tempo real com lances dinâmicos e segurança.
          </div>

          <div class="q-gutter-sm">
            <q-btn
              color="white"
              text-color="primary"
              icon="gavel"
              label="Acesso ao Leilão"
              to="/leilao"
            />

            <q-btn
              outline
              color="white"
              icon="inventory_2"
              label="Ver Itens"
              @click="scrollToItems"
            />
          </div>
        </div>

        <div class="col-12 col-md-5">
          <q-img
            src="https://imoveis.estadao.com.br/wp-content/uploads/2023/10/leilao-de-imoveis-1-768x512.jpg"
            style="border-radius: 12px"
          />
        </div>
      </div>
    </div>

    <!-- ITENS EM DESTAQUE (ÂNCORA DO SCROLL) -->
    <div class="q-pa-md" ref="itemsSection">
      <div class="text-h5 q-mb-md">Itens Disponíveis</div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4" v-for="item in items" :key="item.id">
          <q-card>
            <q-img :src="item.image" style="height: 220px" />

            <q-card-section>
              <div class="text-h6">
                {{ item.name }}
              </div>

              <div class="text-caption text-grey">
                {{ item.category }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-primary text-weight-bold">Lance Inicial: R$ {{ item.price }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const itemsSection = ref(null)

const items = [
  {
    id: 1,
    name: 'iPhone 14',
    category: 'Eletrônicos',
    price: 3000,
    image:
      'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-purple-220907-geo_inline.jpg.large.jpg',
  },
  {
    id: 2,
    name: 'Notebook Dell',
    category: 'Eletrônicos',
    price: 4500,
    image:
      'https://www.rsmicro.com.br/fotos/rsmicro-da-a-dica-de-como-estragar-o-seu-notebook-1.jpg',
  },
  {
    id: 3,
    name: 'Gol 2015',
    category: 'Veículos',
    price: 25000,
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGvhwM7S64liZjbaoBiMpCue4yV_m9caQ54KsBHhRDgEOGZ50FmffYRVNdA__zITg6i1lPmfddLFnhIMThGZmT7mjimHlMj1vSZFSNeyK_1y0nyF5vf55_2eDlVyRZE2HLxDFV1-u-_Qs/?imgmax=800',
  },
]

function scrollToItems() {
  itemsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
