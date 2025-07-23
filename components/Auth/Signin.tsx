"use client";
import { MotionSection } from "@/app/libs/framer-utls";
import { integrations, messages } from "@/integration.config";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8)
    .refine(
      (val) =>
        /[A-Z]/.test(val) && // At least one uppercase letter
        /[a-z]/.test(val) && // At least one lowercase letter
        /\d/.test(val) && // At least one number
        /[@$!%*?&]/.test(val), // At least one special character
      {
        message:
          "Password must be at least 8 characters long and contain uppercase and lowercase letters, a number, and a special character.",
      },
    ),
});

const Signin = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [email, SetEmail] = useState("");

  const validateForm = (isEmail: boolean) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      if (isEmail) {
        toast.error(result.error.errors[0].message);
        return false;
      } else {
        result.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return false;
      }
    }
    return true;
  };

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(false)) return;

    if (integrations?.isAuthEnabled) {
      signIn("credentials", { ...data, redirect: false }).then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
          setData({ email: "", password: "", remember: false });
          SetEmail("");
        }
      });
    } else {
      toast.error(messages.auth);
    }
  };

  const signinWithMail = () => {
    if (!integrations.isAuthEnabled) {
      toast.error(messages.auth);
      return;
    }

    if (!validateForm(true)) return;

    signIn("email", {
      redirect: false,
      email: email,
    })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Email sent");
          setData({ ...data, email: "" });
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="z-1 max-w-c-1016 px-7.5 pb-7.5 lg:px-15 lg:pt-15 relative mx-auto pt-10 xl:px-20 xl:pt-20">
          <div className="-z-1 bg-linear-to-t dark:bg-linear-to-t absolute left-0 top-0 h-2/3 w-full rounded-lg from-transparent to-[#dee7ff47] dark:to-[#252A42]"></div>
          <div className="bottom-17.5 -z-1 absolute left-0 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <MotionSection
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top px-7.5 pt-7.5 shadow-solid-8 dark:border-strokedark xl:px-15 xl:pt-15 rounded-lg bg-white dark:border dark:bg-black"
          >
            <h2 className="mb-15 xl:text-sectiontitle2 text-center text-3xl font-semibold text-black dark:text-white">
              Login to Your Account
            </h2>

            <div className="mb-12.5 border-stroke dark:border-strokedark mx-auto flex w-3/6 flex-col items-center justify-center gap-1 rounded-lg border p-1 md:flex-row">
              <button
                className={`outline-hidden hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary w-full rounded-lg px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] 
                dark:hover:shadow-none ${
                  !isPassword &&
                  "bg-primary/5 text-primary dark:border-primary dark:bg-primary/5 border"
                }`}
                onClick={() => setIsPassword(false)}
              >
                Magic Link
              </button>
              <button
                className={`outline-hidden hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary w-full rounded-lg px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none ${
                  isPassword &&
                  "bg-primary/5 text-primary dark:border-primary dark:bg-primary/5 border"
                }`}
                onClick={() => setIsPassword(true)}
              >
                Password
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col items-center md:flex-row md:gap-8">
                <button
                  aria-label="sign with google"
                  onClick={() => signIn("google")}
                  className="text-body-color dark:text-body-color-dark dark:shadow-two border-stroke outline-hidden hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary mb-3 flex w-full items-center justify-center rounded-lg border px-6 py-3 text-base transition-all duration-300 md:mb-6 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none"
                >
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Signup with Google
                </button>

                <button
                  aria-label="signup with github"
                  onClick={() => signIn("github")}
                  className="text-body-color dark:text-body-color-dark dark:shadow-two border-stroke outline-hidden hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary mb-6 flex w-full items-center justify-center rounded-lg border px-6 py-3 text-base transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:hover:shadow-none"
                >
                  <span className="mr-3">
                    <svg
                      fill="currentColor"
                      width="22"
                      height="22"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32 1.7998C15 1.7998 1 15.5998 1 32.7998C1 46.3998 9.9 57.9998 22.3 62.1998C23.9 62.4998 24.4 61.4998 24.4 60.7998C24.4 60.0998 24.4 58.0998 24.3 55.3998C15.7 57.3998 13.9 51.1998 13.9 51.1998C12.5 47.6998 10.4 46.6998 10.4 46.6998C7.6 44.6998 10.5 44.6998 10.5 44.6998C13.6 44.7998 15.3 47.8998 15.3 47.8998C18 52.6998 22.6 51.2998 24.3 50.3998C24.6 48.3998 25.4 46.9998 26.3 46.1998C19.5 45.4998 12.2 42.7998 12.2 30.9998C12.2 27.5998 13.5 24.8998 15.4 22.7998C15.1 22.0998 14 18.8998 15.7 14.5998C15.7 14.5998 18.4 13.7998 24.3 17.7998C26.8 17.0998 29.4 16.6998 32.1 16.6998C34.8 16.6998 37.5 16.9998 39.9 17.7998C45.8 13.8998 48.4 14.5998 48.4 14.5998C50.1 18.7998 49.1 22.0998 48.7 22.7998C50.7 24.8998 51.9 27.6998 51.9 30.9998C51.9 42.7998 44.6 45.4998 37.8 46.1998C38.9 47.1998 39.9 49.1998 39.9 51.9998C39.9 56.1998 39.8 59.4998 39.8 60.4998C39.8 61.2998 40.4 62.1998 41.9 61.8998C54.1 57.7998 63 46.2998 63 32.5998C62.9 15.5998 49 1.7998 32 1.7998Z" />
                    </svg>
                  </span>
                  Signup with Github
                </button>
              </div>
            </div>
            <div className="mb-10 flex items-center justify-center">
              <span className="dark:bg-stroke-dark bg-stroke dark:bg-strokedark hidden h-[1px] w-full max-w-[200px] sm:block"></span>
              <p className="text-body-color dark:text-body-color-dark w-full px-5 text-center text-base">
                OR
              </p>
              <span className="dark:bg-stroke-dark bg-stroke dark:bg-strokedark hidden h-[1px] w-full max-w-[200px] sm:block"></span>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className={`${!isPassword ? "" : "hidden"}`}
            >
              <div>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  className="border-stroke bg-white! focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:bg-black! dark:focus:border-manatee w-full border-b pb-3.5 focus:placeholder:text-black dark:focus:placeholder:text-white"
                  onChange={(e) => SetEmail(e.target.value)}
                />

                <div>
                  <button
                    aria-label="login with email and password"
                    className="hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho mx-auto mt-6 flex items-center justify-center rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out"
                    onClick={signinWithMail}
                  >
                    Send Magic Link
                    <svg
                      className="ml-2.5 fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-12.5 border-stroke dark:border-strokedark border-t py-5 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link
                    className="hover:text-primary dark:hover:text-primary text-black dark:text-white"
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            <form
              onSubmit={loginUser}
              className={`${isPassword ? "" : "hidden"}`}
            >
              <div className="mb-7.5 gap-7.5 lg:mb-12.5 flex flex-col lg:flex-row lg:justify-between lg:gap-14">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="border-stroke bg-white! focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:bg-black! dark:focus:border-manatee w-full border-b pb-3.5 focus:placeholder:text-black lg:w-1/2 dark:focus:placeholder:text-white"
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  required
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="border-stroke bg-white! focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:bg-black! dark:focus:border-manatee w-full border-b pb-3.5 focus:placeholder:text-black lg:w-1/2 dark:focus:placeholder:text-white"
                />
              </div>

              <div className="xl:gap-15 flex flex-wrap items-center justify-between gap-10">
                <div className="flex flex-wrap gap-4 md:gap-10">
                  <label
                    htmlFor="default-checkbox"
                    className="flex max-w-[425px] cursor-pointer select-none gap-2.5"
                  >
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                      onChange={(e) =>
                        setData({ ...data, remember: e.target.checked })
                      }
                    />
                    <span className="group flex h-[1lh] items-center">
                      <span
                        className={`flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 ${
                          data?.remember && "!bg-primary"
                        }`}
                      >
                        <svg
                          className="group-peer-checked:opacity-100 opacity-0"
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </span>

                    <span>Keep me signed in</span>
                  </label>

                  <Link
                    href="/auth/forget-password"
                    aria-label="forgot password"
                    className="hover:text-primary"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  aria-label="login with email and password"
                  className="hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out"
                >
                  Log in
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-12.5 border-stroke dark:border-strokedark border-t py-5 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link
                    className="hover:text-primary dark:hover:text-primary text-black dark:text-white"
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </MotionSection>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
