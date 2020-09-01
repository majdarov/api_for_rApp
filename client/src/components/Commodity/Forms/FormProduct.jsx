import React from 'react';
import s from './Form.module.css';
import { useState } from "react";
import Preloader from '../../common/Preloader/Preloader';
import { ComponentsProducts } from './schemas/ComponentsProducts';
import TextArea from '../../common/TextArea/TextArea';
import { setNewCode, newBarcode, validateBarcode, validateZeroData, validateRequiredData } from './frmUtilites';
import FormImg from './FormImg';
import FormModalWrapper from './FormModalWrapper';
import noPhoto from '../../../Assets/img/terminal-5.png';

const FormProduct = props => {

  let parentId = props.pid; /* props.formData.parent_id === null ? '0' : props.formData.parent_id; */
  let isNewData = !props.formData.id;
  const fileInput = React.createRef();
  const [state, setState] = useState({
    ...props.formData,
    allow_edit: isNewData,
    parent_id: parentId,
    // photos: [...props.formData.photos],
    // barcodes: [...props.formData.barcodes],
    isNewData,
    bigImg: null,
    currentBarcode: ''
  });


  if (props.formError) {
    let err = props.formError;
    alert(err.message);
    props.setFormError(null);
  }

  const disabled = !isNewData && !state.allow_edit;

  const formChanged = () => {
    let changes = [];
    for (let key in  props.formData) {
      if (state[key] !==  props.formData[key]) {
        changes.push({[key]: state[key]});
      }
    }
    // console.log(changes);
    return changes.length;
  }

  const formatPrice = price => {
    return isFinite(price) ? Number(price).toFixed(2) : '0.00';
  }

  const handleChange = (ev) => {

    let elem = ev.target;
    let name = elem.name;
    let value = elem.value;

    elem.classList.remove(s.required);

    if (name === 'barcodes') {
      setState({ ...state, currentBarcode: value });
      return;
    }

    if (name === 'picture') {
      let photos = state.photos;
      Array.from(fileInput.current.files).forEach(item => {
        photos.push(item.name);
      })
      setState({ ...state, photos });
      return;
    }
    if (name === 'allow_edit') {
      let form = document.getElementById(s['form-product']);
      Object.values(form.elements).forEach(item => {
        if (item.disabled && item.id !== s.uuid) item.removeAttribute('disabled');
      })
      form.allow_edit.parentNode.remove();
    }
    setState({ ...state, [name]: value });
  }

  const handleBlur = ev => {
    let name = ev.target.name || ev.currentTarget.name;
    let value = ev.target.value || ev.currentTarget.value;

    if (name === 'barcodes') {
      let newValue;
      if (!value) {
        let prefix = window.prompt(`Введите префикс!\r\n
          Рекомендуется последние 4 цифры ИНН.\r\n
          По умолчанию -> '0000'`, '2922');
        if (!prefix || !isFinite(prefix)) prefix = '0000';
        newValue = newBarcode(state.code, prefix);
      }
      let valBc = validateBarcode(value || newValue);
      if (valBc !== 0) {
        window.alert(valBc);
        return;
      }
      let barcodes = [...state.barcodes, state.currentBarcode || newValue];
      setState({ ...state, barcodes });
      return;
    }

    if (name === 'price' || name === 'cost_price') {
      value = isFinite(value) ? Number(value) : 0;
    }
    setState({ ...state, [name]: value });
    ev.target.value = formatPrice(value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (state.allow_edit && formChanged() && window.confirm('Save changes')) {
      if (!state.code) {
        setNewCode().then(code => setState({ ...state, code }));
      }
      let body = { ...state };
      if (body.parent_id === '0') {
        delete body.parent_id;
      }
      delete body.createdAt;
      delete body.updatedAt;
      delete body.allow_edit;
      delete body.bigImg;
      delete body.currentBarcode;

      let missData = validateRequiredData(body);
      if (missData.length) {
        let strMessage = '';
        missData.forEach(item => {
          strMessage += ` ${item},`;
          document.getElementsByName(item).forEach(elem => {
            elem.classList.add(s.required);
          })
        });
        strMessage.slice(-1);
        alert(`Отсутствуют необходимые данные:\n\r${strMessage}!`);
        return;
      }

      validateZeroData(body, props.formData);
      if (!state.isNewData) body.id = state.id;
      delete body.isNewData;

      alert(JSON.stringify(body, null, 2));

      let i = 0;
      Object.keys(body).forEach(item => i++);
      if (i <= 1) {
        alert('Данные не изменились!');
        return;
      }
      let typeQuery = !state.isNewData ? 'put' : 'post';
      props.postFormData('product', typeQuery, body);
      props.toggleFormPost(true);
    } else {
      props.setFormData();
      props.setViewForm(false);
    }
    document.body.style.overflow = 'auto';
  }

  const canselClick = (ev) => {
    props.setViewForm(false);
    props.setFormData(null);
    document.body.style.overflow = 'auto';
  }

  const pictureClick = ev => {
    let p = ev.target;
    if (p.tagName === 'SPAN') {
      if (!state.allow_edit) return;
      let prevElem = p.previousElementSibling;
      deleteFromArray(prevElem.id, 'photos');
      return;
    }
    p.addEventListener('blur', () => {
      setState({ ...state, bigImg: null })
      p.removeEventListener('blur', this);
    })
    setState({ ...state, bigImg: p.src })
  }

  const onPicInputClick = ev => {
    ev.preventDefault();
    let picInput = document.getElementById('picInput');
    picInput.click();
  }

  const deleteFromArray = (elemId, arrName) => {
    let i = state[arrName].findIndex(item => item === elemId);
    let arr = state[arrName];
    arr.splice(i, 1);
    setState({ ...state, [arrName]: arr });
  }

  const gProps = { groups: props.groups, disabled, handleChange, parent_id: state.parent_id, id: s.group };

  const mnProps = { disabled, handleChange, id: s.measure_name, measure_name: state.measure_name };

  const bProps = {
    barcodes: state.barcodes, bc: state.currentBarcode, addBc: s['add-bc'], delBc: s['del-bc'],
    handleChange, handleBlur, deleteFromArray, allow_edit: state.allow_edit, disabled,
    view_barcode: s['view-barcode']
  };

  const pProps = { id: s.picture, className: s['picture-small'], divPicture: s['div-picture'], pictureClick };

  if (props.formPost) {
    return <Preloader />
  } else {
    return (
      <>
        {state.bigImg &&
          <FormModalWrapper
            form={<FormImg photo={state.bigImg} />}
          />}
        <form id={s['form-product']} onSubmit={handleSubmit} >
          <div className={s['menu-buttons']}><span className='fa fa-window-close' onClick={handleSubmit}></span></div>
          <fieldset name='Product'>
            <legend>Product Info</legend>
            <div>
              <b>ID: </b><input id={s.uuid} value={state.id || ''} disabled={!isNewData} onChange={handleChange} />
              {
                state.isNewData ? null :
                  <label>
                    Allow Edit:
            <input type='checkbox' id={s['allow-edit']} name={'allow_edit'} checked={state.allow_edit} onChange={handleChange} />
                  </label>
              }
            </div>
            <div>
              {
                !state.photos.length ?
                  // <ComponentsProducts.Picture {...pProps} photo='image3D.png' /> :
                  <div><img src={noPhoto} alt="NoPhotos" className={s['picture-small']} /></div> :
                  state.photos.map(ph => {
                    return <ComponentsProducts.Picture {...pProps} photo={ph} key={ph} />
                  })
              }
            </div>
            {
              state.photo || !state.allow_edit ? null :
                <>
                  <input type="file" name="picture" id='picInput' multiple={true}
                    onChange={handleChange} ref={fileInput} style={{ display: 'none' }} />
                  <label htmlFor="picture" onClick={onPicInputClick}>Input Image</label>
                </>
            }
            <ComponentsProducts.Barcodes {...bProps} />
            <div className={s.code_article}>
              <label>Code:</label>
              <input type="text" name="code" value={state.code} onChange={handleChange} disabled={disabled} />
              <label>Aticle:</label>
              <input type="text" name='article_number' value={state.article_number || ''}
                  onChange={handleChange} disabled={disabled} />
              <ComponentsProducts.Groups {...gProps} />
              <ComponentsProducts.MeasureNames {...mnProps} />
            </div>
            <label>
              Name:
              <textarea type="text" name="name" value={state.name} onChange={handleChange} disabled={disabled} />
            </label>
            <label>Description:
              <input type="text" name="description" value={state.description || ''} onChange={handleChange} disabled={disabled} />
            </label>
            <div className={s.prices}>
              <label htmlFor='price'>Price:</label>
              <input name="price" defaultValue={formatPrice(state.price)} className={s.price}
                  onBlur={handleBlur} onChange={handleChange} disabled={disabled} /><span></span>
              <label htmlFor='cost_price'>Cost Price:</label>
              <input name="cost_price" defaultValue={formatPrice(state.cost_price)} className={s.price}
                  onBlur={handleBlur} disabled={disabled} /><span></span>
              <label>Allow to sell:</label>
              <input type="checkbox" name="allow_to_sell" defaultChecked={state.allow_to_sell} disabled={disabled} />
            </div>
          </fieldset>
          <div className={s.buttons}>
            <input type="submit" value="Ready" />
            <button id={s.cansel} onClick={canselClick}>Cansel</button>
          </div>
        </form>
      </>
    );
  }
}
export default FormProduct;
