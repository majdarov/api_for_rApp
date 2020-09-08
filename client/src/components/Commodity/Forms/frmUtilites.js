import { productsApi } from '../../../api/api';

export const setNewCode = async () => {
  let maxCode = await productsApi.getData('products', { max: 'code' });
  let newCode = maxCode + 1;
  return newCode;
};

export function newBarcode(code, prefix = '0000') {
  // if (!prefix) prefix = '0000';
  let A1 =
    '20'.concat(prefix) +
    '0'.repeat(6 - code.toString().length) +
    code.toString();
  let A2 = 0;
  A1.split('').forEach((item, i) => {
    if (i % 2 !== 0) {
      A2 += Number(item) * 3;
    } else {
      A2 += Number(item);
    }
  });
  A2 = (10 - (A2 % 10)) % 10;
  return A1.concat(A2);
}

export function viewBarcode(barcode) {
  let f1 = 65;
  let f2 = 75;
  let s = [
    [f1, f1, f1, f1, f1, f1],
    [f1, f1, f2, f1, f2, f2],
    [f1, f1, f2, f2, f1, f2],
    [f1, f1, f2, f2, f2, f1],
    [f1, f2, f1, f1, f2, f2],
    [f1, f2, f2, f1, f1, f2],
    [f1, f2, f2, f2, f1, f1],
    [f1, f2, f1, f2, f1, f2],
    [f1, f2, f1, f2, f2, f1],
    [f1, f2, f2, f1, f2, f1],
  ];

  let bcStr = barcode.split('')[0];
  let n = Number(bcStr);

  for (let i = 1; i <= 6; i++) {
    bcStr += String.fromCharCode(Number(barcode.substr(i, 1)) + s[n][i - 1]);
  }
  bcStr += String.fromCharCode(42);
  for (let i = 7; i <= 12; i++) {
    bcStr += String.fromCharCode(Number(barcode.substr(i, 1)) + 97);
  }

  bcStr += String.fromCharCode(43);
  return bcStr;
}

export function validateBarcode(barcode) {
  if (![7, 8, 12, 13].includes(barcode.length)) {
    return `Not valid Length barcode: ${barcode.length}`;
  }
  let res = 0;
  barcode.split('').forEach((item, i) => {
    if (i % 2 !== 0) {
      res += Number(item) * 3;
      res = res % 10;
    } else {
      res += Number(item);
      res = res % 10;
    }
  });
  if (res !== 0) {
    let message = '';
    if (barcode.length === 13 || barcode.length === 8) {
      let errDig = barcode.slice(-1);
      message += 'Not valid control digit: ' + errDig + '\r\n';
      message += validateBarcode(barcode.slice(0, -1));
    } else if (barcode.length === 12 || barcode.length === 7) {
      let newRes = 10 - res;
      message += 'Need add control digit: ' + newRes;
    } else {
      message += 'Not valid Length barcode: ' + barcode.length;
    }
    return message;
  }
  return res;
}

export function validateZeroData(curr, prev) {
  for (let key in curr) {
    /* let arrNotChanged = false;
    if (Array.isArray(curr[key])) {
      let compare = arrCompare(curr[key], prev[key]);
      arrNotChanged = !compare.resArrMinus.length && !compare.resArrPlus.length;
    } */

    let isNotData =
      curr[key] === null ||
      curr[key] === undefined
      // (curr.isNewData && !curr[key]);

    // let isNotChanged = !curr.isNewData && curr[key] === prev[key];

    if (/* arrNotChanged || */ isNotData /* || isNotChanged */) {
        delete curr[key];
    }
  }
}

export function validateRequiredData(body) {
  const reqData = [
    'type',
    'name',
    'price',
    'measure_name',
    'tax',
    'allow_to_sell'
  ]

  let missData = [];

  Object.keys(body).forEach(key => {
    if (!body[key] && reqData.includes(key)) {
      missData.push(key);
    }
  })

  return missData;
}

export function arrCompare(arr1 = [], arr2 = []) {
  let resArrPlus = [];
  arr2.forEach((item) => {
    if (!arr1.includes(item)) {
      resArrPlus.push(item);
    }
  });
  let resArrMinus = [];
  arr1.forEach((item) => {
    if (!arr2.includes(item)) {
      resArrMinus.push(item);
    }
  });
  return { resArrPlus, resArrMinus };
}
