/* eslint-disable import/no-duplicates */

declare interface Window {
  // extend the window
}

// declare vue files as components
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}
