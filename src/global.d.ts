import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      'increment-web-component': any;
    }
  }
}