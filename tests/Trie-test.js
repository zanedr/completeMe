import { expect } from 'chai';
import { assert } from 'chai';
import Trie from '../scripts/Trie'
const text = "/usr/share/dict/words"
let fs = require('fs')
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

// import Node from '../scripts/Node'
require('locus')


describe('Trie', () => {
  it('1. should be an object', () => {
    let trie = new Trie();

    expect(trie).to.be.instanceOf(Trie);
  })

  it('2. trie should create an empty node at this.head', () => {
    let trie = new Trie();

    expect(trie).to.deep.equal({
      count: 0,
      commonlyUsedWords: [],
      suggestions: [],
      head: {
        key: "",
        children: {},
        isWord: false
      }
    });
  })

  it('3. should be able to push nodes into trie', () => {
    var trie = new Trie();

    expect(trie.head.children).to.deep.equal({});
    trie.insert('jazz');

    assert.isObject(trie.head.children.j.children.a);

  })

  it('4. should signal that newly created words are, in fact, words', () => {
    var trie = new Trie();

    expect(trie.head.children).to.deep.equal({});
    trie.insert('jazz');
    expect(
      trie.head
      .children.j
      .children.a
      .children.z
      .children.z
      .isWord
    ).to.equal(true);
  })

  it('5. should be able to fork different words at the appropriate nodes',
  () => {
    var trie = new Trie();

    trie.insert('jazz');
    trie.insert('jargon');
    assert.isObject(trie.head.children.j.children.a.children.z);
    assert.isObject(trie.head.children.j.children.a.children.r);
  })

  it('6. should be able to find words that are already created', () => {
    var trie = new Trie();

    trie.insert('jazz');
    let testWord = 'jazz';

    expect(trie.findNode(testWord)).to.equal(trie.head.
                                            children.j.
                                            children.a.
                                            children.z.
                                            children.z);
    expect(trie.head.
           children.j.
           children.a.
           children.z.
           children.z.isWord).to.equal(true);
  })

  it('7. should keep a count of words that have been created', () => {
    var trie = new Trie();

    expect(trie.count).to.equal(0);
    trie.insert('jazz');
    trie.insert('jargon');
    trie.insert('janky');
    trie.insert('jabberwocky');
    // trie.insert('jabberwocky'); don't insert dublicate word
    expect(trie.count).to.equal(4);
  })

  it('8. should make suggestions for the next words', () => {
    var trie = new Trie();

    trie.insert('jazz');
    trie.insert('jargon');
    trie.insert('janky');
    trie.insert('jabberwocky');

    let results = trie.suggest('Ja');

    expect(results).to.deep.equal(['jazz', 'jargon', 'janky', 'jabberwocky']);
  })

  it('9. should exclude unusable words when suggesting', () => {
    var trie = new Trie();

    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('ponder');
    trie.insert('pine');
    trie.insert('prone');
    trie.insert('positive');

    let results = trie.suggest('pin');

    expect(results).to.deep.equal(['pin', 'pint', 'pinnacle', 'pine']);
  })

  it('10. should prioritize suggested words based on usage', () => {
    var trie = new Trie();

    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('pine');
    trie.insert('prone');
    trie.insert('ponder');
    trie.insert('ponderosa')
    trie.insert('pony');
    trie.insert('positive');

    trie.select('positive');
    trie.select('pine');

    let results = trie.suggest('pin');

    expect(results).to.deep.equal(['pine', 'pin', 'pint', 'pinnacle']);
    // console.log(JSON.stringify(trie, null, 4))

    results = trie.suggest('po');

    expect(results).to.deep.equal(['positive', 'ponder', 'ponderosa', 'pony']);
  })

  it('11. should use dictionary to populate and be able to return suggestions',
  () => {
    var trie = new Trie();

    dictionary.forEach((word) => {
      trie.insert(word);
    })
    let results = trie.suggest('jazz');

    expect(results).to.deep.equal([ 'jazz', 'jazzer', 'jazzily',
      'jazziness', 'jazzy' ]);
  })

  it('12. should be able to reorder suggestions ', () => {
    var trie = new Trie();

    dictionary.forEach((word) => {
      trie.insert(word);
    })
    let results = trie.suggest('jazz');

    expect(results).to.deep.equal([ 'jazz', 'jazzer', 'jazzily',
      'jazziness', 'jazzy' ]);

    trie.select('jazzy');
    // trie.select('jazzy');
    trie.select('jazzily');
    results = trie.suggest('jazz');
    // console.log(trie.count)
    // console.log(results)

    expect(results).to.deep.equal([ 'jazzy', 'jazzily', 'jazz', 'jazzer',
      'jazziness' ]);
  })

})
