#!/usr/bin/env nodejs

/*
* Copyright 2017 FIWARE Foundation, e.V.
* All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may
* not use this file except in compliance with the License. You may obtain
* a copy of the License at
*
*         http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*/

/**
 * Module for getting the execution time in format d, h, m, s.
 *
 * @module executionTime
 */

 'use strict';
 /* jshint -W072 */

var executionTime = {} ;

/**
 * Create a list of elements compound from a head and a tail which
 * is another List.
 * @constructor
 */
function List() {
  this.head = null;
  this.tail = null;

  /**
   * Insert a new element in the list
   * @param  value value to be inserted.
   */
  this.insert = function(value) {
    if (this.head == null) {
      this.head = value;
    }
    else {
      this.tail = new Node(this.head, this.tail);
      this.head = value
    }
  };

  /**
   * Return the head of the list.
   * @return Value of the head of the List.
   */
  this.getHead = function() {
    return this.head;
  }

  /**
   * Extract the head of the list and reotganize the List.
   * @return  Head of the current List.
   */
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

/**
 * Create a new node of a List compound by a head and a tail which
 * is another List.
 * @param       head Value to be put in the head of the new node.
 * @param       tail Link to the next Node, if there is no one it
 *                   would be null.
 * @constructor
 */
function Node(head, tail) {
  this.head = head;
  this.tail = tail;
}

/**
 * Calculate the difference between two dates in format of
 * d, h, m, s, taking into account the inbformation that it
 * sends to the function. First calling function.
 * @param  {List}  list1 List of scale division to past from
 *                       miliseconds to seconds, minutes, hours and
 *                       days.
 * @param  {List}  list2 List that contains the different values
 *                       in seconds, minutes, hours and days. The
 *                       initial value of the List if the different
 *                       between two dates in miliseconds.
 * @constructor
 */
function Calculate(list1, list2) {
  if (list1.getHead() == null) { return list2; }
  else {
    var value1 = list1.get()
    var value2 = list2.get()

    var quotient = Number((value2/value1).toFixed(3));

    list2.insert(quotient);

    return CalculateNext(list1, list2)
  }
}

/**
 * Calculate function for the rest of the case except
 * the first one in the recursive operation of the algorithm.
 * @param  {List}  list1 List of scale division to past from
 *                       miliseconds to seconds, minutes, hours and
 *                       days.
 * @param  {List}  list2 List that contains the different values
 *                       in seconds, minutes, hours and days. The
 *                       initial value of the List if the different
 *                       between two dates in miliseconds.
 * @constructor
 */
function CalculateNext(list1, list2) {
  if (list1.getHead() == null) { return list2; }
  else {
    var value1 = list1.get()
    var value2 = list2.get()

    var quotient = Math.floor(value2 / value1);
    var remainder = value2 % value1;

    list2.insert(remainder);
    list2.insert(quotient);

    return CalculateNext(list1, list2)
  }
}
/**
 * Create and array in the way Ad, Bh, Cm, Ds with the translations
 * to all the miliseconds to seconds, minutes, hours and days.
 * @param  timeDifference Numeric value, miliseconds differece between
 *                        two dates.
 * @return {string}       String with the translations from miliseconds
 *                        to seconds, minutes, hours and days.
 */
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

/**
 * Recursive function to get data from difference
 * and put it in the final string format.
 * @param  {List}    list1 Numerical values in days, hours,
 *                         minutes and seconds.
 * @param  {List}    list2 Char values corresponding to d, h, m, s.
 * @return {String}        Concatenation string with the data
 *                         of the previous two List.
 */
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

/** @export */
module.exports = executionTime;
