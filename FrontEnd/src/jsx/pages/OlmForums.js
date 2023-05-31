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
      <PageTitle activeMenu="FORUMS ZONAL" motherMenu="FORUMS" />
      <div className="d-flex ">
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6"></div>
      </div>
      <h1 className="fw-bold text-center mb-3">
        Les Forums Zonal pour l'année 2023
      </h1>
      <Row>
        <Col lg={12}>
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
