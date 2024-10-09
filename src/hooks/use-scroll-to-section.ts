const useScrollToSection = () => {
  function scrollToView(id: string, options: ScrollIntoViewOptions) {
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView(options)
      }, 100)
    }
  }
  return { scrollToView }
}

export { useScrollToSection }
