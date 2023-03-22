# The Heart of the Matter

The key to successful animations is to avoid frame drops, which means you have 16ms to render everything.

In React Native,
* You have the JS Thread which runs the React code.
* You have the native UI Thread that interacts with the native APIs of the device. 
* They talk to each other via asynchronous JSON messages.
* So if the JS Thread is busy rendering your components or dealing with API calls, you are likely to drop frames.  
* See HeartOfTheMatter.tsx
