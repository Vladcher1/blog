import "./header.scss";
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../counter/counterSlice";
import { Link } from "react-router-dom";
export const Header = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const page = useSelector(
    (state: RootState) => state.fetchArticles.currentPage
  );

  const dispatch = useDispatch();

  return (
    <header className="blog-header">
      <Link to={`articles/:${page}`} className="blog-header__logo">
        <h6>Realworld Blog</h6>
      </Link>
      <button
        type="button"
        className="button sign-in-btn"
        onClick={() => dispatch(increment())}>
        Sign In
      </button>
      <button
        type="button"
        className="button sign-out-btn active"
        onClick={() => dispatch(decrement())}>
        {count}
        Sign Out
      </button>
    </header>
  );
};
