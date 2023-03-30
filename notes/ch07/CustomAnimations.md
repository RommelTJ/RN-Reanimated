# Custom Animations

* We will build three animations.
* First, a decay animation when we release a Pan Gesture.
* Second, a higher-order animation to creating a bouncing effect.
* Third, a pause animation.
* An animation has two functions
  * `animation: (animation: State, now: number) => boolean;`
    * Used to calculate the next animation state, and returns true if it's finished or not.
  * `start(...) => void`
    * The starting point of the animation.
* See: `rn-app-examples/src/Animations`
* Course goes over creating withDecay animation from scratch using a worklet.
  * Goes from 6:37 to 16:50
* Course goes over creating withBounce animation from scratch using a worklet.
  * Goes from 16:50 to 25:30
