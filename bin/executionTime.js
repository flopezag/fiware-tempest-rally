#!/usr/bin/env nodejs

/**
 * Module for getting the execution time in format d, h, m, s.
 *
 * @module executionTime
 */

 'use strict';
 /* jshint -W072 */

var executionTime = {} ;

function List() {
  this.head = null;
  this.tail = null;

  this.insert = function(value) {
    if (this.head == null) {
      this.head = value;
    }
    else {
      this.tail = new Node(this.head, this.tail);
      this.head = value
    }
  };

  this.getHead = function() {
    return this.head;
  }

  this.get = function() {
    var value = this.head
    if (this.tail == null) { this.head = null; }
    else {
      this.head = this.tail.head;
      this.tail = this.tail.tail;
    }

    return value;
  }
}

function Node(head, tail) {
  this.head = head;
  this.tail = tail;
}

function Calculate(list1, list2) {
  if (list1.getHead() == null) { return list2; }
  else {
    var value1 = list1.get()
    var value2 = list2.get()

    if ( value1 == 1000 ) {
      var quotient = Number((value2/value1).toFixed(3));

      list2.insert(quotient);
    } else {
      var quotient = Math.floor(value2 / value1);
      var remainder = value2 % value1;

      list2.insert(remainder);
      list2.insert(quotient);
    }

    return Calculate(list1, list2)
  }
}

executionTime.printData = function printData(timeDifference) {
  var list1 = new List();
  list1.insert(24);
  list1.insert(60);
  list1.insert(60);
  list1.insert(1000);

  var list2 = new List();
  list2.insert(timeDifference);

  var list3 = new List();
  list3.insert('s');
  list3.insert('m');
  list3.insert('h');
  list3.insert('d');

  var result = Calculate(list1, list2);

  return printable(result, list3);
}

function printable(list1, list2) {
  if ( list1.getHead() == null ) return null;
  else {
    var value1 = list1.get();
    var value2 = list2.get();
    var output = printable(list1, list2);

    if ( output == null) { output = value1+value2; }
    else { output = value1+value2+', '+output; }

    return output;
  }
}

//console.log(printData(14532987134));
//console.log(Number((14532987134/1000).toFixed(3)));

/** @export */
module.exports = executionTime;
