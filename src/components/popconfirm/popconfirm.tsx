import React from "react";
import { message, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteArticle } from "../../fetchArticles/fetchArticlesSlice";

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error("Click on No");
};

const Confirm: React.FC = () => {
  const dispatch = useDispatch();
  const slug = useParams();
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this article?"
      onConfirm={() => {
        dispatch(deleteArticle(slug));
      }}
      onCancel={cancel}
      okText="Yes"
      cancelText="No">
      <a href="#" className="article-form__button delete-button">
        Delete
      </a>
    </Popconfirm>
  );
};

export default Confirm;
