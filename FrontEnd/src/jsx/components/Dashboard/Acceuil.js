import React, { useReducer, useState } from "react";
import profile08 from "../../../images/toyp.jpg";
import training from "../../../images/training.jpg";
import PageTitle from "../../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Card, Dropdown, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import profilePic from "../../../images/ProfilePicture.jpg";
import {
  createPostAction,
  deletePostAction,
  getPostsAction,
  updatePostAction,
} from "../../../store/actions/PostActions";
import { useEffect } from "react";

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
  const dispatchs = useDispatch();
  const user = useSelector((state) => state.auth.auth.user);

  const [data, setData] = useState({
    title: "",
    description: "",
    user: user._id,
    image: "",
  });
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    user: user._id,
    image: "",
    _id:""
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatchs(getPostsAction());
  }, []);

  const onPost = () => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("user", data.user);
    formdata.append("image", data.image);
    dispatchs(createPostAction(formdata));
  };
  const onUpdatePost = () => {
    const formdata = new FormData();
    formdata.append("title", updateData.title);
    formdata.append("description", updateData.description);
    formdata.append("image", updateData.image);
    formdata.append("user", user._id);
    dispatchs(updatePostAction(formdata,updateData._id));
    dispatch({ type: "replyModal" })
  };

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
                <input
                  onChange={(e) =>
                    updateData.image ? setUpdateData({ ...updateData, image: e.target.files[0] })  :  setData({ ...data, image: e.target.files[0] })
                  }
                  type="file"
                  className="form-file-input"
                  
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Modal
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
               <textarea className="form-control" rows="4" >Message</textarea> 
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
      </Modal> */}

      <Card eventKey="Posts">
        <div className="my-post-content p-3">
          {(user.role === "Super Admin" || user.role === "Admin") && (
            <div className="post-input">
              <input
                onChange={(e) => setData({ ...data, title: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Title"
              />
              <textarea
                name="textarea"
                id="textarea"
                cols={30}
                rows={5}
                FontSize="20px"
                className="form-control bg-transparent p-3"
                placeholder={`Écrivez quelque chose d'intéressant, ${user.name} ?`}
                defaultValue={""}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
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
                onClick={onPost}
              >
                Post
              </Link>
            </div>
          )}
          <Modal
            show={state.reply}
            className="modal fade"
            id="replyModal"
            onHide={() => dispatch({ type: "replyModal" })}
          >
            <div className="" role="document">
              <div className="">
                <form>
                  <div className="modal-header">
                    <h4 className="modal-title fs-20">
                      Modifier la publication
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => dispatch({ type: "replyModal" })}
                      data-dismiss="modal"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      onChange={(e) =>
                        setUpdateData({ ...updateData, title: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      defaultValue={updateData.title}
                    />
                    <textarea
                      name="textarea"
                      id="textarea"
                      cols={30}
                      rows={5}
                      FontSize="20px"
                      className="form-control bg-transparent p-3"
                      placeholder={`Écrivez quelque chose d'intéressant, ${user.name} ?`}
                      defaultValue={updateData.description}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, description: e.target.value })
                      }
                    />
                    <Link
                      to={"#"}
                      className="btn btn-primary light px-3 me-1"
                      data-target="#cameraModal"
                      onClick={() => dispatch({ type: "cameraModal" })}
                    >
                      <i className="fa fa-camera m-0" />{" "}
                    </Link>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onUpdatePost}
                    >
                      Enregister les modifications
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "replyModal" })}
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
                    src={
                      post.user.image &&
                      "http://localhost:5001/" +
                        post?.user?.image.replace("public/", "")
                    }
                    className="rounded"
                    style={{ objectFit: "cover" }}
                    width={50}
                    alt=""
                  />
                  <div className="" style={{ marginLeft: "18px" }}>
                    <h5 className="fw-bold">{post?.user?.name}</h5>
                    <span>{new Date(post.date).toString("YYYY-MM-dd")}</span>
                  </div>
                </div>
                {(user.role === "Super Admin" || user.role === "Admin") &&
                  post.user._id === user._id && (
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
                          onClick={() => {dispatch({ type: "replyModal" });setUpdateData(post)}}
                        >
                          Modifier
                        </Dropdown.Item>

                        <Dropdown.Item className="text-danger">
                          <button
                            onClick={() =>
                              swal({
                                title: "Supprimer?",
                                text: "Une fois supprimé, vous ne pourrez pas récupérer cette publication !",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  dispatchs(deletePostAction(post._id));
                                  swal("Votre publication a été supprimé", {
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
                  )}
              </div>
              <div style={{ padding: "5px 2px" }}>
                <h2 className="text-black fw-bold">{post.title}</h2>
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
