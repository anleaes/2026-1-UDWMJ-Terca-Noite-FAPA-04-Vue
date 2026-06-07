<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Lista de Usuários</div>

      <q-btn color="primary" icon="person_add" label="Novo Usuário" @click="openDialog()" />
    </div>

    <!-- TABELA -->
    <q-table :rows="users" :columns="columns" row-key="id" flat bordered>
      <!-- STATUS -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :label="props.row.status" />
        </q-td>
      </template>

      <!-- AÇÕES -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn dense flat icon="edit" color="primary" @click="openDialog(props.row)" />

          <q-btn dense flat icon="delete" color="negative" @click="removeUser(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- DIALOG -->
    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Editar Usuário' : 'Novo Usuário' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome" filled />

          <q-input v-model="form.contactChannel" label="Canal de Contato" filled />

          <q-input v-model="form.senha" label="Senha" type="password" filled />

          <q-select v-model="form.status" :options="['Ativo', 'Inativo']" label="Status" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

/**
 * USERS MOCK
 */
const users = ref([
  {
    id: 1,
    nome: 'João Silva',
    contactChannel: 'joao@email.com',
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'Maria Souza',
    contactChannel: '(51) 99999-8888',
    status: 'Ativo',
  },
])

/**
 * COLUNAS
 */
const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
  {
    name: 'contactChannel',
    label: 'Canal de Contato',
    field: 'contactChannel',
  },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'actions', label: 'Ações', field: 'actions' },
]

/**
 * STATE
 */
const dialog = ref(false)
const editMode = ref(false)

const form = ref({
  id: null,
  nome: '',
  contactChannel: '',
  senha: '',
  status: 'Ativo',
})

/**
 * OPEN DIALOG
 */
function openDialog(user = null) {
  if (user) {
    editMode.value = true
    form.value = { ...user }
  } else {
    editMode.value = false
    form.value = {
      id: null,
      nome: '',
      contactChannel: '',
      senha: '',
      status: 'Ativo',
    }
  }

  dialog.value = true
}

/**
 * SAVE USER
 */
function saveUser() {
  if (editMode.value) {
    const index = users.value.findIndex((u) => u.id === form.value.id)

    if (index !== -1) {
      users.value[index] = { ...form.value }
    }
  } else {
    users.value.push({
      ...form.value,
      id: Date.now(),
    })
  }

  dialog.value = false
}

/**
 * DELETE USER
 */
function removeUser(id) {
  users.value = users.value.filter((u) => u.id !== id)
}
</script>
