export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IData extends Array<IProduct> {}

export interface IOrder {
  id: number;
  count: number;
}

export type OrderType = {
  count: string;
  price: string;
};

export interface ICart {
  cartList: IOrder;
}

export interface ICartProduct extends IProduct {
  order: OrderType;
}

export interface Btns extends Element {
  dataset: {
    id: string;
    added: string;
  };
}

export type BtnsType = {
  id: string;
  added: string;
};

export interface CheckBox {
  ids: number[];
  name: string;
  count: number;
  found: number;
}

export interface ICheckFilters {
  brand: Array<string>;
  category: Array<string>;
}

export type FilterNameType = 'category' | 'brand';

export interface CheckBoxData extends Array<CheckBox> {}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type Input = string | number;
