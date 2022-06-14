<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">Nova Senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Nova Senha" v-model="password" />

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

export default defineComponent({
  name: 'ResetPasswordPage',

  setup() {
    const router = useRouter()
    const { resetPassword } = useAuthUser()
    const password = ref('')
    const route = useRoute()
    const token = route.query.token

    const handleResetPassword = async () => {
      try {
        await resetPassword(token, password.value)
        router.replace({ name: 'login' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      password,
      handleResetPassword,
    }
  },
})
</script>
