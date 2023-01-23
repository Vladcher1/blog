import { useParams } from "react-router-dom";

export const ArticleItemPage = () => {
  const { slug } = useParams();
  console.log(useParams());

  return <div>one article page, {slug}</div>;
};
