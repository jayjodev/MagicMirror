import Utils from './Utils'
import { Config } from '../models/Config'

Module.register('MMM-Jast', {
  defaults: {
    locale: config.locale || 'en-GB',
    updateIntervalInSeconds: 600,
    useGrouping: false,
    currencyStyle: 'code',
    fadeSpeedInSeconds: 3.5, // Higher value: vertical -> faster // horizontal -> slower
    stocks: [
      { name: 'BASF', symbol: 'BAS.DE', quantity: 100 },
      { name: 'SAP', symbol: 'SAP.DE', quantity: 200 },
      { name: 'Henkel', symbol: 'HEN3.DE' },
      { name: 'AbbVie', symbol: '4AB.DE' },
      { name: 'Bitcoin', symbol: 'BTC-EUR' },
      { name: 'Alibaba', symbol: 'BABA' }
    ],
    scroll: 'vertical',
    maxWidth: '100%',
    numberDecimalsValues: 2,
    numberDecimalsPercentages: 1,
    showColors: true,
    showCurrency: true,
    showChangePercent: true,
    showChangeValue: false,
    showChangeValueCurrency: false,
    showDepot: false,
    showDepotGrowth: false,
    showDepotGrowthPercent: false
  } as Config,

  getStyles() {
    return ['MMM-Jast.css']
  },

  getTranslations() {
    return {
      en: 'translations/en.json',
      de: 'translations/de.json'
    }
  },

  getTemplate() {
    return 'templates/MMM-Jast.njk'
  },

  getTemplateData() {
    const utils = new Utils(this.config)
    return {
      config: this.config,
      stocks: this.stocks,
      utils
    }
  },

  start() {
    // Override defaults
    this.nunjucksEnvironment().loaders[0].async = false
    this.nunjucksEnvironment().loaders[0].useCache = true
    this.stocks = []
    this.loadData()
    this.scheduleUpdate()
    this.updateDom()
  },

  scheduleUpdate() {
    const self = this
    this.config.updateIntervalInSeconds = this.config.updateIntervalInSeconds < 120 ? 120 : this.config.updateIntervalInSeconds
    setInterval(() => {
      self.loadData()
    }, this.config.updateIntervalInSeconds * 1000)
  },

  loadData() {
    this.sendSocketNotification('GET_STOCKS', this.config)
  },

  socketNotificationReceived(notificationIdentifier: string, payload: any) {
    if (notificationIdentifier === 'STOCKS_RESULT') {
      this.stocks = payload
      this.updateDom()
      console.debug('Stocks', this.stocks)
    }
  }
})
