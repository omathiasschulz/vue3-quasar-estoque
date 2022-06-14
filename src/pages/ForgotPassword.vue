<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">Nova Senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="email" />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Enviar Email" color="primary" class="full-width" outline rounded type="submit" />

          <q-btn label="Voltar" color="primary" class="full-width" flat :to="{ name: 'login' }" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ForgotPasswordPage',

  setup() {
    const router = useRouter()
    const { sendPasswordResetEmail } = useAuthUser()
    const email = ref('')

    const handleResetPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        router.push({ name: 'login' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      email,
      handleResetPassword,
    }
  },
})
</script>
