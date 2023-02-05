import React from "react";
import { Alert } from "antd";

export const ErrorNotification: any = ({ error }: any) => {
  // const errorText = Object.keys(error).concat(Object.values(error)).join(" ");
  const errorText: any = error.message;
  return (
    <Alert
      style={{ marginBottom: "10px", marginTop: "10px" }}
      message={errorText}
      type="error"
    />
  );
};
