import React from 'react';
import s from '../Commodity.module.css';
import Preloader from '../../common/Preloader/Preloader';

const ListCommodities = props => {
    let liElements;
    let commodities = props.commodities;

    async function liClick(e) {
        let id;
        if (e.target.tagName === 'SPAN') {
            let elem = e.target.closest('li')

            if (window.confirm(`${elem.innerText}\n\rYou'r realy wanted delete this product?`)) {
                let res = await props.deleteProduct(elem.id, props.pid);
                alert(`Product id: ${res}\n\rDELETED!`)
            } else {
                alert('NOT DELETED!');
            }
            return;
        } else {
            id = e.target.id;
        }
        // console.log(e.target);
        props.getProductId(id);
    }

    if (props.error) {
        return props.error.message;
    } else if (!props.comIsLoaded) {
        return <Preloader />
    } else {
        liElements = commodities.sort(item => item.name).map(item => {
            return (
                <li id={item.uuid} key={item.uuid} className={s.clickable}
                    onClick={liClick} data-price={item.price} data-code={item.code}>
                    {item.label} | {item.price ? item.price.toFixed(2) : '0.00'}
                    <span className={s.del}></span>
                </li>
            )
        })

        return (
            <>
                <ul>
                    {liElements}
                </ul>
            </>
        )
    }
}
export default ListCommodities;
