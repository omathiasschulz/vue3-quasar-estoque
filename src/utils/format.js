const formatCurrency = (currency) => {
  return currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}

export { formatCurrency }
