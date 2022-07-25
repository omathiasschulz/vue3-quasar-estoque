<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import useApi from 'src/composables/UseApi'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'LoginLayout',

  components: {},

  setup() {
    const $q = useQuasar()
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()

      if ($q.localStorage.getItem('darkMode')) {
        $q.dark.set($q.localStorage.getItem('darkMode'))
      }
    })

    return {}
  },
})
</script>
