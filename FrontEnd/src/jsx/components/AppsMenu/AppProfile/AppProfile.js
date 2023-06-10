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
                      <div
                        style={{
                          margin: "0 auto",
                        }}
                      >
                        <div
                          className="profile-image"
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{
                              borderRadius: "999px",
                              objectFit: "cover",
                            }}
                            src={profile}
                            alt=""
                            width={80}
                            height={80}
                          />
                          <span
                            className="bg-success p-1"
                            style={{
                              borderRadius: "999px",
                              objectFit: "cover",
                              position: "absolute",
                              bottom: "5px",
                              cursor: "pointer",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip3)">
                                <path
                                  d="M10.4125 14.85C10.225 14.4625 10.3906 13.9937 10.7781 13.8062C11.8563 13.2875 12.7688 12.4812 13.4188 11.4719C14.0844 10.4375 14.4375 9.23749 14.4375 7.99999C14.4375 4.44999 11.55 1.56249 8 1.56249C4.45 1.56249 1.5625 4.44999 1.5625 7.99999C1.5625 9.23749 1.91562 10.4375 2.57812 11.475C3.225 12.4844 4.14062 13.2906 5.21875 13.8094C5.60625 13.9969 5.77187 14.4625 5.58437 14.8531C5.39687 15.2406 4.93125 15.4062 4.54062 15.2187C3.2 14.575 2.06562 13.575 1.2625 12.3187C0.4375 11.0312 -4.16897e-07 9.53749 -3.49691e-07 7.99999C-2.56258e-07 5.86249 0.83125 3.85312 2.34375 2.34374C3.85313 0.831242 5.8625 -7.37314e-06 8 -7.2797e-06C10.1375 -7.18627e-06 12.1469 0.831243 13.6563 2.34374C15.1688 3.85624 16 5.86249 16 7.99999C16 9.53749 15.5625 11.0312 14.7344 12.3187C13.9281 13.5719 12.7938 14.575 11.4563 15.2187C11.0656 15.4031 10.6 15.2406 10.4125 14.85Z"
                                  fill="white"
                                />
                                <path
                                  d="M11.0407 8.41563C11.1938 8.56876 11.2688 8.76876 11.2688 8.96876C11.2688 9.16876 11.1938 9.36876 11.0407 9.52188L9.07503 11.4875C8.78753 11.775 8.40628 11.9313 8.00315 11.9313C7.60003 11.9313 7.21565 11.7719 6.93127 11.4875L4.96565 9.52188C4.6594 9.21563 4.6594 8.72188 4.96565 8.41563C5.2719 8.10938 5.76565 8.10938 6.0719 8.41563L7.22502 9.56876L7.22502 5.12814C7.22502 4.69689 7.57503 4.34689 8.00628 4.34689C8.43753 4.34689 8.78753 4.69689 8.78753 5.12814L8.78753 9.57188L9.94065 8.41876C10.2407 8.11251 10.7344 8.11251 11.0407 8.41563Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip3">
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                    transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 -7.62939e-06)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div
                        className="settings-form"
                        style={{ marginTop: "10px" }}
                      >
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
