const defaultOptions = {
    interval: 10000, // 上报间隔
    reportUrl: '', // 上报url
};

export default class Scheduler {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        this.options = { ...defaultOptions, ...options };
    }

    start(fn) {
        this.timer = setInterval(fn, this.options.interval);
    }
}
