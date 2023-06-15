import React, { useReducer, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
//Images
//import data from './../Boltz/Task/Postpage.json';
import card1 from "./../../images/formations/awards.png";
import card2 from "./../../images/formations/linkedIn.jpg";
import card3 from "./../../images/formations/personal-brand.jpg";
import PageTitle from "../layouts/PageTitle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingsList } from "../../store/actions/TrainingActions";
import axiosInstance from "../../services/AxiosInstance";

// const CardListBlog = [
//   {
//     id: 1,
//     image: card1,
//     nom_formation: "Formation The Art of Awards",
//     Cust_Id: "01",
//     Date_Join: "02/06/2023",
//     Cust_Name: "Hakim Ben Hammouda",
//     Location: "Municipalité de Menzel Fersi",
//     Etat: "A venir",
//     Durée: "2h",
//   },
//   {
//     id: 2,
//     image: card2,
//     Cust_Id: "02",
//     nom_formation: "Formation LinkedIn",
//     Date_Join: "28/06/2023",
//     Cust_Name: "Rayen Mehrez",
//     Location: "Ecole primaire de Menzel Fersi ",
//     Etat: "A venir",
//     Durée: "2h",
//   },
//   {
//     id: 2,
//     image: card3,
//     Cust_Id: "02",
//     nom_formation: "Personal Branding",
//     Date_Join: "20/06/2023",
//     Cust_Name: "Rayen Mehrez",
//     Location: "Maison des jeunes de Menzel Fersi ",
//     Etat: "Terminé",
//     Durée: "2h",
//   },
// ];

const OlmFormations = () => {
  const [isParticipate, setIsParticipate] = useState(false)
  const trainings = useSelector((state) => state.trainings.trainings);
  const user = useSelector((state) => state.auth.auth.user);
  let width = window.innerWidth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingsList());
  }, []);

  const participate = async (id) =>{
   await axiosInstance.post(`/trainings/participate/${id}`,{user:user._id}).then(()=>{
    dispatch(getTrainingsList());
   })
  }

  return (
    <>
      <PageTitle activeMenu="FORMATIONS" motherMenu="FORMATIONS" />
      <h1 className="fw-bold text-center mb-3">LES FORMATIONS</h1>
      <div className="row">
        {trainings.map((training, index) => (
          <div
            className="col-xl-4 col-xxl-4 col-lg-6 col-md-6 col-sm-6"
            key={index}
          >
            <div className="card project-boxed">
              <div className="img-bx">
                <img
                  src={
                    training.image && training.image.includes("public")
                      ? "http://localhost:5001/" +
                        training?.image.replace("public/", "")
                      : training.image
                  }
                  alt=""
                  className=" me-3 card-list-img w-100"
                  width="130"
                />
              </div>
              <div
                className="card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 className="fs-18 fw-bold">{training.title}</h2>
                </div>
                <div className="bootstrap-popover-wrapper ">
                  {!training.participants.includes(user._id) ? (<div className="bootstrap-popover">
                    {["S'inscrire"].map((placement, i) => (
                      <OverlayTrigger
                        trigger="click"
                        key={i}
                        placement="bottom"
                        responsive={true}
                        overlay={
                          <Tooltip
                            className="toltip-popover"
                            id={`popover-positioned-${placement.toLowerCase()}`}
                          >
                            <h3 className="popover-header">{`Confirmer votre inscription`}</h3>
                            <div className="d-flex">
                              <Button onClick={()=>participate(training._id)} className="fs-12" variant="success">
                                Confirmer
                              </Button>
                              <Button className="fs-12" variant="danger">
                                Annuler
                              </Button>
                            </div>
                          </Tooltip>
                        }
                      >
                        <Button variant="primary" type="button" className="">
                          {placement}
                        </Button>
                      </OverlayTrigger>
                    ))}
                  </div>) : null}
                  
                </div>
              </div>
              <div className="card-body p-0 pb-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Date</span> :
                    <span className="text-black ms-2">
                      {training.date}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">
                      Formateur / Formatrice:{" "}
                    </span>{" "}
                    :<span className="text-black ms-2">{training.trainer}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Localisation</span> :
                    <span className="text-black desc-text ms-2">
                      {training.location}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Durée</span> :
                    <span className="text-black desc-text ms-2">
                      {training.duration}h
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Etat : </span>
                    <span className="text-white desc-text ms-2 badge badge-primary">
                      {moment(training.date).isSame(Date.now(), 'day')
                        ? "En cours"
                        : moment(training.date).isBefore(Date.now(), 'day')
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

export default OlmFormations;
