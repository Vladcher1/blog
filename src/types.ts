export interface ArticleState {
  author: AuthorState;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Tag[];
  title: string;
  updatedAt?: string;
}

export interface StateI {
  user: CurrentUserState;
  fetchArticles: ArticlesState;
}

export type StatusType = string;
export type FavoritedType = {
  favorited: boolean;
  favoritedCount: number;
};

export interface ArticleFormProps {
  title: string;
}

export type onSubmitType = (data: ArticleState) => void;
export type NavigateType = boolean;
export type errorType = boolean;
export type onSubmitEditType = (data: UserState) => void;

export interface InputProps {
  label: string;
  register: any;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  minLength?: number;
  inputType: string;
  errors?: any;
  pattern?: string;
  defaultValue?: string | null;
  textLabel: string;
  classNames?: string;
  styles?: any;
}

export type isErrorType = boolean;

export type Tag = string;
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
  user: CurrentUserState;
}

export interface UserState {
  bio?: null | string[];
  email: string | null;
  image?: string | null;
  token?: string | null;
  username: string | null;
  password?: string | null;
}

export interface CurrentUserState {
  error: { status: number; message: string } | null;
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

export type makeIdType = () => () => number;
export type cutInfoType = (
  text: string,
  cutCount: number,
  mode: string
) => string;
