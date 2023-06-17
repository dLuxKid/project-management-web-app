import React, { useState } from "react";
import { useAuthContext } from "../context/useContext";
import { updateDoc, doc, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/projectDetails.css";

type Props = {
  id: string;
};

const ProjectComment: React.FC<Props> = ({ id }) => {
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
      await updateDoc(doc(db, "project", id), {
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
