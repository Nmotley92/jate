import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// puts the content in the database but uses put instead of add so it will update the last item in the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const putRequest = store.put({ content }, 1); // 1 is the key for the record you want to overwrite
  await tx.complete;
  console.log('Content added to database');
}




// gets the last item in the database
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  await tx.complete;
  console.log('All content retrieved from database:', allContent);
  return allContent.length ? allContent[allContent.length - 1].content : null
};


initdb();
