<template>
  <q-page class="q-pa-md">
    <div v-if="!session.logged" class="q-gutter-md">
      <div class="text-h5">Acesso ao Leilão</div>

      <q-input v-model="login.email" label="E-mail" filled />

      <q-input v-model="login.password" label="Senha" type="password" filled />

      <q-btn color="primary" label="Entrar" @click="loginUser" />
    </div>

    <div v-else>
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h6">Bem-vindo, {{ session.user }}</div>

          <div class="text-caption text-grey">Leilão ativo em andamento</div>

          <div class="text-caption" :class="auctionStatusClass">
            Status: {{ auctionStatusText }}
          </div>

          <div class="text-caption text-orange" v-if="!auctionClosed">
            ⏱ Tempo restante: {{ timeLeft }}s
          </div>
        </div>

        <q-btn flat icon="logout" label="Sair" @click="logout" />
      </div>

      <q-card class="q-mb-md shadow-3">
        <q-img :src="activeItem.image" style="height: 220px; border-radius: 8px" fit="cover" />
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-h6">
              {{ activeItem.name }}
            </div>

            <div class="text-caption text-grey">Lance inicial: R$ {{ activeItem.startPrice }}</div>
          </div>

          <q-badge :color="auctionClosed ? 'red' : 'green'" class="text-subtitle2 q-pa-sm">
            Maior lance: R$ {{ currentBid }}
          </q-badge>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-caption text-grey q-mb-sm">Últimos lances</div>

          <q-list dense>
            <q-item v-for="(b, i) in bids" :key="i">
              <q-item-section>
                {{ b.user }}
              </q-item-section>

              <q-item-section side class="text-weight-bold"> R$ {{ b.value }} </q-item-section>
            </q-item>
            <q-item v-if="bids.length === 0">
              <q-item-section class="text-grey text-italic">
                Nenhum lance realizado ainda.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-pa-md">
        <div class="text-h6 q-mb-md">Dar lance</div>

        <q-input
          v-model.number="bidValue"
          type="number"
          label="Seu lance"
          filled
          :disable="auctionClosed"
          prefix="R$"
          @keyup.enter="placeBid"
        />

        <q-btn
          class="q-mt-md full-width"
          color="primary"
          label="Enviar lance"
          :disable="auctionClosed"
          @click="placeBid"
        />
      </q-card>
    </div>
  </q-page>

  <q-dialog v-model="resultDialog">
    <q-card style="min-width: 420px; max-width: 95vw">
      <q-card-section class="bg-primary text-white row items-center">
        <div class="text-h6">Leilão Encerrado</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="text-center q-pa-xl">
        <q-icon
          :name="winner ? 'emoji_events' : 'gavel'"
          :color="winner ? 'amber' : 'grey-6'"
          size="72px"
        />

        <div class="text-h5 q-mt-md">
          {{ winner ? 'Venda Concluída! 🎉' : 'Leilão Finalizado 🛑' }}
        </div>

        <div v-if="winner" class="q-pa-md">
          <div class="text-subtitle1 text-grey-7">Item arrematado:</div>
          <div class="text-h6 q-mb-md">
            <strong>{{ activeItem.name }}</strong>
          </div>

          <q-separator inset class="q-my-md" />

          <div class="text-body1">
            Ganhador: <span class="text-weight-bold text-secondary">{{ winner.user }}</span>
          </div>

          <div class="text-caption text-grey-6 q-mt-xs">Valor do lance:</div>
          <div class="text-h4 text-positive text-weight-bolder q-mt-xs">R$ {{ winner.value }}</div>
        </div>

        <div v-else class="text-grey-6 q-mt-md text-body1">
          O tempo acabou e nenhum lance válido foi realizado para este item.
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-grey-1">
        <q-btn flat label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

/* ================= ITEM ================= */
const activeItem = ref({
  name: 'iPhone 14 Pro Max',
  startPrice: 3000,
  image:
    'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-purple-220907-geo_inline.jpg.large.jpg',
})

/* ================= LOGIN ================= */
const login = ref({
  email: '',
  password: '',
})

const session = ref({
  logged: false,
  user: '',
})

/* ================= AUCTION ================= */
const bids = ref([
  { user: 'Carlos', value: 3500 },
  { user: 'Ana', value: 3200 },
])

const currentBid = computed(() => {
  if (!bids.value.length) return activeItem.value.startPrice
  return Math.max(...bids.value.map((b) => b.value))
})

const bidValue = ref(0)
const resultDialog = ref(false)

const winner = computed(() => {
  if (!bids.value.length) return null
  return bids.value.reduce((a, b) => (a.value > b.value ? a : b))
})

/* ================= TIMER ================= */
const timeLeft = ref(60)
let interval = null
const auctionClosed = ref(false)

const auctionStatusText = computed(() => (auctionClosed.value ? 'ENCERRADO' : 'ATIVO'))

const auctionStatusClass = computed(() =>
  auctionClosed.value ? 'text-red text-weight-bold' : 'text-green text-weight-bold',
)

/* ================= TIMER LOGIC ================= */
function startTimer() {
  stopTimer()

  interval = setInterval(() => {
    if (timeLeft.value <= 1) {
      timeLeft.value = 0
      endAuction()
      return
    }
    timeLeft.value--
  }, 1000)
}

function stopTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

function endAuction() {
  auctionClosed.value = true
  stopTimer()

  resultDialog.value = true

  if (winner.value) {
    $q.notify({
      type: 'positive',
      message: `Vendido! ${winner.value.user} levou o ${activeItem.value.name}!`,
      icon: 'celebration',
      position: 'top',
    })
  } else {
    $q.notify({
      type: 'warning',
      message: 'O leilão terminou sem lances organizados.',
      icon: 'gavel',
      position: 'top',
    })
  }
}

/* ================= LOGIN FUNCTIONS ================= */
function loginUser() {
  if (!login.value.email || !login.value.password) return

  session.value.logged = true
  session.value.user = login.value.email

  // reset auction state
  timeLeft.value = 60
  auctionClosed.value = false

  startTimer()
}

function logout() {
  session.value.logged = false
  session.value.user = ''
  login.value.email = ''
  login.value.password = ''

  stopTimer()
}

/* ================= BID ================= */
function placeBid() {
  if (auctionClosed.value) {
    $q.notify({ type: 'negative', message: 'Este leilão já está encerrado.' })
    return
  }

  if (!bidValue.value || bidValue.value <= currentBid.value) {
    $q.notify({
      type: 'warning',
      message: `O lance mínimo atual é de R$ ${currentBid.value + 1}`,
    })
    return
  }

  bids.value.unshift({
    user: session.value.user,
    value: bidValue.value,
  })

  $q.notify({
    type: 'info',
    message: 'Lance computado com sucesso!',
    position: 'bottom-right',
  })

  bidValue.value = 0
}

/* ================= CLEANUP ================= */
onBeforeUnmount(() => {
  stopTimer()
})
</script>
