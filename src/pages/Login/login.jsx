import React, { useEffect } from "react";
import "./Login.css";
import { login, loginWithPassword } from "../../store/builders/auth.builder";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    dispatch(loginWithPassword({ email: values.email, password: values.password, navigate }));
    console.log('Logging in with:', values);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleLogin(values)
          }}
        >
          {() => (
            <Form>
              <div className="input-group">
                <label>Email</label>
                <Field type="email" name="email" className="input-field" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="login-button"
                // disabled={isSubmitting}
              >
                {/* {isSubmitting ? 'Logging in...' : 'Login'} */}
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;