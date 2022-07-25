<template>
  <q-page padding class="row justify-center items-center">
    <q-form style="width: 90%; max-width: 550px" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">NOVA SENHA</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          type="email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Enviar Email" color="primary" class="full-width" outline rounded type="submit" />

          <q-btn label="Voltar" color="primary" class="full-width" flat :to="{ name: 'login' }" rounded />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from '../composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ForgotPasswordPage',

  setup() {
    const router = useRouter()
    const { sendPasswordResetEmail } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()
    const email = ref('')

    const handleResetPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess('Link para resetar a senha enviado por email!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleResetPassword,
    }
  },
})
</script>
