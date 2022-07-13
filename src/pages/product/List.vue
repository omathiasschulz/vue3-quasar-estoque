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
          <q-btn
            label="Minha Loja"
            dense
            size="sm"
            outline
            class="q-ml-sm"
            icon="mdi-store"
            color="primary"
            @click="handleGoToStore" />
          <q-btn
            label="Copiar URL da Loja"
            dense
            size="sm"
            outline
            class="q-ml-sm"
            icon="mdi-content-copy"
            color="primary"
            @click="handleCopyURL" />
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
import { openURL, useQuasar, copyToClipboard } from 'quasar'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { columnsProduct } from './table'

export default defineComponent({
  name: 'PageProductList',
  setup() {
    const products = ref([])
    const loading = ref(true)
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { user } = useAuthUser()
    const router = useRouter()
    const $q = useQuasar()

    const handleList = async () => {
      try {
        loading.value = true
        products.value = await listPublic('product', user.value.id)
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

    const handleGoToStore = async () => {
      const userId = user.value.id
      const link = router.resolve({
        name: 'product-public',
        params: {
          id: userId,
        },
      })
      openURL(window.origin + link.href)
    }

    const handleCopyURL = () => {
      const userId = user.value.id
      const link = router.resolve({
        name: 'product-public',
        params: {
          id: userId,
        },
      })
      const externalLink = window.origin + link.href

      copyToClipboard(externalLink)
        .then(() => {
          notifySuccess('Link da loja copiado!')
        })
        .catch(() => {
          notifyError('Falha ao copiar link da loja!')
        })
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
      handleGoToStore,
      handleCopyURL,
    }
  },
})
</script>
