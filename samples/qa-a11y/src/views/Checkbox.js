import Checkbox from '@enact/sandstone/Checkbox';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const CheckboxView = () => (
	<>
		<Section title="Default">
			<Checkbox alt="Normal" />
			<Checkbox alt="Disabled" disabled />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Checkbox alt="Aria-labelled" aria-label="This is a Label." />
			<Checkbox alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled />
		</Section>
	</>
);

export default CheckboxView;
