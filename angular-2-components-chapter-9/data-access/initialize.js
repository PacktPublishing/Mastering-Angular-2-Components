export default function initialize(db) {
  console.log('Initializing Angular 2 Components database');
  return System.import('/data-access/initial-data.js')
    .then(mod => {
      return Promise.all(mod.default.map(document => db.put(document)));
    })
    .then((_) => db.info())
    .then(info => {
      console.log(`Successfully initialized database with ${info.doc_count} documents`);
    })
    .catch(error => {
      console.error('Error while inserting initial data. Please evaluate the error message and contact author if the error is persistent.');
      throw error;
    });
}
