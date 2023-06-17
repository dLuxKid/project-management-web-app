import React, { useState } from "react";
import { useAuthContext } from "../context/useContext";
import { updateDoc, doc, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/projectDetails.css";
import { projectDocument } from "../types/model";
import Avatar from "./Avatar";

type Props = {
  project: projectDocument;
};

const ProjectComment: React.FC<Props> = ({ project }) => {
  const { user } = useAuthContext();

  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      comment: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    if (!newComment) {
      return;
    }

    try {
      await updateDoc(doc(db, "project", project.id), {
        comments: arrayUnion(commentToAdd),
      });
      setPending(false);
      setNewComment("");
    } catch (error) {
      setError("could not add comment");
      setPending(false);
    }
  };

  return (
    <div className="project-comment">
      <h4>Project Comment</h4>
      <ul>
        {project.comments?.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar photoURL={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>{}</p>
              </div>
              <div className="comment-content">
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add a comment</span>
          <textarea
            required
            onChange={handleComment}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn" onClick={handleSubmit} disabled={pending}>
          {pending ? "Loading..." : "Add comment"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProjectComment;
