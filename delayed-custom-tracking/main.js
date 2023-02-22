/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = 'd966af3a-1111-4e0a-8c69-89076b59c808';


/**
 * Set a pretend function to catch the output of the gtag custom tracking
 */
window.gtag = function () {
	console.log('gtag arguments', arguments);
};

/**
 * We declare an object on the window called talkativeCustomConfig - the chat widget will look for this and fire the
 * callbacks when it reaches that part of its lifecycle.
 *
 * Please note: you can only declare this object once on the window, declaring it again will override the first instance of it.
 */
window.talkativeCustomConfig = {
	customTracking: function() {
		const event = arguments[0];
		/**
		 * This code will create a timeout which will fire after 30 seconds. This timeout will be set after an interaction
		 * has been entered.
		 */
		if (event === 'enterInteraction') {
			window.talkativeCustomerEventTracker = setTimeout(() => {
				// Custom google tracking event
				if (typeof window.gtag === 'function') {
					window.gtag('event', 'enterInteraction30', {
						eventCategory: 'Talkative-Engage',
					});
				}
			}, 30000);
		}
		
		/**
		 * If we get an exitInteraction event, we clear the timeout which was set when the enterInteraction event was fired.
		 * If the timeout has already fired, this will do nothing.
		 */
		if (event === 'exitInteraction') {
			clearTimeout(window.talkativeCustomerEventTracker);
			window.talkativeCustomerEventTracker = null;
		}
	},
};

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin + window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`);


