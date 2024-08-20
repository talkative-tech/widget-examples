/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = '64ad1e2d-de06-4a71-9552-e530205674cf';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('name')) {
	document.getElementById('customer-name').innerText = urlParams.get('name');
}


/**
 * We declare an object on the window called talkativeCustomConfig - the chat widget will look for this and fire the
 * callbacks when it reaches that part of its lifecycle.
 *
 * Please note: you can only declare this object once on the window, declaring it again will override the first instance of it.
 */
window.talkativeCustomConfig = {
	events: {
		/**
		 * There are a number of events which you can hook into, for this example, we will use the enterStandby event.
		 * This fires when the widget is ready to start an interaction.
		 */
		enterStandby() {
			if (window.triggered) {
			document.getElementById('start-interaction').innerText = 'Interaction Ended';
			}
			/**
			 * As this script will automatically start a chat, we need to track if its active or not, as
			 * enterStandby is also triggered when the interaction ends and resets back to the initial standby stage
			 */
			if (!window.triggered) {
				/**
				 * We get the URL params and parse them
				 */


				/**
				 * Create an array where we will store the interaction data we want to send to engage
				 */
				const interactionData = [];

				/**
				 * Interaction data must be sent as an array of objects. The objects have a name, label, type and the data.
				 * This prefills the data we wish to include.
				 */
				const data = [
					{
						name: 'interested',
						label: 'Product Interest',
						type: 'string',
					},
					{
						name: 'phone',
						label: 'Phone Number',
						type: 'string',
					},
					{
						name: 'name',
						label: 'Guest Name',
						type: 'string',
					}
				];

				/**
				 * Loop through the query parameters, and search for them in our list of data. We then merge
				 * the objects with the data value and push them into the interactionData array.
				 */
				for (const entry of urlParams.entries()) {
					const key = entry[0];
					const value = entry[1];

					const base = data.find((x) => x.name === key);

					if (base) {
						interactionData.push({ data: value, ...base });
					}
				}

				/**
				 * When all of the data has been mapped and added to the array, we can push that data up to engage
				 * using the API.
				 */
				window.talkativeApi.interactionData.appendInteractionData(interactionData);

				/**
				 * Once complete, we trigger the action to start the chat and then mark the action as triggered to prevent it
				 * from firing again when the interaction ends and the widget enters standby again.
				 */
				window.talkativeApi.actions.triggerAction('start-chat');
				window.triggered = true;
				document.getElementById('start-interaction').disabled = true;
				document.getElementById('start-interaction').innerText = 'Interaction In Progress';
			}
		}
	}
};

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly. For ease, the config uuid and region are configured using the variables set above.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin + window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`);


