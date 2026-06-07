<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Lista de Categorias</div>

      <q-btn color="primary" icon="add" label="Nova Categoria" @click="openDialog()" />
    </div>

    <!-- TABELA -->
    <q-table :rows="categorias" :columns="columns" row-key="id" flat bordered>
      <!-- AÇÕES -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn dense flat icon="edit" color="primary" @click="openDialog(props.row)" />

          <q-btn dense flat icon="delete" color="negative" @click="removeCategoria(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- DIALOG -->
    <q-dialog v-model="dialog">
      <q-card style="width: 400px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Editar Categoria' : 'Nova Categoria' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome da categoria" filled />
          <q-input v-model="form.descricao" label="Descrição" type="textarea" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="saveCategoria" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const categorias = ref([
  { id: 1, nome: 'Eletrônicos', descricao: 'Itens de tecnologia' },
  { id: 2, nome: 'Carros', descricao: 'Veículos em geral' },
])

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
  { name: 'descricao', label: 'Descrição', field: 'descricao' },
  { name: 'actions', label: 'Ações', field: 'actions' },
]

const dialog = ref(false)
const editMode = ref(false)

const form = ref({
  id: null,
  nome: '',
  descricao: '',
})

function openDialog(categoria = null) {
  if (categoria) {
    editMode.value = true
    form.value = { ...categoria }
  } else {
    editMode.value = false
    resetForm()
  }

  dialog.value = true
}

function resetForm() {
  form.value = {
    id: null,
    nome: '',
    descricao: '',
  }
}

function saveCategoria() {
  if (editMode.value) {
    const index = categorias.value.findIndex((c) => c.id === form.value.id)

    if (index !== -1) {
      categorias.value[index] = { ...form.value }
    }
  } else {
    categorias.value.push({
      ...form.value,
      id: Date.now(),
    })
  }

  dialog.value = false
  resetForm()
}

function removeCategoria(id) {
  categorias.value = categorias.value.filter((c) => c.id !== id)
}
</script>
