<template>
  <q-page class="justify-center" padding>
    <p class="text-body1">Obrigado por se registrar :)</p>

    <p class="text-body1">
      Confirme seu email para finalizar o cadastro da sua conta: <strong>{{ $route.query.email }}</strong>
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage',
})
</script>
