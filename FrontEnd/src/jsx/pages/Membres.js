import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import pic1 from "./../../images/profile/small/pic1.jpg";
import Editable from "./Editable";
import { getUsers } from "../../store/Thunks/userThunks";
import { connect, useDispatch } from "react-redux";

const tableList = [
  {
    id: "1",
    name: "Hazem Boughraira",
    poste: "Président 2023",
    email: "hazem@example.com",
    téléphone: "+216 29 299 998",
  },
  {
    id: "2",
    name: "Rayen Mehrez",
    poste: "VPPRE",
    email: "rayen@example.com",
    téléphone: "+216 92 123 456",
  },
  {
    id: "3",
    name: "Kacem Mabrouk",
    poste: "Past Président immédiat",
    email: "kacem@example.com",
    téléphone: "+216 25 255 214",
  },
  {
    id: "4",
    name: "Iheb Boughraira",
    poste: "Conseiller Juridique",
    email: "iheb@example.com",
    téléphone: "+216 99 898 264",
  },
  {
    id: "5",
    name: "Badia Cherif",
    poste: "Conseiller Protocol",
    email: "badia@example.com",
    téléphone: "+216 73 222 222 ",
  },
  {
    id: "6",
    name: "Dhia eddine abdou",
    poste: "Membre",
    email: "dhia@example.com",
    téléphone: "+216 22 235 645",
  },
];

const conseillerList = [
  {
    id: "1",
    name: "Malek Abderrazak",
    poste: "Conseillère de programme JCI",
    email: "Malek@example.com",
    téléphone: "+216 29 299 998",
  },
  {
    id: "2",
    name: "Badia Cherif",
    poste: "Conseiller Protocol",
    email: "badia@example.com",
    téléphone: "+216 92 123 456",
  },
  {
    id: "3",
    name: "Adham Naiji",
    poste: "Conseiller Media",
    email: "Adham@example.com",
    téléphone: "+216 25 255 214",
  },
  {
    id: "5",
    name: "Azhar Mabrouk",
    poste: "Conseillère Thème National",
    email: "azhar@example.com",
    téléphone: "+216 73 222 222 ",
  },
];

const MembresList = [
  {
    id: "1",
    name: "Dhia eddine abdou",
    poste: "Membre",
    email: "monastir@example.com",
    téléphone: "+216 29 299 998",
  },
  {
    id: "2",
    name: "Wadia Salmene",
    poste: "Membre",
    email: "rayen@example.com",
    téléphone: "+216 92 123 456",
  },
  {
    id: "3",
    name: "Hiba Mabrouk",
    poste: "Membre",
    email: "kacem@example.com",
    téléphone: "+216 25 255 214",
  },
  {
    id: "4",
    name: "Azza Hamza",
    poste: "Membre",
    email: "iheb@example.com",
    téléphone: "+216 99 898 264",
  },
  {
    id: "5",
    name: "Aya Derouiche",
    poste: "Membre",
    email: "badia@example.com",
    téléphone: "+216 73 222 222 ",
  },
];

const MembresComponent = () => {
  const [contents, setContents] = useState(tableList);
  const [conseillers, setConseillers] = useState(conseillerList);
  const [Membres, setMembres] = useState(MembresList);
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // delete data
  const handleDeleteClick = (contentId) => {
    const newContents = [...contents];
    const index = contents.findIndex((content) => content.id === contentId);
    newContents.splice(index, 1);
    setContents(newContents);
  };

  const handleDeleteConseillerClick = (contentId) => {
    const newContents = [...conseillers];
    const index = conseillers.findIndex((content) => content.id === contentId);
    newContents.splice(index, 1);
    setConseillers(newContents);
  };

  //Modal box
  const [addCard, setAddCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    name: "",
    poste: "",
    email: "",
    téléphone: "",
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
    if (addFormData.name === "") {
      error = true;
      errorMsg = "Please fill  name";
    } else if (addFormData.poste === "") {
      error = true;
      errorMsg = "Please fill poste.";
    } else if (addFormData.email === "") {
      error = true;
      errorMsg = "please fill email";
    } else if (addFormData.téléphone === "") {
      error = true;
      errorMsg = "please fill phone";
    }

    if (!error) {
      const newContent = {
        id: nanoid(),
        name: addFormData.name,
        poste: addFormData.poste,
        email: addFormData.email,
        téléphone: addFormData.téléphone,
      };

      const newContents = [...contents, newContent];
      setContents(newContents);
      setAddCard(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.name =
        addFormData.poste =
        addFormData.email =
        addFormData.téléphone =
          "";
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  const handleAddFormConseillersSubmit = (event) => {
    event.preventDefault();
    var error = false;
    var errorMsg = "";
    if (addFormData.name === "") {
      error = true;
      errorMsg = "Please fill  name";
    } else if (addFormData.poste === "") {
      error = true;
      errorMsg = "Please fill poste.";
    } else if (addFormData.email === "") {
      error = true;
      errorMsg = "please fill email";
    } else if (addFormData.téléphone === "") {
      error = true;
      errorMsg = "please fill phone";
    }

    if (!error) {
      const newContent = {
        id: nanoid(),
        name: addFormData.name,
        poste: addFormData.poste,
        email: addFormData.email,
        téléphone: addFormData.téléphone,
      };

      const newContents = [...contents, newContent];
      setContents(newContents);
      setAddCard(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.name =
        addFormData.poste =
        addFormData.email =
        addFormData.téléphone =
          "";
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  //Edit start
  //const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editContentId, setEditContentId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content.id);
    const formValues = {
      name: content.name,
      poste: content.poste,
      email: content.email,
      téléphone: content.téléphone,
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    name: "",
    poste: "",
    email: "",
    téléphone: "",
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
    const editedContent = {
      id: editContentId,
      name: editFormData.name,
      poste: editFormData.poste,
      email: editFormData.email,
      téléphone: editFormData.téléphone,
    };
    const newContents = [...contents];
    const index = contents.findIndex((content) => content.id === editContentId);
    newContents[index] = editedContent;
    setContents(newContents);
    setEditContentId(null);
    // setEditModal(false);
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };

  return (
    <>
      <PageTitle activeMenu="Membres" motherMenu="Gestion des membres" />
      <h1 className="text-center fw-bold mb-3 text-cyan">
        MEMBRES JCI MENZEL FERSI 2023
      </h1>
      <div className="col-12">
        <Modal className="modal fade" show={addCard} onHide={setAddCard}>
          <div className="" role="document">
            <div className="">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title fs-20">Ajouter un membre</h4>
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
                            placeholder="Nom et prénom"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">Poste</label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="Poste"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Poste"
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
                            name="Email"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Email"
                          />
                          <span className="validation-text"></span>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="text-black font-w500">
                          Téléphone
                        </label>
                        <div className="contact-name">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            name="téléphone"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Téléphone"
                          />
                          <span className="validation-text"></span>
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
                    <h4>
                      {tableList.length +
                        conseillerList.length +
                        MembresList.length}
                    </h4>
                    <span>Membres Totals</span>
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
                    <h4>{tableList.length}</h4>
                    <span>Membres Bureaux</span>
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
                    <h4>{conseillerList.length}</h4>
                    <span>Conseillers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Membres Bureaux</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Nom et prénom</th>
                        <th>Poste</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contents.map((content, index) => (
                        <tr key={index}>
                          {editContentId === content.id ? (
                            <Editable
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <>
                              <td></td>
                              <td>{content.name}</td>
                              <td>{content.poste}</td>
                              <td>
                                <Link to={"#"}>
                                  <strong>{content.email}</strong>
                                </Link>
                              </td>
                              <td>{content.téléphone}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="btn btn-primary shadow btn-xs sharp me-2"
                                    onClick={() => setAddCard(true)}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-secondary	 shadow btn-xs sharp me-2"
                                    onClick={(event) =>
                                      handleEditClick(event, content)
                                    }
                                  >
                                    <i className="fas fa-pen"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDeleteClick(content.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
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
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Les Conseillers</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Nom et prénom</th>
                        <th>Poste</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conseillerList.map((content, index) => (
                        <tr key={index}>
                          {editContentId === content.id ? (
                            <Editable
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <>
                              <td></td>
                              <td>{content.name}</td>
                              <td>{content.poste}</td>
                              <td>
                                <Link to={"#"}>
                                  <strong>{content.email}</strong>
                                </Link>
                              </td>
                              <td>{content.téléphone}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="btn btn-primary shadow btn-xs sharp me-2"
                                    onClick={() => setAddCard(true)}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-secondary	 shadow btn-xs sharp me-2"
                                    onClick={(event) =>
                                      handleEditClick(event, content)
                                    }
                                  >
                                    <i className="fas fa-pen"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDeleteConseillerClick(content.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
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
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Les Membres</h4>
          </div>
          <div className="card-body">
            <div className="w-100 table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <form onSubmit={handleEditFormSubmit}>
                  <table id="example" className="display w-100 dataTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Nom et prénom</th>
                        <th>Poste</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Membres.map((content, index) => (
                        <tr key={index}>
                          {editContentId === content.id ? (
                            <Editable
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <>
                              <td></td>
                              <td>{content.name}</td>
                              <td>{content.poste}</td>
                              <td>
                                <Link to={"#"}>
                                  <strong>{content.email}</strong>
                                </Link>
                              </td>
                              <td>{content.téléphone}</td>
                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="btn btn-primary shadow btn-xs sharp me-2"
                                    onClick={() => setAddCard(true)}
                                  >
                                    <i className="fa fa-plus"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-secondary	 shadow btn-xs sharp me-2"
                                    onClick={(event) =>
                                      handleEditClick(event, content)
                                    }
                                  >
                                    <i className="fas fa-pen"></i>
                                  </Link>
                                  <Link
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() =>
                                      handleDeleteConseillerClick(content.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Link>
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
  loading: state.users.loading,
  error: state.users.error,
});



export default connect(mapStateToProps)(MembresComponent);
