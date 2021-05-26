'use strict';
const {Page, getComponent, componentSelector, hasClass, element} = require('@enact/ui-test-utils/utils');

// const isSelected = hasClass(componentSelector({component: 'Item', child: 'selected'}));

class DayPickerInterface {
	constructor(id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(this.selector));
	}

	item (index) {
		return element(
			`${componentSelector({component: 'Item'})}[data-index="${index}"]`,
			this.list
		);
	}

	get list() {
		return getComponent({component: 'DayPicker'}, browser);
	}

	isSelected () {
		return $(this.selector + ' .Item_Item_selected').isExisting();
	}
}

class DayPickerPage extends Page {
	constructor() {
		super();
		this.title = 'DayPicker Test';
		const defaultDayPicker = new DayPickerInterface('dayPickerDefault');
		const disabledDayPicker = new DayPickerInterface('dayPickerDisabled');
		const selectedDayPicker = new DayPickerInterface('dayPickerSelectedOption');
		const selectedDisabledDayPicker = new DayPickerInterface('dayPickerSelectedOptionDisabled');

		this.components = {defaultDayPicker, disabledDayPicker, selectedDayPicker, selectedDisabledDayPicker};
	}

	open (urlExtra) {
		super.open('DayPicker-View', urlExtra);
	}
}

module.exports = new DayPickerPage();
