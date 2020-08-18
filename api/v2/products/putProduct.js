const Product = require('../../models/product');
const Barcode = require('../../models/barcode');
const Photo = require('../../models/photo');
const { Op } = require('sequelize');

async function prepareArray(arr, id, instance) {
  let keys = instance.primaryKeyAttributes;
  let out = {};
  let arrSource = await instance.findAll({
    where: { id: id },
  });
  let arrNewSource = arrSource.map((item) => {
    let newItem = item[keys[1]];
    return newItem;
  });
  let resArr = arrCompare(arrNewSource, arr);

  //Если есть добавленные элементы -> добавляем.
  if (resArr.resArrPlus.length) {
    let arrPlus = resArr.resArrPlus.map((item) => {
      return { id, [keys[1]]: item };
    });
    out.resPlus = await instance.bulkCreate(arrPlus);
  } else { out.resPlus = null }

  if (resArr.resArrMinus.length) {
    //Если есть удаленные элементы -> удаляем.
    out.resMinus = await instance.destroy({
      where: {
        [Op.and]: {
          id: id,
          [keys[1]]: resArr.resArrMinus,
        },
      },
    });
  } else { out.resMinus = null }
  return out;
}

function arrCompare(arrSource = [], arrNew = []) {
  let resArrPlus = []; //Находим записи добавленные к arrSource
  arrNew.forEach((item) => {
    if (!arrSource.includes(item)) {
      resArrPlus.push(item);
    }
  });
  let resArrMinus = []; //Находим записи удаленные из arrSource
  arrSource.forEach((item) => {
    if (!arrNew.includes(item)) {
      resArrMinus.push(item);
    }
  });
  return { resArrPlus, resArrMinus };
}

module.exports = async function (req, res) {
  try {
    let product = await Product.findByPk(req.params.id);
    let barcodes;
    let photos;

    if (product) {
      //Если существует - обновляем
      let newData = req.body;
      await Product.update(newData, {
        where: { id: req.params.id },
      });
      /* Add new Barcodes or|and delete old barcodes*/
      if (req.body.barcodes) {
        barcodes = Array.from(req.body.barcodes);
        var outBc = await prepareArray(barcodes, req.params.id, Barcode);
        
      }
      /* Add new Photos or|and delete old photos*/
      if (req.body.photos) {
        let photos = Array.from(req.body.photos);
        var outPhotos = await prepareArray(photos, req.params.id, Photo);
      }
      res.send({ updated: product.id, product, outBc, outPhotos });
      return;
    }

    //Иначе - создаем новый
    product = await Product.create(req.body);
    if (req.body.barcodes && req.body.barcodes.length) {
      barcodes = await Barcode.bulkCreate(
        req.body.barcodes.map((item) => {
          return { id: product.id, barcode: item };
        }),
      );
    }
    if (req.body.photos && req.body.photos.length) {
      photos = await Photo.bulkCreate(
        req.body.photos.map((item) => {
          return { id: product.id, photo: item };
        }),
      );
    }
    res.send({
      created: product.id,
      product: { ...product, barcodes, photos },
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
