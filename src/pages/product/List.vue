<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Produtos"
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="loading">
        <template v-slot:top>
          <span class="text-h6">Produtos</span>
          <q-space />
          <q-btn
            label="Novo registro"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-product' }"
            v-if="$q.platform.is.desktop">
            <q-tooltip>Adicionar um novo registro</q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
          </q-td>
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
      <q-btn fab icon="mdi-plus" color="primary" :to="{ name: 'form-product' }" v-if="$q.platform.is.mobile">
        <q-tooltip>Adicionar um novo registro</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { columnsProduct } from './table'

export default defineComponent({
  name: 'PageProductList',
  setup() {
    const products = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()

    const handleList = async () => {
      try {
        loading.value = true
        products.value = await list('product')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (product) => {
      router.push({ name: 'form-product', params: { id: product.id } })
    }

    const handleRemove = (product) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: `Deseja realmente excluir o produto ${product.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove('product', product.id)
          notifySuccess('Produto removido com sucesso!')
          handleList()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleList()
    })

    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemove,
    }
  },
})
</script>
