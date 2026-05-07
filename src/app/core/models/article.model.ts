import { User } from './user.model';

export interface Article {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  author?: User;
  group: { _id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}
