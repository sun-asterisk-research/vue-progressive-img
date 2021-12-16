# vue-progressive-img

**This is branch and documentation for Vue 3. Visit the [legacy](https://github.com/sun-asterisk-research/vue-progressive-img/tree/legacy) branch for Vue 2.**

![Peek 2021-11-23 00-06](https://user-images.githubusercontent.com/15942946/142904401-28c22329-2e7f-45f8-9655-307f0aef4be2.gif)

Progressive Image Loading plugin for Vue projects.

## Example/Demo

- https://github.com/tranxuanthang/cat-pics-pil
- https://awesome-shirley-c6c0a7.netlify.app/

## Installation

Install the package:


```shell
# npm
npm install --save @tranxuanthang/vue-progressive-img

# yarn
yarn add @tranxuanthang/vue-progressive-img
```

Initialize the plugin:

```diff
  import { createApp } from 'vue'
  import App from './App.vue'
+ import { ProgressiveImgPlugin } from '@tranxuanthang/vue-progressive-img'
+ import '@tranxuanthang/vue-progressive-img/src/styles.css'

  const app = createApp(App)
+ app.use(ProgressiveImgPlugin)
  app.mount('#app')
```

## Usage

There are 2 ways you can use the `vue-progressive-img` plugin.

### The `<progressive-img>` component

`<progressive-img>` is a simple wrapper component and easy to use. It behaves similar to normal `<img>` tag, and has only one extra `tiny-src` attribute.

```vue
<template>
  <progressive-img
    tiny-src="60px-width-image.jpg"
    src="full-image.jpg"
    width="1280"
    height="720"
    alt="Image description"
    ...
  />
</template>
```

The wrapped `<img>` element inside inherits all other attributes passed to `<progressive-img>` component, so you can add any other attributes to `<progressive-img>` as you wish (`alt`, `srcset`,...).

### The directive way

Directive mode is a more complex way, but it has some extra benefits: 
- Might be more efficient if you need to show a lot of images. Because all selected images inside directive wrapped element share the same *intersection observer* instance.
- Can be use with dynamic html content (`v-html`).

```vue
<template>
  <div v-progressive-img="'img'">
    <span class="block flex justify-center mb-6 mx-auto max-h-[50vh]"
      v-for="(image, index) in images"
      :key="index"
    >
      <img
        :data-tiny-src="image.tinyUrl"
        :data-full-src="image.fullUrl"
        :width="image.width"
        :height="image.height"
        :alt="image.description"
      />
    </span>
  </div>
</template>
```
