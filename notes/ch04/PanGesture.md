# Pan Gestures

See: `rn-app-examples/src/PanGesture/index.tsx`

* When you are building gestures and animations, you need to do three things:  
  * Create some animation values
    * `useSharedValue()`
    * `useDerivedValue()`
  * Bind gestures to animation values
    * `useAnimatedGestureHandler()`
  * Bind values to properties
    * `useAnimatedStyle()`
    * `useAnimatedProps()`
* We use almost all of these hooks for this example.
