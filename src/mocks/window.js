let _window = {
	getWindow() {
		return {
			innerWidth: 1024,
			innerHeight: 768
		};
	},
	bindEventListener: () => {},
	unbindEventListener: () => {},
	isClient: () => true
};

export default _window;
