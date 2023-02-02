import { useFieldArray, useForm, Control } from "react-hook-form";
import { ArticleState } from "../../types";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./articleForm.scss";
import { useDispatch } from "react-redux";
import {
  postArticle,
  updateArticle,
} from "../../fetchArticles/fetchArticlesSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ArticleForm = ({ title }: string = "") => {
  const dispatch = useDispatch();

  const onSubmit = (data: ArticleState) => {
    console.log(data);
    const { tagList, description, body, title } = data;
    const tagListArray = tagList
      .map((tag) => tag.value.trim())
      .filter((tag) => tag.trim() !== "");
    const descriptionTrimmed = description.trim();
    const bodyTrimmed = body.trim();
    const titleTrimmed = title.trim();

    if (title === "Edit Article") {
      console.log("updatim article");
      dispatch(
        updateArticle({
          slug,
          tagListArray,
          descriptionTrimmed,
          bodyTrimmed,
          titleTrimmed,
        })
      );
    } else {
      dispatch(
        postArticle({
          tagListArray,
          descriptionTrimmed,
          bodyTrimmed,
          titleTrimmed,
        })
      );
    }
  };

  const [article, setArticle] = useState({
    body: "",
    description: "",
    tagList: [""],
    title: "",
    updatedAt: "",
    createdAt: "",
  });

  const { slug } = useParams();

  useEffect(() => {
    if (title === "Edit Article") {
      const getArticle = async () => {
        const { data } = await axios.get(
          `https://blog.kata.academy/api/articles/${slug}`,
          {
            headers: {
              "content-type": "application/json; charset=utf-8",
            },
          }
        );

        console.log(data.article, "data i need");

        setArticle(data.article);
        return data;
      };

      getArticle();
    }
  }, [title, slug]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      tagList: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
  });

  return (
    <section className="article-form">
      <h3 className="article-form__title">{title}</h3>
      <form className="article-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          styles={{ marginBottom: "21px" }}
          classNames="article-form__input"
          textLabel="Title"
          required={true}
          label="title"
          register={register}
          placeholder="Title"
          inputType="text"
          defaultValue={article.title}
          minLength={3}
          maxLength={20}
          errors={errors}
        />
        <Input
          styles={{ marginBottom: "21px" }}
          textLabel="Short description"
          required={true}
          label="description"
          register={register}
          placeholder="Short description"
          inputType="text"
          defaultValue={article.description}
          minLength={5}
          maxLength={40}
          errors={errors}
        />
        <label className="label" style={{ marginBottom: "21px" }}>
          Text
          <textarea
            className="input textarea"
            defaultValue={article.body}
            rows={6}
            {...register("body", {
              required: {
                value: true,
                message: `text is required`,
              },
              minLength: {
                value: 5,
                message: `Your text needs to be at least 5 characters.`,
              },
              maxLength: {
                value: 2000,
                message: `Your text needs to be no more than 2000 characters.`,
              },
            })}
          />
          <div className="validation-error-container">
            {errors.text && (
              <span className="validation-error">
                {errors["text"]?.message || "Error!"}
              </span>
            )}
          </div>
        </label>
        <div className="article-form__tags-container">
          <div className="article-form__tags">
            <span className="article-form__tag-title">Tag</span>
            {fields.map((field, index) => (
              <div className="article-form__tag" key={field.id}>
                <Input
                  textLabel=""
                  required={false}
                  label={`tagList.${index}.value`}
                  register={register}
                  placeholder="tag"
                  inputType="text"
                  defaultValue={``}
                  minLength={3}
                  maxLength={20}
                  errors={errors}
                />
                <button
                  className="article-form__button delete-button"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}>
                  Delete
                </button>
              </div>
            ))}{" "}
          </div>
          <button
            className="article-form__button add-button"
            type="button"
            onClick={() => {
              append("new tag");
            }}>
            Add tag
          </button>
        </div>
        <SubmitButton isValid={isValid} />
      </form>
    </section>
  );
};
