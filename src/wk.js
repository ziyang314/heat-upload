import DataBase from './database';
import Scheduler from './scheduler';

let db;

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
        sched.start(() => {
            console.info('ok');
        });
        break;
    default:
        break;
    }
};
