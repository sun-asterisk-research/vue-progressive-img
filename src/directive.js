import { createFilterElement } from './utils.js'

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.querySelector('img')
      target.src = target.dataset.fullSrc
    }
  })
}

export default {
  bind (el, binding) {
    el.observer = null

    if ('IntersectionObserver' in window) {
      el.observer = new IntersectionObserver(observerCallback)
    }

    const selector = '.progressive-img_capturer'
    const imgs = el.querySelectorAll(selector)

    imgs.forEach(img => {
      const piTiny = img.querySelector('.progressive-img_tiny')
      const piFull = img.querySelector('.progressive-img_full')

      piFull.onload = () => {
        piFull.classList.remove('progressive-img_hidden')
        piTiny.classList.add('progressive-img_hidden')

        // Add back attributes from original element
        img.attributes.forEach(attr => {
          if (!piFull.getAttribute(attr.name)) {
            piFull.setAttribute(attr.name, attr.value)
          }
        })
      }

      if (el.observer) {
        el.observer.observe(img)
      } else {
        piFull.classList.remove('progressive-img_hidden')
        piTiny.classList.add('progressive-img_hidden')
      }
    })
  },

  unbind (el, binding) {
    if (el.observer) {
      el.observer.disconnect()
    }
  }
}
