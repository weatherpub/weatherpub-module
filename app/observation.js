define(['./axios', './vue', './init', './config'],
	function (axios, vue, init, config) {

		const getAPI = {
			baseURL: "https://weather.ls.hereapi.com/weather/1.0/report.json?",
			key: "z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc",
			product: "observation",
			metric: false,
			zip: 94606,

			apiObservation: function () {
				return this.baseURL + "product=" + this.product + "&oneobservation=" + true + "&apiKey=" + this.key + "&zipcode=" + this.zip + "&metric=" + this.metric;
			}
		}

		const api = getAPI.apiObservation();

		var scale = {
			fahrenheit: 'F',
			celsius: 'C'
		};

		vue.component('observation-forecast', {
			props: ['city', 'state', 'img', 'scale', 'temp', 'desc'],
			methods: {
				showUp: function() {
					console.log("hello");
					scale = "C" 
				}
			},
			template: `<div>
							<div class="row">
								<div class="col-12">{{city}}, {{state}}</div>
							</div>
							<div class="row no-gutters">
								<div class="col-2"><img :src='img'></div>
								<div class="col-2" v-on:click="showUp()">{{scale}}</div>
								<div class="col-2">{{temp}}</div>
								<div class="col-6">{{desc}}</div>
							</div>
						</div>`,
		})

		new vue({
			el: '#chgFCT'
		})

		new vue({
			el: '#region',
			data() {
				return {
					loc: [],
					obs: [],
					scale: scale.fahrenheit
				}
			},
			template: '<observation-forecast :city="loc.city" :state="loc.state" :img="obs.iconLink" :scale="scale" :temp="obs.temperature" :desc="obs.description"></observation-forecast>',
			mounted() {
				axios.get(api)
					.then(response => (
						this.loc = response.data.observations.location[0],
						this.obs = response.data.observations.location[0].observation[0]
					)).catch(function (error) {
						console.log(error)
					}).then(function () {
						console.log("Observation Module");
					})
			}
		})
	});
