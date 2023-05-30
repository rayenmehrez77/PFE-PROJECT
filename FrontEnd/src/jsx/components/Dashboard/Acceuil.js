import React, { useReducer } from "react";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import profile from "../../../images/profile/profile.png";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
import { Card, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          <div className="profile-uoloaded-post border-bottom-1 pb-5">
            <img src={profile08} alt="" className="img-fluid w-80 rounded" />
            <Link className="post-title" to="#">
              <h3 className="text-black">
                Collection of textile samples lay spread
              </h3>
            </Link>
            <p>
              A wonderful serenity has take possession of my entire soul like
              these sweet morning of spare which enjoy whole heart.A wonderful
              serenity has take possession of my entire soul like these sweet
              morning of spare which enjoy whole heart.
            </p>
            <button className="btn btn-primary me-2">
              <span className="me-2">
                {" "}
                <i className="fa fa-heart" />{" "}
              </span>
              Like
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => dispatch({ type: "replyModal" })}
            >
              <span className="me-2">
                {" "}
                <i className="fa fa-reply" />
              </span>
              Reply
            </button>
          </div>
          <div className="profile-uoloaded-post border-bottom-1 pb-5">
            <img src={profile09} alt="" className="img-fluid w-100 rounded" />
            <Link className="post-title" to="/post-details">
              <h3 className="text-black">
                Collection of textile samples lay spread
              </h3>
            </Link>
            <p>
              A wonderful serenity has take possession of my entire soul like
              these sweet morning of spare which enjoy whole heart.A wonderful
              serenity has take possession of my entire soul like these sweet
              morning of spare which enjoy whole heart.
            </p>
            <button className="btn btn-primary me-2">
              <span className="me-2">
                {" "}
                <i className="fa fa-heart" />{" "}
              </span>
              Like
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => dispatch({ type: "replyModal" })}
            >
              <span className="me-2">
                {" "}
                <i className="fa fa-reply" />
              </span>
              Reply
            </button>
          </div>
          <div className="profile-uoloaded-post pb-3">
            <img src={profile08} alt="" className="img-fluid  w-100 rounded" />
            <Link className="post-title" to="/post-details">
              <h3 className="text-black">
                Collection of textile samples lay spread
              </h3>
            </Link>
            <p>
              A wonderful serenity has take possession of my entire soul like
              these sweet morning of spare which enjoy whole heart.A wonderful
              serenity has take possession of my entire soul like these sweet
              morning of spare which enjoy whole heart.
            </p>
            <button className="btn btn-primary me-2">
              <span className="me-2">
                <i className="fa fa-heart" />
              </span>
              Like
            </button>
            <button
              className="btn btn-secondary"
              // onClick={() => dispatch({ type: "replyModal" })}
            >
              <span className="me-2">
                {" "}
                <i className="fa fa-reply" />
              </span>
              Reply
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Acceuil;
