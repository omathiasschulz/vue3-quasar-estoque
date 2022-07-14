<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text-center text-h4" v-if="brand.name">
        {{ brand.name }}
      </div>
    </div>
    <div class="row">
      <q-select
        outlined
        dense
        v-model="categoryId"
        :options="optionsCategories"
        label="Categoria"
        class="col-12"
        option-label="name"
        option-value="id"
        map-options
        emit-value
        clearable
        @update:model-value="handleList(route.params.id)" />
      <q-table
        title="Produtos"
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :loading="loading"
        grid
        :filter="filter"
        v-model:pagination="initialPagination"
        hide-pagination>
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
            <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
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
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="initialPagination.page"
        :max="pagesNumber"
        direction-links
        @update:model-value="handleScrollToTop" />
    </div>

    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetail"
      @hide-dialog="showDialogDetails = false" />
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRoute } from 'vue-router'
import { columnsProduct, initialPagination } from './table'
import { formatCurrency } from 'src/utils/format'
import DialogProductDetails from 'src/components/DialogProductDetails.vue'

export default defineComponent({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails,
  },
  setup() {
    const products = ref([])
    const loading = ref(true)
    const { listPublic, brand } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()
    const filter = ref('')
    const showDialogDetails = ref(false)
    const productDetail = ref({})
    const optionsCategories = ref([])
    const categoryId = ref('')

    const handleList = async (userId) => {
      try {
        loading.value = true
        products.value = categoryId.value
          ? await listPublic('product', userId, 'category_id', categoryId.value)
          : await listPublic('product', userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetail.value = product
      showDialogDetails.value = true
    }

    const handleListCategories = async (userId) => {
      optionsCategories.value = await listPublic('category', userId)
    }

    const handleScrollToTop = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      if (route.params.id) {
        handleList(route.params.id)
        handleListCategories(route.params.id)
      }
    })

    return {
      handleList,
      columnsProduct,
      products,
      loading,
      formatCurrency,
      filter,
      showDialogDetails,
      productDetail,
      handleShowDetails,
      brand,
      optionsCategories,
      categoryId,
      route,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPagination.value.rowPerPage)),
      handleScrollToTop,
    }
  },
})
</script>
