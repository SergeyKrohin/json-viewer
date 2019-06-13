import { AbstractControl } from '@angular/forms';

export function ContainedInList(values) {
	return (control: AbstractControl) => {
		if(values.indexOf(control.value) !== -1) {
			return null;
		} else {
			return {'isInList': true};
		}
	};
}