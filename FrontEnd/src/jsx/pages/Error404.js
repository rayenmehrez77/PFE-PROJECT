import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center ">
          <div className="col-md-5">
            <div className="form-input-content text-center error-page">
              <h1 className="error-text font-weight-bold">404</h1>
              <h4>
                <i className="fa fa-exclamation-triangle text-warning" /> La
                page que vous recherchiez est introuvable !
              </h4>
              <p>
                Vous avez peut-être mal saisi l'adresse ou la page a peut-être
                été déplacée.
              </p>
              <div>
                <Link className="btn btn-primary" to="/login">
                  Retour à la page d'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
