import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Dropdown, Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
//Images
//import data from './../Boltz/Task/Postpage.json';
import card1 from "./../../../images/formations/awards.png";
import card2 from "./../../../images/formations/linkedIn.jpg";
import card3 from "./../../../images/formations/personal-brand.jpg";

import user from "./../../../images/formations/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingsList } from "../../../store/actions/TrainingActions";
import moment from "moment";

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

const DropdownBlog = () => {
  return (
    <>
      <Dropdown className="dropdown">
        <Dropdown.Toggle as="div" className="btn-link i-false">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="#575757"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
              stroke="#575757"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
              stroke="#575757"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
          <Dropdown.Item>Delete</Dropdown.Item>
          <Dropdown.Item>Edit</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const Formations = () => {
  const [postModal, setPostModal] = useState(false);
  const [contacts, setContacts] = useState(CardListBlog);
  const trainings = useSelector((state) => state.trainings.trainings);
  const user = useSelector((state) => state.auth.auth.user);
  let width = window.innerWidth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrainingsList());
  }, []);
  // delete data
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  //Add data
  const [addFormData, setAddFormData] = useState({
    nom_formation: "",
    Date_Join: "",
    Cust_Name: "",
    Location: "",
    image: "",
    Etat: "",
    Durée: "",
  });

  // Add contact function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (addFormData.Date_Join === "") {
      error = true;
      errorMsg = "Please fill date";
    } else if (addFormData.Cust_Name === "") {
      error = true;
      errorMsg = "Please fill name.";
    } else if (addFormData.Location === "") {
      error = true;
      errorMsg = "Please fill location";
    }
    if (!error) {
      const newContact = {
        id: nanoid(),
        nom_formation: addFormData.nom_formation,
        Date_Join: addFormData.Date_Join,
        Cust_Name: addFormData.Cust_Name,
        Location: addFormData.Location,
        image: addFormData.image,
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      setPostModal(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.Cust_Name = addFormData.Location = addFormData.Date_Join = "";
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  const [editModal, setEditModal] = useState(false);

  // Edit function editable page loop
  const [editContactId, setEditContactId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      nom_formation: contact.nom_formation,
      Date_Join: contact.Date_Join,
      Cust_Name: contact.Cust_Name,
      Location: contact.Location,
      image: contact.image,
      Etat: contact.Etat,
      Durée: contact.Durée,
    };
    setEditFormData(formValues);
    setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    nom_formation: "",
    Date_Join: "",
    Cust_Name: "",
    Location: "",
    image: "",
    Etat: "",
    Durée: "",
  });

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      nom_formation: editFormData.nom_formation,
      Date_Join: editFormData.Date_Join,
      Cust_Name: editFormData.Cust_Name,
      Location: editFormData.Location,
      image: editFormData.image,
      Etat: editFormData.Etat,
      Durée: editFormData.Durée,
    };
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
    setEditModal(false);
  };

  //For Image upload in ListBlog
  const [file, setFile] = React.useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    setTimeout(function () {
      var src = document.getElementById("saveImageFile").getAttribute("src");
      addFormData.image = src;
    }, 200);
  };

  return (
    <>
      <Link
        to={"#"}
        className="btn btn-primary font-w600 mb-3 me-auto"
        onClick={() => setPostModal(true)}
      >
        + Ajouter une formation
      </Link>

      {/* les statistiques  */}
      <div className="d-flex ">
        <div className="col-xl-4 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card m-3">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-primary text-primary">
                  <svg
                    id="icon-customers"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <div className="media-body">
                  <h5 className="mb-1">Nombre total des formations :</h5>
                  {/* <h4 className="mb-0">30</h4> */}
                  <h5 className="badge badge-primary">{trainings.length} formations</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
     
        
      </div>

      <div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
        {/* <!-- Modal --> */}
        <Modal className="modal fade" show={postModal} onHide={setPostModal}>
          <div className="" role="document">
            <div className="">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Ajouter une formation</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPostModal(false)}
                    data-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <i className="flaticon-cancel-12 close"></i>
                  <div className="add-contact-box">
                    <div className="add-contact-content">
                      <div className="image-placeholder">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            onChange={fileHandler}
                            id="imageUpload"
                            onClick={(event) => setFile(event.target.value)}
                          />
                          <label htmlFor="imageUpload" name=""></label>
                        </div>
                        <div className="avatar-preview">
                          <div id="imagePreview">
                            <img
                              id="saveImageFile"
                              src={file ? URL.createObjectURL(file) : user}
                              alt={file ? file.name : null}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Nom de formation
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="nom_formation"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Nom de formation"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Date</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="Date_Join"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="date"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Formateur / formatrice
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            onChange={handleAddFormChange}
                            name="Cust_Name"
                            required="required"
                            className="form-control"
                            placeholder="Nom et prénom"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Localisation
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            name="Location"
                            required="required"
                            onChange={handleAddFormChange}
                            className="form-control"
                            placeholder="Localisation"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Durée</label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            name="Durée"
                            required="required"
                            onChange={handleAddFormChange}
                            className="form-control"
                            placeholder="durée"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAddFormSubmit}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostModal(false)}
                    className="btn btn-danger"
                  >
                    {" "}
                    <i className="flaticon-delete-1"></i> Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <Modal className="modal fade" show={editModal} onHide={setEditModal}>
          <div className="" role="document">
            <div className="">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Modifier la formation</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditModal(false)}
                    data-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <i
                    className="flaticon-cancel-12 close"
                    data-dismiss="modal"
                  ></i>
                  <div className="add-contact-box">
                    <div className="add-contact-content">
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Nom de Formation
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="Cust_Id"
                            required="required"
                            value={editFormData.nom_formation}
                            onChange={handleEditFormChange}
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Date</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="Date"
                            required="required"
                            value={editFormData.Date_Join}
                            onChange={handleEditFormChange}
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Formateur / Formatrice
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            value={editFormData.Cust_Name}
                            onChange={handleEditFormChange}
                            name="Cust_Name"
                            required="required"
                            className="form-control"
                            placeholder="name"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Durée</label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            name="Durée"
                            required="required"
                            value={editFormData.Durée}
                            onChange={handleEditFormChange}
                            className="form-control"
                            placeholder="durée"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Localisation
                        </label>
                        <div className="contact-occupation">
                          <input
                            type="text"
                            autoComplete="off"
                            name="Location"
                            required="required"
                            value={editFormData.Location}
                            onChange={handleEditFormChange}
                            className="form-control"
                            placeholder="Location"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleEditFormSubmit}
                  >
                    Enregister les modifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="btn btn-danger"
                  >
                    {" "}
                    <i className="flaticon-delete-1"></i> Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
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
              <div className="card-header align-items-start">
                <div>
                  <h2 className="fs-18 fw-bold">{training.title}</h2>
                </div>
                <Dropdown className="">
                  <Dropdown.Toggle
                    variant=""
                    as="div"
                    className="btn-link i-false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="#342E59"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        stroke="#342E59"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        stroke="#342E59"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    alignRight={true}
                    className="dropdown-menu-right"
                  >
                    <Dropdown.Item
                      // onClick={(event) => handleEditClick(event, contact)}
                    >
                      Modifier
                    </Dropdown.Item>

                    <Dropdown.Item className="text-danger">
                      <button
                        onClick={() =>
                          swal({
                            title: "Supprimer?",
                            text: "Une fois supprimé, vous ne pourrez pas récupérer cette formation !",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              // handleDeleteClick(contact.id);
                              swal("Votre Formation a été supprimé", {
                                icon: "success",
                              });
                            } else {
                              swal("Votre suppression a été annulée !");
                            }
                          })
                        }
                        className="btn text-danger p-0"
                      >
                        Supprimer
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="card-body p-0 pb-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">Date</span> :
                    <span className="text-black ms-2"> {training.date}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="mb-0 title fw-bold">
                      Formateur / Formatrice:{" "}
                    </span>{" "}
                    :
                    <span className="text-black ms-2">{training.trainer}</span>
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
              <h6 className="p-3 fw-bold d-flex justify-content-between">
                <span className="">Nombre d'inscription :</span>
                <Badge bg="" className="badge-primary">
                  {" "}
                  {training.participants.length} Membres
                </Badge>
              </h6>
            </div>
          </div>
        ))}

        <div>
          <div className="mb-3 align-items-center me-auto">
            <h4 className="fs-24 font-w800">
              Liste d'inscriptions des formations
            </h4>
            <span className="fs-12">
              Listes des membres inscriés dans les formations
            </span>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div
                className="table-responsive table-hover fs-14 dataTables_wrapper"
                id="invoices-data"
              >
                <table
                  className="table display mb-4 dataTablesCard  dataTable no-footer"
                  id="example5"
                >
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc">
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            htmlFor="checkAll"
                          />
                        </div>
                      </th>
                      <th className="sorting_asc">Nom du Formation</th>
                      <th className="sorting_asc">Nom et prénom</th>
                      <th className="sorting_asc">Date</th>
                      <th className="sorting_asc">Email</th>
                      <th className="sorting_asc">Date de formation</th>
                      <th className="sorting_asc"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr role="row" className="odd">
                      <td className="application_sorting_1">
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            htmlFor="check1"
                          />
                        </div>
                      </td>
                      <td>
                        <span className="text-black font-w500">
                          Personal Branding
                        </span>
                      </td>
                      <td>
                        <span className="text-black text-nowrap">
                          Rayen Mehrez
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">
                              5 Mai 2023
                            </h6>
                            <span className="fs-14">08:22 AM</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-black">rayen@mail.com</span>
                      </td>
                      <td>
                        <td>
                          <span className="btn btn-success">25 juin 2023</span>
                        </td>
                      </td>
                    </tr>
                    <tr role="row" className="even">
                      <td className="application_sorting_1">
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            htmlFor="check1"
                          />
                        </div>
                      </td>
                      <td>
                        <span className="text-black font-w500">
                          Formation LinkedIn
                        </span>
                      </td>
                      <td>
                        <span className="text-black text-nowrap">
                          Badia Cherif
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">
                              5 Avril
                            </h6>
                            <span className="fs-14">28 Mai 2023</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-black">
                          BadiaCherif@gmail.com
                        </span>
                      </td>
                      <td>
                        <span className="btn btn-success">28 juin 2023</span>
                      </td>
                    </tr>
                    <tr role="row" className="odd">
                      <td className="application_sorting_1">
                        <div className="form-check">
                          <label
                            className="form-check-label"
                            htmlFor="check1"
                          />
                        </div>
                      </td>
                      <td>
                        <span className="text-black font-w500">
                          Formation The Art of Awards
                        </span>
                      </td>
                      <td>
                        <span className="text-black text-nowrap">
                          Hazem Boughraira
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">
                              8 Mai 2023
                            </h6>
                            <span className="fs-14">07:00 h</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-black">Hazem@mail.com</span>
                      </td>
                      <td>
                        <td>
                          <span className="btn btn-success">25 juin 2023</span>
                        </td>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formations;
