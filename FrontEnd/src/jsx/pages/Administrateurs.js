import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import Editable from "./Editable";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { getUsers } from "../../store/Thunks/userThunks";

const Administrateurs = ({ users }) => {
  const [contents, setContents] = useState(users);
  const [deleteId, setDeleteId] = useState(null);

  const adminCount = contents.filter(
    (content) => content.role === "Admin"
  ).length;

  //Modal box
  const [addCard, setAddCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    name: "",
    OLM: "",
    email: "",
    password: "",
    gouvernement: "",
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

  const [editContentId, setEditContentId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content._id);
    const formValues = {
      name: content.name,
      OLM: content.OLM,
      email: content.email,
      gouvernement: content.gouvernement,
    };
    setEditFormData(formValues);
  };

  const addUser = async () => {
    try {
      const response = await axios.post(`users/addUser`, addFormData);

      console.log("User updated:", response.data);
      setAddCard(false);
      dispatch(getUsers());
      // Perform any necessary actions after user update
    } catch (error) {
      console.log("Error updating user:", error.response.data);
      // Handle error response
    }
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    name: "",
    OLM: "",
    email: "",
    gouvernement: "",
  });

  const UpdateUser = async (newFormData) => {
    const { name, OLM, email, gouvernement } = newFormData;

    const userToUpdate = {
      name,
      OLM,
      email,
      gouvernement,
    };

    try {
      const response = await axios.put(
        `users/edit-admin/${editContentId}`,
        userToUpdate
      );

      console.log("User updated:", response.data);
      dispatch(getUsers());
    } catch (error) {
      console.log("Error updating user:", error.response.data);
      // Handle error response
    }
  };

  //update data function
  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);

  // edit form data submit
  const handleEditFormSubmit = () => {
    const editedContent = {
      name: editFormData.name,
      OLM: editFormData.OLM,
      email: editFormData.email,
      gouvernement: editFormData.gouvernement,
    };
    UpdateUser(editedContent);

    setEditContentId(null);
    dispatch(getUsers());
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };

  const handleDeleteClick = (userId) => {
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        dispatch(getUsers());
        setDeleteCard(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <PageTitle
        activeMenu="Administrateurs Local"
        motherMenu="Ajouter des administrateurs"
      />
      <div className="col-12">
        <Modal className="modal fade" show={addCard} onHide={setAddCard}>
          <div className="" role="document">
            <div className="">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">
                    Ajouter un administrateur d'une OLM
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAddCard(false)}
                    data-dismiss="modal"
                  >
                    <span></span>
                  </button>
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
                          Nom et prénom
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="name"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="nom et prénom"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">OLM</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="OLM"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="OLM"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Email</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="email"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Email"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Gouvernement
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="gouvernement"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Gouvernement"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Mot de passe
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="password"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Mot de passe"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addUser}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddCard(false)}
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
        <Modal
          className="modal fade mt-12"
          show={deleteCard}
          onHide={setDeleteCard}
        >
          <div className="" role="document">
            <div className="">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">
                    Supprimer un administrateur d'une OLM
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDeleteCard(false)}
                    data-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeleteClick(deleteId)}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCard(false)}
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
        <div className="row">
          <div className="col-xl-3 col-sm-6">
            <div className="card overflow-hidden">
              <div className="card-header border-0">
                <div className="d-flex">
                  <span className="mt-1">
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z"
                        fill="#44814E"
                      />
                      <circle
                        cx="43.5"
                        cy="14.5"
                        r="12.5"
                        fill="#FFAA2B"
                        stroke="white"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                  <div className="invoices">
                    <h4>{adminCount}</h4>
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="card overflow-hidden">
              <div className="card-header border-0">
                <div className="d-flex">
                  <span className="mt-1">
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z"
                        fill="#44814E"
                      />
                      <circle
                        cx="43.5"
                        cy="14.5"
                        r="12.5"
                        fill="#FFAA2B"
                        stroke="white"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                  <div className="invoices">
                    <h4>{adminCount}</h4>
                    <span>OLM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Administrateurs Local</h4>
            <Button
              className="btn btn-primary shadow sharp "
              onClick={() => setAddCard(true)}
            >
              <span>Ajouter un admin</span>
            </Button>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th>Nom et prénom</th>
                        <th>OLM</th>
                        <th>Email</th>
                        <th>Gouvernement</th>
                        <th>Opérations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((content) => content.role === "Admin")
                        .map((content, index) => (
                          <tr key={index}>
                            {editContentId === content._id ? (
                              <Editable
                                editFormData={editFormData}
                                handleEditFormChange={handleEditFormChange}
                                handleCancelClick={handleCancelClick}
                                update={handleEditFormSubmit}
                              />
                            ) : (
                              <>
                                <td>{content.name}</td>
                                <td>{`JCI ${content.OLM}`}</td>
                                <td>
                                  <Link to={"#"}>
                                    <strong>{content.email}</strong>
                                  </Link>
                                </td>
                                <td>{content.gouvernement}</td>
                                <td>
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-secondary	shadow btn-xs sharp me-2"
                                      onClick={(event) =>
                                        handleEditClick(event, content)
                                      }
                                    >
                                      <i className="fas fa-pen"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-danger shadow btn-xs sharp"
                                      onClick={() => {
                                        setDeleteId(content._id);
                                        setDeleteCard(true);
                                      }}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.auth.auth.user,
});

export default connect(mapStateToProps)(Administrateurs);
