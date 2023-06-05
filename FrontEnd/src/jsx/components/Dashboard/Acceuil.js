import React, { useReducer } from "react";
import profile08 from "../../../images/toyp.jpg";
import training from "../../../images/training.jpg";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
import { Card, Dropdown, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import profilePic from "../../../images/ProfilePicture.jpg";

const initialState = false;
const reducer = (state, action) => {
  switch (action.type) {
    case "sendMessage":
      return { ...state, sendMessage: !state.sendMessage };
    case "postModal":
      return { ...state, post: !state.post };
    case "linkModal":
      return { ...state, link: !state.link };
    case "cameraModal":
      return { ...state, camera: !state.camera };
    case "replyModal":
      return { ...state, reply: !state.reply };
    default:
      return state;
  }
};

const posts = [
  {
    id: 1,
    title: "Les 5P de Leadership",
    description:
      "Notre cher formateur Nadhem BARDAA sera au rendez-vous pendant notre cercle régional de formation qui aura lieu le 4 juin 2023  à l'Hôtel Royal Jinen Sousse ,Pour animer la formation intitulée Les 5 P du leadership Soyez au rendez-vous chers leaders et développez vos aptitudes de leadership avec nous !",
    image: training,
  },
  {
    id: 2,
    title: "Soirée résultats JCI TOYP 2023",
    description:
      "La Jeune Chambre Economique de Tunisie a le plaisir de vous inviter à l'annonce des résultats de la compétition et programme JCI TOYP ! Et ce en ligne, mercredi 31 Mai 2023 à 20h Soyez là pour encourager vos candidats et fêter ensemble les résultats. Tous nos souhaits de réussite!  ",
    image: profile08,
  },
];

const Acceuil = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector((state) => state.auth.auth.user);

  return (
    <div>
      <PageTitle activeMenu="Acceuil" motherMenu="Acceuil" />
      <h1 className="fw-bold">{`Bienvenue, ${user.name}!`}</h1>
      <Modal
        show={state.camera}
        className="modal fade"
        id="cameraModal"
        onHide={() => dispatch({ type: "cameraModal" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload images</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "cameraModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Upload</span>
              <div className="form-file">
                <input type="file" className="form-file-input" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={state.reply}
        className="modal fade"
        id="replyModal"
        onHide={() => dispatch({ type: "replyModal" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Reply</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: "replyModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* <textarea className="form-control" rows="4" >Message</textarea> */}
              <Form.Control as="textarea" rows="4" placeholder="Message" />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              onClick={() => dispatch({ type: "replyModal" })}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Reply
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={state.reply}
        className="modal fade"
        id="replyModal"
        onHide={() => dispatch({ type: "replyModal" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Reply</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch({ type: "replyModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* <textarea className="form-control" rows="4" >Message</textarea> */}
              <Form.Control as="textarea" rows="4" placeholder="Message" />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              onClick={() => dispatch({ type: "replyModal" })}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Reply
            </button>
          </div>
        </div>
      </Modal>
      <Card eventKey="Posts">
        <div className="my-post-content p-3">
          {user.role === "Super Admin" && (
            <div className="post-input">
              <input type="text" className="form-control" placeholder="Title" />
              <textarea
                name="textarea"
                id="textarea"
                cols={30}
                rows={5}
                FontSize="20px"
                className="form-control bg-transparent p-3"
                placeholder={`Écrivez quelque chose d'intéressant, ${user.name} ?`}
                defaultValue={""}
              />
              <Link
                to={"#"}
                className="btn btn-primary light px-3 me-1"
                data-target="#cameraModal"
                onClick={() => dispatch({ type: "cameraModal" })}
              >
                <i className="fa fa-camera m-0" />{" "}
              </Link>
              <Link
                to={"#"}
                className="btn btn-primary ms-1"
                data-target="#postModal"
                onClick={() => dispatch({ type: "postModal" })}
              >
                Post
              </Link>
            </div>
          )}
          <Modal
            className="modal fade"
            // show={editModal}
            // onHide={setEditModal}
          >
            <div className="" role="document">
              <div className="">
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title fs-20">Modifier la formation</h4>
                    <button
                      type="button"
                      className="btn-close"
                      // onClick={() => setEditModal(false)}
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
                              // value={editFormData.nom_formation}
                              // onChange={handleEditFormChange}
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
                              // value={editFormData.Date_Join}
                              // onChange={handleEditFormChange}
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
                              // value={editFormData.Cust_Name}
                              // onChange={handleEditFormChange}
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
                              // value={editFormData.Durée}
                              // onChange={handleEditFormChange}
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
                              // value={editFormData.Location}
                              // onChange={handleEditFormChange}
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
                      // onClick={handleEditFormSubmit}
                    >
                      Enregister les modifications
                    </button>
                    <button
                      type="button"
                      // onClick={() => setEditModal(false)}
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
          {posts.map((post) => (
            <div className="border-bottom-3 pb-3" key={post.id}>
              <div
                className="d-flex align-items"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex align-items">
                  <img
                    src={profilePic}
                    className="rounded"
                    style={{ objectFit: "cover" }}
                    width={50}
                    alt=""
                  />
                  <div className="" style={{ marginLeft: "18px" }}>
                    <h5 className="fw-bold">Comité Zone C</h5>
                    <span>23 juin 2023, 17:00h</span>
                  </div>
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
              <div style={{ padding: "5px 2px" }}>
                <h2 className="text-black fw-bold">{post.title}</h2>
                <span className="">{Date.now}</span>
              </div>
              <img src={post.image} alt="" className="img-fluid w-36 rounded" />
              <p className="p-3">{post.description}</p>
              {/* <button className="btn btn-primary me-2">
                <span className="me-2">
                  {" "}
                  <i className="fa fa-heart" />{" "}
                </span>
                Like
              </button> */}
              {/* <button
                className="btn btn-secondary"
                onClick={() => dispatch({ type: "replyModal" })}
              >
                <span className="me-2">
                  {" "}
                  <i className="fa fa-reply" />
                </span>
                Reply
              </button> */}
              <hr />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Acceuil;
