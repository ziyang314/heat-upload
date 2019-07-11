import defaultOptions from './options';

class Heatmap {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        this.options = { ...defaultOptions, ...options };
        this.start();
    }

    // 获取点击时浏览器的宽高
    static getResolution() {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            scrollHeight: document.body.scrollHeight,
        };
    }

    createService() {
        if (!window.Worker) throw new Error('您的浏览器不支持web worker');
        if (!this.options.workerSrc) throw new Error('请指定worker文件的路径');
        this.wk = new Worker(this.options.workerSrc);

        this.wk.onerror = (error) => {
            console.error(error);
        };
    }

    start() {
        this.createService();
        this.wk.postMessage({ type: 'start', data: this.options });

        this.wk.onmessageerror = error => console.error(error);

        this.listen();
    }

    listen() {
        this.container = document.querySelector(this.options.container);
        if (typeof this.container !== 'object') return;

        this.container.addEventListener('mousedown', (e) => {
            const resolution = Heatmap.getResolution();
            const { scrollTop } = e.target;
            const path = window.location.pathname + encodeURIComponent(window.location.hash.substring(0, 200));
            const { host } = window.location;
            const { width, height, scrollHeight } = resolution;
            this.wk.postMessage({
                type: 'addData',
                data: {
                    clientX: e.clientX,
                    clientY: e.clientY + scrollTop,
                    clientWidth: width,
                    clientHeight: height,
                    scrollHeight,
                    path,
                    host,
                },
            });
        });
        this.wk.onmessage = (msgE) => {
            // todo
            console.info(msgE);
        };
    }
}

export default Heatmap;
