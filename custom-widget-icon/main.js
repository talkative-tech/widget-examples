/**
 * This is the uuid which can be found in your widget config page.
 * It will form part of the full URL statement which can be found at the bottom of this script
 */

const region = 'eu'; // or 'us' or 'au'
const configUuid = 'e39f9811-1111-493b-b258-e964a1e33cf4';


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
			 * This checks to make sure at least one standby card is available to show, if it is not
			 * there will be no UI to show, so we early return
			 */
			if (!talkativeApi.ui.canShow()) {
				return;
			}
			
			/**
			 * If we get here, it means there is at least one card available to show.
			 *
			 * We get the chat widget icon button and remove the hidden class and then add an event listener
			 * so when it is clicked, it will show the UI.
			 *
			 * Please note: the hidden class is a tailwind class which sets display:none. If you are not using tailwind
			 * you will have to implement your own hidden class or use some JS logic to manipulate the styles manually
			 */
			const chatIcon = document.getElementById('chat-widget-icon');
			chatIcon.classList.toggle('hidden');
			chatIcon.addEventListener('click', () => {
				window.talkativeApi.ui.show();
			});
			
		},
		/**
		 * The visibility change callback triggers when the UI is hidden or shown. If it is visible, we want to hide
		 * our chat icon button, this is also accounts for when there is an active interaction.
		 *
		 * Is the widget UI is no longer visible, we should show the chat icon again.
		 */
		visibilityChange({visibility}) {
			const chatIcon = document.getElementById('chat-widget-icon');
			// The UI is visible so add the hidden class to the element
			if (visibility) {
				chatIcon.classList.add('hidden');
				// The ui is not visible, so remove the hidden class from the element
			} else {
				chatIcon.classList.remove('hidden');
			}
			
		}
	}
}

/**
 * This is a call to include the scripts. It must be included last otherwise it is likely the callbacks above will not be registered in time
 * and not get called correctly.
 */
import(`https://${region}.engage.app/api/ecs/v1/loader/${configUuid}.js?path=${encodeURIComponent(window.location.origin+window.location.pathname)}&selectedVersion=${(new URLSearchParams(window.location.search)).get('ecsSelectedVersion') || ''}`)


