import { getGroup, getProduct } from './apiIDB';

function blobFromObj(obj) {
  let json = JSON.stringify(obj, null, 2);
  let blob = new Blob([json], { type: 'application/json' });
  return blob;
}

function blobToUrl(blob, fileName = 'test') {
  let link = document.createElement('a');
  link.download = `${fileName}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

function getObjfromLocalStorage() {
  let keys = Object.keys(localStorage);
  let obj = {};
  for (let key of keys) {
    obj[key] = localStorage.getItem(key);
  }
  return obj;
}

async function getObjfromIdb() {
  let obj = {};

  obj.groups = await getGroup('all');

  obj.products = await getProduct('all');

  return obj;
}

export async function saveConfig(fileName = 'config') {
  let obj = getObjfromLocalStorage();
  //   let obj = await getObjfromIdb();
  let blob = blobFromObj(obj);
  blobToUrl(blob, fileName);
}

export async function readJsonFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = function () {
      var json = JSON.parse(reader.result);
      resolve(json);
    };

    reader.onerror = function () {
      console.error(reader.error);
      reject(reader.error);
    };
  });
}
