import React from "react";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import profile from "../../../images/profile/profile.png";
import PageTitle from "../../layouts/PageTitle";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Acceuil = () => {
  const user = useSelector((state) => state.auth.auth.user);

  return (
    <div>
      <PageTitle activeMenu="Acceuil" motherMenu="Acceuil" />
      <h1 className="fw-bold">{`Bienvenue, ${user.name}!`}</h1>
      <Card eventKey="Posts">
        <div className="my-post-content p-3">
          <div className="post-input">
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
              to="/app-profile"
              className="btn btn-primary light px-3 me-1"
              // onClick={() => dispatch({ type: "linkModal" })}
            >
              <i className="fa fa-link m-0" />{" "}
            </Link>
            {/* Modal */}

            <Link
              to={"#"}
              className="btn btn-primary light px-3 me-1"
              data-target="#cameraModal"
              // onClick={() => dispatch({ type: "cameraModal" })}
            >
              <i className="fa fa-camera m-0" />{" "}
            </Link>
            {/* Modal */}

            <Link
              to={"#"}
              className="btn btn-primary ms-1"
              data-target="#postModal"
              // onClick={() => dispatch({ type: "postModal" })}
            >
              Post
            </Link>
            {/* Modal */}
          </div>

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
              // onClick={() => dispatch({ type: "replyModal" })}
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
              // onClick={() => dispatch({ type: "replyModal" })}
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
