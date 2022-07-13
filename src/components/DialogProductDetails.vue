<template>
  <q-dialog :full-width="$q.platform.is.mobile" :model-value="show" @before-hide="handleClose">
    <q-card>
      <q-card-section>
        <div class="text-h6">Detalhes</div>
      </q-card-section>

      <q-card-section v-if="product.img_url">
        <q-img :src="product.img_url" :ratio="4 / 3" style="min-width: 300px" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">{{ product.name }}</div>
        <div class="text-subtitle2">{{ formatCurrency(product.price || 0) }}</div>
        <div class="text-body2" v-html="product.description" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" color="primary" outline v-close-popup />
        <q-btn
          v-if="brand.phone"
          label="Fazer Pedido"
          color="green-7"
          icon="mdi-whatsapp"
          @click="handleSendWhatsapp" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { formatCurrency } from 'src/utils/format'
import { defineComponent } from 'vue'
import { openURL } from 'quasar'
import useApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'DialogProductDetails',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    product: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const handleClose = () => {
      emit('hideDialog')
    }

    const { brand } = useApi()
    const handleSendWhatsapp = () => {
      const msg = 'Olá, fiquei interessado no produto: '

      const link = encodeURI(
        `https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${
          props.product.name
        } - ${formatCurrency(props.product.price)}`,
      )

      openURL(link)
    }

    return {
      formatCurrency,
      handleClose,
      handleSendWhatsapp,
      brand,
    }
  },
})
</script>
