<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <q-input
          label="Senha"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <div class="full-width q-pt-md">
          <q-btn label="Acessar" color="primary" class="full-width" outline rounded type="submit" />
        </div>

        <div class="full-width">
          <q-btn label="Registrar" color="primary" class="full-width" flat size="sm" to="/register" />
          <q-btn label="Esqueceu sua senha?" color="primary" class="full-width" flat size="sm" to="/new-password" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      email: '',
      password: '',
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin,
    }
  },
})
</script>
