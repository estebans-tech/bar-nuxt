export const useOverlay = () => {
  const isOpen = ref(false)

  const open = () => {
    if (isOpen.value) return
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  watch(isOpen, (open) => {
    if (!import.meta.client) return
    document.body.classList.toggle('overflow-hidden', open)
  })

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    document.body.classList.remove('overflow-hidden')
  })

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
