import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TabGroup from '../TabGroup';

describe('TabGroup specs', () => {
	test('should only have one icon item when collapsed and vertical orientation when there is a tab without an icon', () => {
		render(
			<TabGroup
				data-testid="tabs"
				orientation="vertical"
				collapsed
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button'},
					{title: 'Item', icon: 'plus'}
				]}
			/>
		);
		const tabGroup = screen.getByTestId('tabs');

		const expectedCode = 983019;  // decimal converted charCode of Unicode 'horizontal lines' character
		const actualCode = tabGroup.textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});

	test('should only have 3 item tabs when 3 tabs were specified', () => {
		render(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 3;
		const actual = screen.getByRole('group').children;

		expect(actual).toHaveLength(expected);
	});

	test('should render icons', () => {
		render(
			<TabGroup
				tabs={[
					{title: '', icon: 'home', 'data-testid': 'homeIcon'},
					{title: '', icon: 'demosync', 'data-testid': 'demosyncIcon'},
					{title: '', icon: 'playcircle', 'data-testid': 'playcircleIcon'}
				]}
			/>
		);
		const actualHomeIcon = screen.getByTestId('homeIcon').textContent.codePointAt();
		const expectedHomeIcon = 983227; // decimal converted charCode of Unicode 'home' character
		const actualDemosyncIcon = screen.getByTestId('demosyncIcon').textContent.codePointAt();
		const expectedDemosyncIcon = 983355; // decimal converted charCode of Unicode 'demosync' character
		const actualPlayCircleIcon = screen.getByTestId('playcircleIcon').textContent.codePointAt();
		const expectedPlayCircleIcon = 983312; // decimal converted charCode of Unicode 'playcircle' character

		expect(actualHomeIcon).toBe(expectedHomeIcon);
		expect(actualDemosyncIcon).toBe(expectedDemosyncIcon);
		expect(actualPlayCircleIcon).toBe(expectedPlayCircleIcon);
	});

	test('should disable the list icon when collapsed and all tabs are disabled', () => {
		render(
			<TabGroup
				data-testid="tabGroup"
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: true},
					{title: 'Item', disabled: true}
				]}
			/>
		);
		const iconList = screen.getByTestId('tabGroup').children.item(0);

		expect(iconList).toHaveAttribute('aria-disabled', 'true');
	});

	test('should not disable the list icon when collapsed and all tabs are not disabled', () => {
		render(
			<TabGroup
				data-testid="tabGroup"
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: false},
					{title: 'Item', disabled: true}
				]}
			/>
		);
		const iconList = screen.getByTestId('tabGroup').children.item(0);

		expect(iconList).toHaveAttribute('aria-disabled', 'false');
	});

	test('should fire `onTabClick` with `onTabClick` type when a tab is clicked', () => {
		const handleTabClick = jest.fn();
		render(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home', onTabClick: handleTabClick},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		userEvent.click(screen.getByRole('group').children[0]);

		const expected = {type: 'onTabClick'};
		const actual = handleTabClick.mock.calls.length && handleTabClick.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});
});
