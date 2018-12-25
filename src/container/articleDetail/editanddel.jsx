/*
 * @Author: wangcaowei 
 * @Date: 2018-11-16 15:22:11 
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-11-16 15:29:30
 */
import { Button } from "antd"

const EditandDel = props => {
  return (
    <div className="article-footer">
      <Button
        type="primary"
        icon="check-circle-o"
        onClick={() => this.editArticle(article)}
      >
        编辑
      </Button>
      <Button
        style={{
          marginLeft: "20px"
        }}
        type="danger"
        icon="delete"
        onClick={() => this.props.showDelete(article.id)}
      >
        删除
      </Button>
    </div>
  );
};
