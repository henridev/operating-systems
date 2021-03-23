export enum States {
    HOLDING_BOTH_FORKS = 'HOLDING_BOTH_FORKS',
    HOLDING_RIGHT_FORK = 'HOLDING_RIGHT_FORK',
    HOLDING_LEFT_FORK = 'HOLDING_LEFT_FORK',
    EATING = 'EATING',
    HANGRY = 'HANGRY',
}

export enum Sides {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export interface coords {
    x: number
    y: number
}

export interface Philosopher {
    name: string
    forkLeft: number
    forkRight: number
    interval: undefined | number | NodeJS.Timeout
    coords: coords
    color: string
    fullness: number
    isSelected: boolean
    state: States
    priority: number
}

export interface Fork {
    heldBy: undefined | null | Philosopher
    coords: coords
    i: number
}
