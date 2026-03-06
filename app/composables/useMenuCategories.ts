import { computed, type Ref } from 'vue'
import { slugify } from '~/utils/slugify'
import type { MenuPageModel } from '~/types/menu'
import type { CategoryItem } from '~/types/categorySticker'

export const useMenuCategories = (
  menus: Ref<(MenuPageModel | null | undefined)[]>
) => {
  const categories = computed<MenuCategory[]>(() => {
    const seen = new Set<string>()
    const result: MenuCategory[] = []

    for (const menu of menus.value) {
      const sections = menu?.meta?.sections ?? []

      for (const section of sections) {
        const title = section?.title?.trim()
        if (!title) continue

        const id = section.id || slugify(title)

        if (seen.has(id)) continue
        seen.add(id)

        result.push({
          id,
          label: title,
          href: `#${id}`,
        })
      }
    }
    return result
  })

  return {
    categories
  }
}
