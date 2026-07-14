import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.patch(`/v1/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      toast.success("Password reset successfully. Please log in.");
      navigate("/users/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Set New Password</h1>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-block py-3" type="submit" disabled={loading}>
            {loading ? "Saving..." : "SET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
