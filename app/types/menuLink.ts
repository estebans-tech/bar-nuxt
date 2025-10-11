
export type MenuLink = {
    label: string
    href: string            // pekar på en PDF i /public
    description?: string    // liten rad under knappen
    badge?: string          // t.ex. "Neu!" / "Neues!"
}