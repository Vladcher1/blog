import React, { useState } from "react";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { deleteArticle } from "../../fetchArticles/fetchArticlesSlice";
import { NavigateType } from "../articleForm/articleForm";

const Confirm: React.FC = () => {
  const [needToNavigate, setNeedToNavigate] = useState<NavigateType>(false);
  const dispatch = useDispatch();
  const slug = useParams();
  if (needToNavigate) {
    return <Navigate to="/articles" />;
  }

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this article?"
      onConfirm={() => {
        dispatch(deleteArticle(slug));
        setNeedToNavigate(true);
      }}
      okText="Yes"
      cancelText="No">
      <a href="/#" className="article-form__button delete-button">
        Delete
      </a>
    </Popconfirm>
  );
};

export default Confirm;
