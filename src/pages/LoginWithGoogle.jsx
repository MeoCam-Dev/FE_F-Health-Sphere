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
    <div className="relative h-screen">
      {/* Background Image - full màn hình */}
      <div
        className="absolute inset-0 bg-center bg-contain"
        style={{ backgroundImage: `url(${background})` }}></div>

      {/* Form Login - Chiếm 50% width, nằm trên background */}
      <div className="relative w-1/2 h-screen flex justify-center items-center bg-white bg-opacity-90 p-10 shadow-2xl border border-gray-300 rounded-r-3xl">
        <div className="w-full max-w-sm">
          <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Đăng nhập để tiếp tục sử dụng dịch vụ
          </p>

          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 text-lg font-semibold transition duration-300 hover:bg-blue-600 rounded-full">
            <GoogleOutlined className="mr-2 text-xl" /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
