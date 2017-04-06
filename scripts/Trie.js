import Node from '../scripts/Node'

export default class Trie {
  constructor () {
    this.head = new Node('');
    this.count = 0;
    this.suggestions = [];
    this.commonlyUsedWords = [];
  }

  findNode (input) {
    let arrayedInput = input.split('');
    let currentNode = this.head;
    let currentChar = arrayedInput.shift();

    while (currentNode.children[currentChar] && currentChar) {
      currentNode = currentNode.children[currentChar];
      currentChar = arrayedInput.shift();
    }

    if (!currentNode) {
      return 'nothing to see here. move along';
    }

    return currentNode;
  }

  insert (input) {
    let wordCheck = [];
    let arrayedInput = input.split('');
    let currentNode = this.head;
    let currentChar = arrayedInput.shift();

    wordCheck.push(currentChar);

    while (currentChar) {
      if (!currentNode.children[currentChar]) {
        currentNode.children[currentChar] = new Node(currentChar);
      }
      currentNode = currentNode.children[currentChar];
      currentChar = arrayedInput.shift();
      wordCheck.push(currentChar);
    }

    if (input == wordCheck.join('')) {
      currentNode.isWord = true;
      this.count++;
    }
  }

  suggest (input) {
    this.suggestions = [];
    input = input.toLowerCase();
    let currentNode = this.findNode(input);

    // think about passing in suggestions array and returning,
    // so you can remove trie property
    // i.e. --> suggestions = this.recursiveSuggest(currentNode, input, []);
    this.recursiveSuggest(currentNode, input);
    let reorderedSuggestions = this.prioritizeSuggestions(this.suggestions);

    return reorderedSuggestions;
  }

  recursiveSuggest (currentNode, wordInProgress) {
    if (currentNode.isWord === true) {
      this.suggestions.push(wordInProgress);
    }

    Object.keys(currentNode.children).forEach((val) => {
      let wordBuilding = wordInProgress + val;

      this.recursiveSuggest(currentNode.children[val], wordBuilding);
    })
  }

  prioritizeSuggestions (suggestions) {
    suggestions.forEach((val, index) => {
      for (let i = 0; i < this.commonlyUsedWords.length; i++) {
        if (this.commonlyUsedWords[i] == val) {
          let holder = suggestions.splice(index, 1);

          suggestions.splice(0, 0, holder.toString());
        }
      }
    })
    return suggestions;
  }

  select (word) {
    this.commonlyUsedWords.push(word);
  }
}
