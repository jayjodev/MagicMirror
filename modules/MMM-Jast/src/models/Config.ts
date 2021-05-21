export type Config = {
  locale: string
  header: string
  updateIntervalInSeconds: number
  fadeSpeedInSeconds: number
  stocks: Stock[]
  scroll: 'vertical' | 'horizontal' | 'none'
  maxWidth: string
  numberDecimalsValues: number
  numberDecimalsPercentages: number
  showCurrency: boolean
  showColors: boolean
  currencyStyle: 'symbol' | 'code' | 'name'
  useGrouping: boolean
  showChangePercent: boolean
  showChangeValue: boolean
  showChangeValueCurrency: boolean
  showDepot: boolean
  showDepotGrowth: boolean
  showDepotGrowthPercent: boolean
}

type Stock = {
  symbol: string
  name?: string
  quantity?: number
}
