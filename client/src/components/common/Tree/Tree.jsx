import React, { useEffect } from "react";
import s from "./Tree.module.css";
import createTree from "./treeFunction";
import Node from "./Node";

const Tree = props => {
  let nodeRoot = { id: 0, label: props.price, childs: [] };
  let tree = { id: "Tree", label: props.treeLabel, childs: [nodeRoot] };
  createTree(props.data, tree);

  useEffect(() => {
    if (props.pId) {
      document
        .getElementById("Tree")
        .querySelectorAll("span")
        .forEach(item => {
          if (item.className === s.selected) item.className = null;
        });
      let nodeSelected = document.getElementById(props.pId);
      nodeSelected.querySelector("span").className = s.selected;
      let ul = nodeSelected.closest('ul');
      if (ul.hidden) {
        ul.hidden = false;
      }
    }
  }, [props.pId])

  function handleClick(e) {
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

    if (props.callback) {
      props.callback(elem.id);
    }

  }

  function createSubTree(item, lvl = 0) {
    let hidden;
    lvl += 1;
    let children = [];
    if (item.childs?.length) {
      children = item.childs.map(elem => {
        return createSubTree(elem, lvl);
      });
    }
    hidden = lvl > 1 ? "hidden" : null;
    return (
      <Node
        id={item.id}
        key={item.id}
        label={item.label}
        children={children}
        hidden={hidden}
      />
    );
  }

  let treeElements = createSubTree(nodeRoot);

  return (
    <div id={tree.id} className={s.tree} onClick={/* (e) => props.handleClick(e) */ handleClick}>
      <h3>{tree.label}</h3>
      <ul>{treeElements}</ul>
    </div>
  );
};

export default Tree;
