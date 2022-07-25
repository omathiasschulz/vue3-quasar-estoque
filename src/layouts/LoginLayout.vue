<template>
  <q-layout class="back" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.back {

  background-image: linear-gradient(to right, black, #12393e);
  /* background-image: linear-gradient(to right, #12393e, #25727d); */

}
</style>

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
