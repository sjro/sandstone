import ImageItem from '@enact/sandstone/ImageItem';
import {useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SelectableImageItem = (props) => {
	const [checked, setChecked] = useState(false);
	const handleClick = () => !props.disabled && setChecked(!checked); // eslint-disable-line enact/prop-types

	return <ImageItem {...props} onClick={handleClick} selected={checked} />; // eslint-disable-line react/jsx-no-bind
};

const labelAndSrc = {
	label: 'Label',
	src: 'http://via.placeholder.com/200x200/7ed31d/ffffff'
};

const ImageItemView = () => (
	<>
		<Section title="Default">
			<ImageItem
				{...labelAndSrc}
				alt="With Children and Label"
				orientation="horizontal"
			>
				Text 0
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="With Children, Label, and showSelection"
				orientation="horizontal"
				showSelection
			>
				Text 1
			</SelectableImageItem>

			<ImageItem
				{...labelAndSrc}
				alt="Disabled and Selected with Children, Label, and showSelection"
				disabled
				orientation="horizontal"
				selected
				showSelection
			>
				Text 2
			</ImageItem>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ImageItem
				{...labelAndSrc}
				alt="Aria-labelled with Children and Label"
				aria-label="This is a Label 0."
				orientation="horizontal"
			>
				Text 0
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="Aria-labelled with showSelection"
				aria-label="This is a Label 1."
				orientation="horizontal"
				showSelection
			>
				Text 1
			</SelectableImageItem>

			<ImageItem
				{...labelAndSrc}
				alt="Aria-labelled and Disabled with Children and Label"
				aria-label="This is a Label 2."
				disabled
				orientation="horizontal"
			>
				Text 2
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="Aria-labelled and Disabled with showSelection"
				aria-label="This is a Label 3."
				disabled
				orientation="horizontal"
				showSelection
			>
				Text 3
			</SelectableImageItem>
		</Section>
	</>
);

export default ImageItemView;
