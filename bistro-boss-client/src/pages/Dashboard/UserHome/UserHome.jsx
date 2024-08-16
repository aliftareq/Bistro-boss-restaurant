import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? (
          <span className="font-bold">{user?.displayName}</span>
        ) : (
          "back"
        )}
      </h2>
    </div>
  );
};

export default UserHome;
