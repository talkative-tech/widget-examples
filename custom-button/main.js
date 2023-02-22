/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = 'e39f9811-fb8c-493b-b258-e964a1e33cf4';

/**
 * In this implementation, we declare an array of objects which contain information we will need to enable our buttons.
 * This is just one of many ways that you can implement a button on the screen.
 *
 * The element ID is the button we wish to modify if the queue is online
 * The queueUuid is the queue uuid the button relates too, the queue uuids can be found from the queue management page
 * The action is the name of the programmatic action you will have configured in the chat widget editor API section. These do not
 * exist by default, so you will need to manually create one to test this script.
 * The online text is what we will replace the contents of the button
 */

const actionToQueue = [
	{
		elementId: 'chat-button',
		queueUuid: 'a6adeebf-1111-488b-b26f-8f94c8b536d8', // this queue uuid must match the correct queue uuid for the action in your config
		action: 'start-chat', // this action must match the action name you created in the config editor
		onlineText: 'Live Chat Online',
	},
	{
		elementId: 'video-button',
		queueUuid: '48320b32-1111-4991-894d-9ecc15bc0ba7',
		action: 'start-video',
		onlineText: 'Live Video Online',
	}
];

/**
 * We declare an object on the window called talkativeCustomConfig - the chat widget will look for this and fire the
 * callbacks when it reaches that part of its lifecycle.
 *
 * Please note: you can only declare this object once on the window, declaring it again will override the first instance of it.
 */
window.talkativeCustomConfig = {
	events: {
		/**
		 * There are a number of events which you can hook into, for this example, we will use the ready event.
		 * This fires when the widget has initialised and retrieved its configuration and presences.
		 */
		ready() {
			/**
			 * We use this API call to get the presences for the current loaded config. As a config can have many actions which can link to many
			 * queues, this call will return an array of those presences. Each presence will have a queueUuid and a status.
			 */
			const presences = window.talkativeApi.queues.getPresences();
			
			/**
			 * Here we will loop through the actions we declared above to find out if the linked queue is online, and then
			 * if it is, update the text and add the click event listener.
			 */
			actionToQueue.forEach((x) => {
				/**
				 * This call will find the presence for the given queueUuid
				 */
				const presence = presences.find((p) => p.queueUuid === x.queueUuid);
				
				/**
				 * We check the status is online, and if it is, we get the button using the ID we stored in the array above
				 * We then update the button text and add the event listener.
				 *
				 * If the status is not online, the button will remain unchanged.
				 */
				if (presence.status === 'ONLINE') {
					const button = document.getElementById(x.elementId);
					
					button.innerText = x.onlineText;
					button.addEventListener('click', () => {
						/**
						 * This call returns a promise, so you add .then() or .catch() or .finally() to the end of this call
						 * if you wish to chain additional actions or provide a notification to the user if the call fails
 						 */
						talkativeApi.actions.triggerAction(x.action);
					});
				}
				/**
				 * The logic applied here can be customised to fit your implementation, for example, instead of updating the button text
				 * the button may be hidden, and you change the styling to show it instead.
				 */
				
			});
			
			/**
			 * If you prefer a more manual approach, you could instead do something like the following to activate your buttons
			 */
			
			const manualPresence = presences.find((x) => x.queueUuid === 'a6adeebf-d9d6-488b-b26f-8f94c8b536d8');
			
			/**
			 * the possible options for the queue status are:
			 * ONLINE
			 * OFFLINE_BUSINESS_HOURS
			 * OFFLINE_NO_USERS
			 * OFFLINE_QUEUE_CAP
			 * OFFLINE_UNKNOWN
			 *
			 * You may choose to do different actions based on the queue status, for example if the queue cap is hit
			 * displaying a message saying live chat is busy, please try again later
			 */
			if (manualPresence.status === 'ONLINE') {
				const manualButton = document.getElementById('manual-button');
				
				manualButton.innerText = 'Manual Button Chat Online';
				manualButton.addEventListener('click', () => {
					talkativeApi.actions.triggerAction('start-chat');
				})
			}
			
			/**
			 * You would have to create a similar set of code for each button you wish to activate
			 */
			
		}
	}
}

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin+window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`)


