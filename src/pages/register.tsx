import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { useFormik } from "formik";
import { faUser, faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import { getSession, GetSessionParams, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Router from "next/router";

import AuthFormItem from "@/components/auth/AuthFormItem";
import ShowErrorMessage from "@/utils/errorCode";

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

interface FormValue {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

const Register: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function validate(values: FormValue) {
    const error: Partial<FormValue> = {};
    if (
      values.password !== values.cpassword &&
      values.password.length > 0 &&
      values.cpassword.length > 0
    ) {
      error.cpassword = "Паролі не збігаються";
    }

    if (values.password.length < 8 && values.password.length > 0) {
      error.password = "Пароль повинен складатись мінімум з 8 символів";
    }

    if (values.username.length < 3 && values.username.length > 0) {
      error.username = "Логін повинен складатись мінімум з 3 символів";
    } else if (values.username.length > 20) {
      error.username = "Логін повинен складатись максимум з 20 символів";
    }

    return error;
  }

  const form = useFormik<FormValue>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);

      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      try {
        await axios.post("/api/register", data);

        const res = await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });

        if (!res) {
          throw new Error();
        }

        if (res.status === 401) {
          throw new Error("ERR_INVALID_LOGIN_OR_PASSWORD");
        }
        toast.success("Ви успішно ввійшли");
        Router.push("/");
      } catch (err) {
        ShowErrorMessage(err);
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen px-2 py-3">
      <h1 className="text-3xl tablet:text-4xl font-bold mb-16">
        Family Dashboard
      </h1>
      <div className="text-2xl tabler:text-3xl font-semibold mb-2">
        Реєстрація
      </div>
      <form
        onSubmit={form.handleSubmit}
        className="flex flex-col w-full max-w-sm"
      >
        <AuthFormItem
          id="username"
          placeholder="Логін"
          icon={faUser}
          type="text"
          value={form.values.username}
          onChange={form.handleChange}
          error={form.errors.username}
          required
        />
        <AuthFormItem
          id="email"
          placeholder="E-mail"
          icon={faAt}
          type="email"
          value={form.values.email}
          onChange={form.handleChange}
          error={form.errors.email}
          required
        />
        <AuthFormItem
          id="password"
          placeholder="Пароль"
          icon={faLock}
          type="password"
          value={form.values.password}
          error={form.errors.password}
          onChange={form.handleChange}
          required
        />
        <AuthFormItem
          id="cpassword"
          placeholder="Пароль"
          icon={faLock}
          type="password"
          onChange={form.handleChange}
          value={form.values.cpassword}
          error={form.errors.cpassword}
          required
        />
        <button
          disabled={isLoading}
          type="submit"
          className="flex w-full items-center justify-center bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2.5 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-lg duration-300 mt-2 mb-4"
        >
          <svg
            aria-hidden="true"
            role="status"
            className={`${
              isLoading ? "inline" : "hidden"
            } w-4 h-4 mr-3 animate-spin`}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#5a4a78"
            />
          </svg>
          {isLoading ? "Реєстрація..." : "Зареєструватись"}
        </button>
      </form>
    </div>
  );
};

export default Register;
