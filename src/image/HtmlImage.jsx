import React from 'react';
import ReactDOM from 'react-dom';
import Loader from '../loader/Loader';
import Sizer from '../sizer/Sizer';

const EXTENDED_PADDING = 300;

/**
 * Html image
 *
 * @class HtmlImage
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

export default class HtmlImage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			noloading: props.noloading || false,
			visibleOnViewport: false
		};

		this._mounted = false;
		this._throttledCheckVisibility = this.utils.$Helper.throttle(this._checkVisibility, 333, this);
	}

	get utils() {
		return this.context.$Utils || this.props.$Utils;
	}

	componentDidMount() {
		this._mounted = true;
		if (this.state.noloading === false) {
			this._bindEventListeners();
			this._checkVisibility();
		}
	}

	componentWillUnmount() {
		this._mounted = false;
		this._unbindEventListeners();
	}


	render() {
		return (
			<div
					className = {this.utils.$UIComponentHelper.cssClasses({
						'atm-image': true,
						'atm-overflow': true,
						'atm-placeholder': !this.state.noloading,
						'atm-responsive': this.props.layout === 'responsive',
						'atm-fill': this.props.layout === 'fill'
					}, true)}
					style = {
						this.props.layout === 'responsive' ?
							{}
						:
							{
								width: this.props.width || 'auto',
								height: this.props.height || 'auto'
							}
					}>
				{
					this.props.layout === 'responsive' ?
						<Sizer
								width = {this.props.width}
								height = {this.props.height}
								placeholder = {!this.state.noloading}/>
					:
						null
				}
				{
					this.state.noloading ?
						<img
								src = { this.props.src }
								srcSet = { this.props.srcSet }
								alt = { this.props.alt }
								className = {this.utils.$UIComponentHelper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.noloading && this.state.visibleOnViewport
								})} />
					:
						<Loader mode = 'small' layout = 'center'/>
				}
				<noscript
						dangerouslySetInnerHTML = {{
							__html: `<img
								src="${this.props.src || ''}"
								srcset="${this.props.srcSet || ''}"
								alt="${this.props.alt || ''}"
								class="atm-fill atm-loaded"`
						}}/>
			</div>
		);
	}

	_unbindEventListeners() {
		this.utils.$Window.unbindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.utils.$Window.unbindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_bindEventListeners() {
		this.utils.$Window.bindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.utils.$Window.bindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_findDOMNode() {
		return ReactDOM.findDOMNode(this);
	}

	_checkVisibility() {
		if (this._mounted) {
			let clientRect = this._findDOMNode().getBoundingClientRect();

			let elmRectStyle = {
				top: clientRect.top - EXTENDED_PADDING,
				left: clientRect.left - EXTENDED_PADDING,
				width: clientRect.width + EXTENDED_PADDING,
				height: (clientRect.height || this.props.height || 0 / this.props.width || 0 * clientRect.width) + EXTENDED_PADDING
			};


			if (this.state.visibleOnViewport === false &&
					this.utils.$UIComponentHelper.getPercentOfVisibility(elmRectStyle) > 0) {
				this._preLoadImage();
				this._unbindEventListeners();
				this.setState({ visibleOnViewport: true });
			}
		}
	}

	_preLoadImage() {
		let image = new Image();

		image.onload = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};
		image.onerror = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};

		if (this.props.src) {
			image.src = this.props.src;
		} else {

			if (this._mounted) {
				this.setState({ noloading: true });
			}
		}
	}
}

HtmlImage.contextTypes = {
	$Utils: React.PropTypes.object
};
