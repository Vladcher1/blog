export interface ArticleState {
  author: AuthorState;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface AuthorState {
  username: string;
  bio: null;
  image: string;
  following: boolean;
}
