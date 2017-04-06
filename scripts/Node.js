export default class Node {

  constructor(key = '', children = {}) {
    this.key = key;
    this.children = children;
    this.isWord = false;
  }

  // constructor(key = '', children = {}) {
  //   this[key] = children
  //   // this.isWord = false
  // }

}
