const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

export const formatCurrencyInCents = (amount: number) =>
	formatter.format(amount / 100)
