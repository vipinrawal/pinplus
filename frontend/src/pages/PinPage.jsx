import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams();

  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHander = (id) => {
    if (confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="pin-page-container">
  {pin && (
    <div className="pin-page-wrapper">
      <div className="image-container">
        {pin.image && (
          <img src={pin.image.url} alt="" />
        )}
      </div>
      <div className="content-container">
        <div className="header">
          {edit ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-input"
              placeholder="Enter Title"
            />
          ) : (
            <h1 className="user-name">{pin.title}</h1>
          )}
          <div>
          {pin.owner && pin.owner._id === user._id && (
            <button onClick={editHandler} className="delete-button">
              <FaEdit />
            </button>
          )}
          {pin.owner && pin.owner._id === user._id && (
            <button onClick={deletePinHandler} className="delete-button">
              <MdDelete />
            </button>
          )}
          </div>
        </div>
        {edit ? (
          <input
            value={pinValue}
            onChange={(e) => setPinValue(e.target.value)}
            className="edit-input"
            placeholder="Enter Title"
          />
        ) : (
          <p className="description">{pin.pin}</p>
        )}
        {edit && (
          <button className="update-button" onClick={updateHandler}>
            Update
          </button>
        )}
        {pin.owner && (
          <div className="user-info">
            <Link to={`/user/${pin.owner._id}`}>
              <div className="avatar">
                <span>{pin.owner.name.slice(0, 1)}</span>
              </div>
            </Link>
            <div className="user-details">
              <h2 className="user-name">{pin.owner.name}</h2>
              <p className="followers">{pin.owner.followers.length} Followers</p>
            </div>
          </div>
        )}
        <div className="comment-section">
          <div className="avatar" style={{ marginRight: "1rem" }}>
            <span>{pin.owner && pin.owner.name.slice(0, 1)}</span>
          </div>
          <form className="comment-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter Comment"
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit" className="send-button">
              <i className="ri-send-plane-fill"></i>
            </button>
          </form>
        </div>
        <hr className="divider" />
        <div className="comment-list">
          {pin.comments && pin.comments.length > 0 ? (
            pin.comments.map((e) => (
              <div key={e._id} className="comment-item">
                <div className="comment-content">
                  <Link to={`/user/${e.user}`}>
                    <div className="avatar">
                      <span>{e.name.slice(0, 1)}</span>
                    </div>
                  </Link>
                  <div>
                    <h2 className="user-name">{e.name}</h2>
                    <p className="followers">{e.comment}</p>
                  </div>
                </div>
                {e.user === user._id && (
                  <button
                    onClick={() => deleteCommentHander(e._id)}
                    className="delete-comment-button"
                  >
                    <MdDelete/>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>Be the first one to add comment</p>
          )}
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default PinPage;
