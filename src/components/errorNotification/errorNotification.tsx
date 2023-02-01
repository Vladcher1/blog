import React from "react";
import { Alert } from "antd";

export const ErrorNotification: React.FC = ({ error }) => {
  const errorText = Object.keys(error).concat(Object.values(error)).join(" ");
  return (
    <Alert
      style={{ marginBottom: "10px", marginTop: "10px" }}
      message={errorText}
      type="error"
    />
  );
};
