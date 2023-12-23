// const sideCards = ref(null)
// const { sideCardsWidth, sideCardsHeight } = useSizeObserver(sideCards)

/* function useSizeObserver(sideCards: Ref) {
  const sideCardsWidth = ref(0)
  const sideCardsHeight = ref(0)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      sideCardsWidth.value = entry.contentRect.width
      sideCardsHeight.value = entry.contentRect.height
    }
  })
  onMounted(() => resizeObserver.observe(sideCards.value))
  onBeforeUnmount(() => resizeObserver.unobserve(sideCards.value))
  return {
    sideCardsWidth,
    sideCardsHeight,
  }
} */
