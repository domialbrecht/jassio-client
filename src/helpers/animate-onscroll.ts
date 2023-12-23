/*
 * Code copied and adjusted from https://github.com/home
 */
import { observe } from 'selector-observer'

const BUILDINCLASS = 'animate-in'
const DEFAULTMARGINBOTTOM = 30
const DEFAULTMARGINTOP = 0
const DEFAULTTHRESHOLD = 0.01

function toggleAnimationClasses(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    entry.target.classList.toggle(BUILDINCLASS, entry.isIntersecting)
    if (!entry.target.classList.contains('js-animate-in-trigger')) continue

    entry.target.querySelectorAll('.js-animate-in-item').forEach((item) => {
      item.classList.toggle(BUILDINCLASS, entry.isIntersecting)
    })
  }
}

function animationOptions(element: Element) {
  const marginBottom = Number(
    element.getAttribute('data-animate-margin-bottom') || DEFAULTMARGINBOTTOM
  )
  const marginTop = Number(element.getAttribute('data-animate-margin-top') || DEFAULTMARGINTOP)
  const threshold = Number(element.getAttribute('data-animate-threshold') || DEFAULTTHRESHOLD)

  return {
    marginBottom,
    marginTop,
    threshold,
    isDefault:
      marginBottom === DEFAULTMARGINBOTTOM &&
      marginTop === DEFAULTMARGINTOP &&
      threshold === DEFAULTTHRESHOLD
  }
}

export function setupScrollAnimations() {
  observe('.js-animate-in-trigger[data-anmiate-in-stagger]', (element) => {
    const stagger = parseInt(element.getAttribute('data-anmiate-in-stagger')!)
    const items = element.querySelectorAll<HTMLElement>('.js-animate-in-item')

    for (let i = 0; i < items.length; i++) items[i].style.transitionDelay = `${i * stagger}ms`
  })

  const defaultObserver = new IntersectionObserver(toggleAnimationClasses, {
    rootMargin: `-${DEFAULTMARGINTOP}% 0% -${DEFAULTMARGINBOTTOM}% 0%`,
    threshold: DEFAULTTHRESHOLD
  })
  observe('.js-animate-in, .js-animate-in-trigger', (element) => {
    const options = animationOptions(element)
    if (options.isDefault) return defaultObserver.observe(element)

    const customObserver = new IntersectionObserver(toggleAnimationClasses, {
      rootMargin: `-${options.marginTop}% 0% -${options.marginBottom}% 0%`,
      threshold: options.threshold
    })
    customObserver.observe(element)
  })
}
