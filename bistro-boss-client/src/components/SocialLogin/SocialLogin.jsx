import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="flex justify-center my-4">
      <div>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle className="mx-4"></FaGoogle>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
