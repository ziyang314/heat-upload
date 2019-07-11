import InDB from 'indb';

export default class Database {
    constructor(dbName) {
        const idb = new InDB({
            name: dbName,
            version: 1,
            stores: [
                {
                    name: 'heat',
                    keyPath: 'id',
                    autoIncrement: true,
                },
            ],
        });

        this.heat = idb.use('heat');
    }
}
