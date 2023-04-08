# Graph Interactions

* Building a graph interaction drawn with React Native SVG and with D3.js
* Release the gesture has a nice decay animation.
* Example is interesting for three reasons
  * So far we've seen Reanimated 2 as just a simpler API. Here we see that it's more powerful than Reanimated 1.
    * We can see we can format values on the UI thread. We couldn't do that before.
    * Previously you had to cross the native bridge and this was not performant on low-end devices.
    * This enables new use-cases that were not possible before.
  * We have code sharing between JS thread and UI thread.
    * We use code sharing for scaling the height and width of the graph and the position of each value.
    * We also have code sharing between x,y coordinates and the formatted values.
  * We are using SVG tooling (Bezier curves).
    * Animating with this tooling is much easier than in Reanimated 1.
* See rn-app-examples/src/Graph/index.ts.
