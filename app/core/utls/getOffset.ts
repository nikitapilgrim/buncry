export function getOffset(el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
  }
}
