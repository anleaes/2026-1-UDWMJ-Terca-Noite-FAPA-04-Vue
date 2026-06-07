<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Lista de Leiloeiros</div>

      <q-btn color="primary" icon="gavel" label="Novo Leiloeiro" @click="openDialog()" />
    </div>

    <!-- TABELA -->
    <q-table :rows="auctioneers" :columns="columns" row-key="id" flat bordered>
      <!-- STATUS -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.status === 'Ativo' ? 'positive' : 'grey'"
            :label="props.row.status"
          />
        </q-td>
      </template>

      <!-- AÇÕES -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn dense flat icon="edit" color="primary" @click="openDialog(props.row)" />

          <q-btn
            dense
            flat
            icon="delete"
            color="negative"
            @click="removeAuctioneer(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- DIALOG -->
    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Editar Leiloeiro' : 'Novo Leiloeiro' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome" filled />

          <q-input v-model="form.canalContato" label="Canal de Contato" filled />

          <q-input v-model="form.licencaMatricula" label="Licença / Nº de Matrícula" filled />

          <q-input v-model="form.senha" label="Senha" type="password" filled />

          <q-select
            v-model="form.status"
            :options="['Ativo', 'Inativo', 'Pendente']"
            label="Status"
            filled
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="saveAuctioneer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

/**
 * LEILOEIROS MOCK
 */
const auctioneers = ref([
  {
    id: 1,
    nome: 'Carlos Andrade',
    canalContato: 'carlos@leiloes.com',
    licencaMatricula: 'LEIL-2026-001',
    senha: '123456',
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'Fernanda Lima',
    canalContato: '(51) 98888-1111',
    licencaMatricula: 'LEIL-2026-002',
    senha: '123456',
    status: 'Pendente',
  },
])

/**
 * COLUNAS
 */
const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
  {
    name: 'canalContato',
    label: 'Canal de Contato',
    field: 'canalContato',
  },
  {
    name: 'licencaMatricula',
    label: 'Licença / Nº Matrícula',
    field: 'licencaMatricula',
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
  canalContato: '',
  licencaMatricula: '',
  senha: '',
  status: 'Ativo',
})

/**
 * OPEN DIALOG
 */
function openDialog(auctioneer = null) {
  if (auctioneer) {
    editMode.value = true
    form.value = { ...auctioneer }
  } else {
    editMode.value = false
    form.value = {
      id: null,
      nome: '',
      canalContato: '',
      licencaMatricula: '',
      senha: '',
      status: 'Ativo',
    }
  }

  dialog.value = true
}

/**
 * SAVE
 */
function saveAuctioneer() {
  if (editMode.value) {
    const index = auctioneers.value.findIndex((a) => a.id === form.value.id)

    if (index !== -1) {
      auctioneers.value[index] = { ...form.value }
    }
  } else {
    auctioneers.value.push({
      ...form.value,
      id: Date.now(),
    })
  }

  dialog.value = false
}

/**
 * DELETE
 */
function removeAuctioneer(id) {
  auctioneers.value = auctioneers.value.filter((a) => a.id !== id)
}
</script>
