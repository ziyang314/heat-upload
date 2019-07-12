const defaultOptions = {
    interval: 10000, // 上报间隔
    reportUrl: '', // 上报url
    fn: null, // 执行程序
};

export default class Scheduler {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        this.options = { ...defaultOptions, ...options };
    }

    interval() {
        this.timed = setInterval(this.options.fn, this.options.interval);
    }
}
