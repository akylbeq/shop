export interface Cart {
  id: string;
  quantity: number;
}

export interface ErrorResponse {
  ok: boolean;
  message: string;
}

export interface UserMutation {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface User extends UserMutation {
  _id: string;
}

export interface UserAuthorization {
  email: string;
  password: string;
}

export interface Category {
  _id: string;
  parentId: string;
  name: string;
  keyword: string;
  descriptionMeta: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryMutation {
  parentId: string;
  name: string;
  keyword: string;
  descriptionMeta: string;
  slug: string;
  isActive: boolean;
}

export interface CategoryEditing {
  _id: string;
  parentId: string;
  name: string;
  keyword: string;
  descriptionMeta: string;
  slug: string;
  isActive: boolean;
}

export interface ProductMutation {
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  originalPrice: string;
  image: string;
  active: boolean;
  galleryImages: string[];
}

export interface IProduct {
  _id: string;
  category: {
    _id: string;
    name: string;
  } | null;
  title: string;
  shortDescription: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  active: boolean;
  image: string;
  galleryImages: string[];
}

export interface Product extends ProductMutation {
  _id: string;
  discountPrice: string;
}

export interface UploadMutation {
  image: File | null;
  galleryImages: File[];
}

export interface Upload {
  image: string;
  galleryImages: string[];
}
