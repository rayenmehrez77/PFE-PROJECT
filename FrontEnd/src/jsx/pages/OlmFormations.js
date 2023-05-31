import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "react-bootstrap";
//Images
//import data from './../Boltz/Task/Postpage.json';
import card1 from "./../../images/formations/awards.png";
import card2 from "./../../images/formations/linkedIn.jpg";
import card3 from "./../../images/formations/personal-brand.jpg";
import PageTitle from "../layouts/PageTitle";

const CardListBlog = [
  {
    id: 1,
    image: card1,
    nom_formation: "Formation The Art of Awards",
    Cust_Id: "01",
    Date_Join: "02/06/2023",
    Cust_Name: "Hakim Ben Hammouda",
    Location: "Municipalité de Menzel Fersi",
    Etat: "A venir",
    Durée: "2h",
  },
  {
    id: 2,
    image: card2,
    Cust_Id: "02",
    nom_formation: "Formation LinkedIn",
    Date_Join: "28/06/2023",
    Cust_Name: "Rayen Mehrez",
    Location: "Ecole primaire de Menzel Fersi ",
    Etat: "A venir",
    Durée: "2h",
  },
  {
    id: 2,
    image: card3,
    Cust_Id: "02",
    nom_formation: "Personal Branding",
    Date_Join: "20/06/2023",
    Cust_Name: "Rayen Mehrez",
    Location: "Maison des jeunes de Menzel Fersi ",
    Etat: "Terminé",
    Durée: "2h",
  },
];

const OlmFormations = () => {
  const [contacts, setContacts] = useState(CardListBlog);

  return (
    <>
      <PageTitle activeMenu="FORMATIONS" motherMenu="FORMATIONS" />
      <h1 className="fw-bold text-center mb-3">LES FORMATIONS</h1>
      <div className="row">
        {contacts.map((contact, index) => (
          <div
            className="col-xl-4 col-xxl-4 col-lg-6 col-md-6 col-sm-6"
            key={index}
          >
            <div className="card project-boxed">
              <div className="img-bx">
                <img
                  src={contact.image}
                  alt=""
                  className=" me-3 card-list-img w-100"
                  width="130"
                />
              </div>
              <div className="card-header align-items-start">
                <div>
                  <h2 className="fs-18 fw-bold">{contact.nom_formation}</h2>
                </div>
              </div>
              <div className="card-body p-0 pb-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Date</span> :
                    <span className="text-black ms-2">{contact.Date_Join}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">
                      Formateur / Formatrice:{" "}
                    </span>{" "}
                    :
                    <span className="text-black ms-2">{contact.Cust_Name}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Localisation</span> :
                    <span className="text-black desc-text ms-2">
                      {contact.Location}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Durée</span> :
                    <span className="text-black desc-text ms-2">
                      {contact.Durée}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Etat : </span>
                    <span className="text-white desc-text ms-2 badge badge-primary">
                      {contact.Etat}
                    </span>
                  </li>
                </ul>
              </div>
              <button bg="" className="badge-primary p-3 text-white fw-bold">
                {" "}
                S'inscrire:{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OlmFormations;
