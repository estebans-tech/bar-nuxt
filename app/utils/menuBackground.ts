export const MENU_BG_COLORS = {
  brown: "#785c39",
  red: "#6b2e32",
  sage: "#55654f",
  teal: "#275650",
  ochre: "#875c1c",
  darkBrown: "#542917",
  blue: "#254c5b",
  olive: "#61662f",
  charcoal: "#3e3639",
  olive2: "#736838",
  blueGray: "#404d4f",
  mocha: "#5e4031",
  deepOlive: "#3b3721",
  orange: "#894b1a",
  steel: "#435c6c",
  deepTeal: "#183f3a",
  rose: "#79423e",
  plum: "#3f1c2d"
} as const

export type MenuBgColorKey = keyof typeof MENU_BG_COLORS

export function resolveMenuBgColor(color?: string) {
  if (!color) return undefined
  return (MENU_BG_COLORS as Record<string, string>)[color] ?? color
}
