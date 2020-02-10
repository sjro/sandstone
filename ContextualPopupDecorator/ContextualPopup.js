import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Skinnable from '../Skinnable';

import css from './ContextualPopup.module.less';

/**
 * An SVG arrow for {@link sandstone/ContextualPopupDecorator/ContextualPopup.ContextualPopup}.
 *
 * @class ContextualPopupArrow
 * @memberof sandstone/ContextualPopupDecorator
 * @ui
 * @private
 */
const ContextualPopupArrow = kind({
	name: 'ContextualPopupArrow',

	propTypes: /** @lends sandstone/ContextualPopupDecorator.ContextualPopupArrow.prototype */ {
		direction: PropTypes.oneOf(['above', 'below', 'left', 'right'])
	},

	defaultProps: {
		direction: 'below'
	},

	styles: {
		css,
		className: 'arrow'
	},

	computed: {
		className: ({direction, styler}) => styler.append(direction, css.arrow)
	},

	render: (props) => (
		<svg {...props} viewBox="0 0 30 30">
			<path d="M0 18 L15 0 L30 18" className={css.arrowBorder} />
			<path d="M15 2 L0 20 L30 20 Z" className={css.arrowFill} />
		</svg>
	)
});

const ContextualPopupRoot = Skinnable(
	{defaultSkin: 'light'},
	'div'
);

/**
 * A popup component used by
 * [ContextualPopupDecorator]{@link sandstone/ContextualPopupDecorator.ContextualPopupDecorator} to
 * wrap its
 * [popupComponent]{@link sandstone/ContextualPopupDecorator.ContextualPopupDecorator.popupComponent}.
 *
 * `ContextualPopup` is usually not used directly but is made available for unique application use
 * cases.
 *
 * @class ContextualPopup
 * @memberof sandstone/ContextualPopupDecorator
 * @ui
 * @public
 */
const ContextualPopupBase = kind({
	name: 'ContextualPopup',

	propTypes: /** @lends sandstone/ContextualPopupDecorator.ContextualPopup.prototype */ {
		/**
		 * The contents of the popup.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Style object for arrow position.
		 *
		 * @type {Object}
		 * @public
		 */
		arrowPosition: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),
		/**
		 * Direction of ContextualPopup.
		 *
		 * Can be one of: `'up'`, `'down'`, `'left'`, or `'right'`.
		 *
		 * @type {('up'|'down'|'left'|'right')}
		 * @default 'down'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below', 'left', 'right']),

		/**
		 * Called when the close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onCloseButtonClick: PropTypes.func,

		/**
		 * Style object for container position.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),

		/**
		 * Shows the arrow.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showArrow: PropTypes.bool,

		/**
		 * Shows the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showCloseButton: PropTypes.bool,

		/**
		 * Called with the reference to the container node.
		 *
		 * @type {Function}
		 * @public
		 */
		tooltipRef: PropTypes.func

	},

	defaultProps: {
		direction: 'down',
		showCloseButton: false
	},

	styles: {
		css,
		className: 'container'
	},

	computed: {
		className: ({showCloseButton, styler}) => styler.append({reserveClose: showCloseButton}),
		closeButton: ({showCloseButton, onCloseButtonClick}) => {
			if (showCloseButton) {
				return (
					<Button
						aria-label={$L('Close')}
						backgroundOpacity="transparent"
						className={css.closeButton}
						icon="closex"
						onTap={onCloseButtonClick}
						size="small"
					/>
				);
			}
		}
	},

	render: ({arrowPosition, position, tooltipRef, children, className, closeButton, direction, showArrow, ...rest}) => {
		delete rest.onCloseButtonClick;
		delete rest.showCloseButton;

		return (
			<ContextualPopupRoot aria-live="off" role="alert" {...rest} className={css.contextualPopup}>
				<div className={className} style={position} ref={tooltipRef}>
					{children}
					{closeButton}
				</div>
				{showArrow ? <ContextualPopupArrow direction={direction} style={arrowPosition} /> : null}
			</ContextualPopupRoot>
		);
	}
});

export default ContextualPopupBase;
export {
	ContextualPopupBase as ContextualPopup,
	ContextualPopupBase
};
