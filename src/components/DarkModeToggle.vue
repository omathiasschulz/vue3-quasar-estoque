<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="mdi-weather-night"
    color="secondary"
    unchecked-icon="mdi-white-balance-sunny" />
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'DarkModeToggle',
  setup() {
    const $q = useQuasar()
    const darkMode = ref(false)

    watch(darkMode, (darkMode) => {
      $q.dark.set(darkMode)
      $q.localStorage.set('darkMode', darkMode)
    })

    onMounted(() => {
      if ($q.localStorage.getItem('darkMode')) {
        darkMode.value = true
      }
    })

    return {
      darkMode,
      onMounted,
    }
  },
})
</script>
