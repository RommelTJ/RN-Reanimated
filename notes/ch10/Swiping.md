# Swiping

* We implement a Tinder swiping example
* Exciting for three reasons
  * We're going to use two very generic recipes
    * To have a Pan Gesture Handler
      * When we start the gesture we remember its position.
      * When the gesture is active, we translate the value.
      * When we release, we decide where to snap.
    * Gesture to execute an animation imperatively (by clicking a button)
  * We can see how much simpler this is in Reanimated 2
  * Items specific to the Tinder example
    * Rotation on X-axis needs to calculate minimum distance to swipe to left or right before hiding the card
    * Spring configuration side effect.
      * When we swipe to one side, we execute a side effect indicating it's a like or a dislike.
      * Because we want to determine side effect as soon as possible, we want to trigger it as soon as the card
        is no longer visible, which may be before the animation naturally finishes.
    * Scaling animation.
      * If the card goes to the left or right, the card below gets closer.
* We will build it in 3 steps:  
  * First, adding the Pan Gesture Handler
  * Then, we add scale animation.
  * Finally, we add imperative command animations.
* See: rn-app-examples/src/Swiping
