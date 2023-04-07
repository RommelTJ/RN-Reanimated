# Circular Slider

* Building a circular slider.
* Deploying two recipes:
  * Trigonometric recipe
  * SVG animation recipe
* 0,0 is top left of screen
* React Native Canvas coordinate system
* Cartesian Coordinate system
* Polar coordinate system
* How it will work: 
  * We have a PanGesture Handler that controls the circle
  * We get the polar coordinate of our finger
  * This is relative to the center of our circular slider.
  * So we have a radius and an angle
  * We change the value of the radius to be the radius of the circle
  * Then this new polar coordinate is converted back to canvas coordinate system
  * This gives us the proper translation around the circle.
* The circle goes from 0 to 2xPi
* Some formulas go from 0 to Pi and -0 to -Pi, so we need to normalize the values
* Conversions are done with formulas from redash.
* See `rn-app-examples/src/CircularSlider/index.ts`
