import { Button, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { auth, googleProvider, db } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let role = "user";
      if (userSnap.exists()) {
        role = userSnap.data().role;
      } else {
        await setDoc(userRef, { email: user.email, role: "user" });
      }

      if (role !== "admin") {
        message.warning("Bạn không có quyền Admin!");
        return;
      }

      message.success("Đăng nhập Google thành công!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Google login error:", error);
      message.error("Đăng nhập Google thất bại!");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white p-10 shadow-2xl rounded-2xl w-full max-w-md bg-opacity-90">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Đăng nhập để tiếp tục sử dụng dịch vụ
        </p>
        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border-gray-300 shadow-md py-3 text-lg font-semibold transition duration-300 hover:bg-gray-100"
        >
          <GoogleOutlined className="mr-2 text-xl" /> Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
