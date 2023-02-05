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
  updatedAt?: string;
}

export interface AuthorState {
  username: string;
  bio: null;
  image: string;
  following: boolean;
}

export interface ArticlesState {
  slug: any;
  articles: any[];
  status: string;
  error: any;
  currentPage: number;
  articlesCount: number | null;
}

export interface DataUser {
  user: UserState;
}

export interface UserState {
  bio?: null | string[];
  email: string | null;
  image?: string | null;
  token?: string | null;
  username: string | null;
  password?: string;
}

export interface CurrentUserState {
  error: string | null;
  isLogged: boolean | null;
  user: UserState | null;
  status: string | null;
}

export interface NewUserData {
  newEmail: Pick<UserState, "email">;
  newPassword: string;
  newImage: Pick<UserState, "image">;
  newUsername: Pick<UserState, "username">;
}

export interface updateUserData extends UserState {
  token: string | null;
}
