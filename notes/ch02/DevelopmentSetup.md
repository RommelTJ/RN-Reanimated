# Development Setup

How the course works:  
* Libraries used are "Reanimated 2" and "React Native Gesture Handler".  
* We are using Expo.  
  * Expo now can manage native code.  
* We enabled reanimated babel plugin: `rn-app-examples/babel.config.js`  
* Reanimated 2 is using Turbo Modules
  * This enables direct communication between the UI Thread and the JavaScript Thread
  * Chrome debugger won't work.
  * Solution is to use Hermes JavaScript Engine and the Hermes debugger.  
  * Hermes engine is not available with Expo (until SDK 43).  
* We will be using TypeScript.
