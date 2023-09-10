import { ClothItem } from "./clothItem.model";
export interface CartItem {
    "item": ClothItem,
    "quantity": number,
    "size": string
  }