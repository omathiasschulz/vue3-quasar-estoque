<template>
  <q-page padding>
    <div class="row">
      <q-table title="Categorias" :rows="categories" :columns="columns" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn label="Novo registro" color="primary">
            <q-tooltip>Adicionar um novo registro</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true },
]

import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PageCategoryList',
  setup() {
    const categories = ref([])
    const loading = ref(true)
    const { list } = useApi()
    const { notifyError } = useNotify()

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list('category')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columns,
      categories,
      loading,
    }
  },
})
</script>
