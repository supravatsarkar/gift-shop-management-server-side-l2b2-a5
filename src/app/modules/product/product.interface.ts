export interface TProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  occasion: string;
  recipient: string;
  category: string;
  theme: string;
  brand: string;
  deletedAt: Date | null;
}
