# [5.0.0](https://github.com/sinedied/ngx-foldable/compare/4.0.0...5.0.0) (2022-11-29)


### Features

* update to Angular 15 ([4cb5766](https://github.com/sinedied/ngx-foldable/commit/4cb5766e6cccb2fd04c35df56bd208c1f5a39cfe))


### BREAKING CHANGES

* Need Angular version >=15
Need Node.js version >=14.20.0

# [4.0.0](https://github.com/sinedied/ngx-foldable/compare/3.1.0...4.0.0) (2022-06-03)


### Bug Fixes

* set minimum Angular version to 14 ([26533ab](https://github.com/sinedied/ngx-foldable/commit/26533ab46527b35385cb9ff89382014ca7f361ff))
* set minimum node version ([7527356](https://github.com/sinedied/ngx-foldable/commit/7527356cf5b6d6787462a72e6c6077d9d433a6e7))


### BREAKING CHANGES

* set minimum node version to 14.15
* set minimum Angular version to 14

# [3.1.0](https://github.com/sinedied/ngx-foldable/compare/3.0.0...3.1.0) (2022-06-03)


### Features

* support new stable API ([30b605d](https://github.com/sinedied/ngx-foldable/commit/30b605d4918ca41a09b3537be16acd25a70d1a91))

# [3.0.0](https://github.com/sinedied/ngx-foldable/compare/2.0.0...3.0.0) (2021-11-25)


### Features

* rename spanning mode and media queries ([66c7a62](https://github.com/sinedied/ngx-foldable/commit/66c7a62a93fa890ea8dc2b6f7a03b88253251116))
* upgrade to latest APF ([5ac1ca9](https://github.com/sinedied/ngx-foldable/commit/5ac1ca9c4bc6ce57af6c79e1c4a395f40f18628c))


### BREAKING CHANGES

* This library now requires Angular v13 or latest.
Use the previous versions of this library if you require compatibility with older Angular version.
* To better match the new viewport browser API, the spanning modes and media queries have been renamed.
It now matches the number of segments on a given axis instead of the fold axis,
which should be less confusing.

You can migrate by performing these replacements:
- ScreenSpanning.Vertical -> ScreenSpanning.DualHorizontal
- ScreenSpanning.Horizontal -> ScreenSpanning.DualVertical
- 'fold-horizontal' -> 'dual-vertical'
- 'fold-vertical' -> 'dual-horizontal'
- singleFoldHorizontal -> dualVerticalViewport
- singleFoldVertical -> dualHorizontalViewport

# [2.0.0](https://github.com/sinedied/ngx-foldable/compare/1.1.1...2.0.0) (2021-11-22)


### Features

* remove old APIs support ([df1ca39](https://github.com/sinedied/ngx-foldable/commit/df1ca390eae33279ef4ba145da6a5653c0231cfe))
* update CSS for new APIs ([afab1c4](https://github.com/sinedied/ngx-foldable/commit/afab1c486462f9f2b3f36929f50c2c7df56d34c8))
* update media queries to support new css segments API ([fc26aae](https://github.com/sinedied/ngx-foldable/commit/fc26aae9ab035715c8e429cc4aee5b7250f9b19f))
* update screenContext to support new visualViewport API ([a444236](https://github.com/sinedied/ngx-foldable/commit/a444236028c6d301e753ef9fb3f798f1108d20bd))


### BREAKING CHANGES

* remove old APIs support

## [1.1.1](https://github.com/sinedied/ngx-foldable/compare/1.1.0...1.1.1) (2021-03-19)


### Bug Fixes

* layout issues on real devices ([8446001](https://github.com/sinedied/ngx-foldable/commit/844600128fb3af4760b577ef22299842b6f318d7))

# [1.1.0](https://github.com/sinedied/ngx-foldable/compare/1.0.5...1.1.0) (2021-03-17)


### Bug Fixes

* inconsistent layout with rtl and fdIfSpan ([1acd46e](https://github.com/sinedied/ngx-foldable/commit/1acd46e32c237624d2e436c6bc1625cad3035f29))
* only allow valid options for SplitLayoutDirective ([3240712](https://github.com/sinedied/ngx-foldable/commit/3240712f21dbd25347cdf69c8f4b53daee340dd7))


### Features

* add option to reverse window order ([acb3fff](https://github.com/sinedied/ngx-foldable/commit/acb3fff202be180639e2cffcf3e1483e1547d6c0))

## [1.0.5](https://github.com/sinedied/ngx-foldable/compare/1.0.4...1.0.5) (2021-03-16)


### Bug Fixes

* refresh on orientation changes and extra repaints ([0683aa3](https://github.com/sinedied/ngx-foldable/commit/0683aa348d992aa23ed2778d9b65f4bf5b95a44c))
* screen context initialization ([14da071](https://github.com/sinedied/ngx-foldable/commit/14da07174867fcda1b4c3919907250b9ca89f8ca))

## [1.0.4](https://github.com/sinedied/ngx-foldable/compare/1.0.3...1.0.4) (2021-03-16)


### Bug Fixes

* issues when using typescript strict mode ([b84fc9f](https://github.com/sinedied/ngx-foldable/commit/b84fc9f86a0c02bd71fa072f8be5ca1e63db90fb))

## [1.0.3](https://github.com/sinedied/ngx-foldable/compare/1.0.2...1.0.3) (2021-03-12)


### Bug Fixes

* update min angular version ([d383609](https://github.com/sinedied/ngx-foldable/commit/d3836093a9a5eee19bead640062200bb1994d807))

## [1.0.2](https://github.com/sinedied/ngx-foldable/compare/1.0.1...1.0.2) (2021-03-12)


### Bug Fixes

* angular min version ([4aa85c7](https://github.com/sinedied/ngx-foldable/commit/4aa85c78f57c9f817b0a3efa61372340dca58b99))

## [1.0.1](https://github.com/sinedied/ngx-foldable/compare/1.0.0...1.0.1) (2021-03-11)


### Bug Fixes

* docs deployment ([b1c68ac](https://github.com/sinedied/ngx-foldable/commit/b1c68ac7641f2145addef1480f5e669207a349a5))

# 1.0.0 (2021-03-11)


### Bug Fixes

* directives export ([536764f](https://github.com/sinedied/ngx-foldable/commit/536764fd1c959501de1a25469281c9fb2537dfeb))
* fdIfSpan init ([7e66b70](https://github.com/sinedied/ngx-foldable/commit/7e66b70c71a84e784eb60cb56744e9c1b9d9a8c3))
* revert naming changes ([3ee5543](https://github.com/sinedied/ngx-foldable/commit/3ee55430887e815dec7ecfd4b5e587f2cdd1abc4))


### Features

* add RTL support ([8bdb155](https://github.com/sinedied/ngx-foldable/commit/8bdb1554fe44304bda979dc7c184c91df3ded32e))
* add ScreenContext first value and fix span check ([487885f](https://github.com/sinedied/ngx-foldable/commit/487885f02fe3b68141f68382fd3c2318748211a1))
* add SplitLayout directive ([9fadf70](https://github.com/sinedied/ngx-foldable/commit/9fadf702882a53c57f3d8440074f8f3feca82ffe))
* add support for grid and absolute layouts ([582e83e](https://github.com/sinedied/ngx-foldable/commit/582e83eb4176ccb9f9a602c835522ad8f70095df))
* add Window directive ([b2a3632](https://github.com/sinedied/ngx-foldable/commit/b2a3632fa2f950e9b0b3cd237540857e319d8beb))
* demo test ([90ad184](https://github.com/sinedied/ngx-foldable/commit/90ad1844ea8bcbf50c0e7c892ae61635f7b2b993))
* finish demo project ([db13ef1](https://github.com/sinedied/ngx-foldable/commit/db13ef1f6d798c5716dc61bf6f3d60fdb9901c0d))
* implement fdIfSpan directive ([083b648](https://github.com/sinedied/ngx-foldable/commit/083b64890e57b451c42ab42d930ca30a6d2c22e1))
* implement ScreenContext service ([466a9d7](https://github.com/sinedied/ngx-foldable/commit/466a9d7d6f257eccf6590381fc19815dead14e0f))
* initial commit ([9ff473a](https://github.com/sinedied/ngx-foldable/commit/9ff473a1c34bb6be4b3185bb92fd4e0a0fcee7f7))
* initial work on service API ([962620d](https://github.com/sinedied/ngx-foldable/commit/962620d0bd0a9c731e695d5f540e12e3dc9331b4))
* update to ng 11 ([4708aff](https://github.com/sinedied/ngx-foldable/commit/4708aff57cf290991aa6bf7ef77bc2768614847c))
