class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    if (this.head === null) {
      this.head = new ListNode(data);
      return;
    }

    let current = this.head;
    while (current) {
      if (current.next === null) {
        current.next = new ListNode(data);
        current = null;
        return;
      }
      current = current.next;
    }
  }

  reverse() {
    let prev = null;
    let current = this.head;

    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}

const list = new LinkedList();

list.append(1);
list.append(3);
list.append(5);
list.append(7);
