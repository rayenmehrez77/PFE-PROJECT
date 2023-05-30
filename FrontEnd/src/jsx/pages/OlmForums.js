import React, { useState } from "react";
import PageTitle from "../layouts/PageTitle";
import { Badge, Card, Col, Dropdown, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import CustomClearIndicator from "../../jsx/components/PluginsMenu/Select2/MultiSelect";

const options = [
  { value: "JCI BOUHJAR", label: "JCI BOUHJAR" },
  { value: "JCI MOKNINE", label: "JCI MOKNINE" },
  { value: "JCI TUNIS", label: "JCI TUNIS" },
];

const ListForums = [
  {
    id: 1,
    _Id: "01",
    Title: "Vers le succès",
    Collaborateurs: "JCI MOKNINE, JCI BOUHJAR",
    Date: "19 Avril 2023",
    Location: "Ecole primaire de Menzel Fersi",
    Status: "Terminé",
  },
  {
    id: 2,
    _Id: "02",
    Title: "The power of public speaking",
    Collaborateurs: "JCI MAHDIA, JCI BANENN",
    Date: "1 Juin 2023",
    Location: "Mesk Elil, Monastir",
    Status: "A Venir",
  },
];

const OlmForums = () => {
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [Forums, setForums] = useState(ListForums);

  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  const handleDeleteClick = (ForumId) => {
    const newForums = [...Forums];
    const index = Forums.findIndex((Forum) => Forum.id === ForumId);
    newForums.splice(index, 1);
    setForums(newForums);
  };

  //Add data
  const [addFormData, setAddFormData] = useState({
    Title: "",
    Collaborateurs: "",
    Location: "",
    Date: "",
    Status: "",
  });

  const handleAddFormChange = (event) => {
    console.log(event);
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
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
    const maxId = Forums.reduce(
      (max, forum) => (forum.id > max ? forum.id : max),
      0
    );

    if (!error) {
      const newForum = {
        id: maxId + 1,
        Title: addFormData.Title,
        Date: addFormData.Date,
        Status: addFormData.Status,
        Location: addFormData.Location,
        Collaborateurs: addFormData.Collaborateurs,
      };
      const newForums = [...Forums, newForum];
      setForums(newForums);
      console.log(newForums);
      setPostModal(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.nom_Forum = addFormData.Location = addFormData.Date = "";
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  const [editForumId, setEditForumId] = useState(null);

  const [editForumData, setEditForumData] = useState({
    Title: "",
    Collaborateurs: "",
    Date: "",
    Location: "",
    Etat: "",
  });

  // Edit function button click to edit
  const handleEditClick = (event, Forum) => {
    setEditForumId(Forum.id);
    const forumValues = {
      Title: Forum.Title,
      Collaborateurs: Forum.Collaborateurs,
      Date: Forum.Date,
      Location: Forum.Location,
      Etat: Forum.Etat,
    };
    setEditForumData(forumValues);
    setEditModal(true);
  };

  // edit  data

  //update data function
  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editForumData };
    newFormData[fieldName] = fieldValue;
    setEditForumData(newFormData);
  };

  // edit form data submit
  const handleEditFormSubmit = (event) => {
    const editedContact = {
      id: editForumId,
      Title: editForumData.Title,
      Collaborateurs: editForumData.Collaborateurs,
      Date: editForumData.Date,
      Location: editForumData.Location,
      Etat: editForumData.Etat,
    };
    const newForums = [...Forums];
    const index = Forums.findIndex((Forum) => Forum.id === editForumId);
    newForums[index] = editedContact;
    setForums(newForums);
    setEditForumId(null);
    setEditModal(false);
  };

  return (
    <>
      <PageTitle
        activeMenu="Forums"
        motherMenu="Planification des forums Zonal"
      />
      <Link
        to={"#"}
        className="btn btn-primary font-w600 mb-3 me-auto"
        onClick={() => setPostModal(true)}
      >
        + Ajouter un forum
      </Link>
      <div className="d-flex ">
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
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
                  <h5 className="mb-1">Forums Planifiés :</h5>
                  {/* <h4 className="mb-0">30</h4> */}
                  <h5 className="badge badge-primary"> 2 Forums </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card m-3">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-primary text-primary">
                  <i className="la la-graduation-cap"></i>
                </span>
                <div className="media-body">
                  <h5 className="mb-1">Forums à venir:</h5>
                  {/* <h4 className="mb-0">30</h4> */}
                  <h5 className="badge badge-primary"> 0 Forum </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card m-3">
            <div className="card-body p-4 ">
              <div className="media ai-icon">
                <span className="me-3 bgl-primary text-primary">
                  <i className="flaticon-381-calendar-1"></i>
                </span>
                <div className="media-body">
                  <h5 className="mb-1">Forum Terminé :</h5>
                  <h5 className="badge badge-primary">1 Forum</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className="modal fade" show={postModal} onHide={setPostModal}>
        <div className="" role="document">
          <div className="">
            <form>
              <div className="modal-header">
                <h4 className="modal-title fs-20">Ajouter un forum </h4>
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
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Nom du Forum
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="Title"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Nom de du forum"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Date</label>
                      <div className="contact-occupation">
                        <input
                          type="text"
                          autoComplete="off"
                          name="Date"
                          required="required"
                          onChange={handleAddFormChange}
                          className="form-control"
                          placeholder="Date"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Collaborateurs
                      </label>
                      <div className="contact-name">
                        <CustomClearIndicator
                          onChange={(selectedOptions, event) =>
                            handleAddFormChange(event)
                          }
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
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddFormSubmit}
                >
                  Planifier
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
                <h4 className="modal-title fs-20">Modifier la Forum </h4>
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
                        Nom de du Forum
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="Title"
                          required="required"
                          value={editForumData.Title}
                          onChange={handleEditFormChange}
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Collaborateurs
                        </label>
                        <div className="contact-name">
                          <CustomClearIndicator></CustomClearIndicator>
                        </div>
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
                          value={editForumData.Date}
                          onChange={handleEditFormChange}
                        />
                        <span className="validation-text"></span>
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
                          value={editForumData.Location}
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
      <Row>
        <Col lg={10}>
          <Card>
            <Card.Header>
              <Card.Title>Forums Zonal</Card.Title>
            </Card.Header>
            <Card.Body>
              {Forums.length !== 0 ? (
                <Table responsive className="mb-3">
                  <thead>
                    <tr>
                      <th>
                        <strong>Titre</strong>
                      </th>
                      <th>
                        <strong>Collaborateurs</strong>
                      </th>
                      <th>
                        <strong>DATE</strong>
                      </th>
                      <th>
                        <strong>Localisation</strong>
                      </th>
                      <th>
                        <strong>Etat</strong>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Forums.map((forum, i) => (
                      <tr key={i}>
                        <td>{forum.Title}</td>
                        <td>{forum.Collaborateurs}</td>
                        <td>{forum.Date}</td>
                        <td>{forum.Location}</td>
                        <td>
                          <Badge variant="success light">Terminée</Badge>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="danger"
                              className="light sharp i-false"
                            >
                              {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={(event) =>
                                  handleEditClick(event, forum)
                                }
                              >
                                Modifier
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <button
                                  onClick={() =>
                                    swal({
                                      title: "Supprimer?",
                                      text: "Une fois supprimé, vous ne pourrez pas récupérer cette Forum !",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        handleDeleteClick(forum.id);
                                        swal("Votre Forum a été supprimé", {
                                          icon: "success",
                                        });
                                      } else {
                                        swal(
                                          "Votre suppression a été annulée !"
                                        );
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <h1 className="text-center">Aucun forum!</h1>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OlmForums;
