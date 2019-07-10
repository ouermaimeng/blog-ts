import { History } from "history";
import { ArticleAndTag, UserInfo } from "../../../interface/interface";

export interface OwnProps {
  history: History;
}

export interface MapStatesProps {
  article: ArticleAndTag | null;
  user: UserInfo | null;
}

export interface MapDispatchProps {
  getArticleById: (id: number) => Promise<void>;
  getArticleList: (tagId: number) => Promise<void>;
  showDelete: (id: number) => void;
}

export type Props = OwnProps & MapDispatchProps & MapStatesProps;
