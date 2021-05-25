define(['./axios', './vue', './init'],
	function (axios, vue, init) {

		const getAPI = {
			baseURL: "https://weather.ls.hereapi.com/weather/1.0/report.json?",
			key: "z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc",
			metric: false,
			zip: 94606,

			apiConcat: function (product, metric) {
				return this.baseURL + "product=" + product + "&apiKey=" + this.key + "&zipcode=" + this.zip + "&metric=" + metric;
			},

			apiForecast: function () {
				return this.apiConcat("forecast_7days_simple", false);
			}
		}

		const api = getAPI.apiForecast();

		vue.component('daily-forecast', {
			props: ['description'], 
			template: ` <div class="row">
								<span class="col-3">
									<div>{{description}}</div>
								</span>
							</div>`
		})

		new vue({
			el: '#forecast',
			data() {
				return {
					fct: []
				}
			},
			template: `<div><daily-forecast v-for="f in fct" :description="f.skyDescription"></daily-forecast></div>`,
			mounted() {
				axios.get(api).then(response => (
					this.fct = response.data.dailyForecasts.forecastLocation.forecast
				)).catch(function (error) {
					console.log(error)
				}).then(function () {
					console.log("Forecast Module");
				})
			}
		})
	});
