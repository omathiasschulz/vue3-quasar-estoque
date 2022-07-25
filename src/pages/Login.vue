<template>
  <q-page class="row justify-center items-center">
    <q-card class="card-login" style="width: 90%; max-width: 550px; padding: 20px">
      <q-card-section style="">
        <q-form @submit.prevent="handleLogin">
          <p class="col-12 text-h5 text-center">LOGIN</p>

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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.body--dark input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #191919 inset;
  box-shadow: 0 0 0 30px #191919 inset;
  -webkit-text-fill-color: white;
  border-bottom: 1.5px solid #a0a0a0;
}

.body--light input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #d8d8d8 inset;
  box-shadow: 0 0 0 30px #d8d8d8 inset;
  border-bottom: 1.5px solid #a4a4a4;
}

.body--dark .card-login {
  background-color: #191919;
}

.body--light .card-login {
  background-color: #d8d8d8;
}
</style>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, onMounted, ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar()
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
        $q.loading.show({
          backgroundColor: 'dark',
        })
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        $q.loading.hide()
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
