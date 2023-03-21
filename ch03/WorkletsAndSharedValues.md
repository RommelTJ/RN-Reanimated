# Worklets and Shared Values

* Reanimated revolves around the concept of Animation Worklets.
  * They are JS functions that are executed on the UI Thread.
* When wanting to animate the properties of a component, we need to wrap it so that the animated properties
can be directly updated on the UI thread.

Ex: Animating the style of a View
```typescript jsx
<View style={style} />
```
becomes
```typescript jsx
<Animated.View style={style} />
```

You can wrap your own component using `Animated.createAnimatedComponent`:  
```typescript jsx
const AnimatedPath = Animated.createAnimatedComponent(Path);
```

This function looks up the underlying native component and makes sure that all properties which are driven by animation
values are updated directly on the UI Thread.

Two kinds of UI Thread Updates:  
* Direct Updates
  * Use this if your animation will not affect the flexbox layout (e.g. translateX)
* Updates via React UI Manager
  * This is responsible for the Flexbox layout of the application.
  * It uses the Yoga Layout Engine.
  * Use this if your animation will affect the flexbox layout.

Reanimated provides us with 6 hooks to build gestures and animations:  
* `useSharedValue()`
  * Creates animation values that are shared between the UI and JavaScript thread.
* `useDerivedValue()`
  * Creates animation values from other animation values.
  * The derived values are read-only.
* `useAnimatedGestureHandler()`
  * Used to bind gestural events to animation values.
* `useAnimatedStyle()`
  * Used to animate styles of components.
* `useAnimatedProps()`
  * Used to animate props of components.
* `useAnimatedReaction`
  * Used to trigger side effects based on the state of our animation.

Hooks follow a functional model similar to React. Don't do side effects.

Functions can be run on the UI and JS threads through:  
* `runOnUI(myWorklet)("World")`
* `runOnJS(callback)("World")`

More stuff:  
* In Reanimated, animation values are named Shared Values because they are available on both threads.
* We can read and write values using the `.value` property.
```typescript jsx
const myValue = useSharedValue(0);
console.log("My Value is ", myValue.value);

<Button
  onPress={() => (myValue.value = Math.random())}
/>
```

### Example

See `rn-app-examples/src/Worklets`
