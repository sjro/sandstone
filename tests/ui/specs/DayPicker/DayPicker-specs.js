const Page = require('./DayPickerPage');

describe('DayPicker', function () {
	beforeEach(function () {
		Page.open();
	});

	// const {defaultDayPicker, disabledDayPicker, selectedDayPicker, selectedDisabledDayPicker} = Page.components;

	describe('default', function() {
		const dayPicker = Page.components.defaultDayPicker;

		// it('should have focus on first option on start', function() {
		// 	expect(dayPicker.item(0).isFocused()).to.be.true();
		// });
		//
		// it('should move focus on second option with 5-Way Down', function() {
		// 	Page.spotlightDown();
		// 	expect(dayPicker.item(1).isFocused()).to.be.true();
		// });

		it('should check with enter', function() {
			Page.spotlightSelect();
			// console.log(dayPicker.item(0));
			expect(dayPicker.item(0).isSelected()).to.be.true();
			// console.log(dayPicker.item(1));
		});
	});
});