const PerformanceWaitingForStart = 'WaitingForStart';
const PerformanceInProgress = 'PerformanceInProgress';
const PerformanceEnded = 'PerformanceEnded';

/**
 *
 * @usage
 *
 *   // instantiate the class:
 *   const api = new OffworldPerformance();
 *
 *   // create a callback for when
 *   // the performance state changes
 *   api.onStateChange((newState) => {
 *	  switch(newState) {
 *	  	case OffworldPerformance.PerformanceWaitingForStart:
 *	  		// waiting for start
 *	  		document.body.setAttribute("class", "waiting-to-start")
 *	  		return
 *
 *		  case OffworldPerformance.PerformanceInProgress:
 *		  	// waiting for start
 *		  	document.body.setAttribute("class", "in-progress")
 *	  		return
 *	  	case OffworldPerformance.PerformanceEnded:
 *	  		// waiting for start
 *	  		document.body.setAttribute("class", "ended")
 *	  		return
 *	  }
 *   });
 *   api
 *    .connect()
 *    .then(() => {
 *        // now you can start sending reactions
 *        api.sendReaction('apple');
 *        // or you can bind them to your onClick functions
 *        document.getElementById('apple-button').addEventListener('click', () => {
 *            api.sendReaction('apple');
 *        });
 *  });
 *
 */

export default class OffworldPerformance {
  constructor(props) {
    console.debug('Instantiated Performance Class with', props);
    this._connected = false;
    this._debugTimer = new Date();
    this._stateChangeHandlers = [];
  }

  /**
   * Are we connected to the api
   * @return boolean
   */
  isConnected() {
    return this._connected;
  }

  /**
   * Starts the connection and returns a promise to tell you when you're ready
   * @returns Promise that resolves / rejects when connected to the server
   */
  connect() {
    return new Promise((resolve, reject) => {
      console.debug('Initialising connection');

      // Pretend we connect after 3 seconds
      setTimeout(() => {
        this._connected = true;
        console.debug('Connected');
        resolve();
      }, 3000);

      // Pretend we get the state after 3.5 seconds saying waiting for start
      setTimeout(() => {
        this._stateChangeHandlers.map(cb => cb(PerformanceWaitingForStart));
      }, 3500);

      // Pretend we are now playing
      setTimeout(() => {
        this._stateChangeHandlers.map(cb => cb(PerformanceInProgress));
      }, 7000);

      // Pretend it's all over
      setTimeout(() => {
        this._stateChangeHandlers.map(cb => cb(PerformanceEnded));
      }, 25000);
    });
  }

  /**
   * @param string the name of the reaction being sent
   * @throws Error when not connected
   */
  sendReaction(reactionName) {
    if (!this._connected) {
      throw new Error('Not connected yet');
    }
    console.debug(`Sending reaction ${reactionName}`);
  }

  /**
   * Gets the total number of clicks for this particular reaction
   * @return Promise<number>
   */
  getReactionCount(reactionName) {
    // temporary number to reflect count
    return Promise.resolve(parseInt((new Date() - this._debugTimer) / 1000));
  }

  /**
   * Executes callback when the state changes
   * @param function(newState:string) void
   */
  onStateChange(cb) {
    this._stateChangeHandlers.push(cb);
  }

  /**
   * Disconnects from the API
   */
  disconnect() {
    this._connected = false;
    console.debug('Disconnected from the API');
  }
}
OffworldPerformance.PerformanceWaitingForStart = PerformanceWaitingForStart;
OffworldPerformance.PerformanceInProgress = PerformanceInProgress;
OffworldPerformance.PerformanceEnded = PerformanceEnded;
window.OffworldPerformance = OffworldPerformance;
