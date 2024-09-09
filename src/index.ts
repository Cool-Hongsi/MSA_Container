/*
  We need this extra layer of indirection because it gives Webpack a chance to load all of the imports
  it needs to render the other apps.
*/
import("./bootstrap");

export {};
