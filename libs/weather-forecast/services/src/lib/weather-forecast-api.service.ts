import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private _apiGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
	private _apiDataUrl = 'https://api.openweathermap.org/data/2.5/onecall';

	constructor(private readonly httpClient: HttpClient) {

	}

	public getCity = (cityName: string): Observable<any> => {
		return this.httpClient.get<any>(`${this._apiGeoUrl}?q=${cityName}&limit=1&appid=${this._apiKey}`);
	}

	public getDailyData = (lat: number, lon: number): Observable<any> => {
		return this.httpClient.get<any>(`${this._apiDataUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this._apiKey}`);
	}

	public getHourlyData = (lat: number, lon: number): Observable<any> => {
		return this.httpClient.get<any>(`${this._apiDataUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this._apiKey}`);
	}
}