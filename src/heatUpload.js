const defaultOptions = {
    container: 'body',
    uploadUrl: '',
    interval: 10000,
    workerSrc: 'wk.js',
    dbName: 'heatmap',
    uploadCount: 5,
};

let wk = null;

function createService(options) {
    if (!window.Worker) throw new Error('您的浏览器不支持web worker');
    if (!options.workerSrc) throw new Error('请指定worker文件的路径');
    wk = new Worker(options.workerSrc);

    wk.onerror = (error) => {
        console.error(error);
    };
}

function getResolution() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        scrollHeight: document.body.scrollHeight,
    };
}

function listen(options) {
    const container = document.querySelector(options.container);
    if (typeof container !== 'object') return;

    container.addEventListener('mousedown', (e) => {
        const resolution = getResolution();
        const { scrollTop } = e.target;
        const path = window.location.pathname + encodeURIComponent(window.location.hash.substring(0, 200));
        const { host } = window.location;
        const { width, height, scrollHeight } = resolution;

        // 找出发生在弹框上的点击
        const ePath = e.path || (e.composedPath && e.composedPath());
        const parents = ePath.slice(0, ePath.findIndex(value => value.tagName.toLowerCase() === 'body'));
        let isDialog = false;
        if (parents.length) {
            parents.forEach((it) => {
                if (getComputedStyle(it).getPropertyValue('position') === 'fixed') {
                    isDialog = true;
                }
            });
        }

        wk.postMessage({
            type: 'addData',
            data: {
                clientX: e.clientX,
                clientY: e.clientY + scrollTop,
                clientWidth: width,
                clientHeight: height,
                scrollHeight,
                path,
                host,
                isDialog,
            },
        });
    });
}

function uploadData(data, options) {
    const params = JSON.stringify({ hitdata: data });
    const img = new Image();
    img.src = `${options.uploadUrl}${params}`;
}

function startUpload(options) {
    wk.postMessage({ type: 'startUpload', data: options });
}

function HeatUpload(opt) {
    const options = { ...defaultOptions, ...opt };
    createService(options);
    wk.postMessage({ type: 'start', data: options });
    wk.onmessageerror = error => console.error(error);
    listen(options);

    wk.onmessage = (msgE) => {
        // todo
        const { type, data } = msgE.data;
        if (type === 'uploadData') {
            uploadData(data, options);
        }
    };
    startUpload(options);
}

export default HeatUpload;
