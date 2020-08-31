import React from 'react';
import schema from './products.json';
import { viewBarcode } from '../frmUtilites';

export const ComponentsProducts = {
    MeasureNames: props => {
        return (
            <label>
                Measure Name
                <select name="measure_name"
                    id={props.id}
                    value={props.measure_name}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.measure_names.map((m, i) => {
                            return <option key={i} value={m}>{m}</option>
                        })
                    }
                </select>
            </label>
        )
    },
    Groups: props => {
        let groups = props.groups.sort((a, b) => {
            if (a.label > b.label) return 1;
            if (a.label < b.label) return -1;
            return 0;
        })
        return (
            <label>
                Group:
                <select name="parent_id" id={props.id}
                    value={props.parent_id} onChange={props.handleChange} disabled={props.disabled}>
                    <option key='0' value='0'>Root</option>
                    {props.groups.map(g => {
                        return <option key={g.id} value={g.id}>{g.label}</option>
                    })}
                </select>
            </label>
        )
    },
    Barcodes: props => {

        const delBcClick = ev => {
            if (!props.allow_edit) return;
            let elem;
            if (ev.target.tagName === 'SPAN') {
                elem = ev.target.closest('li');
            }
            if (!elem) return;
            props.deleteFromArray(elem.id, 'barcodes');
        }

        return (
            <fieldset name='img_barcodes'>
                <legend>Barcodes</legend>
                <div className={props.view_barcode}>
                    <ul>
                        {props.barcodes.map(b => {
                            return (
                                <li key={b} id={b} onClick={delBcClick}>{viewBarcode(b)}
                                    <span className={props.delBc}></span>
                                </li>
                            )
                        })}
                    </ul>
                    <input name='barcodes' type="text" defaultValue={props.bc}
                        onChange={props.handleChange} onBlur={props.handleBlur} disabled={props.disabled} />
                    <span className={props.addBc}></span>
                </div>
            </fieldset >
        )
    },
    Picture: props => {

        return (
            <div className={props.divPicture} onClick={props.pictureClick}>
                <img id={props.photo} className={props.className}
                    src={`/images/Price/${props.photo}`}
                    alt="no" tabIndex='-1'
                />
                <span></span>
            </div>
        )
    }
}