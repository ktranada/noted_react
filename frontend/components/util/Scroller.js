const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

const NAV_WIDTH = 64;
const SUB_NAV_WIDTH = 250;

// Board
const BOARD_WRAPPER_PADDING = 20;
const LIST_WRAPPER_MARGIN_RIGHT = 10;
const LIST_PADDING = 10;
const LIST_WIDTH = 230;

//
const defaultThreshold = 25;

const defaultOptions = {
  element: undefined,
  thresholdRight: defaultThreshold,
  thresholdLeft: defaultThreshold,
  thresholdTop: defaultThreshold,
  thresholdBottom: defaultThreshold,

  containerWidth: window.innerWidth,
  containerHeight: window.innerHeight
}

function clearScrollInterval(intervals, direction) {
  intervals[direction] = clearInterval(intervals[direction]);
}

class Scroller {
  constructor(options = defaultOptions) {
    this.element = options.element;
    this.thresholdRight == options.thresholdRight;
    this.thresholdLeft == options.thresholdLeft;
    // this.thresholdTop == options.thresholdTop;
    // this.thresholdBottom == options.thresholdBottom;
    this.containerWidth == options.containerWidth;
    this.containerHeight == options.containerHeight;

    this.scrollIntervals = {
      left: undefined,
      right: undefined
    }

    this.isScrolling = false;
  }

  // Query methods

  isScrolledLeft() {
    return this.element.scrollLeft === 0;
  }

  isScrolledRight() {
    return (this.element.scrollWidth - this.element.clientWidth) === this.element.scrollLeft
  }

  // Actions

  scroll(direction) {
    if (this.scrollIntervals[direction]) {
      // Is scrolling
      return;
    }

    const isScrollingLeft = direction === DIRECTION_LEFT;

    if ((isScrollingLeft && this.isScrolledLeft()) ||
        (!isScrollingLeft && this.isScrolledRight())) {
      this.stopScrolling();
      return;
    }

    const oppositeDir = isScrollingLeft ? DIRECTION_RIGHT : DIRECTION_LEFT;
    const scrollValue = isScrollingLeft ? -20 : 20;

    if (this.scrollIntervals[oppositeDir]) {
      this.stopScrolling(oppositeDir, true);
    }

    if (this.element) {
      this.scrollIntervals[direction] = setInterval(() => {
        this.element.scrollLeft += scrollValue;
      }, 10);
      this.isScrolling = true;
    }
  }


  stopScrolling(direction, togglingDirection = false) {

    if (!togglingDirection) this.isScrolling = false;

    const intervals = this.scrollIntervals;
    switch(direction) {
      case 'left':
        clearScrollInterval(intervals, 'left');
        break;
      case 'right':
        clearScrollInterval(intervals, 'right');
      default:
        Object.keys(intervals)
          .forEach(direction => clearScrollInterval(intervals, direction));
        break;
    }
  }
}

export default Scroller;
