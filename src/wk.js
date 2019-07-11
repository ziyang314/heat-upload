import DataBase from './database';

let db;

onmessage = (e) => {
    const { type, data } = e.data;
    if (type === 'start') {
        db = new DataBase(data.dbName);
        console.info(db);
    } else if (type === 'addData') {
        console.info(db);
        db.heat.put(data);
    }
};
