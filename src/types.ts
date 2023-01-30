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

export interface ArticlesState {
  articles: any[];
  status: string;
  error: any;
  currentPage: number;
  articlesCount: number | null;
}

export interface UserState {
  bio: null | string[];
  email: string | null;
  image: string | null;
  token: string | null;
  username: string | null;
}

export interface CurrentUserState {
  isLogged: boolean;
  user: UserState | null;
  status: string;
}
