export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  imageUrl?: string;
  createdBy: string;
  available: boolean;
}
