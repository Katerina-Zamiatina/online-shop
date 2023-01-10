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
    added: Boolean;
  };
}

export type BtnsType = {
  id: string;
  added: boolean;
};
