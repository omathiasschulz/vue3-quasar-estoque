<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <span class="text-h6">Produto</span>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <q-editor v-model="form.description" min-height="5rem" />

        <q-input
          label="Quantidade"
          v-model="form.amount"
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório!']"
          type="number" />

        <q-input
          label="Preço"
          v-model="form.price"
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório!']"
          type="number"
          prefix="R$" />

        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Categoria"
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório!']"
          option-value="id"
          option-label="name"
          map-options
          emit-value />

        <q-btn :label="isUpdate ? 'Atualizar' : 'Salvar'" color="primary" class="full-width" rounded type="submit" />

        <q-btn label="Cancelar" color="primary" class="full-width" rounded flat :to="{ name: 'product' }" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageProductForm',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const optionsCategory = ref([])
    const form = ref({ name: '', description: '', amount: 0, price: 0, category_id: '' })
    // a partir do request valida se é uma inserção ou alteração
    const isUpdate = computed(() => route.params.id)

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          handleGetProduct(isUpdate.value)
          await update('product', form.value)
          notifySuccess('Registro atualizado com sucesso!')
        } else {
          await post('product', form.value)
          notifySuccess('Registro inserido com sucesso!')
        }

        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProduct = async (id) => {
      try {
        form.value = await getById('product', id)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await list('category')
    }

    return {
      isUpdate,
      form,
      handleSubmit,
      optionsCategory,
    }
  },
})
</script>
