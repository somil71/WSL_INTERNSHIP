import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/v1/users/forgetPassword", { email });
      setSent(true);
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>

          {sent ? (
            <p>
              If an account exists for <b>{email}</b>, a reset link has been sent.
            </p>
          ) : (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {!sent && (
            <button className="btn btn-block py-3" type="submit" disabled={loading}>
              {loading ? "Sending..." : "SEND RESET LINK"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
