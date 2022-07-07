/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const configUuid = 'e39f9811-1111-493b-b258-e964a1e33cf4';

/**
 * We declare an object on the window called talkativeCustomConfig - the chat widget will look for this and fire the
 * callbacks when it reaches that part of its lifecycle.
 *
 * Please note: you can only declare this object once on the window, declaring it again will override the first instance of it.
 */
window.talkativeCustomConfig = {
	customTracking() {
		/**
		 * This callback will receive events which you can then manually send to your tracking system, or anywhere you would like to send them, the primary events
		 * are as follows:
		 *
		 * enterStandby
		 * enterInteraction
		 * resumeInteraction
		 * exitInteraction
		 * completeInteraction
		 *
		 * You may see additional events which contain these events with the suffix representing the feature type
		 * chat, video etc.
		 *
		 * Here we console.log the arguments, which is an object of data this can be sent to your custom tracking provider
		 *
		 * NB: arguments is the variable name you must use here, you cannot change this to a different variable name
		 */
		console.log('event', arguments);
	},
};

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly.
 */
import(`https://eu.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin + window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`);


