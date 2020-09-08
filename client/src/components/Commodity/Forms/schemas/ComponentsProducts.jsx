import React from 'react';
import schema from './products.json';
import { viewBarcode } from '../frmUtilites';
import Tree from '../../../common/Tree/Tree';

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
    Types: props => {
        return (
            <label>
                Type
                <select name="type"
                    id={props.id}
                    value={props.type}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.types.map((t, i) => {
                            return <option key={i} value={t.type}>{t.description}</option>
                        })
                    }
                </select>
            </label>
        )
    },
    Taxes: props => {
        return (
            <label>
                Tax
                <select name="tax"
                    id={props.id}
                    value={props.tax}
                    onChange={props.handleChange}
                    disabled={props.disabled}>
                    {
                        schema.taxes.map((t, i) => {
                            return <option key={i} value={t.tax}>{t.description}</option>
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
    GroupsTree: props => {
        // gProps = { groups: props.groups, disabled, handleChange, parent_id: state.parent_id, id: s.group }
        let groups = props.groups;
        let g = groups.find(item => item.id === props.parent_id);
        let gLabel = g ? g.label : 'Root';
        let onDivClick = props.disabled ? null : props.onClick;



        return (
            <>
                {props.treeView &&
                    <div className={props.classTree} onClick={props.closeTree}>
                        <Tree data={props.groups} price="Price" treeLabel="Groups" callback={props.callbackTree} />
                        <i className='fas fa-angle-down'></i>
                    </div>
                }
                <div className={props.classDiv} onClick={onDivClick} tabIndex={-1} onBlur={props.onBlurGroup}>
                    <div name='parent_id'>
                        {gLabel}
                        <i className='fa fa-angle-down'></i>
                    </div>
                </div >
            </>
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
