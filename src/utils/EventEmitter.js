class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this.events[eventName].filter((eventCallback) => callback !== eventCallback);
  }

  emit(eventName, args) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((callback) => {
        callback.call(null, args);
      });
    }
  }
}

export default new EventEmitter();

const unsubcribe = EventEmitter.subscribe('renderTodoList', () => {});
