import { Component } from '@angular/core';

@Component({
	selector: 'json-viewer',
	templateUrl: './json-viewer.component.html',
	styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent{
	public sourceObj = {
		"a": "Hello, World!",
		"x": true,
		"b": {
			"c": {
				"d": {
					"e": 123,
					"f": true,
					"g": "A string."
				}
			}
		},
		"h": "1",
		"i": true,
		"j": {
			"k": {
				"l": "Test!",
				"m": true,
				"n": false,
				"o": {
					"p": 987,
					"q": 5,
					"r": 1,
					"s": {
						"t": true,
						"u": "This is where it ends."
					}
				}
			}
		}
	};
	
	public validate() {
		console.log('validating..', this.sourceObj);
	}
}
