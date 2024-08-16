import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Layout, { FieldType } from "../../components/Form";
import { Variant } from "../../components/Form/Input";
import { loginAccount } from "../../queries/auth";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginMutation = useMutation(
    (formData: LoginFormValues) => login(formData),
    {
      onError: (err: any) => {
        toast.error("Invalid Credentials");
        console.log(err.message);
      },
      onSuccess: (res: any) => {
        if (res.status.code == 200) {
          navigate("/dashboard");
        }
      },
    }
  );
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  const fields = [
    {
      name: "email",
      label: "Email address",
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: "Enter email address",
      error: errors.email?.message,
      control,
    },
    {
      name: "password",
      label: "Password",
      type: FieldType.Input,
      placeholder: "Enter password",
      error: errors.password?.message,
      control,
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen bg-gray-400 flex-col">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
        <div className="text-center text-xl text-white mb-10">
          Welcome to webReinvent
        </div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Login</h2>
        <Layout fields={fields} />
        <div className="text-white flex justify-between mt-8 cursor-pointer">
          <p onClick={() => navigate("/register")}> Register here </p>
          <button
            className="text-blue-400 bg-blue-900 p-2 rounded-lg"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </div>
      </div>

      <div className="text-xs text-white ml-4 bg-gray-500 mt-6">
        <div>Sample login</div>
        <div className="mt-2">
          <div>Email: admin1@gmail.com</div>
          <div>Shubham@1</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
