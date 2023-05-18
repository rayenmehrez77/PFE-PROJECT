import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
import PageTitle from "../layouts/PageTitle";
import pic1 from "./../../images/profile/small/pic1.jpg";
import Editable from "./Editable";

const tableList = [
  {
    id: "1",
    name: "Hamza Mehrez",
    OLM: "JCI Menzel Fersi",
    email: "menzelfersi@example.com",
    téléphone: "+216 92 123 456",
  },
  {
    id: "2",
    name: "Tiger Nixon",
    OLM: "JCI Bouhjar",
    email: "bouhjar@example.com",
    téléphone: "12345 67890",
  },
  {
    id: "3",
    name: "Tiger Nixon",
    OLM: "JCI Monastir",
    email: "monastir@example.com",
    téléphone: "12345 67890",
  },
  {
    id: "4",
    name: "Tiger Nixon",
    OLM: "JCI Moknine",
    email: "info2@example.com",
    téléphone: "12345 67890",
  },
  {
    id: "5",
    name: "Tiger Nixon",
    OLM: "JCI Touza",
    email: "info2@example.com",
    téléphone: "12345 67890",
  },
  {
    id: "6",
    name: "Tiger Nixon",
    OLM: "Menzel Fersi",
    email: "info2@example.com",
    téléphone: "12345 67890",
  },
];

const Todo = () => {
  const [contents, setContents] = useState(tableList);
  // delete data
  const handleDeleteClick = (contentId) => {
    const newContents = [...contents];
    const index = contents.findIndex((content) => content.id === contentId);
    newContents.splice(index, 1);
    setContents(newContents);
  };

  //Modal box
  const [addCard, setAddCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    name: "",
    OLM: "",
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
    } else if (addFormData.OLM === "") {
      error = true;
      errorMsg = "Please fill department.";
    } else if (addFormData.email === "") {
      error = true;
      errorMsg = "please fill gender";
    }
    if (!error) {
      const newContent = {
        id: nanoid(),
        name: addFormData.name,
        OLM: addFormData.OLM,
        email: addFormData.email,
        téléphone: addFormData.téléphone,
      };

      const newContents = [...contents, newContent];
      setContents(newContents);
      setAddCard(false);
      swal("Good job!", "Successfully Added", "success");
      addFormData.name =
        addFormData.OLM =
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
      OLM: content.OLM,
      email: content.email,
      téléphone: content.téléphone,
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    name: "",
    OLM: "",
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
      OLM: editFormData.OLM,
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
                            placeholder="Nom et prénom"
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
                            name="Email"
                            required="required"
                            onChange={handleAddFormChange}
                            placeholder="Email"
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
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddCard(false)}
                    className="btn btn-danger"
                  >
                    {" "}
                    <i className="flaticon-delete-1"></i> Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Administrateurs Local</h4>
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
                        <th>OLM</th>
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
                              <td>{content.OLM}</td>
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
      </div>
    </>
  );
};
export default Todo;
