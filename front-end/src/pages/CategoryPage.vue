<template>
  <q-page class="q-pa-md">

    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Lista de Categorias</div>

      <q-btn
        color="primary"
        icon="add"
        label="Nova Categoria"
        @click="openDialog()"
      />
    </div>

    <q-table
      :rows="categorias"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
      <template #body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">

          <q-btn
            dense
            flat
            round
            icon="edit"
            color="primary"
            @click="openDialog(props.row)"
          />

          <q-btn
            dense
            flat
            round
            icon="delete"
            color="negative"
            @click="removeCategoria(props.row.id)"
          />

        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 400px; max-width: 90vw">

        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Editar Categoria' : 'Nova Categoria' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">

          <q-input
            v-model="form.nome"
            label="Nome"
            filled
          />

          <q-input
            v-model="form.descricao"
            label="Descrição"
            type="textarea"
            filled
          />

        </q-card-section>

        <q-card-actions align="right">

          <q-btn
            flat
            label="Cancelar"
            color="grey"
            @click="closeDialog"
          />

          <q-btn
            color="primary"
            label="Salvar"
            @click="saveCategoria"
          />

        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const editMode = ref(false)

const categorias = ref([
  {
    id: 1,
    nome: 'Eletrônicos',
    descricao: 'Computadores, celulares e acessórios'
  },
  {
    id: 2,
    nome: 'Veículos',
    descricao: 'Carros, motos e caminhões'
  },
  {
    id: 3,
    nome: 'Imóveis',
    descricao: 'Casas, apartamentos e terrenos'
  }
])

function createEmptyForm() {
  return {
    id: null,
    nome: '',
    descricao: ''
  }
}

const form = ref(createEmptyForm())

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true
  },
  {
    name: 'nome',
    label: 'Nome',
    field: 'nome',
    align: 'left',
    sortable: true
  },
  {
    name: 'descricao',
    label: 'Descrição',
    field: 'descricao',
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Ações',
    field: row => row.id,
    align: 'center'
  }
]

function openDialog(categoria = null) {
  if (categoria) {
    editMode.value = true

    form.value = {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao
    }
  } else {
    editMode.value = false
    form.value = createEmptyForm()
  }

  dialog.value = true
}

function closeDialog() {
  dialog.value = false
  editMode.value = false
  form.value = createEmptyForm()
}

function saveCategoria() {
  if (!form.value.nome.trim()) return

  if (editMode.value) {
    const index = categorias.value.findIndex(
      categoria => categoria.id === form.value.id
    )

    if (index !== -1) {
      categorias.value.splice(index, 1, {
        id: form.value.id,
        nome: form.value.nome,
        descricao: form.value.descricao
      })
    }
  } else {
    const nextId =
      categorias.value.length > 0
        ? Math.max(...categorias.value.map(c => c.id)) + 1
        : 1

    categorias.value.push({
      id: nextId,
      nome: form.value.nome,
      descricao: form.value.descricao
    })
  }

  closeDialog()
}

function removeCategoria(id) {
  categorias.value = categorias.value.filter(
    categoria => categoria.id !== id
  )
}
</script>