
export function nodeParents(element : HTMLElement, selector : HTMLElement | string) : any {
  if (typeof selector === 'undefined') {
    return null;
  }
  let elem = element;
  while ((elem = elem.parentNode) !== null) {
    if (elem.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    if (selector instanceof HTMLElement && elem === selector) {
      return elem;
    } else if (typeof selector === 'string' && elem.matches(selector)) {
      return elem;
    }
  }
  return null;
}
