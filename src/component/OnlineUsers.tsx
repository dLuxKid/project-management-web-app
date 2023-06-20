// styles
import "../styles/onlineUsers.css";
// hooks
import useFirestore from "../hooks/useFirestore";
// model
import { docs } from "../types/model";
// component
import Avatar from "./Avatar";

const OnlineUsers = () => {
  const { error, fetchedDocs } = useFirestore("users");
  return (
    <div className="user-list">
      <h2>All users</h2>
      {error && <p className="error">{error}</p>}
      {fetchedDocs &&
        fetchedDocs.map((user: docs) => (
          <div key={user?.id} className="user-list-item">
            {user.online && <span className="show-online"></span>}
            <span>{user.displayName}</span>
            <Avatar photoURL={user.photoUrl} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
