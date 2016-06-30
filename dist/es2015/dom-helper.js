export let DomHelper = class DomHelper {
  getElementDistanceToTopOfDocument(element) {
    let box = element.getBoundingClientRect();
    let documentElement = document.documentElement;
    let scrollTop = window.pageYOffset;
    let clientTop = documentElement.clientTop;
    let top = box.top + scrollTop - clientTop;
    return Math.round(top);
  }

  getElementDistanceToLeftOfDocument(element) {
    let box = element.getBoundingClientRect();
    let documentElement = document.documentElement;
    let scrollLeft = window.pageXOffset;
    let clientLeft = documentElement.clientLeft;
    let left = box.left + scrollLeft - clientLeft;
    return Math.round(left);
  }

  hasOverflowScroll(element) {
    let style = element.style;
    return style.overflowY === 'scroll' || style.overflowX === 'scroll' || style.overflow === 'scroll' || style.overflowY === 'auto' || style.overflowX === 'auto' || style.overflow === 'auto';
  }
};