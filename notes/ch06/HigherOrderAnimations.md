# Higher-order Animations

* In Ch06, we cover how to use higher-order animations.
* In Ch07, we cover how to build higher-order animations.
* Higher-order Animations (HoA) allow for composability.
* In functional programming, 
  * Higher-order functions are functions that can receive other functions as parameters and return other functions.
  * In RN2, animations are Higher-order functions.
  * Animations can accept animations as functions and return other animations.
  * This means composability.
* Ex: A Timing function
  * `withTiming(1)`
  * If you want to repeat it 5 times, then it's `repeat(withTiming(1), 5)`
  * If you want to add a delay, then it's `delay(repeat(withTiming(1), 5), 1000)`
  * In RN2, this should look like `repeat(withTiming(1), -1, true)`
    * -1 here means to loop infinitely
    * true means to loop from 0 to 1 and back from 1 to 0, (as opposed to 0 to 1 each loop)
  * In RN2, if we want the interaction to be pausable and resumable, it would look like this
    * `withPause(repeat(withTiming(1), -1, true), paused)`
    * paused means if the animation should be paused or not.
* We will look at `rn-app-examples/src/Animations`
