class Heatmap {
    constructor(options) {
        // todo
        this.options = Object.assign({}, options);
        this.container = this.options.container ? document.querySelector(this.options.container) : document.querySelector('body');
        this.uploadUrl = this.options.uploadUrl;
    }

    static getResolution() {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            scrollHeight: document.body.scrollHeight,
        };
    }

    listen() {
        // todo
        if (typeof this.container !== 'object') return;

        this.container.addEventListener('mousedown', (e) => {
            console.info(e);
        });
    }
}

export default Heatmap;
