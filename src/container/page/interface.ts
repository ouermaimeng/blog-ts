import { ArticleList } from "../../../interface/interface";

export interface MapStateProps {
  articleList: ArticleList;
}

export interface MapDispatchProps {
  getArticleList: () => Promise<void>;
}

export type Props = MapStateProps & MapDispatchProps;
