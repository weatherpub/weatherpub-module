define(['./axios', './vue', './init'],
	function (axios, vue, init) {

		const getAPI = {
			baseURL: "https://weather.ls.hereapi.com/weather/1.0/report.json?",
			key: "z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc",
			metric: false,
			product: "forecast_hourly",
			zip: 94606,

			apiHourly: function () {
				return this.baseURL + "product=" + this.product + "&apiKey=" + this.key + "&zipcode=" + this.zip + "&metric=" + this.metric;
			},
		};

		const api = getAPI.apiHourly();

		console.log("Hourly ", api);

		new vue({
			el: '#hourly',
			data() {
				return {
					hrly: []
				}
			},
			template: `<div>
							<div class="row">
								<div class="col-12" style="font-size: 14px;font-weight: bold;">Hourly Forecast</div>
							</div>
							<div class="row">
								<div class="col-12" v-for="h in hrly">{{h.weekday}}</div>
							</div>
						</div>`,
			mounted() {
				axios.get(api).then(response => (
					this.hrly = response.data.hourlyForecasts.forecastLocation.forecast
				)).catch(function (error) {
					console.log(error)
				}).then(function () {
					console.log("Forecast Module");
				})
			}
		})
	});
