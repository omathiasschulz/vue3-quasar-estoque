<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard table="category" label="Categorias" icon="mdi-shape-outline" />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard table="product" label="Produtos" icon="mdi-archive" />
      </div>
    </div>

    <div class="flex flex-center">
      <div v-if="user">
        <p>Olá, {{ user.user_metadata.name }}!</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'
import useAuthUser from '../composables/UseAuthUser'

export default defineComponent({
  name: 'MePage',
  components: {
    CardDashboard: defineAsyncComponent(() => import('components/CardDashboard.vue')),
  },
  setup() {
    const { user } = useAuthUser()

    return {
      user,
    }
  },
})
</script>
