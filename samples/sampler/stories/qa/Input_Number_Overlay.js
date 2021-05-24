import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';

import {buttons, propOptions, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Number/Overlay',
	component: 'InputField'
};

export const Length4 = () => (
	<Input
		title="Overlay Input (4)"
		subtitle={inputData.numberSubtitle}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', propOptions.size, Config)}
		type={select('type', propOptions.numberTypes, Config, 'number')}
		popupType="overlay"
		length={4}
	>
		{buttons[select('buttons', propOptions.buttons, Config)]}
	</Input>
);

Length4.storyName = 'length 4';
Length4.parameters = {
	info: {
		text: 'Uses a short-number form of number input.'
	}
};

export const Length10 = () => (
	<Input
		title="Overlay Input (10)"
		subtitle={inputData.numberSubtitle}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', propOptions.size, Config)}
		type={select('type', propOptions.numberTypes, Config, 'number')}
		popupType="overlay"
		length={10}
	>
		{buttons[select('buttons', propOptions.buttons, Config)]}
	</Input>
);

Length10.storyName = 'length 10';
Length10.parameters = {
	info: {
		text: 'Uses a long-number form of number input.'
	}
};

export const LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="overlay"
		type="number"
		defaultOpen
	/>
);

LongTitles.storyName = 'long titles';
LongTitles.parameters = {
	info: {
		text: 'Test the input popup\'s maximum bounds.'
	}
};

export const NoTitles = () => (
	<Input
		popupType="overlay"
		type="number"
		defaultOpen
	/>
);

NoTitles.storyName = 'no titles';
NoTitles.parameters = {
	info: {
		text: 'No titles, just an input field.'
	}
};

export const LongInvalidTooltip = () => (
	<Input
		title="Overlay Input (invalid tooltip)"
		subtitle={inputData.numberSubtitle}
		popupType="overlay"
		type="number"
		invalid={boolean('invalid', Config, true)}
		invalidMessage={inputData.longInvalidTooltip}
		defaultOpen
	/>
);

LongInvalidTooltip.storyName = 'long invalid tooltip';
LongInvalidTooltip.parameters = {
	info: {
		text: 'Test the input popup\'s long invalid tooltip.'
	}
};
