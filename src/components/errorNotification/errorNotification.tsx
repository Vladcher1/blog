import React from "react";
import { Alert } from "antd";

export interface ErrorNotificationProps {
  error: { status: number; message: string };
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
}) => {
  const errorText = error.message;
  return (
    <Alert
      style={{ marginBottom: "10px", marginTop: "10px" }}
      message={errorText}
      type="error"
    />
  );
};
