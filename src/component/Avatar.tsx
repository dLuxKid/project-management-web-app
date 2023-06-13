import React from "react";

type Props = {
  photoURL: string;
};

const Avatar: React.FC<Props> = ({ photoURL }) => {
  return (
    <div className="avatar">
      <img src={photoURL} alt="display photo" />
    </div>
  );
};

export default Avatar;
