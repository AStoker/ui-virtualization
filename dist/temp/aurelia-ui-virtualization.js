'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualRepeat = exports.VirtualRepeatStrategyLocator = exports.DefaultStrategy = exports.TableStrategy = exports.ViewStrategyLocator = exports.ArrayVirtualRepeatStrategy = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

exports.calcOuterHeight = calcOuterHeight;
exports.insertBeforeNode = insertBeforeNode;
exports.updateVirtualOverrideContexts = updateVirtualOverrideContexts;
exports.rebindAndMoveView = rebindAndMoveView;
exports.getStyleValue = getStyleValue;
exports.getElementDistanceToBottomViewPort = getElementDistanceToBottomViewPort;
exports.getElementDistanceToTopViewPort = getElementDistanceToTopViewPort;

var _repeatUtilities = require('aurelia-templating-resources/repeat-utilities');

var _arrayRepeatStrategy = require('aurelia-templating-resources/array-repeat-strategy');

var _repeatStrategyLocator = require('aurelia-templating-resources/repeat-strategy-locator');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaBinding = require('aurelia-binding');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _analyzeViewFactory = require('aurelia-templating-resources/analyze-view-factory');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function calcOuterHeight(element) {
  var height = void 0;
  height = element.getBoundingClientRect().height;
  height += getStyleValue(element, 'marginTop');
  height += getStyleValue(element, 'marginBottom');
  return height;
}

function insertBeforeNode(view, bottomBuffer) {
  var viewStart = view.firstChild;
  var element = viewStart.nextSibling;
  var viewEnd = view.lastChild;
  var parentElement = bottomBuffer.parentElement;

  parentElement.insertBefore(viewEnd, bottomBuffer);
  parentElement.insertBefore(element, viewEnd);
  parentElement.insertBefore(viewStart, element);
}

function updateVirtualOverrideContexts(repeat, startIndex) {
  var views = repeat.viewSlot.children;
  var viewLength = views.length;
  var collectionLength = repeat.items.length;

  if (startIndex > 0) {
    startIndex = startIndex - 1;
  }

  var delta = repeat._topBufferHeight / repeat.itemHeight;

  for (; startIndex < viewLength; ++startIndex) {
    (0, _repeatUtilities.updateOverrideContext)(views[startIndex].overrideContext, startIndex + delta, collectionLength);
  }
}

function rebindAndMoveView(repeat, view, index, moveToBottom) {
  var items = repeat.items;
  var viewSlot = repeat.viewSlot;
  (0, _repeatUtilities.updateOverrideContext)(view.overrideContext, index, items.length);
  view.bindingContext[repeat.local] = items[index];
  if (moveToBottom) {
    viewSlot.children.push(viewSlot.children.shift());
    repeat.viewStrategy.moveViewLast(view, repeat.bottomBuffer);
  } else {
    viewSlot.children.unshift(viewSlot.children.splice(-1, 1)[0]);
    repeat.viewStrategy.moveViewFirst(view, repeat.topBuffer);
  }
}

function getStyleValue(element, style) {
  var currentStyle = void 0;
  var styleValue = void 0;
  currentStyle = element.currentStyle || window.getComputedStyle(element);
  styleValue = parseInt(currentStyle[style], 10);
  return Number.isNaN(styleValue) ? 0 : styleValue;
}

function getElementDistanceToBottomViewPort(element) {
  return document.documentElement.clientHeight - element.getBoundingClientRect().bottom;
}

function getElementDistanceToTopViewPort(element) {
  return element.getBoundingClientRect().top;
}

var ArrayVirtualRepeatStrategy = exports.ArrayVirtualRepeatStrategy = function (_ArrayRepeatStrategy) {
  _inherits(ArrayVirtualRepeatStrategy, _ArrayRepeatStrategy);

  function ArrayVirtualRepeatStrategy() {
    _classCallCheck(this, ArrayVirtualRepeatStrategy);

    return _possibleConstructorReturn(this, _ArrayRepeatStrategy.apply(this, arguments));
  }

  ArrayVirtualRepeatStrategy.prototype.createFirstItem = function createFirstItem(repeat) {
    var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, repeat.items[0], 0, 1);
    repeat.addView(overrideContext.bindingContext, overrideContext);
  };

  ArrayVirtualRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
    this._inPlaceProcessItems(repeat, items);
  };

  ArrayVirtualRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
    for (var i = 1, ii = repeat._viewsLength; i < ii; ++i) {
      var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[i], i, ii);
      repeat.addView(overrideContext.bindingContext, overrideContext);
    }
  };

  ArrayVirtualRepeatStrategy.prototype._inPlaceProcessItems = function _inPlaceProcessItems(repeat, items) {
    var itemsLength = items.length;
    var viewsLength = repeat.viewCount();
    var first = repeat._getIndexOfFirstView();

    while (viewsLength > itemsLength) {
      viewsLength--;
      repeat.removeView(viewsLength, true);
    }

    var local = repeat.local;

    for (var i = 0; i < viewsLength; i++) {
      var view = repeat.view(i);
      var last = i === itemsLength - 1;
      var middle = i !== 0 && !last;

      if (view.bindingContext[local] === items[i + first] && view.overrideContext.$middle === middle && view.overrideContext.$last === last) {
        continue;
      }

      view.bindingContext[local] = items[i + first];
      view.overrideContext.$middle = middle;
      view.overrideContext.$last = last;
      repeat.updateBindings(view);
    }

    var minLength = Math.min(repeat._viewsLength, items.length);
    for (var _i = viewsLength; _i < minLength; _i++) {
      var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_i], _i, itemsLength);
      repeat.addView(overrideContext.bindingContext, overrideContext);
    }
  };

  ArrayVirtualRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, array, splices) {
    this._standardProcessInstanceMutated(repeat, array, splices);
  };

  ArrayVirtualRepeatStrategy.prototype._standardProcessInstanceMutated = function _standardProcessInstanceMutated(repeat, array, splices) {
    var _this2 = this;

    if (repeat.__queuedSplices) {
      for (var i = 0, ii = splices.length; i < ii; ++i) {
        var _splices$i = splices[i];
        var index = _splices$i.index;
        var removed = _splices$i.removed;
        var addedCount = _splices$i.addedCount;

        mergeSplice(repeat.__queuedSplices, index, removed, addedCount);
      }
      repeat.__array = array.slice(0);
      return;
    }

    var maybePromise = this._runSplices(repeat, array.slice(0), splices);
    if (maybePromise instanceof Promise) {
      (function () {
        var queuedSplices = repeat.__queuedSplices = [];

        var runQueuedSplices = function runQueuedSplices() {
          if (!queuedSplices.length) {
            delete repeat.__queuedSplices;
            delete repeat.__array;
            return;
          }

          var nextPromise = _this2._runSplices(repeat, repeat.__array, queuedSplices) || Promise.resolve();
          nextPromise.then(runQueuedSplices);
        };

        maybePromise.then(runQueuedSplices);
      })();
    }
  };

  ArrayVirtualRepeatStrategy.prototype._runSplices = function _runSplices(repeat, array, splices) {
    var _this3 = this;

    var removeDelta = 0;
    var rmPromises = [];

    for (var i = 0, ii = splices.length; i < ii; ++i) {
      var splice = splices[i];
      var removed = splice.removed;
      for (var j = 0, jj = removed.length; j < jj; ++j) {
        var viewOrPromise = this._removeViewAt(repeat, splice.index + removeDelta + rmPromises.length, true);
        if (viewOrPromise instanceof Promise) {
          rmPromises.push(viewOrPromise);
        }
      }
      removeDelta -= splice.addedCount;
    }

    if (rmPromises.length > 0) {
      return Promise.all(rmPromises).then(function () {
        _this3._handleAddedSplices(repeat, array, splices);
        updateVirtualOverrideContexts(repeat, 0);
      });
    }
    this._handleAddedSplices(repeat, array, splices);
    updateVirtualOverrideContexts(repeat, 0);
  };

  ArrayVirtualRepeatStrategy.prototype._removeViewAt = function _removeViewAt(repeat, collectionIndex, returnToCache) {
    var viewOrPromise = void 0;
    var view = void 0;
    var viewSlot = repeat.viewSlot;
    var viewCount = repeat.viewCount();
    var viewAddIndex = void 0;

    if (!this._isIndexBeforeViewSlot(repeat, viewSlot, collectionIndex) && !this._isIndexAfterViewSlot(repeat, viewSlot, collectionIndex)) {
      var viewIndex = this._getViewIndex(repeat, viewSlot, collectionIndex);
      viewOrPromise = repeat.removeView(viewIndex, returnToCache);
      if (repeat.items.length > viewCount) {
        var collectionAddIndex = void 0;
        if (repeat._bottomBufferHeight > repeat.itemHeight) {
          viewAddIndex = viewCount;
          collectionAddIndex = repeat._getIndexOfLastView() + 1;
          repeat._bottomBufferHeight = repeat._bottomBufferHeight - repeat.itemHeight;
        } else if (repeat._topBufferHeight > 0) {
          viewAddIndex = 0;
          collectionAddIndex = repeat._getIndexOfFirstView() - 1;
          repeat._topBufferHeight = repeat._topBufferHeight - repeat.itemHeight;
        }
        var data = repeat.items[collectionAddIndex];
        if (data) {
          var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, repeat.items[collectionAddIndex], collectionAddIndex, repeat.items.length);
          view = repeat.viewFactory.create();
          view.bind(overrideContext.bindingContext, overrideContext);
        }
      } else {
        return viewOrPromise;
      }
    } else if (this._isIndexBeforeViewSlot(repeat, viewSlot, collectionIndex)) {
      if (repeat._bottomBufferHeight > 0) {
        repeat._bottomBufferHeight = repeat._bottomBufferHeight - repeat.itemHeight;
        rebindAndMoveView(repeat, repeat.view(0), repeat.view(0).overrideContext.$index, true);
      } else {
        repeat._topBufferHeight = repeat._topBufferHeight - repeat.itemHeight;
      }
    } else if (this._isIndexAfterViewSlot(repeat, viewSlot, collectionIndex)) {
      repeat._bottomBufferHeight = repeat._bottomBufferHeight - repeat.itemHeight;
    }

    if (viewOrPromise instanceof Promise) {
      viewOrPromise.then(function () {
        repeat.viewSlot.insert(viewAddIndex, view);
        repeat._adjustBufferHeights();
      });
      return undefined;
    } else if (view) {
      repeat.viewSlot.insert(viewAddIndex, view);
    }

    repeat._adjustBufferHeights();
  };

  ArrayVirtualRepeatStrategy.prototype._isIndexBeforeViewSlot = function _isIndexBeforeViewSlot(repeat, viewSlot, index) {
    var viewIndex = this._getViewIndex(repeat, viewSlot, index);
    return viewIndex < 0;
  };

  ArrayVirtualRepeatStrategy.prototype._isIndexAfterViewSlot = function _isIndexAfterViewSlot(repeat, viewSlot, index) {
    var viewIndex = this._getViewIndex(repeat, viewSlot, index);
    return viewIndex > repeat._viewsLength - 1;
  };

  ArrayVirtualRepeatStrategy.prototype._getViewIndex = function _getViewIndex(repeat, viewSlot, index) {
    if (repeat.viewCount() === 0) {
      return -1;
    }

    var topBufferItems = repeat._topBufferHeight / repeat.itemHeight;
    return index - topBufferItems;
  };

  ArrayVirtualRepeatStrategy.prototype._handleAddedSplices = function _handleAddedSplices(repeat, array, splices) {
    var arrayLength = array.length;
    var viewSlot = repeat.viewSlot;
    for (var i = 0, ii = splices.length; i < ii; ++i) {
      var splice = splices[i];
      var addIndex = splice.index;
      var end = splice.index + splice.addedCount;
      for (; addIndex < end; ++addIndex) {
        var hasDistanceToBottomViewPort = getElementDistanceToBottomViewPort(repeat.bottomBuffer.previousElementSibling) > 0;
        if (repeat.viewCount() === 0 || !this._isIndexBeforeViewSlot(repeat, viewSlot, addIndex) && !this._isIndexAfterViewSlot(repeat, viewSlot, addIndex) || hasDistanceToBottomViewPort) {
          var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, array[addIndex], addIndex, arrayLength);
          repeat.insertView(addIndex, overrideContext.bindingContext, overrideContext);
          if (!repeat._hasCalculatedSizes) {
            repeat._calcInitialHeights(1);
          } else if (repeat.viewCount() > repeat._viewsLength) {
            if (hasDistanceToBottomViewPort) {
              repeat.removeView(0, true, true);
              repeat._topBufferHeight = repeat._topBufferHeight + repeat.itemHeight;
              repeat._adjustBufferHeights();
            } else {
              repeat.removeView(repeat.viewCount() - 1, true, true);
              repeat._bottomBufferHeight = repeat._bottomBufferHeight + repeat.itemHeight;
            }
          }
        } else if (this._isIndexBeforeViewSlot(repeat, viewSlot, addIndex)) {
          repeat._topBufferHeight = repeat._topBufferHeight + repeat.itemHeight;
        } else if (this._isIndexAfterViewSlot(repeat, viewSlot, addIndex)) {
          repeat._bottomBufferHeight = repeat._bottomBufferHeight + repeat.itemHeight;
          repeat.isLastIndex = false;
        }
      }
    }
    repeat._adjustBufferHeights();
  };

  return ArrayVirtualRepeatStrategy;
}(_arrayRepeatStrategy.ArrayRepeatStrategy);

var ViewStrategyLocator = exports.ViewStrategyLocator = function () {
  function ViewStrategyLocator() {
    _classCallCheck(this, ViewStrategyLocator);
  }

  ViewStrategyLocator.prototype.getStrategy = function getStrategy(element) {
    if (element.parentNode.localName === 'tbody') {
      return new TableStrategy();
    }
    return new DefaultStrategy();
  };

  return ViewStrategyLocator;
}();

var TableStrategy = exports.TableStrategy = function () {
  function TableStrategy() {
    _classCallCheck(this, TableStrategy);
  }

  TableStrategy.prototype.getScrollContainer = function getScrollContainer(element) {
    return element.parentNode;
  };

  TableStrategy.prototype.moveViewFirst = function moveViewFirst(view, topBuffer) {
    insertBeforeNode(view, topBuffer.parentElement.nextElementSibling.previousSibling);
  };

  TableStrategy.prototype.moveViewLast = function moveViewLast(view, bottomBuffer) {
    insertBeforeNode(view, bottomBuffer.parentElement);
  };

  TableStrategy.prototype.createTopBufferElement = function createTopBufferElement(element) {
    var tr = document.createElement('tr');
    var buffer = document.createElement('td');
    buffer.setAttribute('style', 'height: 0px');
    tr.appendChild(buffer);
    element.parentElement.insertBefore(tr, element);
    return buffer;
  };

  TableStrategy.prototype.createBottomBufferElement = function createBottomBufferElement(element) {
    var tr = document.createElement('tr');
    var buffer = document.createElement('td');
    buffer.setAttribute('style', 'height: 0px');
    tr.appendChild(buffer);
    element.parentNode.insertBefore(tr, element.nextSibling);
    return buffer;
  };

  TableStrategy.prototype.removeBufferElements = function removeBufferElements(element, topBuffer, bottomBuffer) {
    element.parentElement.removeChild(topBuffer.parentElement);
    element.parentElement.removeChild(bottomBuffer.parentElement);
  };

  return TableStrategy;
}();

var DefaultStrategy = exports.DefaultStrategy = function () {
  function DefaultStrategy() {
    _classCallCheck(this, DefaultStrategy);
  }

  DefaultStrategy.prototype.getScrollContainer = function getScrollContainer(element) {
    return element.parentNode;
  };

  DefaultStrategy.prototype.moveViewFirst = function moveViewFirst(view, topBuffer) {
    insertBeforeNode(view, topBuffer.nextElementSibling.previousSibling);
  };

  DefaultStrategy.prototype.moveViewLast = function moveViewLast(view, bottomBuffer) {
    var previousSibling = bottomBuffer.previousSibling;
    var referenceNode = previousSibling.nodeType === 8 && previousSibling.data === 'anchor' ? previousSibling : bottomBuffer;
    insertBeforeNode(view, referenceNode);
  };

  DefaultStrategy.prototype.createTopBufferElement = function createTopBufferElement(element) {
    var elementName = element.parentElement.localName === 'ul' ? 'li' : 'div';
    var buffer = document.createElement(elementName);
    buffer.setAttribute('style', 'height: 0px');
    element.parentElement.insertBefore(buffer, element);
    return buffer;
  };

  DefaultStrategy.prototype.createBottomBufferElement = function createBottomBufferElement(element) {
    var elementName = element.parentElement.localName === 'ul' ? 'li' : 'div';
    var buffer = document.createElement(elementName);
    buffer.setAttribute('style', 'height: 0px');
    element.parentNode.insertBefore(buffer, element.nextSibling);
    return buffer;
  };

  DefaultStrategy.prototype.removeBufferElements = function removeBufferElements(element, topBuffer, bottomBuffer) {
    element.parentElement.removeChild(topBuffer);
    element.parentElement.removeChild(bottomBuffer);
  };

  return DefaultStrategy;
}();

var VirtualRepeatStrategyLocator = exports.VirtualRepeatStrategyLocator = function (_RepeatStrategyLocato) {
  _inherits(VirtualRepeatStrategyLocator, _RepeatStrategyLocato);

  function VirtualRepeatStrategyLocator() {
    _classCallCheck(this, VirtualRepeatStrategyLocator);

    var _this4 = _possibleConstructorReturn(this, _RepeatStrategyLocato.call(this));

    _this4.matchers = [];
    _this4.strategies = [];

    _this4.addStrategy(function (items) {
      return items instanceof Array;
    }, new ArrayVirtualRepeatStrategy());
    return _this4;
  }

  return VirtualRepeatStrategyLocator;
}(_repeatStrategyLocator.RepeatStrategyLocator);

var VirtualRepeat = exports.VirtualRepeat = (_dec = (0, _aureliaTemplating.customAttribute)('virtual-repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaBinding.ObserverLocator, VirtualRepeatStrategyLocator, ViewStrategyLocator), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
  _inherits(VirtualRepeat, _AbstractRepeater);

  function VirtualRepeat(element, viewFactory, instruction, viewSlot, observerLocator, strategyLocator, viewStrategyLocator) {
    _classCallCheck(this, VirtualRepeat);

    var _this5 = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
      local: 'item',
      viewsRequireLifecycle: (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory)
    }));

    _this5._first = 0;
    _this5._previousFirst = 0;
    _this5._viewsLength = 0;
    _this5._lastRebind = 0;
    _this5._topBufferHeight = 0;
    _this5._bottomBufferHeight = 0;
    _this5._bufferSize = 5;
    _this5._scrollingDown = false;
    _this5._scrollingUp = false;
    _this5._switchedDirection = false;
    _this5._isAttached = false;
    _this5._ticking = false;
    _this5._fixedHeightContainer = false;
    _this5._hasCalculatedSizes = false;
    _this5._isAtTop = true;

    _initDefineProp(_this5, 'items', _descriptor, _this5);

    _initDefineProp(_this5, 'local', _descriptor2, _this5);

    _this5.element = element;
    _this5.viewFactory = viewFactory;
    _this5.instruction = instruction;
    _this5.viewSlot = viewSlot;
    _this5.observerLocator = observerLocator;
    _this5.strategyLocator = strategyLocator;
    _this5.viewStrategyLocator = viewStrategyLocator;
    _this5.sourceExpression = (0, _repeatUtilities.getItemsSourceExpression)(_this5.instruction, 'virtual-repeat.for');
    _this5.isOneTime = (0, _repeatUtilities.isOneTime)(_this5.sourceExpression);
    return _this5;
  }

  VirtualRepeat.prototype.attached = function attached() {
    var _this6 = this;

    this._isAttached = true;
    var element = this.element;
    this.viewStrategy = this.viewStrategyLocator.getStrategy(element);
    this.scrollContainer = this.viewStrategy.getScrollContainer(element);
    this.topBuffer = this.viewStrategy.createTopBufferElement(element);
    this.bottomBuffer = this.viewStrategy.createBottomBufferElement(element);
    this.itemsChanged();
    this.scrollListener = function () {
      return _this6._onScroll();
    };
    this.distanceToTop = getElementDistanceToTopViewPort(this.topBuffer.nextElementSibling);
    var containerStyle = this.scrollContainer.style;
    if (containerStyle.overflowY === 'scroll' || containerStyle.overflow === 'scroll' || containerStyle.overflowY === 'auto' || containerStyle.overflow === 'auto') {
      this._fixedHeightContainer = true;
      this.scrollContainer.addEventListener('scroll', this.scrollListener);
    } else {
      document.addEventListener('scroll', this.scrollListener);
    }
  };

  VirtualRepeat.prototype.bind = function bind(bindingContext, overrideContext) {
    this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
    this._itemsLength = this.items.length;
  };

  VirtualRepeat.prototype.call = function call(context, changes) {
    this[context](this.items, changes);
  };

  VirtualRepeat.prototype.detached = function detached() {
    this.scrollContainer.removeEventListener('scroll', this.scrollListener);
    this._first = 0;
    this._previousFirst = 0;
    this._viewsLength = 0;
    this._lastRebind = 0;
    this._topBufferHeight = 0;
    this._bottomBufferHeight = 0;
    this._scrollingDown = false;
    this._scrollingUp = false;
    this._switchedDirection = false;
    this._isAttached = false;
    this._ticking = false;
    this._hasCalculatedSizes = false;
    this.viewStrategy.removeBufferElements(this.element, this.topBuffer, this.bottomBuffer);
    this.isLastIndex = false;
    this.scrollContainer = null;
    this.scrollContainerHeight = null;
    this.distanceToTop = null;
    this.removeAllViews(true);
    if (this.scrollHandler) {
      this.scrollHandler.dispose();
    }
    this._unsubscribeCollection();
  };

  VirtualRepeat.prototype.itemsChanged = function itemsChanged() {
    this._unsubscribeCollection();

    if (!this.scope) {
      return;
    }
    var items = this.items;
    this.strategy = this.strategyLocator.getStrategy(items);
    if (items.length > 0 && this.viewCount() === 0) {
      this.strategy.createFirstItem(this);
    }
    this._calcInitialHeights(items.length);
    if (!this.isOneTime && !this._observeInnerCollection()) {
      this._observeCollection();
    }

    this.strategy.instanceChanged(this, items, this._viewsLength);
  };

  VirtualRepeat.prototype.unbind = function unbind() {
    this.scope = null;
    this.items = null;
    this._itemsLength = null;
  };

  VirtualRepeat.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
    this._handlingMutations = true;
    this._itemsLength = collection.length;
    this.strategy.instanceMutated(this, collection, changes);
  };

  VirtualRepeat.prototype.handleInnerCollectionMutated = function handleInnerCollectionMutated(collection, changes) {
    var _this7 = this;

    if (this.ignoreMutation) {
      return;
    }
    this.ignoreMutation = true;
    var newItems = this.sourceExpression.evaluate(this.scope, this.lookupFunctions);
    this.observerLocator.taskQueue.queueMicroTask(function () {
      return _this7.ignoreMutation = false;
    });

    if (newItems === this.items) {
      this.itemsChanged();
    } else {
      this.items = newItems;
    }
  };

  VirtualRepeat.prototype._onScroll = function _onScroll() {
    var _this8 = this;

    if (!this._ticking && !this._handlingMutations) {
      requestAnimationFrame(function () {
        return _this8._handleScroll();
      });
      this._ticking = true;
    }

    if (this._handlingMutations) {
      this._handlingMutations = false;
    }
  };

  VirtualRepeat.prototype._handleScroll = function _handleScroll() {
    if (!this._isAttached) {
      return;
    }
    var itemHeight = this.itemHeight;
    var scrollTop = this._fixedHeightContainer ? this.scrollContainer.scrollTop : pageYOffset - this.distanceToTop;
    this._first = Math.floor(scrollTop / itemHeight);
    this._first = this._first < 0 ? 0 : this._first;
    if (this._first > this.items.length - this.elementsInView) {
      this._first = this.items.length - this.elementsInView;
    }
    this._checkScrolling();

    if (this._scrollingDown) {
      var viewsToMove = this._first - this._lastRebind;
      if (this._switchedDirection) {
        viewsToMove = this._isAtTop ? this._first : this._bufferSize - (this._lastRebind - this._first);
      }
      this._isAtTop = false;
      this._lastRebind = this._first;
      var movedViewsCount = this._moveViews(viewsToMove);
      var adjustHeight = movedViewsCount < viewsToMove ? this._bottomBufferHeight : itemHeight * movedViewsCount;
      this._switchedDirection = false;
      this._topBufferHeight = this._topBufferHeight + adjustHeight;
      this._bottomBufferHeight = this._bottomBufferHeight - adjustHeight;
      if (this._bottomBufferHeight >= 0) {
        this._adjustBufferHeights();
      }
    } else if (this._scrollingUp) {
      var _viewsToMove = this._lastRebind - this._first;
      if (this._switchedDirection) {
        if (this.isLastIndex) {
          _viewsToMove = this.items.length - this._first - this.elementsInView;
        } else {
          _viewsToMove = this._bufferSize - (this._first - this._lastRebind);
        }
      }
      this.isLastIndex = false;
      this._lastRebind = this._first;
      var _movedViewsCount = this._moveViews(_viewsToMove);
      this.movedViewsCount = _movedViewsCount;
      var _adjustHeight = _movedViewsCount < _viewsToMove ? this._topBufferHeight : itemHeight * _movedViewsCount;
      this._switchedDirection = false;
      this._topBufferHeight = this._topBufferHeight - _adjustHeight;
      this._bottomBufferHeight = this._bottomBufferHeight + _adjustHeight;
      if (this._topBufferHeight >= 0) {
        this._adjustBufferHeights();
      }
    }
    this._previousFirst = this._first;

    this._ticking = false;
  };

  VirtualRepeat.prototype._checkScrolling = function _checkScrolling() {
    if (this._first > this._previousFirst && (this._bottomBufferHeight > 0 || !this.isLastIndex)) {
      if (!this._scrollingDown) {
        this._scrollingDown = true;
        this._scrollingUp = false;
        this._switchedDirection = true;
      } else {
        this._switchedDirection = false;
      }
      this._isScrolling = true;
    } else if (this._first < this._previousFirst && (this._topBufferHeight >= 0 || !this._isAtTop)) {
      if (!this._scrollingUp) {
        this._scrollingDown = false;
        this._scrollingUp = true;
        this._switchedDirection = true;
      } else {
        this._switchedDirection = false;
      }
      this._isScrolling = true;
    } else {
      this._isScrolling = false;
    }
  };

  VirtualRepeat.prototype._adjustBufferHeights = function _adjustBufferHeights() {
    this.topBuffer.setAttribute('style', 'height:  ' + this._topBufferHeight + 'px');
    this.bottomBuffer.setAttribute('style', 'height: ' + this._bottomBufferHeight + 'px');
  };

  VirtualRepeat.prototype._unsubscribeCollection = function _unsubscribeCollection() {
    if (this.collectionObserver) {
      this.collectionObserver.unsubscribe(this.callContext, this);
      this.collectionObserver = null;
      this.callContext = null;
    }
  };

  VirtualRepeat.prototype._moveViews = function _moveViews(length) {
    var _this9 = this;

    var getNextIndex = this._scrollingDown ? function (index, i) {
      return index + i;
    } : function (index, i) {
      return index - i;
    };
    var isAtFirstOrLastIndex = function isAtFirstOrLastIndex() {
      return _this9._scrollingDown ? _this9.isLastIndex : _this9._isAtTop;
    };
    var childrenLength = this.viewCount();
    var viewIndex = this._scrollingDown ? 0 : childrenLength - 1;
    var items = this.items;
    var index = this._scrollingDown ? this._getIndexOfLastView() + 1 : this._getIndexOfFirstView() - 1;
    var i = 0;
    var viewToMoveLimit = length - childrenLength * 2;
    while (i < length && !isAtFirstOrLastIndex()) {
      var view = this.view(viewIndex);
      var nextIndex = getNextIndex(index, i);
      this.isLastIndex = nextIndex >= items.length - 1;
      this._isAtTop = nextIndex <= 0;
      if (!(isAtFirstOrLastIndex() && childrenLength >= items.length)) {
        if (i > viewToMoveLimit) {
          rebindAndMoveView(this, view, nextIndex, this._scrollingDown);
        }
        i++;
      }
    }
    return length - (length - i);
  };

  VirtualRepeat.prototype._getIndexOfLastView = function _getIndexOfLastView() {
    return this.view(this.viewCount() - 1).overrideContext.$index;
  };

  VirtualRepeat.prototype._getIndexOfFirstView = function _getIndexOfFirstView() {
    return this.view(0) ? this.view(0).overrideContext.$index : -1;
  };

  VirtualRepeat.prototype._calcInitialHeights = function _calcInitialHeights(itemsLength) {
    if (this._viewsLength > 0 && this._itemsLength === itemsLength || itemsLength <= 0) {
      return;
    }
    this._hasCalculatedSizes = true;
    this._itemsLength = itemsLength;
    var firstViewElement = this.view(0).firstChild.nextElementSibling;
    this.itemHeight = calcOuterHeight(firstViewElement);
    if (this.itemHeight <= 0) {
      throw new Error('Could not calculate item height');
    }
    this.scrollContainerHeight = this._fixedHeightContainer ? this._calcScrollHeight(this.scrollContainer) : document.documentElement.clientHeight;
    this.elementsInView = Math.ceil(this.scrollContainerHeight / this.itemHeight) + 1;
    this._viewsLength = this.elementsInView * 2 + this._bufferSize;
    this._bottomBufferHeight = this.itemHeight * itemsLength - this.itemHeight * this._viewsLength;
    if (this._bottomBufferHeight < 0) {
      this._bottomBufferHeight = 0;
    }
    this.bottomBuffer.setAttribute('style', 'height: ' + this._bottomBufferHeight + 'px');
    this._topBufferHeight = 0;
    this.topBuffer.setAttribute('style', 'height: ' + this._topBufferHeight + 'px');

    this.scrollContainer.scrollTop = 0;
    this._first = 0;
  };

  VirtualRepeat.prototype._calcScrollHeight = function _calcScrollHeight(element) {
    var height = void 0;
    height = element.getBoundingClientRect().height;
    height -= getStyleValue(element, 'borderTopWidth');
    height -= getStyleValue(element, 'borderBottomWidth');
    return height;
  };

  VirtualRepeat.prototype._observeInnerCollection = function _observeInnerCollection() {
    var items = this._getInnerCollection();
    var strategy = this.strategyLocator.getStrategy(items);
    if (!strategy) {
      return false;
    }
    this.collectionObserver = strategy.getCollectionObserver(this.observerLocator, items);
    if (!this.collectionObserver) {
      return false;
    }
    this.callContext = 'handleInnerCollectionMutated';
    this.collectionObserver.subscribe(this.callContext, this);
    return true;
  };

  VirtualRepeat.prototype._getInnerCollection = function _getInnerCollection() {
    var expression = (0, _repeatUtilities.unwrapExpression)(this.sourceExpression);
    if (!expression) {
      return null;
    }
    return expression.evaluate(this.scope, null);
  };

  VirtualRepeat.prototype._observeCollection = function _observeCollection() {
    var items = this.items;
    this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, items);
    if (this.collectionObserver) {
      this.callContext = 'handleCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
    }
  };

  VirtualRepeat.prototype.viewCount = function viewCount() {
    return this.viewSlot.children.length;
  };

  VirtualRepeat.prototype.views = function views() {
    return this.viewSlot.children;
  };

  VirtualRepeat.prototype.view = function view(index) {
    return this.viewSlot.children[index];
  };

  VirtualRepeat.prototype.addView = function addView(bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    view.bind(bindingContext, overrideContext);
    this.viewSlot.add(view);
  };

  VirtualRepeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    view.bind(bindingContext, overrideContext);
    this.viewSlot.insert(index, view);
  };

  VirtualRepeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
    return this.viewSlot.removeAll(returnToCache, skipAnimation);
  };

  VirtualRepeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
    return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
  };

  VirtualRepeat.prototype.updateBindings = function updateBindings(view) {
    var j = view.bindings.length;
    while (j--) {
      (0, _repeatUtilities.updateOneTimeBinding)(view.bindings[j]);
    }
    j = view.controllers.length;
    while (j--) {
      var k = view.controllers[j].boundProperties.length;
      while (k--) {
        var binding = view.controllers[j].boundProperties[k].binding;
        (0, _repeatUtilities.updateOneTimeBinding)(binding);
      }
    }
  };

  return VirtualRepeat;
}(_aureliaTemplatingResources.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);