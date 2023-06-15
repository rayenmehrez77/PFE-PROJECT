import React from "react";

const Editable = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  update,
}) => {
  return (
    <>
      <>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter nom et prénom ..."
            name="name"
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter a OLM ..."
            name="OLM"
            value={editFormData.OLM}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            type="email"
            required="required"
            placeholder="Enter a Email ..."
            name="email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter le gouvernement ..."
            name="gouvernement"
            value={editFormData.gouvernement}
            onChange={handleEditFormChange}
          />
        </td>
        <td>
          <div className="d-flex">
            <button
              className="btn btn-warning shadow btn-xs sharp me-1"
              type="button"
              onClick={update}
            >
              <i className="las la-check-circle scale5"></i>
            </button>
            <button
              className="btn btn-danger shadow btn-xs sharp "
              type="button"
              onClick={handleCancelClick}
            >
              <i className="las la-times-circle scale5"></i>
            </button>
          </div>
        </td>
      </>
    </>
  );
};
export default Editable;
