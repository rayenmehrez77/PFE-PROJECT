import React, { Fragment, useState, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
//** Import Image */
import profile from "../../../../images/ProfilePicture.jpg";
import PageTitle from "../../../layouts/PageTitle";
import { useSelector } from "react-redux";

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

const AppProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector((state) => state.auth.auth.user);

  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="card-body pb-3 transaction-details d-flex flex-wrap justify-content-between align-items-center">
        <div className="user-bx-2 me-3 mb-3">
          <img
            src={user.image &&
              "http://localhost:5001/" +
              user?.image.replace("public/", "")}
            style={{ objectFit: "cover" }}
            className="rounded"
            alt=""
          />
          <div>
            <h3 className="fs-20 font-w700">{user?.name}</h3>
            <span className="font-w400">
              {user?.role === "Member" ? "Membre" : null}
            </span>
          </div>
        </div>
        <div className="me-3 mb-3">
          <p className="mb-2">Sexe</p>
          <h4 className="mb-0">{user?.sexe}</h4>
        </div>
        <div className="me-3 mb-3">
          <p className="mb-2">Gouvernement</p>
          <h4 className="mb-0">{user?.gouvernement}</h4>
        </div>
        <div className="amount-bx mb-3 border">
          <div>
            <p className="mb-1">OLM</p>
            <h3 className="mb-0">
              {user.role === "Super Admin" ? "JCI ZONE C" : user?.OLM}
            </h3>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body pb-3">
            <div className="row align-items-center">
              <div className="col-xl-9 d-flex flex-wrap justify-content-between align-items-center">
                {user?.phone && (
                  <div className="d-flex me-3 mb-3 ms-2 align-items-start payment">
                    <i className="fas fa-phone-alt me-4 mt-2 scale5"></i>
                    <div>
                      <p className="mb-2 fs-16 font-w600">Telephone</p>
                      <h4 className="mb-0 fs-18 font-w700">
                        +216 {user?.phone}
                      </h4>
                    </div>
                  </div>
                )}
                <div className="d-flex me-3 mb-3 ms-2 align-items-start payment">
                  <i className="fas fa-envelope scale5 me-4 mt-2"></i>
                  <div>
                    <p className="mb-2 fs-16 font-w600">Email</p>
                    <h4 className="mb-0 fs-18 font-w700">{user.email}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-10">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <div id="profile-settings" eventKey="Setting">
                    <div className="pt-3">
                      <div className="settings-form">
                        <h4 className="text-primary">Edit Profile</h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="row">
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">
                                Nom et prénom
                              </label>
                              <input
                                type="name"
                                placeholder={user.name}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                placeholder={user.email}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Mot de Passe</label>
                              <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Téléphone</label>
                              <input
                                type="text"
                                placeholder={user.phone}
                                className="form-control"
                              />
                            </div>
                          </div>
                          {/* <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">City</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group mb-3 col-md-4">
                                  <label className="form-label">State</label>
                                  <select
                                    className="form-control"
                                    id="inputState"
                                    defaultValue="option-1"
                                  >
                                    <option value="option-1">Choose...</option>
                                    <option value="option-2">Option 1</option>
                                    <option value="option-3">Option 2</option>
                                    <option value="option-4">Option 3</option>
                                  </select>
                                </div>
                                <div className="form-group mb-3 col-md-2">
                                  <label className="form-label">Zip</label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div> */}
                          {/* <div className="form-group mb-3">
                                <div className="form-check custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="gridCheck"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="gridCheck"
                                  >
                                    Check me out
                                  </label>
                                </div>
                              </div> */}
                          <button className="btn btn-primary" type="submit">
                            Confirmer
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* send Modal */}
      <Modal
        className="modal fade"
        show={state.sendMessage}
        onHide={() => dispatch({ type: "sendMessage" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Send Message</h5>
            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "sendMessage" })}
            ></Button>
          </div>
          <div className="modal-body">
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: "sendMessage" });
              }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Author"
                      name="Author"
                      placeholder="Author"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="text-black font-w600">
                      {" "}
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Email"
                      placeholder="Email"
                      name="Email"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="comment" className="text-black font-w600">
                      Comment
                    </label>
                    <textarea
                      rows={8}
                      className="form-control"
                      name="comment"
                      placeholder="Comment"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Post Comment"
                      className="submit btn btn-primary"
                      name="submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* Post Modal */}
      <Modal
        show={state.post}
        className="modal fade"
        id="postModal"
        onHide={() => dispatch({ type: "postModal" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post</h5>
            <Button
              variant=""
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "postModal" })}
            >
              <span>×</span>
            </Button>
          </div>
          <div className="modal-body">
            <textarea
              name="textarea"
              id="textarea"
              cols={30}
              rows={5}
              className="form-control mb-2 bg-transparent"
              placeholder="Please type what you want...."
              defaultValue={""}
            />
            <Link
              className="btn btn-primary btn-rounded mt-1"
              to="/app-profile"
            >
              Post
            </Link>
          </div>
        </div>
      </Modal>
      {/* Link Modal */}
      <Modal
        show={state.link}
        className="modal fade post-input"
        id="linkModal"
        onHide={() => dispatch({ type: "linkModal" })}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Social Links</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => dispatch({ type: "linkModal" })}
            ></button>
          </div>
          <div className="modal-body">
            <Link className="btn-social me-1 facebook" to="/app-profile">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link className="btn-social me-1 google-plus" to="/app-profile">
              {" "}
              <i className="fab fa-google-plus" />
            </Link>
            <Link className="btn-social me-1 linkedin" to="/app-profile">
              <i className="fab fa-linkedin" />
            </Link>
            <Link className="btn-social me-1 instagram" to="/app-profile">
              {" "}
              <i className="fab fa-instagram" />
            </Link>
            <Link className="btn-social me-1 twitter" to="/app-profile">
              <i className="fab fa-twitter" />
            </Link>
            <Link className="btn-social me-1 youtube" to="/app-profile">
              <i className="fab fa-youtube" />
            </Link>
            <Link className="btn-social whatsapp" to="/app-profile">
              <i className="fab fa-whatsapp" />
            </Link>
          </div>
        </div>
      </Modal>
      {/* Camera Modal */}
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
      {/* Reply Modal */}
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
    </Fragment>
  );
};

export default AppProfile;
