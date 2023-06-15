import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
//Images
//import data from './../Boltz/Task/Postpage.json';
import card1 from "./../../images/actions/ramadan.jpg";
import card2 from "./../../images/actions/journee.png";
import card3 from "./../../images/actions/aid.png";

import user from "./../../images/formations/user.jpg";
import PageTitle from "../layouts/PageTitle";
import { getActionsList } from "../../store/actions/actionActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// const CardListBlog = [
//   {
//     id: 1,
//     image: card1,
//     nom_action: "رمضان يجمعمنا",
//     _Id: "01",
//     Date: "19 Avril 2023",
//     Location: "Ecole primaire de Menzel Fersi",
//     Directeur: "Azhar Mabrouk",
//     Etat: "Terminé",
//   },
//   {
//     id: 2,
//     image: card2,
//     _Id: "02",
//     nom_action: "Journée Jeunesse",
//     Date: "21 Mars 2023",
//     Location: "Municipalité de Menzel Fersi ",
//     Directeur: "Hedil Mabrouk, Roua Ahmed",
//     Etat: "Terminé",
//   },
//   {
//     id: 2,
//     image: card3,
//     Cust_Id: "02",
//     nom_action: "للعيد فرحة",
//     Date: "18 Avril 2023",
//     Location: "Menzel Fersi",
//     Directeur: "Roua Ahmed",
//     Etat: "Terminé",
//   },
// ];

const OlmActions = () => {
  const [postModal, setPostModal] = useState(false);
  const actions = useSelector((state) => state.actions.actions);
  let width = window.innerWidth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActionsList());
  }, []);

  return (
    <>
      <PageTitle activeMenu="ACTIONS" motherMenu="ACTIONS" />
      <h1 className="fw-bold text-center mb-3">LES ACTIONS</h1>
      <div className="row">
        {actions.map((action, index) => (
          <div
            className="col-xl-4 col-xxl-4 col-lg-6 col-md-6 col-sm-6"
            key={index}
          >
            <div className="card project-boxed">
              <div className="img-bx">
                <img
                  src={
                    action.image && action.image.includes("public")
                      ? "http://localhost:5001/" +
                        action?.image.replace("public/", "")
                      : action.image
                  }
                  alt=""
                  className=" me-3 card-list-img w-100"
                  width="130"
                />
              </div>
              <div className="card-header align-items-start">
                <div>
                  <h2 className="fs-18 fw-bold">{action.title}</h2>
                </div>
              </div>
              <div className="card-body p-0 pb-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Date</span> :
                    <span className="text-black ms-2">{action.date}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Localisation</span> :
                    <span className="text-black desc-text ms-2">
                      {action.location}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">
                      Directeur / Directrice :{" "}
                    </span>{" "}
                    :
                    <span className="text-black desc-text ms-2">
                      {action.director}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Etat : </span>
                    <span className="text-white desc-text ms-2 badge badge-primary">
                    {moment(action.date).isSame(Date.now(), 'day')
                        ? "En cours"
                        : moment(action.date).isBefore(Date.now(), 'day')
                        ? "En attente"
                        : "Terminée"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OlmActions;
