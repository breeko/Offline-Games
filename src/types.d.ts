
export interface Character {
    value: string
    point: Point
}

export interface Point {
    row: number
    col: number
}

export type Word = Character[]

export interface BoardOption {
    type: string
    name: string
    items: BoardOptionItem[]
}

export interface BoardOptionItem {
    value: string
    label: string
}

export interface DropdownChoice {
    label: string
    value: number
    group: string
}

export interface Coordinates {
    x: number
    y: number
}