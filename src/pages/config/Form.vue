<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <span class="text-h6">Configuração</span>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <q-input
          label="Nome da Loja"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <q-input label="Telefone" v-model="form.phone" mask="(##) #####-####" unmasked-value />

        <q-input label="Imagem" stack-label v-model="paralax" type="file" accept="image/*" />

        <div class="row justify-center q-gutter-md q-pa-md">
          <q-color v-model="form.primary" class="col-md-4 col-sm-12 col-xs-12 text-center" />

          <q-color v-model="form.secondary" class="col-md-4 col-sm-12 col-xs-12 text-center" />
        </div>

        <q-btn label="Salvar" color="primary" class="full-width" rounded type="submit" />

        <q-btn label="Cancelar" color="primary" class="full-width" rounded flat :to="{ name: 'me' }" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import useBrand from 'src/composables/UseBrand'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageConfigForm',
  setup() {
    const router = useRouter()
    const { post, update, listPublic, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({ name: '', phone: '', primary: '', secondary: '', paralax_url: '' })
    const paralax = ref([])
    const { setBrand } = useBrand()
    const { user } = useAuthUser()

    onMounted(() => {
      handleGetConfig()
    })

    const handleGetConfig = async () => {
      try {
        form.value = (await listPublic('config', user.value.id))[0]
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleSubmit = async () => {
      try {
        if (paralax.value.length > 0) {
          form.value.paralax_url = await uploadImg(paralax.value[0], 'paralax')
        }
        if (form.value.id) {
          await update('config', form.value)
          notifySuccess('Registro atualizado com sucesso!')
        } else {
          await post('config', form.value)
          notifySuccess('Registro inserido com sucesso!')
        }

        setBrand(form.value.primary, form.value.secondary)
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleSubmit,
      paralax,
    }
  },
})
</script>
