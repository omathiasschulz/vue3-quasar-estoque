<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Produtos"
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="loading"
        grid
        :filter="filter">
        <template v-slot:top>
          <span class="text-h6">Produtos</span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisar..." class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <q-img :src="props.row.img_url" :ratio="4 / 3" />
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsProduct } from './table'
import { formatCurrency } from 'src/utils/format'

export default defineComponent({
  name: 'PageProductPublic',
  setup() {
    const products = ref([])
    const loading = ref(true)
    const { listPublic } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()
    const filter = ref('')

    const handleList = async (userId) => {
      try {
        loading.value = true
        products.value = await listPublic('product', userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handleList(route.params.id)
      }
    })

    return {
      columnsProduct,
      products,
      loading,
      formatCurrency,
      filter,
    }
  },
})
</script>
