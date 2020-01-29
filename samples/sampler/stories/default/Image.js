import {action} from '@enact/storybook-utils/addons/actions';
import {object, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Image, {ImageBase, ImageDecorator} from '@enact/sandstone/Image';

const src = {
	'hd':  'http://via.placeholder.com/200x200',
	'fhd': 'http://via.placeholder.com/300x300',
	'uhd': 'http://via.placeholder.com/600x600'
};

const Config = mergeComponentMetadata('Image', Image, ImageBase, ImageDecorator);
Image.displayName = 'Image';

storiesOf('Sandstone', module)
	.add(
		'Image',
		() => (
			<Image
				src={object('src', Config, src)}
				sizing={select('sizing', ['fill', 'fit', 'none'], Config, 'fill')}
				onError={action('error')}
				onLoad={action('loaded')}
				style={{
					border: '#ffa500 dashed 1px'
				}}
			>
				<label
					style={{
						border: '#ffa500 dashed 1px',
						borderBottomWidth: 0,
						borderRadius: '12px 12px 0 0',
						backgroundColor: 'rgba(255, 165, 0, 0.5)',
						color: '#fff',
						position: 'absolute',
						transform: 'translateX(-1px) translateY(-100%)',
						padding: '0.1em 1em',
						fontWeight: 100,
						fontStyle: 'italic',
						fontSize: '32px'
					}}
				>
					Image Boundry
				</label>
			</Image>
		),
		{
			info: {
				text: 'The basic Image'
			}
		}
	);
