import { Injectable } from '@angular/core';

export default class UtilitiesService {
	
	static getClass(object) {
		return Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
	}
	
}