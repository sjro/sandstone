import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import ComponentOverride from '@enact/ui/ComponentOverride';
import ForwardRef from '@enact/ui/ForwardRef';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';
import SharedStateDecorator from '../internal/SharedStateDecorator';

import {ContextAsDefaults} from '../internal/Panels/util';

import componentCss from './Panel.module.less';

let panelId = 0;

/**
 * A Panel is the standard view container used inside a [Panels]{@link sandstone/Panels.Panels} view
 * manager instance.
 *
 * [Panels]{@link sandstone/Panels.Panels} will typically contain several instances of these and
 * transition between them.
 *
 * @class Panel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const PanelBase = kind({
	name: 'Panel',


	propTypes: /** @lends sandstone/Panels.Panel.prototype */ {
		/**
 		 * The "aria-label" for the Panel.
		 *
		 * By default, the panel will be labeled by its [Header]{@link sandstone/Panels.Header}.
		 * When `aria-label` is set, it will be used instead to provide an accessibility label for
		 * the panel.
		 *
		 * @memberof sandstone/Panels.Panel.prototype
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `panel` - The root class name
		 * * `body` - The node containing the panel's children
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Header for the panel.
		 *
		 * This is usually passed by the [Slottable]{@link ui/Slottable.Slottable} API by using a
		 * [Header]{@link sandstone/Panels.Header} component as a child of the Panel.
		 *
		 * @type {Header}
		 * @public
		 */
		header: PropTypes.node,

		/**
		 * Hides the body components.
		 *
		 * When a Panel is used within [`Panels`]{@link sandstone/Panels.Panels} this property will
		 * be set automatically to `true` on render and `false` after animating into view.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		hideChildren: PropTypes.bool
	},

	defaultProps: {
		autoFocus: 'last-focused',
		hideChildren: false
	},

	styles: {
		css: componentCss,
		className: 'panel',
		publicClassNames: ['panel', 'body']
	},

	handlers: {
		onScroll: handle(
			forward('onScroll'),
			({currentTarget}) => {
				currentTarget.scrollTop = 0;
				currentTarget.scrollLeft = 0;
			}
		)
	},

	computed: {
		children: ({children, hideChildren}) => hideChildren ? null : children,
		bodyClassName: ({css, header, hideChildren, styler}) => styler.join(css.body, {
			noHeader: !header,
			visible: !hideChildren
		}),
		entering: ({hideChildren}) => (hideChildren && Spotlight.getPointerMode()),
		// nulling headerId prevents the aria-labelledby relationship which is necessary to allow
		// aria-label to take precedence
		// (see https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby)
		headerId: ({'aria-label': label}) => label ? null : `panel_${++panelId}_header`
	},

	render: ({
		bodyClassName,
		children,
		componentRef,
		css,
		entering,
		header,
		headerId,
		...rest
	}) => {
		delete rest.autoFocus;
		delete rest.hideChildren;

		return (
			<article role="region" {...rest} aria-labelledby={headerId} ref={componentRef}>
				<div className={css.header} id={headerId}>
					<ComponentOverride
						component={header}
						entering={entering}
					/>
				</div>
				<section className={bodyClassName}>{children}</section>
			</article>
		);
	}
});

function useAutoFocus ({autoFocus, hideChildren}) {
	return React.useCallback((node) => {
		if (!node) return;

		// FIXME: This is a candidate to move to the decorator once hooks have been fully
		// adopted and we can configure SpotlightContainerDecorator with the current props
		const {spotlightId} = node.dataset;
		const config = {
			enterTo: 'last-focused'
		};

		if (autoFocus !== 'last-focused') {
			config.enterTo = 'default-element';

			if (autoFocus !== 'default-element') {
				config.defaultElement = autoFocus;
			}
		}

		Spotlight.set(spotlightId, config);

		// In order to spot the body components, we defer spotting until !hideChildren. If the
		// Panel opts out of hideChildren support by explicitly setting it to false, it'll spot
		// on first render.
		if (!hideChildren && autoFocus !== 'none' && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
			Spotlight.focus(spotlightId);
		}
	}, [autoFocus, hideChildren]);
}

function updateRef (ref, node) {
	if (ref) {
		if (typeof ref === 'function') {
			ref(node);
		} else if (ref.hasOwnProperty('current')) {
			ref.current = node;
		}
	}
}
function useChainRefs (ref1, ref2, ref3, ref4) {
	return React.useCallback((node) => {
		updateRef(ref1, node);
		updateRef(ref2, node);
		updateRef(ref3, node);
		updateRef(ref4, node);
	}, [ref1, ref2, ref3, ref4]);
}

const AutoFocusDecorator = Wrapped => function AFD ({autoFocus, componentRef, hideChildren, ...rest}) {
	const hook = useAutoFocus({autoFocus, hideChildren});
	const ref = useChainRefs(componentRef, hook);

	return <Wrapped {...rest} componentRef={ref} />;
};


/**
 * Sets the strategy used to automatically focus an element within the panel upon render.
 *
 * * "none" - Automatic focus is disabled
 * * "last-focused" - The element last focused in the panel with be restored
 * * "default-element" - The first spottable component within the body will be focused
 * * Custom Selector - A custom CSS selector may also be provided which will be used to find
 *   the target within the Panel
 *
 * When used within [Panels]{@link sandstone/Panels.Panels}, this prop may be set by
 * `Panels` to "default-element" when navigating "forward" to a higher index. This behavior
 * may be overridden by setting `autoFocus` on the `Panel` instance as a child of `Panels`
 * or by wrapping `Panel` with a custom component and overriding the value passed by
 * `Panels`.
 *
 * ```
 * // Panel within CustomPanel will always receive "last-focused"
 * const CustomPanel = (props) => <Panel {...props} autoFocus="last-focused" />;
 *
 * // The first panel will always receive "last-focused". The second panel will receive
 * // "default-element" when navigating from the first panel but `autoFocus` will be unset
 * // when navigating from the third panel and as a result will default to "last-focused".
 * const MyPanels = () => (
 *   <Panels>
 *     <Panel autoFocus="last-focused" />
 *     <Panel />
 *     <Panel />
 *   </Panels>
 * );
 * ```
 *
 * @type {String}
 * @memberof sandstone/Panels.Panel.prototype
 * @default 'last-focused'
 * @public
 */

const PanelDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	ContextAsDefaults,
	SharedStateDecorator({idProp: 'data-index'}),
	SpotlightContainerDecorator({
		// prefer any spottable within the panel body for first render
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `.${componentCss.body} *`],
		enterTo: 'last-focused',
		preserveId: true
	}),
	Slottable({slots: ['header']}),
	AutoFocusDecorator,
	Skinnable
);

/**
 * Prevents the component from restoring any framework shared state.
 *
 * When `false`, the default, Panel will store state for some framework components in order to
 * restore that state when returning to the Panel. Setting this prop to `true` will suppress that
 * behavior and not store or retrieve any framework component state.
 *
 * @name noSharedState
 * @type {Boolean}
 * @default false
 * @memberof sandstone/Panels.Panel.prototype
 */

const Panel = PanelDecorator(PanelBase);

export default Panel;
export {Panel, PanelBase, PanelDecorator};
