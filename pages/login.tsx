import type { NextPage } from "next";

import { useForm, SubmitHandler } from "react-hook-form";
import { getCsrfToken, signIn } from "next-auth/react";
import Button from "../components/Button";

type FormData = {
  email: string;
  passWord: string;
  csrfToken: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  const handlesubmit = async () => {
    const values = getValues();

    const res = await signIn("credentials", {
      callbackUrl: "/dashboard",
      email: values.email,
      passWord: values.passWord,
    });
  };
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="/images/funnyDog.png"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label>Email</label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  {...register("email")}
                />
              </div>
              <div className="mb-6">
                <label>Password</label>
                <input
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  {...register("passWord")}
                />
              </div>
              <div className="text-center lg:text-left">
                <button onClick={handlesubmit}>Connect</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

export default LoginPage;
