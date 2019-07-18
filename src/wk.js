import DataBase from './database';

let db;

class Scheduler {
    constructor(options) {
        this.timer = null;
        this.interval = options.interval;
    }

    start(fn) {
        if (this.timer) return;
        this.timer = setInterval(fn, this.interval);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

onmessage = (e) => {
    const { type, data } = e.data;
    let sched;
    switch (type) {
    case 'start':
        db = new DataBase(data.dbName);
        break;
    case 'addData':
        db.heat.put(data);
        break;
    case 'startUpload':
        sched = new Scheduler(data);
        sched.start(async () => {
            const objs = await db.heat.some(data.uploadCount);
            if (objs.length === 0) return;
            postMessage({ type: 'uploadData', data: objs });
            objs.forEach((it) => {
                db.heat.delete(it.id);
            });
        });
        break;
    default:
        break;
    }
};
