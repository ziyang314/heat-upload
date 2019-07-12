import DataBase from './database';

let db;

onmessage = (e) => {
    const { type, data } = e.data;
    switch (type) {
    case 'start':
        db = new DataBase(data.dbName);
        break;
    case 'addData':
        db.heat.put(data);
        break;
    case 'startUpload':
        break;
    default:
        break;
    }
};
