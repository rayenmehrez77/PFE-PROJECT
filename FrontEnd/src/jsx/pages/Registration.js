import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image
import logo from "../../images/Zone C.png";

function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const [selectedGovValue, setSelectedGocValue] = useState("Monastir");
  const [selectedSexeValue, setSelectedSexeValue] = useState("Masculin");
  const [selectedOLMValue, setSelectedOLMValue] = useState("MENZEL FERSI");

  const OLMs = [
    "MENZEL FERSI",
    "MONASTIR",
    "MAHDIA",
    "SOUSSE",
    "MOKNINE",
    "BENI HASSEN",
    "KALAA KEBIRA",
    "KALAA SOUGHRA",
    "SAYADA",
    "TEBOULBA",
    "KSIBET EL MEDIOUNI",
    "ZERAMDINE",
    "BENI HASSINE",
    "KSAR HELAL",
    "BEKALTA",
    "SIDI ALOUANE",
    "BANNEN",
    "BEMBLA",
    "JEMMAL",
    "MENZEL HAYAT",
    "SAHLINE",
    "NEFIDHA",
  ];

  const handleGovChange = (event) => {
    setSelectedGocValue(event.target.value); // Update the state when the dropdown value changes
  };

  const handleSexeChange = (event) => {
    console.log(event.target.value);
    setSelectedSexeValue(event.target.value); // Update the state when the dropdown value changes
  };

  const handleOLMChange = (event) => {
    setSelectedOLMValue(event.target.value); // Update the state when the dropdown value changes
  };

  const dispatch = useDispatch();

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (name === "") {
      errorObj.name = "Name is Required";
      error = true;
      swal("Oops", errorObj.name, "error");
    }

    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
      swal("Oops", errorObj.email, "error");
    }

    if (selectedOLMValue === "") {
      errorObj.selectedOLMValue = "OLM is Required";
      error = true;
      swal("Oops", errorObj.selectedOLMValue, "error");
    }

    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
      swal("Oops", errorObj.password, "error");
    }

    if (confirmPassword === "") {
      errorObj.confirmPassword = "Confirm Password is Required";
      error = true;
      swal("Oops", errorObj.confirmPassword, "error");
    }

    setErrors(errorObj);
    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(
      signupAction(
        name,
        email,
        selectedOLMValue,
        selectedGovValue,
        selectedSexeValue,
        password,
        confirmPassword,
        props.history
      )
    );
  }
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img src={logo} alt="" width="150px" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">
                      Inscrivez votre compte
                    </h4>
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Name</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nom et prénom"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                          type="email"
                        />
                      </div>
                      {errors.email && <div>{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>OLM</strong>
                        </label>
                        <select
                          defaultValue={selectedOLMValue}
                          onChange={handleOLMChange}
                          className="form-control form-control-lg"
                        >
                          {OLMs.map((OLM) => (
                            <option key={OLM} value={OLM}>
                              JCI {OLM}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.OLM && <div>{errors.OLM}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Gouvernement</strong>
                        </label>
                        <select
                          defaultValue={selectedGovValue}
                          onChange={handleGovChange}
                          className="form-control form-control-lg"
                        >
                          <option value="Mahdia">Mahdia</option>
                          <option value="Sousse">Sousse</option>
                          <option value="Monastir">Monastir</option>
                        </select>
                      </div>
                      {errors.gouvernement && <div>{errors.gouvernement}</div>}

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Sexe</strong>
                        </label>
                        <select
                          defaultValue={selectedSexeValue}
                          onChange={handleSexeChange}
                          className="form-control form-control-lg"
                        >
                          <option value="Masculin">Masculin</option>
                          <option value="Féminin">Féminin</option>
                        </select>
                      </div>
                      {errors.sexe && <div>{errors.sexe}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Mot de passe</strong>
                        </label>
                        <input
                          defaultValue={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="Mot de passe"
                          type="password"
                        />
                      </div>
                      {errors.password && <div>{errors.password}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirmer le mot de passe</strong>
                        </label>
                        <input
                          defaultValue={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control"
                          placeholder="Confirmer le mot de passe"
                          type="password"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <div>{errors.confirmPassword}</div>
                      )}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Inscrivez-moi
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Vous avez déjà un compte?{" "}
                        <Link className="text-primary" to="/login">
                          Se connecter
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
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);
