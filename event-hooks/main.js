/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = 'd966af3a-927e-1111-8c69-89076b59c808';

const appendLog = (message) => {
	const el = document.getElementById('event-list');
	const date = new Date().toTimeString();
	const newLog = document.createElement('div');
	newLog.classList.add('grid', 'grid-cols-2', 'space-between', 'border', 'divide-x', 'divide-gray-200')
	newLog.innerHTML = `
		<div>${message}</div>
		<div>${date}</div>
	`;

	el.appendChild(newLog);
}

/**
 * We declare an object on the window called talkativeCustomConfig - the chat widget will look for this and fire the
 * callbacks when it reaches that part of its lifecycle.
 *
 * Please note: you can only declare this object once on the window, declaring it again will override the first instance of it.
 */
window.talkativeCustomConfig = {
	customTracking() {
		console.log('custom tracking args', arguments);
	},
	events: {
		enterDataCollection() {
			window.widgetIsCollectingData = true;
		},
		exitDataCollection() {
			window.widgetIsCollectingData = false;
		},
		enterStandby() {
			appendLog('standby entered')
			console.log('standby entered', arguments);
		},
		enterInteraction() {
			appendLog('interaction entered')
			console.log('interaction entered', arguments);
		},
		resumeInteraction() {
			appendLog('interaction resumed')
			console.log('interaction resumed', arguments);
		},
		exitInteraction() {
			// Exit interaction is triggered when an interaction ends, but before the feedback form is completed.
			console.log('interaction exited', arguments);
		},
		completeInteraction() {
			// Complete interaction is triggered when the feedback form is completed. This is the last event in the lifecycle.
			// If the user refreshes the pages when the feedback form option is presented, this will not be fired and
			// the feedback form will not be shown after the refresh, so won't ever be fired.
			appendLog('interaction complete');
			console.log('interaction complete', arguments);
		},
		ready() {
			appendLog('widget ready');
			console.log('armed and ready', arguments);
		},
		qosFail() {
			appendLog('qos failed');
			// This event is triggered when an interaction fails to start due to a qos check failing. ie, the user's connection is too slow
			// or the user's device is not supported or not available.
			console.log('qos failed', arguments);
		},
		presenceFail() {
			appendLog('presence failed');
			// This event is triggered when an interaction fails to start due to a presence check failing. ie, no agent available
			console.log('presence failed', arguments);
		},
		rateLimitFail() {
			appendLog('rate limit failed');
			// This is event is triggered when an interaction fails to start due to a rate limit being reached.
			console.log('rate limit failed', arguments);
		},
		visibilityChange({ visibility }) {
			// This event is triggered when the chat widget is hidden or shown. ie, when the chat button is clicked.
			if (visibility) {
				appendLog('chat widget is visible')
				console.log('chat widget is visible', arguments);
			} else {
				appendLog('chat widget is hidden')
				console.log('chat widget is hidden', arguments);
			}
		},
		sendEmail() {
			console.log('email sent', arguments);
		},
		availabilityChange({ isAvailable }) {
			if (isAvailable) {
				console.log('widget is available for usage', arguments);
				appendLog('widget is visible')
			} else {
				console.log('availability changed', arguments);
				appendLog('widget is hidden from usage')
			}
			// This event is triggered when the widget is deactivated or activated. ie, when the entire ui including the chat button is hidden or shown.
		},
		agentJoined() {
			/**
			 * An agent joined the interaction, the arguments will include if the user that joined is a chatbot user
			 * and the time they joined
			 */
			console.log('agent joined', arguments);
		},
		agentLeft() {
			/**
			 * An agent has left the interaction, the arguments will include if the user that left is a chatbot user
			 * and the time they left
			 */
			console.log('agent left', arguments);
		},

	}
};

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly. For ease, the config uuid and region are configured using the variables set above.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin + window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`);


