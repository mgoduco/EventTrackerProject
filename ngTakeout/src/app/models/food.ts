export class Food {
  id: number | null;
  name: string | null;
  description: string | null;
  purchaseDate: string | null;
  price: number | null;
  rating: number | null;

  constructor(
    id: number | null = 0,
    name: string | null = '',
    description: string | null = '',
    purchaseDate: string | null = '',
    price: number | null = 0,
    rating: number | null = 0
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.purchaseDate = purchaseDate;
    this.price = price;
    this.rating = rating;
  }
}
