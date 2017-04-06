import { expect } from 'chai';
import Node from '../scripts/Node'

describe('Node', () => {
  it('should be create an instance of Node', () => {
    let node = new Node();

    expect(node).to.be.instanceOf(Node);
  })

  it('should have a value', () => {
    let node = new Node('a');

    expect(node.key).to.equal('a');
  })

  it('children should default to an empty object', () => {
    let node = new Node('A');

    expect(node.children).to.deep.equal({});
  })

  it('should not signal it is a word at start', () => {
    let node = new Node('A');

    expect(node.isWord).to.equal(false);
  })


})
