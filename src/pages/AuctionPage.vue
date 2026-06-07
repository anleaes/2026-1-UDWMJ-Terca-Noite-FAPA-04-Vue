<template>
  <q-page class="q-pa-md">
    <!-- ================= TELA DE LOGIN ================= -->
    <div v-if="!session.logged" class="q-gutter-md">
      <div class="text-h5">Acesso ao Leilão Online</div>

      <q-input v-model="login.nome" label="Nome" filled />

      <q-input v-model="login.contactChannel" label="Canal de contato cadastrado" filled />

      <q-input v-model="login.password" label="Senha" type="password" filled />

      <q-btn color="primary" label="Entrar" @click="loginUser" />
    </div>

    <!-- ================= TELA DO SISTEMA ================= -->
    <div v-else>
      <!-- HEADER -->
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h6">Bem-vindo, {{ session.user }}</div>
          <div class="text-caption">{{ session.contactChannel }}</div>
        </div>

        <q-btn flat icon="logout" label="Sair" @click="logout" />
      </div>

      <!-- ================= ITENS ================= -->
      <q-table
        title="Itens disponíveis para leilão"
        :rows="auctionItems"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >
        <template v-slot:body-cell-select="props">
          <q-td :props="props">
            <q-btn color="primary" dense label="Adicionar" @click="addToCart(props.row)" />
          </q-td>
        </template>
      </q-table>

      <!-- ================= CARRINHO ================= -->
      <div class="q-mt-lg">
        <div class="text-h6">Itens selecionados</div>

        <q-list bordered separator class="q-mt-sm">
          <q-item v-for="item in cart" :key="item.id">
            <q-item-section>
              {{ item.name }}
            </q-item-section>

            <q-item-section>
              <q-input v-model.number="item.quantity" type="number" dense label="Qtd" :min="1" />
            </q-item-section>

            <q-item-section side>
              <q-btn dense flat icon="delete" color="negative" @click="removeFromCart(item.id)" />
            </q-item-section>
          </q-item>
        </q-list>

        <q-input
          v-model.number="bid.value"
          type="number"
          label="Inserir valor do lance"
          filled
          class="q-mt-md"
        />

        <q-btn
          class="q-mt-md"
          color="primary"
          label="Finalizar Lance"
          :disable="cart.length === 0"
          @click="openPayment"
        />
      </div>

      <!-- ================= PAYMENT ================= -->
      <q-dialog v-model="paymentDialog">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">Pagamento</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-select
              v-model="payment.type"
              :options="['PIX', 'Cartão']"
              label="Forma de pagamento"
              filled
            />

            <q-input
              v-if="payment.type === 'Cartão'"
              v-model="payment.card"
              label="Insira os numeros do seu cartão:"
              filled
            />

            <div v-if="payment.type === 'PIX'" class="q-gutter-sm">
              <div class="text-subtitle2">Utilize a chave PIX abaixo:</div>

              <q-banner class="bg-grey-2 text-black" rounded>
                chave-pix-9f3a7c2d@leilao-bacana.d21sd
              </q-banner>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Confirmar" @click="confirmBid" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- ================= RECEIPT ================= -->
      <q-dialog v-model="receiptDialog">
        <q-card style="width: 420px">
          <q-card-section>
            <div class="text-h6">Comprovante de Pagamento</div>
          </q-card-section>

          <q-card-section class="q-gutter-sm">
            <div><b>Total:</b> R$ {{ receipt.total }}</div>
            <div><b>Status:</b> {{ receipt.status }}</div>

            <div class="q-mt-sm">
              <b>Itens:</b>
              <div v-for="i in receipt.items" :key="i.id">
                - {{ i.name }} (Qtd: {{ i.quantity }})
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

/* ================= LOGIN ================= */
const login = ref({
  nome: '',
  contactChannel: '',
  password: '',
})

const session = ref({
  logged: false,
  user: '',
  contactChannel: '',
})

function loginUser() {
  if (login.value.nome && login.value.contactChannel && login.value.password) {
    session.value.logged = true
    session.value.user = login.value.nome
    session.value.contactChannel = login.value.contactChannel
  }
}

function logout() {
  session.value.logged = false
  session.value.user = ''
  session.value.contactChannel = ''
}

/* ================= ITEMS ================= */
const auctionItems = ref([
  { id: 1, name: 'iPhone 14', price: 3000 },
  { id: 2, name: 'Notebook Dell', price: 4500 },
])

const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'name', label: 'Item', field: 'name' },
  { name: 'price', label: 'Preço base', field: 'price' },
  { name: 'select', label: 'Ação', field: 'select' },
]

/* ================= CART ================= */
const cart = ref([])

function addToCart(item) {
  const found = cart.value.find((i) => i.id === item.id)

  if (found) {
    found.quantity = Math.max(1, found.quantity + 1)
  } else {
    cart.value.push({
      ...item,
      quantity: 1,
    })
  }
}

function removeFromCart(id) {
  cart.value = cart.value.filter((i) => i.id !== id)
}

/* ================= BID ================= */
const bid = ref({
  value: 0,
})

/* ================= PAYMENT ================= */
const paymentDialog = ref(false)

const payment = ref({
  type: 'PIX',
  pix: '',
  card: '',
})

function openPayment() {
  paymentDialog.value = true
}

/* ================= RECEIPT ================= */
const receiptDialog = ref(false)

const receipt = ref({
  total: 0,
  status: '',
  items: [],
})

function confirmBid() {
  const total = cart.value.reduce((sum, i) => {
    return sum + i.quantity * bid.value.value
  }, 0)

  receipt.value = {
    total,
    status: 'Pago com sucesso!',
    items: [...cart.value],
  }

  paymentDialog.value = false
  receiptDialog.value = true

  console.log('NOTIFICATION: AuctionBid finalizado com sucesso')
}
</script>
