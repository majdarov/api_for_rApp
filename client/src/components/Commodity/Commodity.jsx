import React from "react";
import s from "./Commodity.module.css";
import Tree from "../common/Tree/Tree";
import ListCommodities from "./ListCommodities/ListCommodities";
import Preloader from "../common/Preloader/Preloader";
import FormModalWrapper from "./Forms/FormModalWrapper";
import FormProduct from "./Forms/FormProduct";

const Commodity = props => {

  if (!props.isLoaded) {
    props.setPid('0');
    props.getGroups();
  }
  if (!props.comIsLoaded) {
    props.getProducts(props.pid);
  }

  if (props.error) {
    alert(`${props.error.name}\n\r${props.error.message}`);
    props.setError(null);
  }

  /* function handleClick(e) {
    if (e.target.tagName !== "SPAN" && e.target.tagName !== "I") return;
    // ***SPAN toggle selected
    document
      .getElementById("Tree")
      .querySelectorAll("span")
      .forEach(item => {
        if (item.className === s.selected) item.className = null;
      });
    if (e.target.tagName === "SPAN") {
      e.target.className = s.selected;
    } else {
      e.target.nextSibling.className = s.selected;
    }
    // SPAN***
    let elem = e.target.closest("li");
    if (!elem) return;
    if (elem.id !== "0") {
      let target = elem.querySelector("ul");
      if (target) {
        target.hidden = !target.hidden;
        if (target.hidden) {
          elem.className = "closed";
          elem.firstElementChild.className = "fas fa-folder";
        } else {
          elem.className = "open";
          elem.firstElementChild.className = "fas fa-folder-open";
        }
      }
    }

    if (props.pid === elem.id) return;
    props.setPid(elem.id);
  } */

  function newData() {
    props.getProductId('');
  }

  const changePid = eId => {
    if (props.pid === eId) return;
    props.setPid(eId);
  }

  if (props.error) {
    return <div>Ошибка...{props.error.message}</div>;
  } else if (!props.isLoaded) {
    return <Preloader />
  } else {
    return (
      <>
        <div className={s.head}>
          <div className={s.buttons}>
            <button onClick={newData}>New Product</button>
          </div>
        </div>
        {props.viewForm ?
          // <FormProductFormik />
          <FormModalWrapper
            form={
              <FormProduct
                groups={props.groups}
                formData={props.formData}
                formPost={props.formPost}
                formError={props.formError}
                setViewForm={props.setViewForm}
                setFormData={props.setFormData}
                toggleFormPost={props.toggleFormPost}
                postFormData={props.postFormData}
                setFormError={props.setFormError}
                pid={props.pid}
              />
            }
          />
          : null}
        <div className={s.container}>
          <Tree data={props.groups} price="Price" treeLabel="Groups" /* handleClick={handleClick} */ callback={changePid} pId={props.pid}/>
          <div className={s.list}>
            <h3>Commodities</h3>
            <ListCommodities
              commodities={props.commodities}
              comIsLoaded={props.comIsLoaded}
              error={props.error}
              getProductId={props.getProductId}
              deleteProduct={props.deleteProduct}
              pid={props.pid}
            />
          </div>

        </div>
      </>
    );
  }
};

export default Commodity;
