/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = 'd966af3a-927e-4e0a-8c69-89076b59c808';

/**
 * This is a sample of the data you may wish to pass to the chat widget. This can be anything you want, but it will have to be mapped into
 * the correct format to be passed into the method below.
 */
window.someData = {
	username: 'John',
	email: 'john@example.co.uk',
	accountNumber: '123456789',
};

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
		 * This fires when the widget is ready to start an interaction. Ideally, you should not call any API methods before this event
		 * as they may not be ready.
		 */
		enterStandby() {

			/**
			 * Interaction data must be sent as an array of objects. The objects have a name, label, type and the data.
			 * This prefills the data we wish to include.
			 *
			 * If the name in this array matches a field in the widget config, the data will be pre-filled in the widget.
			 * The label passed it used to label the field in the console. This is not used in the widget and may be overriden if
			 * you have specified a label in the widget config.
			 *
			 * The type is used by the agent console to decide how to format the data. At the time of writing, string is the only valid
			 * option with more to be added in the future.
			 */
			const data = [
				{
					name: 'username',
					label: 'Username',
					type: 'string',
					data: window.someData.username,
				},
				{
					name: 'email',
					label: 'Email Address',
					type: 'string',
					data: window.someData.email,
				},
				{
					name: 'accountNumber',
					label: 'Account Number',
					type: 'string',
					data: window.someData.accountNumber,
				}
			];
			
			/**
			 * Whilst in this example, we are calling this as soon as the widget has loaded, this can be called at any time during
			 * the interaction. This will append the data to the interaction, so if you wish to update the data, you can call this
			 * method again with the updated data. Please note, this will not cause the agent console to refresh the data. This would
			 * require a manual page refresh by the agent, but there would be no way of them knowing this had occurred, so we do not recommend
			 * using it in this way.
			 */
			window.talkativeApi.interactionData.appendInteractionData(data);
		}
	}
};

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly. For ease, the config uuid and region are configured using the variables set above.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin + window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`);


