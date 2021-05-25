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

		vue.component('button-counter', {s
			: ['title'],
			data: function () {
				return {
					count: 0
				}
			},
			template: '<div v-on:click="count++">{{ count }}-{{title}}</div>'
		})

		new vue({
			el: '#component'
		})

		new vue({
			el: '#forecast',
			data() {
				return {
					fct: []
				}
			},
			//this needs a loop to render out the days, don't forget the outer div or ul tag

			template: `<div>
							<div class="row">
								<div class="col-12" style="font-size: 14px;font-weight: bold;">Daily Forecast</div>
							</div>
							<div class="row">
								<span class="col-3" v-for="f in fct">
									<div>{{f.skyDescription}}</div>
									<img v-bind:src="f.iconLink" style="height: 30px">
								</span>
							</div>
						</div>`,
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
