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

export interface IData {
  productList: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

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


export type BtnsType = {
  id: string;
  state: string;
};