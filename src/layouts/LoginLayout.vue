<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Estoque Schulz</q-toolbar-title>

        <dark-mode-toggle></dark-mode-toggle>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import useApi from 'src/composables/UseApi'
import { defineComponent, onMounted } from 'vue'
import DarkModeToggle from 'src/components/DarkModeToggle.vue'

export default defineComponent({
  name: 'LoginLayout',

  components: {
    DarkModeToggle,
  },

  setup() {
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()
    })

    return {}
  },
})
</script>
