<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <span class="text-h6">Categoria</span>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <q-btn :label="isUpdate ? 'Atualizar' : 'Salvar'" color="primary" class="full-width" rounded type="submit" />

        <q-btn label="Cancelar" color="primary" class="full-width" rounded flat :to="{ name: 'category' }" />
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
  name: 'PageCategoryForm',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({ name: '' })
    // a partir do request valida se é uma inserção ou alteração
    const isUpdate = computed(() => route.params.id)

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          handleGetCategory(isUpdate.value)
          await update('category', form.value)
          notifySuccess('Registro atualizado com sucesso!')
        } else {
          await post('category', form.value)
          notifySuccess('Registro inserido com sucesso!')
        }

        router.push({ name: 'category' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCategory = async (id) => {
      try {
        form.value = await getById('category', id)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value)
      }
    })

    return {
      isUpdate,
      form,
      handleSubmit,
    }
  },
})
</script>
