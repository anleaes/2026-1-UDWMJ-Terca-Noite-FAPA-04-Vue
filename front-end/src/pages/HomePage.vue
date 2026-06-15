<template>
  <q-page class="q-pa-none"> <section class="hero bg-primary text-white q-px-md q-py-xl text-center text-md-left">
      <div class="container">
        <div class="row items-center q-col-gutter-lg reverse-xs">

          <div class="col-12 col-md-6 hero-content">
            <div class="text-h4 text-md-h3 text-weight-bold">
              Leilão Online
            </div>

            <div class="text-body1 text-md-subtitle1 q-mt-md q-mb-lg">
              Adquira relíquias em tempo real com lances dinâmicos e total segurança.
            </div>

            <div class="row q-col-gutter-sm justify-center justify-md-start">
              <div class="col-12 col-sm-auto">
                <q-btn
                  class="full-width"
                  color="white"
                  text-color="primary"
                  icon="gavel"
                  label="Acesso ao Leilão"
                  to="/leilao"
                  unelevated
                />
              </div>

              <div class="col-12 col-sm-auto">
                <q-btn
                  class="full-width"
                  outline
                  color="white"
                  icon="inventory_2"
                  label="Ver Itens"
                  @click="scrollToItems"
                />
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <q-img
              class="hero-image shadow-6"
              src="https://imoveis.estadao.com.br/wp-content/uploads/2023/10/leilao-de-imoveis-1-768x512.jpg"
              fit="cover"
            />
          </div>

        </div>
      </div>
    </section>

    <section class="container q-px-md q-py-xl" ref="itemsSection">
      <div class="text-h5 text-weight-bold q-mb-lg text-center text-sm-left">
        Itens Disponíveis
      </div>

      <div class="row q-col-gutter-md">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="item in items"
          :key="item.id"
        >
          <q-card bordered class="item-card flat shadow-1">
            <q-img
              :src="item.image"
              class="item-image"
              fit="cover"
            />

            <q-card-section class="q-pa-md">
              <div class="text-subtitle1 text-weight-bold text-ellipsis">
                {{ item.name }}
              </div>
              <div class="text-caption text-grey-7">
                {{ item.category }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-md row justify-between items-center">
              <div>
                <div class="text-caption text-grey-6">Lance inicial</div>
                <div class="text-primary text-weight-bold text-subtitle1">
                  {{ formatPrice(item.price) }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <section class="container q-px-md q-pb-xl">
      <div class="text-h5 text-weight-bold q-mb-lg text-center text-sm-left">
        Itens Encerrados
      </div>

      <div class="row q-col-gutter-md">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="item in closedItems"
          :key="item.id"
        >
          <q-card bordered class="item-card flat shadow-1">
            <q-img
              :src="item.image"
              class="item-image grayscale"
              fit="cover"
            />

            <q-card-section class="q-pa-md">
              <div class="text-subtitle1 text-weight-bold text-ellipsis">
                {{ item.name }}
              </div>
              <div class="text-caption text-grey-7">
                {{ item.category }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-md">
              <div class="row justify-between items-center no-wrap">
                <div>
                  <div class="text-caption text-grey-6">Lance final</div>
                  <div class="text-grey-7 text-weight-bold text-subtitle1">
                    {{ formatPrice(item.price) }}
                  </div>
                </div>
                <q-badge
                  color="negative"
                  class="q-pa-xs text-caption"
                  label="Encerrado"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

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
    image: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-purple-220907-geo_inline.jpg.large.jpg',
  },
  {
    id: 2,
    name: 'Notebook Dell',
    category: 'Eletrônicos',
    price: 4500,
    image: 'https://www.rsmicro.com.br/fotos/rsmicro-da-a-dica-de-como-estragar-o-seu-notebook-1.jpg',
  },
  {
    id: 3,
    name: 'Gol 2015',
    category: 'Veículos',
    price: 25000,
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGvhwM7S64liZjbaoBiMpCue4yV_m9caQ54KsBHhRDgEOGZ50FmffYRVNdA__zITg6i1lPmfddLFnhIMThGZmT7mjimHlMj1vSZFSNeyK_1y0nyF5vf55_2eDlVyRZE2HLxDFV1-u-_Qs/?imgmax=800',
  },
]

const closedItems = [
  {
    id: 4,
    name: 'Casa de Campo',
    category: 'Imóveis',
    price: 490000,
    image: 'https://img.magnific.com/fotos-premium/destruiu-casa-abandonada-na-espanha-europa-janelas-quebradas-paredes-danificadas-e-jardim-coberto-de-vegetacao_99272-3034.jpg',
  },
  {
    id: 5,
    name: 'Relógio Raro',
    category: 'Eletrônicos',
    price: 29000,
    image: 'https://static.vecteezy.com/system/resources/previews/066/948/781/non_2x/broken-wristwatch-with-shattered-glass-on-transparent-background-png.png',
  },
]

function scrollToItems() {
  itemsSection.value?.scrollIntoView({
    behavior: 'smooth',
  })
}

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  /* Padding controlado dinamicamente via classes do Quasar para o mobile */
  min-height: 40vh;
  display: flex;
  align-items: center;
}

.hero-image {
  border-radius: 12px;
  height: 240px; /* Reduzido o tamanho padrão da imagem para não empurrar o conteúdo */
}

@media (min-width: 600px) {
  .hero-image {
    height: 340px;
  }
}

.item-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}

.item-image {
  height: 200px; /* Altura ideal e uniforme para os cards tanto em desktop quanto mobile */
}

/* Deixa as imagens dos itens encerrados em preto e branco */
.grayscale {
  filter: grayscale(100%);
  opacity: 0.8;
}

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>