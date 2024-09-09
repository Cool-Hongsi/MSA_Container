/*
  We need this extra layer of indirection because it gives Webpack a chance to load all of the imports
  it needs to render the other apps.
*/
import("./bootstrap");

// To solve ts error => '--isolatedModules' because it is considered a global script file
// Or => Alternatively, set the 'isolatedModules' property to 'true' into 'tsconfig.json' file.
export {};
