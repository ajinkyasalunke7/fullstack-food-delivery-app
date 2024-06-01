import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "axios";

const FormInput = ({ register, name, type, placeholder, rules, errors }) => (
  <div className="login-popup-input">
    <input {...register(name, rules)} type={type} placeholder={placeholder} />
    {errors[name] && <p className="error-message">{errors[name].message}</p>}
  </div>
);

const CheckboxWithLabel = ({ register, name, label, rules, errors }) => (
  <div className="login-popup-condition">
    <input type="checkbox" {...register(name, rules)} required />
    <p>{label}</p>
    {errors[name] && <p className="error-message">{errors[name].message}</p>}
  </div>
);

export default function LoginPopup({ setShowLogin }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleButtonClick = () => {
    console.log("CHecked");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Login data:", data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Sign-up data:", data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsLogin(true);
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleSignUp(data);
    }
  };

  const toggleState = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-popup-title">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="Close"
          />
        </div>
        {!isLogin && (
          <FormInput
            register={register}
            name="name"
            type="text"
            placeholder="Full Name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long",
              },
              maxLength: {
                value: 25,
                message: "Name cannot exceed 25 characters",
              },
            }}
            errors={errors}
          />
        )}
        <FormInput
          register={register}
          name="email"
          type="email"
          placeholder="Your email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format",
            },
          }}
          errors={errors}
        />
        <FormInput
          register={register}
          name="password"
          type="password"
          placeholder="Password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password cannot exceed 20 characters",
            },
          }}
          errors={errors}
        />
        {isLogin ? (
          <CheckboxWithLabel
            register={register}
            name="remember"
            label="Remember me"
            rules={{ required: false }}
            errors={errors}
            required
          />
        ) : (
          <CheckboxWithLabel
            register={register}
            name="terms"
            label="By continuing, I agree to the terms of use & privacy policy"
            rules={{ required: "You must agree to the terms and conditions" }}
            errors={errors}
            required
          />
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Create account"
          )}
        </button>
        <p>
          {isLogin ? "Create a new account? " : "Already have an account? "}
          <span onClick={toggleState}>
            {isLogin ? "Click here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
}
