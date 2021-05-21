;(() => {
	'use strict'
	var e = {
			944: function (e, t, o) {
				var r =
					(this && this.__awaiter) ||
					function (e, t, o, r) {
						return new (o || (o = Promise))(function (n, i) {
							function s(e) {
								try {
									c(r.next(e))
								} catch (e) {
									i(e)
								}
							}
							function a(e) {
								try {
									c(r.throw(e))
								} catch (e) {
									i(e)
								}
							}
							function c(e) {
								var t
								e.done
									? n(e.value)
									: ((t = e.value),
									  t instanceof o
											? t
											: new o(function (e) {
													e(t)
											  })).then(s, a)
							}
							c((r = r.apply(e, t || [])).next())
						})
					}
				Object.defineProperty(t, '__esModule', { value: !0 })
				const n = o(543),
					i = o(61)
				e.exports = n.create({
					start() {
						console.log(`${this.name} helper method started...`)
					},
					requestStocks(e) {
						return r(this, void 0, void 0, function* () {
							let t = []
							for (const o of e.stocks)
								try {
									const { summaryDetail: e, price: r } = yield i.default.quoteSummary(o.symbol)
									if (e && r) {
										const n = { symbol: o.symbol, name: o.name, quantity: o.quantity }
										t.push({ summaryDetail: e, price: r, meta: n })
									}
								} catch (e) {
									console.error('There was an error requesting the API.', e.message)
								}
							return t
						})
					},
					socketNotificationReceived(e, t) {
						return r(this, void 0, void 0, function* () {
							if (e) {
								const e = yield this.requestStocks(t)
								this.sendSocketNotification('STOCKS_RESULT', e)
							} else console.warn(`${e} is invalid notification`)
						})
					}
				})
			},
			543: (e) => {
				e.exports = require('node_helper')
			},
			61: (e) => {
				e.exports = require('yahoo-finance2')
			}
		},
		t = {},
		o = (function o(r) {
			var n = t[r]
			if (void 0 !== n) return n.exports
			var i = (t[r] = { exports: {} })
			return e[r].call(i.exports, i, i.exports, o), i.exports
		})(944)
	module.exports = o
})()
