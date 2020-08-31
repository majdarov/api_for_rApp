/* Target
    tree = {
        id:'root',
        label: 'root'
        childs: [
            node:{
                id: 'id',
                pid: 'pid',
                label: 'label',
                childs: [
                    node: {
                        id: 'id',
                        pid: 'pid',
                        label: 'label',
                        childs: []
                    },
                    node: {...},
                    node: {...},
                    node: {...},
                ]
            },
            node: {...},
            node: {...},
        ]
    }
*/

function createNode(item) {
  let node = {...item};
  node.childs = [];
  return node;
}

function addNode(subNode, parentNode) {
  let pNode = findNode(subNode.pid, parentNode);
  try {
    if (pNode === undefined) return subNode;
    pNode.childs.push(subNode);
    pNode.childs.sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    });
    return false;
  } catch (e) {
    console.error(e.message);
  }
}

function findNode(pid, pNode) {
  if (pid === null) pid = 0;
  let result = pNode.childs.find(item => item.id === pid);

  if (result === undefined) {
    for (let node of pNode.childs) {
      result = findNode(pid, node);
      if (result) break;
    }
  }
  return result;
}

function createTree(data, root) {
  let notFoundNodes = [];
    // debugger;
  data.forEach(item => {
    let node = createNode(item);
    let notFoundNode = addNode(node, root);
    if (notFoundNode) {
      notFoundNodes.push(notFoundNode);
    }
  });
  // debugger
  if (notFoundNodes.length) {
    createTree(notFoundNodes, root);
  }
  notFoundNodes = [];
  return root;
}
export default createTree;