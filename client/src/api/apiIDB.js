import { deleteDB, openDB } from 'idb';

export async function initDb() {
  const db = await openDB('Evo', 1, {
    async upgrade(db, oldVersion, newVersion) {
      if (oldVersion < newVersion) {
        console.log(`New version: ${newVersion}`);
      }
      if (!db.objectStoreNames.contains('groups')) {
        const store = db.createObjectStore('groups', { keyPath: 'id' });
        store.createIndex('name', 'name');
        store.createIndex('date', 'created_at');
      }
      if (!db.objectStoreNames.contains('products')) {
        const store = db.createObjectStore('products', { keyPath: 'id' });
        store.createIndex('name', 'name');
        store.createIndex('date', 'created_at');
        store.createIndex('parent_id', 'parent_id');
      }
    },
  });

  return db;
}

export async function getGroup(id) {
  const db = await initDb();
  let group;
  if (id === 'all') {
    group = await db.getAll('groups');
  } else {
    group = await db.get('groups', id);
  }
  return group;
}
export async function getProduct(id) {
  const db = await initDb();
  let product;
  if (id === 'all') {
    product = await db.getAll('products');
  } else {
    product = await db.get('products', id);
  }
  return product;
}

export async function getProductsPid(pid) {
  const db = await initDb();
  const products = await db.getAllFromIndex('products', 'parent_id', pid);
  return products;
}

export async function pushItems(store, items) {
  let resItems = [];
  items.forEach((item) => {
    resItems.push(item);
  });
  /* Init IDB */
  const db = await initDb();
  const tx = db.transaction(store, 'readwrite');
  const promises = resItems.map((item) => {
    return tx.store.put(item);
  });
  promises.push(tx.done);
  await Promise.all(promises);
}

export async function delDb(nameDb) {
  await deleteDB(nameDb);
}

export async function putData(storeName, data) {
  const db = await initDb();
  await db.put(storeName, data);
  return data;
}

export async function deleteData(storeName, id) {
  const db = await initDb();
  await db.delete(storeName, id);
  return id;
}
