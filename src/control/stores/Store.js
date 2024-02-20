class Store {
    constructor(store, data) {
        this.store = store;
        this.subscriptions = [];
        this.data = data;
        this.setup(data);
    };

    setupStore(data) {
        this.unsubscribe();
        this.setupStore(data);
        this.setupSubscription(data);
    };

    setupSubscription() {
        // Override with higher order implementation
    };

    /**
    * A method to subscribe to a store property.
    * @method subscribeTo
    * @param target - Target can be any property on the item.
    * @param callback {function} - callback is often some sort of a set up function
    */
    subscribeTo(target, callback) {
        this.subscriptions.push(target.subscribe(callback));
    }

    unsubscribeAll() {
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
    }
}