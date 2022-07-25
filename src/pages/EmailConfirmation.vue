<template>
  <q-page class="row justify-center items-center" padding>
    <div>
      <p class="text-body1">Obrigado por se registrar :)</p>

      <p class="text-body1">
        Confirme seu email para finalizar o cadastro da sua conta: <strong>{{ $route.query.email }}</strong>
      </p>

      <div class="col-md-4 col-sm-6 col-xs-10" style="margin-top: 50px">
        <q-btn label="Voltar ao Login" color="primary" class="full-width" :to="{ name: 'login' }" outline rounded />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage',
})
</script>
