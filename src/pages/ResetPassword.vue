<template>
  <q-page padding class="row justify-center items-center">
    <q-form @submit.prevent="handleChangePassword" style="width: 90%; max-width: 550px; padding: 20px">
      <p class="col-12 text-h5 text-center">Nova Senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nova Senha"
          v-model="password"
          lazy-rules
          :rules="[(val) => (val && val.length >= 6) || 'Campo obrigatório (Pelo menos 6 caracteres)!']" />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Atualizar Senha" color="primary" class="full-width" outline rounded type="submit" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import {
  useRouter, // redireciona para outras rotas
  useRoute, // rota atual, o que permite pegar algumas informações, como GET
} from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ResetPasswordPage',

  setup() {
    const router = useRouter()
    const { resetPassword } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()
    const password = ref('')
    const route = useRoute()
    const token = route.query.token

    const handleChangePassword = async () => {
      try {
        await resetPassword(token, password.value)
        notifySuccess('Senha atualizada com sucesso!')
        router.replace({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      password,
      handleChangePassword,
    }
  },
})
</script>
