'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var DomHelper = exports.DomHelper = function () {
  function DomHelper() {
    
  }

  DomHelper.prototype.getElementDistanceToTopOfDocument = function getElementDistanceToTopOfDocument(element) {
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    var scrollTop = window.pageYOffset;
    var clientTop = documentElement.clientTop;
    var top = box.top + scrollTop - clientTop;
    return Math.round(top);
  };

  DomHelper.prototype.getElementDistanceToLeftOfDocument = function getElementDistanceToLeftOfDocument(element) {
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    var scrollLeft = window.pageXOffset;
    var clientLeft = documentElement.clientLeft;
    var left = box.left + scrollLeft - clientLeft;
    return Math.round(left);
  };

  DomHelper.prototype.hasOverflowScroll = function hasOverflowScroll(element) {
    var style = element.style;
    return style.overflowY === 'scroll' || style.overflowX === 'scroll' || style.overflow === 'scroll' || style.overflowY === 'auto' || style.overflowX === 'auto' || style.overflow === 'auto';
  };

  return DomHelper;
}();