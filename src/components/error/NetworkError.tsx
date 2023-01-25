import React from "react";
import { Alert } from "antd";

export const NetworkError: React.FC = () => (
  <Alert
    message="Bad Internet Connection"
    description="Please, check your internet connection and reload this page"
    type="error"
  />
);
