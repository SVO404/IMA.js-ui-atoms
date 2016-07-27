import React from 'react';

/**
 * Amp video player.
 *
 * @class AmpVideo
 * @namespace ima.ui.atom.video
 * @module ima
 * @submodule ima.ui
 */

export default function AmpVideo(props) {
	return (
		<amp-video
				src = { props.src }
				poster = { props.poster }
				autoplay = { props.autoplay }
				controls = { props.controls }
				loop = { props.loop }
				muted = { props.muted }
				width = { props.width }
				height = { props.height }
				layout = { props.layout }
				class = { props.className }>
			<div placeholder='' />
			{props.children}
		</amp-video>
	);
};