export default class ProgressiveImgPrepare {
  constructor(selector) {
    this.selector = selector
  }

  call(domTree, { parse }) {
    const imgs = domTree.querySelectorAll(this.selector)

    imgs.forEach(img => {
      const width = img.getAttribute('width')
      const height = img.getAttribute('height')
      const fullSrc = img.getAttribute('data-full-src') || img.getAttribute('src')
      const tinySrc = img.getAttribute('data-tiny-src')

      if (!width || !height || !tinySrc || !fullSrc) {
        return
      }

      const piWrapper = parse('<span></span>').querySelector('span')
      piWrapper.classList.add('progressive-img_capturer')
      piWrapper.classList.add('progressive-img_wrapper')

      const piTiny = parse('<canvas></canvas>').querySelector('canvas')
      piTiny.classList.add('progressive-img_tiny')
      piTiny.classList.add('progressive-img_filter-blur')
      piTiny.setAttribute('width', width)
      piTiny.setAttribute('height', height)
      piTiny.setAttribute('style', `background: url('${tinySrc}') 100%/100%`)

      const piFull = parse('<img>').querySelector('img')
      piFull.classList.add('progressive-img_full')
      piFull.classList.add('progressive-img_hidden')
      piFull.setAttribute('width', width)
      piFull.setAttribute('height', height)
      piFull.setAttribute('data-full-src', fullSrc)

      if (img.getAttribute('srcset')) {
        piFull.setAttribute('data-srcset', img.getAttribute('srcset'))
      }

      Object.entries(img.attributes).forEach(attr => {
        const piFullAttr = piFull.getAttribute(attr[0])
        if (!piFullAttr && attr[0] !== 'src' && attr[0] !== 'srcset') {
          piFull.setAttribute(attr[0], attr[1])
        }
      })

      piWrapper.appendChild(piTiny)
      piWrapper.appendChild(piFull)

      if (img.getAttribute('data-wrapper-class')) {
        img.getAttribute('data-wrapper-class').split(' ').forEach(cl => {
          piWrapper.classList.add(cl)
        })
      }

      if (img.getAttribute('data-tiny-class')) {
        img.getAttribute('data-tiny-class').split(' ').forEach(cl => {
          piTiny.classList.add(cl)
        })
      }

      if (img.getAttribute('data-full-class')) {
        img.getAttribute('data-full-class').split(' ').forEach(cl => {
          piFull.classList.add(cl)
        })
      }

      img.replaceWith(piWrapper)
    })
  }
}
