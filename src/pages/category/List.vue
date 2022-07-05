<template>
  <q-page padding>
    <div class="row">
      <q-table title="Categorias" :rows="categories" :columns="columns" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">Categoria</span>
          <q-space />
          <q-btn
            label="Novo registro"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category' }"
            v-if="$q.platform.is.desktop">
            <q-tooltip>Adicionar um novo registro</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemove(props.row)">
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="mdi-plus" color="primary" :to="{ name: 'form-category' }" v-if="$q.platform.is.mobile">
        <q-tooltip>Adicionar um novo registro</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
const columns = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions' },
]

import { useQuasar } from 'quasar'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageCategoryList',
  setup() {
    const categories = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list('category')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemove = (category) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Deseja realmente excluir a categoria ${category.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove('category', category.id)
          notifySuccess('Categoria removida com sucesso!')
          handleListCategories()
        })
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
      handleEdit,
      handleRemove,
    }
  },
})
</script>
