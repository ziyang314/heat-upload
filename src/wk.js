import DataBase from './database';

let db;

onmessage = (e) => {
    const { type, data } = e.data;
    if (type === 'start') {
        db = new DataBase(data.dbName);
    } else if (type === 'addData') {
        db.heat.put(data);
    }
};
