import { CartItem } from "./cartItem.model"
export interface User {
    username?: string,
    user?: string,
    password?: string,
    isCurrentUser?: boolean,
    cartItem? : CartItem[]
}

