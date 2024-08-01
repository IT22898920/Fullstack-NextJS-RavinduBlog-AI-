"use client";
import { useSession } from "next-auth/react";
import React from "react";

export const ShowOnLogin = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession();

  if (session) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession();

  if (!session) {
    return children;
  }
  return null;
};
