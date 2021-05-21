;(() => {
	'use strict'
	var e = {
			429: (e, t) => {
				Object.defineProperty(t, '__esModule', { value: !0 }),
					(t.default = class {
						constructor(e) {
							;(this.config = e),
								(this.currentValueStyle = {
									style: e.showCurrency ? 'currency' : 'decimal',
									useGrouping: e.useGrouping,
									currencyDisplay: e.currencyStyle,
									minimumFractionDigits: e.numberDecimalsValues <= 8 ? e.numberDecimalsValues : 8
								}),
								(this.changeValueStyle = {
									style: e.showChangeValueCurrency ? 'currency' : 'decimal',
									useGrouping: e.useGrouping,
									currencyDisplay: e.currencyStyle,
									minimumFractionDigits: e.numberDecimalsValues <= 8 ? e.numberDecimalsValues : 8
								}),
								(this.percentStyle = { style: 'percent', useGrouping: e.useGrouping, minimumFractionDigits: e.numberDecimalsPercentages <= 8 ? e.numberDecimalsPercentages : 8 })
						}
						getStockChange(e) {
							var t
							return null === (t = e.price) || void 0 === t ? void 0 : t.regularMarketChange
						}
						getStockChangePercent(e) {
							var t
							return null === (t = e.price) || void 0 === t ? void 0 : t.regularMarketChangePercent
						}
						getCurrentValue(e) {
							var t
							return null === (t = e.price) || void 0 === t ? void 0 : t.regularMarketPrice
						}
						getStockChangeAsString(e) {
							return this.getStockChange(e).toLocaleString(this.config.locale, Object.assign(this.changeValueStyle, { currency: e.summaryDetail.currency }))
						}
						getStockChangePercentAsString(e) {
							return this.getStockChangePercent(e).toLocaleString(this.config.locale, this.percentStyle)
						}
						getCurrentValueAsString(e) {
							return this.getCurrentValue(e).toLocaleString(this.config.locale, Object.assign(this.currentValueStyle, { currency: e.summaryDetail.currency }))
						}
						getStockName(e) {
							return e.meta.name || e.price.longName
						}
						getDepotValueAsString(e) {
							return e.value.toLocaleString(this.config.locale, Object.assign(this.currentValueStyle, { currency: e.currency }))
						}
						getDepotChangeAsString(e) {
							return (e.value - e.oldValue).toLocaleString(this.config.locale, Object.assign(this.currentValueStyle, { currency: e.currency }))
						}
						getDepotChangePercentAsString(e) {
							return ((e.value - e.oldValue) / e.oldValue).toLocaleString(this.config.locale, this.percentStyle)
						}
						getDepot(e) {
							var t, n, r
							let a = []
							for (const s of e)
								try {
									const e =
										null === (t = this.config.stocks) || void 0 === t
											? void 0
											: t.find((e) => {
													var t
													return e.symbol === (null === (t = s.meta) || void 0 === t ? void 0 : t.symbol)
											  })
									if (null == e ? void 0 : e.quantity) {
										const t = (null === (n = s.price) || void 0 === n ? void 0 : n.regularMarketPrice) * e.quantity,
											c = (null === (r = s.price) || void 0 === r ? void 0 : r.regularMarketPreviousClose) * e.quantity,
											o = a.find((e) => e.currency === s.price.currency)
										o ? ((o.value = o.value + t), (o.oldValue = o.oldValue + c)) : a.push({ value: t, oldValue: c, currency: s.price.currency })
									}
								} catch (e) {
									console.warn('There was a problem calculating the detpot growth', e)
								}
							return console.debug('Depot', a), a
						}
					})
			}
		},
		t = {}
	function n(r) {
		var a = t[r]
		if (void 0 !== a) return a.exports
		var s = (t[r] = { exports: {} })
		return e[r](s, s.exports, n), s.exports
	}
	;(() => {
		const e = n(429)
		Module.register('MMM-Jast', {
			defaults: {
				locale: config.locale || 'en-GB',
				updateIntervalInSeconds: 600,
				useGrouping: !1,
				currencyStyle: 'code',
				fadeSpeedInSeconds: 3.5,
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
				showColors: !0,
				showCurrency: !0,
				showChangePercent: !0,
				showChangeValue: !1,
				showChangeValueCurrency: !1,
				showDepot: !1,
				showDepotGrowth: !1,
				showDepotGrowthPercent: !1
			},
			getStyles: () => ['MMM-Jast.css'],
			getTranslations: () => ({ en: 'translations/en.json', de: 'translations/de.json' }),
			getTemplate: () => 'templates/MMM-Jast.njk',
			getTemplateData() {
				const t = new e.default(this.config)
				return { config: this.config, stocks: this.stocks, utils: t }
			},
			start() {
				;(this.nunjucksEnvironment().loaders[0].async = !1), (this.nunjucksEnvironment().loaders[0].useCache = !0), (this.stocks = []), this.loadData(), this.scheduleUpdate(), this.updateDom()
			},
			scheduleUpdate() {
				const e = this
				;(this.config.updateIntervalInSeconds = this.config.updateIntervalInSeconds < 120 ? 120 : this.config.updateIntervalInSeconds),
					setInterval(() => {
						e.loadData()
					}, 1e3 * this.config.updateIntervalInSeconds)
			},
			loadData() {
				this.sendSocketNotification('GET_STOCKS', this.config)
			},
			socketNotificationReceived(e, t) {
				'STOCKS_RESULT' === e && ((this.stocks = t), this.updateDom(), console.debug('Stocks', this.stocks))
			}
		})
	})()
})()
