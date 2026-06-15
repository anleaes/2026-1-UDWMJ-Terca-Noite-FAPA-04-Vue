<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Lista de Itens</div>

      <q-btn color="primary" icon="add" label="Novo Item" @click="openDialog()" />
    </div>

    <q-table :rows="itens" :columns="columns" row-key="id" flat bordered>
      <template v-slot:body-cell-foto="props">
        <q-td :props="props">
          <q-img
            v-if="props.row.foto"
            :src="props.row.foto"
            style="width: 60px; height: 60px"
            fit="cover"
            class="rounded-borders"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.status === 'Ativo' ? 'positive' : 'grey'"
            :label="props.row.status"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn dense flat icon="edit" color="primary" @click="openDialog(props.row)" />

          <q-btn dense flat icon="delete" color="negative" @click="removeItem(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 95vw">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Editar Item' : 'Novo Item' }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="form.nome" label="Nome do item" filled />

          <q-select
            v-model="form.categoria"
            :options="categorias"
            option-label="nome"
            option-value="nome"
            emit-value
            map-options
            label="Categoria"
            filled
          />

          <q-input
            v-model.number="form.valorInicial"
            label="Valor inicial (R$)"
            type="number"
            filled
          />

          <q-select
            v-model="form.status"
            :options="['Ativo', 'Encerrado', 'Pendente']"
            label="Status"
            filled
          />

          <q-input v-model="form.foto" label="URL da Foto" filled />

          <q-img
            v-if="form.foto"
            :src="form.foto"
            style="height: 180px"
            fit="contain"
            class="rounded-borders"
          />

          <q-input v-model="form.descricao" label="Descrição" type="textarea" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="saveItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const categorias = ref([
  { id: 1, nome: 'Eletrônicos' },
  { id: 2, nome: 'Carros' },
  { id: 3, nome: 'Imóveis' },
])

const itens = ref([
  {
    id: 1,
    nome: 'iPhone 14',
    categoria: 'Eletrônicos',
    valorInicial: 3000,
    status: 'Pendende',
    descricao: 'Smartphone Apple',
    foto: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-purple-220907-geo_inline.jpg.large.jpg',
  },
  {
    id: 2,
    nome: 'Gol 2015',
    categoria: 'Carros',
    valorInicial: 25000,
    status: 'Ativo',
    descricao: 'Carro usado',
    foto: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGvhwM7S64liZjbaoBiMpCue4yV_m9caQ54KsBHhRDgEOGZ50FmffYRVNdA__zITg6i1lPmfddLFnhIMThGZmT7mjimHlMj1vSZFSNeyK_1y0nyF5vf55_2eDlVyRZE2HLxDFV1-u-_Qs/?imgmax=800',
  },
  {
  id: 3,
  nome: 'Notebook Dell',
  categoria: 'Eletrônicos',
  valorInicial: 4500,
  status: 'Ativo',
  descricao: 'Notebook Dell para uso profissional e pessoal.',
  foto: 'https://www.rsmicro.com.br/fotos/rsmicro-da-a-dica-de-como-estragar-o-seu-notebook-1.jpg'
  },
    {
  id: 4,
  nome: 'Casa de Campo',
  categoria: 'Imóveis',
  valorInicial: 490000,
  status: 'Encerrado',
  descricao: 'Casa de campo em exelente estado de preservação.',
  foto: 'https://img.magnific.com/fotos-premium/destruiu-casa-abandonada-na-espanha-europa-janelas-quebradas-paredes-danificadas-e-jardim-coberto-de-vegetacao_99272-3034.jpg'
  },
  {
  id: 5,
  nome: 'Relógio Raro',
  categoria: 'Eletrônicos',
  valorInicial: 29000,
  status: 'Encerrado',
  descricao: 'Relógio brabo ae muito bom.',
  foto: 'https://static.vecteezy.com/system/resources/previews/066/948/781/non_2x/broken-wristwatch-with-shattered-glass-on-transparent-background-png.png'
  },
])

const columns = [
  { name: 'foto', label: 'Foto', field: 'foto' },
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
  { name: 'categoria', label: 'Categoria', field: 'categoria' },
  { name: 'valorInicial', label: 'Valor Inicial', field: 'valorInicial' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'actions', label: 'Ações', field: 'actions' },
]

const dialog = ref(false)
const editMode = ref(false)

const form = ref({
  id: null,
  nome: '',
  categoria: '',
  valorInicial: 0,
  status: 'Ativo',
  descricao: '',
  foto: '',
})

function openDialog(item = null) {
  if (item) {
    editMode.value = true
    form.value = { ...item }
  } else {
    editMode.value = false
    form.value = {
      id: null,
      nome: '',
      categoria: '',
      valorInicial: 0,
      status: 'Ativo',
      descricao: '',
      foto: '',
    }
  }

  dialog.value = true
}

function saveItem() {
  if (editMode.value) {
    const index = itens.value.findIndex((i) => i.id === form.value.id)

    if (index !== -1) {
      itens.value[index] = { ...form.value }
    }
  } else {
    itens.value.push({
      ...form.value,
      id: Date.now(),
    })
  }

  dialog.value = false
}

function removeItem(id) {
  itens.value = itens.value.filter((i) => i.id !== id)
}
</script>
