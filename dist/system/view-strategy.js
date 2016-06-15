'use strict';

System.register(['aurelia-pal', 'aurelia-templating', './utilities'], function (_export, _context) {
  "use strict";

  var DOM, View, insertBeforeNode, ViewStrategyLocator, TableStrategy, DefaultViewStrategy;

  

  return {
    setters: [function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaTemplating) {
      View = _aureliaTemplating.View;
    }, function (_utilities) {
      insertBeforeNode = _utilities.insertBeforeNode;
    }],
    execute: function () {
      _export('ViewStrategyLocator', ViewStrategyLocator = function () {
        function ViewStrategyLocator() {
          
        }

        ViewStrategyLocator.prototype.getStrategy = function getStrategy(element) {
          if (element.parentNode && element.parentNode.localName === 'tbody') {
            return new TableStrategy();
          }
          return new DefaultViewStrategy();
        };

        return ViewStrategyLocator;
      }());

      _export('ViewStrategyLocator', ViewStrategyLocator);

      _export('TableStrategy', TableStrategy = function () {
        function TableStrategy() {
          

          this.tableCssReset = '\
    display: block;\
    width: auto;\
    height: auto;\
    margin: 0;\
    padding: 0;\
    border: none;\
    border-collapse: inherit;\
    border-spacing: 0;\
    background-color: transparent;\
    -webkit-border-horizontal-spacing: 0;\
    -webkit-border-vertical-spacing: 0;';
        }

        TableStrategy.prototype.getScrollContainer = function getScrollContainer(element) {
          return element.parentNode;
        };

        TableStrategy.prototype.moveViewFirst = function moveViewFirst(view, topBuffer) {
          insertBeforeNode(view, DOM.nextElementSibling(topBuffer.parentNode).previousSibling);
        };

        TableStrategy.prototype.moveViewLast = function moveViewLast(view, bottomBuffer) {
          insertBeforeNode(view, bottomBuffer.parentNode);
        };

        TableStrategy.prototype.createTopBufferElement = function createTopBufferElement(element) {
          var tr = DOM.createElement('tr');
          tr.setAttribute('style', this.tableCssReset);
          var buffer = DOM.createElement('td');
          buffer.setAttribute('style', this.tableCssReset);
          tr.appendChild(buffer);
          element.parentNode.insertBefore(tr, element);
          return buffer;
        };

        TableStrategy.prototype.createBottomBufferElement = function createBottomBufferElement(element) {
          var tr = DOM.createElement('tr');
          tr.setAttribute('style', this.tableCssReset);
          var buffer = DOM.createElement('td');
          buffer.setAttribute('style', this.tableCssReset);
          tr.appendChild(buffer);
          element.parentNode.insertBefore(tr, element.nextSibling);
          return buffer;
        };

        TableStrategy.prototype.removeBufferElements = function removeBufferElements(element, topBuffer, bottomBuffer) {
          element.parentNode.removeChild(topBuffer.parentNode);
          element.parentNode.removeChild(bottomBuffer.parentNode);
        };

        TableStrategy.prototype.getFirstElement = function getFirstElement(topBuffer) {
          var tr = topBuffer.parentNode;
          return DOM.nextElementSibling(tr);
        };

        TableStrategy.prototype.getLastElement = function getLastElement(bottomBuffer) {
          return bottomBuffer.parentNode.previousElementSibling;
        };

        return TableStrategy;
      }());

      _export('TableStrategy', TableStrategy);

      _export('DefaultViewStrategy', DefaultViewStrategy = function () {
        function DefaultViewStrategy() {
          
        }

        DefaultViewStrategy.prototype.getScrollContainer = function getScrollContainer(element) {
          return element.parentNode;
        };

        DefaultViewStrategy.prototype.moveViewFirst = function moveViewFirst(view, topBuffer) {
          insertBeforeNode(view, DOM.nextElementSibling(topBuffer));
        };

        DefaultViewStrategy.prototype.moveViewLast = function moveViewLast(view, bottomBuffer) {
          var previousSibling = bottomBuffer.previousSibling;
          var referenceNode = previousSibling.nodeType === 8 && previousSibling.data === 'anchor' ? previousSibling : bottomBuffer;
          insertBeforeNode(view, referenceNode);
        };

        DefaultViewStrategy.prototype.createTopBufferElement = function createTopBufferElement(element) {
          var elementName = element.parentNode.localName === 'ul' ? 'li' : 'div';
          var buffer = DOM.createElement(elementName);
          element.parentNode.insertBefore(buffer, element);
          return buffer;
        };

        DefaultViewStrategy.prototype.createBottomBufferElement = function createBottomBufferElement(element) {
          var elementName = element.parentNode.localName === 'ul' ? 'li' : 'div';
          var buffer = DOM.createElement(elementName);
          element.parentNode.insertBefore(buffer, element.nextSibling);
          return buffer;
        };

        DefaultViewStrategy.prototype.removeBufferElements = function removeBufferElements(element, topBuffer, bottomBuffer) {
          element.parentNode.removeChild(topBuffer);
          element.parentNode.removeChild(bottomBuffer);
        };

        DefaultViewStrategy.prototype.getFirstElement = function getFirstElement(topBuffer) {
          return DOM.nextElementSibling(topBuffer);
        };

        DefaultViewStrategy.prototype.getLastElement = function getLastElement(bottomBuffer) {
          return bottomBuffer.previousElementSibling;
        };

        return DefaultViewStrategy;
      }());

      _export('DefaultViewStrategy', DefaultViewStrategy);
    }
  };
});