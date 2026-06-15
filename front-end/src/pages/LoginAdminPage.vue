<template>
  <q-page class="q-pa-md">

    <div v-if="!session.logged" class="q-gutter-md">

      <div class="text-h5">
        Área do Administrador
      </div>

      <q-input
        v-model="login.email"
        label="E-mail"
        filled
      />

      <q-input
        v-model="login.password"
        label="Senha"
        type="password"
        filled
      />

      <q-btn
        color="primary"
        label="Entrar"
        @click="loginAdmin"
      />

    </div>

    <div v-else>

      <div class="row items-center justify-between q-mb-md">

        <div>
          <div class="text-h6">
            Painel do Administrador
          </div>

          <div class="text-caption text-grey">
            Logado como {{ session.user }}
          </div>
        </div>

        <q-btn
          flat
          icon="logout"
          label="Sair"
          @click="logout"
        />

      </div>

      <div class="row q-col-gutter-md">

        <div class="col-12 col-md-6">
          <q-card class="cursor-pointer option-card" @click="go('categorias')">

            <q-card-section class="row items-center">
              <q-icon name="category" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6">Gerenciar Categorias</div>
                <div class="text-caption text-grey">
                  Criar, editar e remover categorias
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cursor-pointer option-card" @click="go('itens')">

            <q-card-section class="row items-center">
              <q-icon name="inventory_2" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6">Gerenciar Itens</div>
                <div class="text-caption text-grey">
                  Controle de itens do leilão
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cursor-pointer option-card" @click="go('usuarios')">

            <q-card-section class="row items-center">
              <q-icon name="people" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6">Gerenciar Usuários</div>
                <div class="text-caption text-grey">
                  Cadastro e controle de usuários
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cursor-pointer option-card" @click="go('leiloeiros')">

            <q-card-section class="row items-center">
              <q-icon name="engineering" size="32px" class="q-mr-md" />
              <div>
                <div class="text-h6">Gerenciar Leiloeiros</div>
                <div class="text-caption text-grey">
                  Controle de leiloeiros cadastrados
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>

      </div>

    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref({
  email: '',
  password: '',
})

const session = ref({
  logged: false,
  user: '',
})

function loginAdmin() {
  if (login.value.email && login.value.password) {
    session.value.logged = true
    session.value.user = login.value.email
  }
}

function logout() {
  session.value.logged = false
  session.value.user = ''
  login.value.email = ''
  login.value.password = ''
}

function go(route) {
  router.push(`/${route}`)
}
</script>

<style scoped>
.option-card {
  transition: 0.2s ease;
  border-radius: 12px;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
</style>