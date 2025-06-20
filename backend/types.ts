export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  lastActiveAt: Date;
  isBlocked: boolean;
  role: string;
}

export interface CategoryType {
  parentId?: string;
  name: string;
  keyword: string;
  descriptionMeta: string;
  slug: string;
  isActive: boolean;
  createdAt?: Date;
}

export interface IProduct {
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  active: boolean;
  image: string;
  galleryImages: string[];
}

export interface IShop {
  user: string;
  name: string;
  title: string;
  description: string;
  address: string;
  slug: string;
  phone: string;
  instagram: string;
  whatsapp: string;
  logo: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
