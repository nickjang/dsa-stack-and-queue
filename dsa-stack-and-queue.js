/**
 * 1. Create a stack class
 */
class _StackNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(item) {
    if (!this.top) {
      this.top = new _StackNode(item, null);
    } else {
      this.top = new _StackNode(item, this.top);
    }
  }

  pop() {
    if (!this.top) return null;
    const value = this.top.value;
    this.top = this.top.next;
    return value;
  }
}

// const starTrek = new Stack();
// starTrek.push('Kirk');
// starTrek.push('Spock');
// starTrek.push('McCoy');
// starTrek.push('Scotty');

/**
 * 2. Useful methods for a stack
 */
function peek(stack) {
  if (!stack.top) return null;
  return stack.top.value;
}

function display(stack) {
  let str = '';

  if (!stack.top) return 'top -> null';
  else str += `(top -> ${stack.top.value})`;

  let currNode = stack.top.next;
  while (currNode) {
    str += ` -> ${currNode.value}`;
    currNode = currNode.next;
  }
  console.log(str);
}

// starTrek.pop();
// starTrek.pop();
// display(starTrek);

/**
 * 3. Check for palindromes using a stack
 */
function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  // Your code goes here
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    stack.push(s.charAt(i));
  }

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) !== stack.pop())
      return false;
  }
  return true;
}

// True, true, true, false
// console.log(is_palindrome('dad'));
// console.log(is_palindrome('A man, a plan, a canal: Panama'));
// console.log(is_palindrome('1001'));
// console.log(is_palindrome('Tauhida'));

/**
 * 4. Matching parentheses in an expression
 * ([)] -> false
 * (()) -> true
 * '(' -> true
 */
function matchingOpenAndClosing(expression) {
  const matches = {
    '(': ')',
    '[': ']',
    '{': '}',
    '"': '"',
    '\'': '\''
  };
  let closing = Object.values(matches);
  const expecting = new Stack();
  let isQuotes = false; // if true, ignore other matches

  let currChar;
  for (let i = 0; i < expression.length; i++) {
    currChar = expression.charAt(i);

    // check if ending quote
    if (isQuotes && currChar === peek(expecting)) {
      expecting.pop();
      isQuotes = false;
    }
    else if (!isQuotes) {
      // check if about to start quotes
      if (currChar === '\'' || currChar === '"') {
        expecting.push(matches[currChar]);
        isQuotes = true;
      } else if (matches[currChar]) {
        // add closing bracket to match
        expecting.push(matches[currChar]);
      } else if (closing.includes(currChar)) {
        // check if closing bracket matches
        if (expecting.pop() !== currChar) {
          console.log(`Unexpected '${currChar}' at index: ${i}`);
          return false;
        }
      }
    }
  }

  // check if open
  if (peek(expecting)) {
    let open;
    closing = expecting.pop();
    let skip = false;

    if (closing === ')') open = '(';
    else if (closing === ']') open = '[';
    else if (closing === '}') open = '{';
    else if (closing === '"') open = '"';
    else if (closing === '\'') open = '\'';

    for (let i = expression.length - 1; i >= 0; i--) {
      currChar = expression.charAt(i);
      if (skip && currChar === open) {
        skip = false;
      } else if (currChar !== '\'' && currChar !== '"'
        && currChar === matches[open]) {
        skip = true;
      } else if (!skip && expression.charAt(i) === open) {
        console.log(`Open '${open}' at index: ${i}`);
        return false;
      }
    }
  }
  return true;
}
//console.log(matchingOpenAndClosing('\'(([])\''));

/**
 * 5. Sort stack
 * [1, 2, 3, 4] -> [1, 2, 3, 4]
 * [2, 1, 1, 3] -> [1, 1, 2, 3]
 * [] -> []
 * [1] -> [1]
 */
function sortStack(stack) {
  const sorted = new Stack();

  let currValue = stack.pop();
  while (currValue) {
    while (currValue < peek(sorted)) {
      stack.push(sorted.pop());
    }
    sorted.push(currValue);
    currValue = stack.pop();
  }

  // order least to greatest
  while (peek(sorted)) stack.push(sorted.pop());
  return stack;
}
// const stack = new Stack();
// stack.push(4);
// stack.push(3);
// stack.push(2);
// stack.push(1);
// display(sortStack(stack));

/**
 * 6. Create a queue using Singly linked list
 */
class _QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(item) {
    const node = new _QueueNode(item);
    if (!this.first)
      this.first = node;
    if (this.last)
      this.last.next = node;
    this.last = node;
  }

  dequeue() {
    if (!this.first) return null;
    const node = this.first;
    this.first = this.first.next;
    if (!this.first)
      this.last = null;
    return node.value;
  }
}

function peekQ(queue) {
  if (!queue.first) return null;
  return queue.first.value;
}

function isEmpty(queue) {
  return !queue.first;
}

function displayQ(queue) {
  let str = '';

  if (!queue.first) return 'first -> null';
  else str += `(first -> ${queue.first.value})`;

  let currNode = queue.first.next;
  while (currNode) {
    str += ` -> ${currNode.value}`;
    currNode = currNode.next;
  }
  console.log(str);
}

// const starTrekQ = new Queue();
// starTrekQ.enqueue('Kirk');
// starTrekQ.enqueue('Spock');
// starTrekQ.enqueue('Uhura');
// starTrekQ.enqueue('Sulu');
// starTrekQ.enqueue('Checkov');
// starTrekQ.dequeue();
// displayQ(starTrekQ);

/**
 * 7. Create a queue class using Doubly linked List
 */
class _DLLNode {
  constructor(value, prev) {
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
}

class DLLQueue {
  constructor() {
    this.first = null; // first = head
  }

  enqueue(item) {
    if (!this.first)
      this.first = new _QueueNode(item, null);
    else {
      let currNode = this.first;
      while (currNode.next) currNode = currNode.next;
      currNode.next = new _QueueNode(item, currNode);
    }

  }

  dequeue() {
    if (!this.first) return null;
    const node = this.first;
    this.first = this.first.next;
    return node.value;
  }
}

// const starTrekQ = new DLLQueue();
// starTrekQ.enqueue('Kirk');
// starTrekQ.enqueue('Spock');
// starTrekQ.enqueue('Uhura');
// starTrekQ.enqueue('Sulu');
// starTrekQ.enqueue('Checkov');
// starTrekQ.dequeue();
// console.log(peekQ(starTrekQ));

/**
 * 9. Queue implementation using a stack
 */
class StackQueue {
  constructor() {
    this.stack = new Stack();
  }

  enqueue(item) {
    const temp = new Stack();
    while (peek(this.stack))
      temp.push(this.stack.pop());
    temp.push(item);
    while (peek(temp))
      this.stack.push(temp.pop());
  }

  dequeue() {
    return this.stack.pop();
  }
}

function displayStackQ(queue) {
  let stack = queue.stack;
  let str = '';

  if (!stack.top) return 'first -> null';
  else str += `(first -> ${stack.top.value})`;

  let currNode = stack.top.next;
  while (currNode) {
    str += ` -> ${currNode.value}`;
    currNode = currNode.next;
  }
  console.log(str);
}

/**
 * 9. Square dance pairing
 * F Jane
 * M Frank
 * M John             [ 'Frank', 'Jane' ],
 * M Sherlock      => [ 'Madonna', 'John' ],
 * F Madonna          [ 'Beyonce', 'Sherlock' ]
 * M David 
 * M Christopher 
 * F Beyonce
 */
function squareDancePairing(people) {
  const pairs = [];
  const pairMap = { 'F': 'M', 'M': 'F' };
  const queues = {
    'F': new Queue(),
    'M': new Queue()
  };
  for (const person of people) {
    const oppositeGenderQueue = queues[pairMap[person.gender]];
    if (isEmpty(oppositeGenderQueue)) {
      queues[person.gender].enqueue(person.name);
    } else {
      pairs.push([person.name, oppositeGenderQueue.dequeue()]);
    }
  }
  return pairs;
}
// console.log(squareDancePairing([
//   { gender: 'F', name: 'Jane' },
//   { gender: 'M', name: 'Frank' },
//   { gender: 'M', name: 'John' },
//   { gender: 'M', name: 'Sherlock' },
//   { gender: 'F', name: 'Madonna' },
//   { gender: 'M', name: 'David' },
//   { gender: 'M', name: 'Christopher' },
//   { gender: 'F', name: 'Beyonce' }
// ]));

/**
 * 10. Bank
 * People sent to back of line 25% of time
 */
function bank() {
  const queue = new Queue();
  let personIdx = 0;

  for (let i = 0; i < 200; i++) {
    if (i % 10 === Math.floor(Math.random() * 10)) {
      queue.enqueue('person ' + personIdx);
      personIdx++;
    }
    if (i % 20 === 0) {
      const next = queue.dequeue();
      if (Math.random() < .25) 
        queue.enqueue(next);
    }
  }
  return queue;
}
displayQ(bank());
