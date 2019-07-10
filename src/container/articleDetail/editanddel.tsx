/*
 * @Author: wangcaowei
 * @Date: 2018-11-16 15:22:11
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 16:50:00
 */
import * as React from "react";
import { Button } from "antd";
import { UserInfo } from "../../../interface/interface";

interface Props {
  editArticle: (id: number) => void;
  showDelete: (id: number) => void;
  user: UserInfo | null;
  articleId: number;
}
const EditandDel = (props: Props) => {
  const user = props.user;
  return user && user.canwrite == 1 ? (
    <div className="article-footer">
      <Button type="primary" icon="check-circle-o" onClick={() => props.editArticle(props.articleId)}>
        编辑
      </Button>
      <Button
        style={{
          marginLeft: "20px"
        }}
        type="danger"
        icon="delete"
        onClick={() => props.showDelete(props.articleId)}
      >
        删除
      </Button>
    </div>
  ) : null;
};
export default EditandDel;
