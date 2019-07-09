/*
 * @Author: wangcaowei
 * @Date: 2018-11-16 15:22:11
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 16:36:44
 */
import * as React from "react";
import { Button } from "antd";
import { UserInfo } from "../../../interface/interface";

interface Props {
  editArticle: () => void;
  showDelete: () => void;
  user: UserInfo | null;
}
const EditandDel = (props: Props) => {
  const user = props.user;
  return user && user.canwrite == 1 ? (
    <div className="article-footer">
      <Button type="primary" icon="check-circle-o" onClick={() => props.editArticle()}>
        编辑
      </Button>
      <Button
        style={{
          marginLeft: "20px"
        }}
        type="danger"
        icon="delete"
        onClick={() => props.showDelete()}
      >
        删除
      </Button>
    </div>
  ) : null;
};
export default EditandDel;
