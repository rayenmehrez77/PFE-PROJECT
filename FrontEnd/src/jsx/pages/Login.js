import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

// image
import logo from "../../images/Zone C.png";
import loginbg from "../../images/bg-login.jpg";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  return (
    <div
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
      <div className="login-wrapper">
        <div className="login-aside-left">
          <Link to={"#"} className="login-logo">
            <img src={logo} alt="" width="150px" />
          </Link>
          <div className="login-description">
            <h2 className="main-title mb-2">BIENVENUE</h2>
            <h3 className="main-title">JCI PLATFORM ZONE C</h3>
            <ul className="social-icons mt-4">
              <li>
                <a href="https://www.facebook.com/JCIZoneC2017">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
            <div className="mt-5 bottom-privacy">
              <Link to={"#"} className="">
                Dévélopper par Rayen Mehrez - 2023
              </Link>
            </div>
          </div>
        </div>
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="p-5">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4">
                        <h3 className="dz-title mb-1">Connexion</h3>
                        <p className="">
                          Connectez-vous en saisissant les informations
                          ci-dessous
                        </p>
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrer votre address mail"
                          />
                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong>Mot de passe</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Entrer votre mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Connexion
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="">
                          Vous n'avez pas de compte ?{" "}
                          <Link className="text-primary" to="./page-register">
                            S'inscrire
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
