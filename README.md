# 📖 ngx-foldable

[![NPM version](https://img.shields.io/npm/v/ngx-foldable.svg)](https://www.npmjs.com/package/ngx-foldable)
[![Build Status](https://github.com/sinedied/ngx-foldable/workflows/build/badge.svg)](https://github.com/sinedied/ngx-foldable/actions)
![Node version](https://img.shields.io/node/v/ngx-foldable.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> ngx-foldable is a set of components and services to help you build dual-screen experiences for foldable or dual-screen devices, such as the [Surface Duo](https://docs.microsoft.com/dual-screen/web/?WT.mc_id=ngxfoldable-github-yolasors)

TODO: screenshot demo

See the [Live Demo](https://sinedied.github.io/ngx-foldable/demo/)

## Status

This is currently an experimental project aiming to explore how existing web apps could be adapted to build responsive UIs on dual-screen devices, with as little changes as possible on the code.

## How to test on your browser

The dual-screen emulation feature requires Microsoft Edge or Google Chrome canary versions for now, with experimental flags to enable.

Follow [the instructions here](https://devblogs.microsoft.com/surface-duo/build-and-test-dual-screen-web-apps/?WT.mc_id=ngxfoldable-github-yolasors#build-and-test-on-the-desktop) to setup your browser for dual-screen emulation.

## Library usage

Check out the [demo](./projects/demo/src/app) source code to see an example usage of the library.

Add the library to your Angular project:

```sh
npm install ngx-foldable
```

Import the library in your app:

```ts
import { FoldableModule } from 'ngx-foldable';
...

@NgModule({
  ...
  imports: [
    FoldableModule
    ...
  ],
  ...
})
export class AppModule { }
```

Use the provided `fdSplitLayout`, `fdWindow` and `fdIfSpan` directives to build your layout:

```html
<!--
  SplitLayout supports: flex, grid or absolute
  Styling is only added when a multi screen mode is detected.
-->
<div fdSplitLayout="grid">

  <!-- Assign to first window segment -->
  <section fdWindow="0">
    This will be displayed on the first window segment of a multi screen or single screen device.
    
    <p *fdIfSpan="'none'; else alt">This is only visible on a single screen device.</p>
    <ng-template #alt><p>This is only visible on a multi screen device.</p></ng-template>
  </section>

  <!-- Assign to second window segment -->
  <section fdWindow="1">
    This will be displayed on the second window segment of a multi screen device.

    <p *fdIfSpan="'multi'">This is only visible on multi screen device, regardless of the orientation.</p>
    <p *fdIfSpan="'fold-horizontal'">This is only visible on horizontal fold spanning.</p>
    <p *fdIfSpan="'fold-vertical'">This is only visible on vertical fold spanning.</p>
  </section>
</div>
```

Using the `ScreenContext` service, you can also receive updates when the screen context changes:

```typescript
import { ScreenContext } from 'ngx-foldable';
...
export class AppComponent {
  constructor(private screenContext: ScreenContext) {
    this.screenContext
      .asObservable()
      .subscribe(context: ScreenContextData) {
        console.log('Screen context changed:', context);
      }
  }
}
```

You can read the full documentation [here](https://sinedied.github.io/ngx-foldable/).
