import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { useState } from "react";
import MyButton from "../components/buttons/Button.jsx";
const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useUser();
  const [log, setLog] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!log && (!name || !name.trim())) {
      newErrors.name = "Name is required and cannot be empty";
    }
    if (!email || !email.trim()) {
      newErrors.email = "Email is required and cannot be empty";
    }
    if (!pass || !pass.trim()) {
      newErrors.pass = "Password is required and cannot be empty";
    }
    if (!log) {
      if (!rePass || !rePass.trim()) {
        newErrors.rePass =
          "Reconfirming password is required and cannot be empty";
      } else if (pass.trim() !== rePass.trim()) {
        newErrors.rePass = "Password and confirmed password should be the same";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValid = email?.trim() && pass?.trim() && (log ||(name?.trim()&&rePass?.trim()));

  return (
    <div className="bg-orange-100 flex justify-center min-h-screen flex-col pt-5">
      <div>
        <div className="flex flexrow justify-between">
          <h1 className="text-4xl font-bold mt-4 ml-4">
            {log ? "Login " : "Sign Up "} Page
          </h1>
        </div>
        {errors.Log && (
          <p className="text-red-600 font-semibold ml-12 text-sm">
            {errors.Log}
          </p>
        )}
        <div className="flex flex-col h-full justify-center m-auto">
          {!log && (
            <>
              <h2 className="text-2xl font-bold mt-2 ml-8">
                name <span className="text-red-500">*</span>
              </h2>
              <input
                className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${
                  errors.name ? "border-red-500 bg-red-50" : ""
                }`}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                value={name}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-600 font-semibold ml-12 text-sm">
                  {errors.name}
                </p>
              )}
            </>
          )}

          <h2 className="text-2xl font-bold mt-2 ml-8">
            Email <span className="text-red-500">*</span>
          </h2>
          <input
            className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${
              errors.email ? "border-red-500 bg-red-50" : ""
            }`}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            value={email}
            placeholder="Enter your Email"
          />
          {errors.email && (
            <p className="text-red-600 font-semibold ml-12 text-sm">
              {errors.email}
            </p>
          )}

          <h2 className="text-2xl font-bold mt-2 ml-8">
            Password <span className="text-red-500">*</span>
          </h2>
          <input
            className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${
              errors.pass ? "border-red-500 bg-red-50" : ""
            }`}
            onChange={(e) => {
              setPass(e.target.value);
              if (errors.pass) setErrors((prev) => ({ ...prev, pass: "" }));
            }}
            value={pass}
            placeholder="Enter Your Password"
            type="password"
          />
          {errors.pass && (
            <p className="text-red-600 font-semibold ml-12 text-sm">
              {errors.pass}
            </p>
          )}

          {!log && (
            <>
              <h2 className="text-2xl font-bold mt-2 ml-8">
                Password Confirmation <span className="text-red-500">*</span>
              </h2>
              <input
                className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${
                  errors.rePass ? "border-red-500 bg-red-50" : ""
                }`}
                onChange={(e) => {
                  setRePass(e.target.value);
                  if (errors.rePass)
                    setErrors((prev) => ({ ...prev, rePass: "" }));
                }}
                value={rePass}
                placeholder="Confirm Your Password"
                type="password"
              />
              {errors.rePass && (
                <p className="text-red-600 font-semibold ml-12 text-sm">
                  {errors.rePass}
                </p>
              )}
            </>
          )}
        </div>
        <div>
          <MyButton
            size="large"
            buttonStyle="navbar"
            disabled={!isValid}
            onClick={() => {
              if (!validate()) return;
              if (log) {
                const r = login(email, pass);
                if (r) {
                  const newErr = {};
                  newErr.Log = r;
                  setErrors(newErr);
                  return;
                } else {
                  navigate(`/Profile`);
                }
              } else {
                const r = signup(name, email, pass);
                if (r) {
                  const newErr = {};
                  newErr.Log = r;
                  setErrors(newErr);
                  return;
                } else {
                  navigate(`/Profile`);
                }
              }
              setLog(true);
              setName("");
              setPass("");
              setRePass("");
              setEmail("");
            }}
          >
            {log ? "Login" : "Sign Up"}
          </MyButton>
          <div className="mb-10">
            <MyButton
              size="small"
              buttonStyle="cancel"
              onClick={() => setLog(!log)}
            >
              {log
                ? "Don't have account? sign up"
                : "Already have an account? Login"}
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
