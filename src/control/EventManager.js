

export class EventManager {
    constructor() {
        if (!ui.KnowledgeRecalled.EventManager) {
            ui.KnowledgeRecalled.EventManager = this;
            this.events = {};
        }
    };
    registerEvent(name) {

    }

    subcribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    publish(event, data) {
        if (!this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    unsubscribe(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

}
