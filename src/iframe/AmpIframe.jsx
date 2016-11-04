import React from 'react';

/**
 * Amp iframe
 *
 * @class AmpIframe
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

let AmpIframe = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;
	let attributes = {
		src: props.src,
		width: props.width,
		height: props.height,
		scrolling: props.scrolling,
		layout: props.layout,
		sandbox: props.sandbox,
		frameBorder: props.frameBorder,
		class: props.className
	};
	if (props.allowFullScreen) {
		attributes.allowFullScreen = '';
	}

	return (
		<amp-iframe {...attributes} {...helper.getDataProps(props)}>
			<div placeholder='' />
		</amp-iframe>
	);
};

export default AmpIframe;
