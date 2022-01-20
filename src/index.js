import directive from './directive.js'
import component from './progressive-img.vue'
import { ProgressiveImgPrepare } from './helpers'
import { createFilterElement } from './utils.js'

const plugin = {
  install (Vue, options) {
    Vue.directive('progressive-img', directive)
    Vue.component('progressive-img', component)

    if (typeof document !== 'undefined') {
      createFilterElement()
    }
  }
}

export {
  directive as ProgressiveImgDirective,
  component as ProgressiveImgComponent,
  plugin as ProgressiveImgPlugin,
  ProgressiveImgPrepare as ProgressiveImgPrepare
}
