import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

class PopupView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open0: false,
			open1: false,
			open2: false,
			open3: false,
			open4: false
		};

		this.handleOpen0 = this.handleOpen(0);
		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);
		this.handleOpen4 = this.handleOpen(4);

		this.handleClose0 = this.handleClose(0);
		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
		this.handleClose4 = this.handleClose(4);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true});

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false});

	render () {
		const {open0, open1, open2, open3, open4} = this.state;

		return (
			<>
				<Section title="Default">
					<Button alt="Normal" onClick={this.handleOpen0}>Open 0</Button>
					<Button alt="Long Text" onClick={this.handleOpen1}>Open 1</Button>
					<Button alt="With Scroller" onClick={this.handleOpen2}>Open 2</Button>
					<Button alt="With Buttons" onClick={this.handleOpen3}>Open 3</Button>
				</Section>

				<Section title="Aria-labelled">
					<Button alt="Aria-lablled with Buttons" onClick={this.handleOpen4}>Open 4</Button>
				</Section>

				<Popup
					onClose={this.handleClose0}
					open={open0}
				>
					<span>Content</span>
				</Popup>

				<Popup
					onClose={this.handleClose1}
					open={open1}
				>
					<span>
						Enact is a framework designed to be performant, customizable and well structured.
						<br />
						The goal in creating Enact was to build upon the experience gained in producing the Enyo JavaScript framework and to incorporate the latest advances in JavaScript and Web engine technology.
						<br />
						Enact is designed to be used by both novice and expert developers.
						<br />
						Why Enact?
						<br />
						Ease of Use
						<br />
						Enact builds atop the excellent React library, and provides a full framework to the developer.
						<br />
						The recent boom of web technologies and related tools has led to a plethora of options available.
						<br />
						In fact, getting started might be the most difficult part of building a modern web application.
						<br />
						Enact allows developers to avoid this pain by providing an opinionated collection of libraries and tools that have been thoroughly vetted to work well together.
					</span>
				</Popup>

				<Popup
					onClose={this.handleClose2}
					open={open2}
				>
					<Button>Button Outside Scroller</Button>
					<Scroller style={{height: ri.scaleToRem(170), marginTop: ri.scaleToRem(10)}}>
						<Item>Item 0</Item>
						<Item>Item 1</Item>
						<Item>Item 2</Item>
						<Item>Item 3</Item>
						<Item>Item 4</Item>
						<Item>Item 5</Item>
						<Item>Item 6</Item>
						<Item>Item 7</Item>
						<Item>Item 8</Item>
						<Item>Item 9</Item>
					</Scroller>
				</Popup>

				<Popup
					onClose={this.handleClose3}
					open={open3}
					role="dialog"
				>
					<Heading showLine>Heading</Heading>
					<Button>Text 0</Button>
					<Button>Text 1</Button>
				</Popup>

				<Popup
					aria-label="This is a Label."
					onClose={this.handleClose4}
					open={open4}
				>
					<Heading showLine>Heading</Heading>
					<Button>Text 0</Button>
					<Button>Text 1</Button>
				</Popup>
			</>
		);
	}
}

export default PopupView;
