import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'weather-forecast';
	city = '';
	type = 'hourly';
	weather: any = {
		daily: [],
		hourly: []
	};

	constructor(
		private readonly api: WeatherForecastApiService,
		private cdr: ChangeDetectorRef,
	) {

	}

	search(): void {
		this.weather.hourly = [];
		this.weather.daily = [];
		this.cdr.detectChanges();

		const citiesObject = JSON.parse(localStorage.getItem('cities') || '{}');
		if (citiesObject[this.city] == undefined) {
			this.api.getCity(this.city).subscribe({
				next: this.addCity,
				error: () => {
					alert("Couldn't find entered city.");
				}
			});
		} else {
			this.getWeather(citiesObject[this.city]);
		}
	}

	getWeather(cityObject: any): void {
		if (this.type == 'hourly') {
			this.api.getHourlyData(cityObject.lat, cityObject.lon).subscribe({
				next: (data) => {
					this.weather.hourly = data.hourly;
					this.cdr.detectChanges();
				},
				error: () => {
					alert("Couldn't find weather data.");
				}
			});
		} else {
			this.api.getDailyData(cityObject.lat, cityObject.lon).subscribe({
				next: (data) => {
					this.weather.daily = data.daily;
					this.cdr.detectChanges();
				},
				error: () => {
					alert("Couldn't find weather data.");
				}
			});
		}
	}

	addCity(data: any): void {
		if (!data[0]) {
			alert("Couldn't find entered city.");
			return;
		}
		const citiesObject = JSON.parse(localStorage.getItem('cities') || '{}');
		citiesObject[data[0].name] = data[0];
		localStorage.setItem('cities', JSON.stringify(citiesObject));

		this.getWeather(data);
	}
}
