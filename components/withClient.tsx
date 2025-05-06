// withClient.tsx
"use client";

import { FC } from "react";

const withClient = (Component: FC) => {
  return (props: any) => <Component {...props} />;
};

export default withClient;