import ResetForm from "@/components/auth/ResetForm";
import React from "react";

const ResetPasswordPage = ({ params }) => {
  const resetToken = params.resetToken;

  return (
    <div>
      <ResetForm resetToken={resetToken} />
    </div>
  );
};

export default ResetPasswordPage;
