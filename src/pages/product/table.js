import { ref } from 'vue'
import { formatCurrency } from '../../utils/format'

const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Imagem', field: 'img_url' },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Quantidade', field: 'amount', sortable: true },
  {
    name: 'price',
    align: 'left',
    label: 'Preço (R$)',
    field: 'price',
    sortable: true,
    format: (val) => formatCurrency(val),
  },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions' },
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8,
})

export { columnsProduct, initialPagination }
