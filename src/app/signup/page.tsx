"use client";

// import { User } from "@/utils/types";
import { createUser } from "@/utils/userHelpers";
import { useActionState } from "react";

// const userObj: User = {
//   username: "",
//   password: "",
//   email: "",
// };

const fields = [
  {
    name: "username",
    type: "text",
    label: "Username",
    required: true,
  },
  {
    name: "password",
    type: "text",
    label: "Password",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
  },
];
export default function SignUp() {
  const [state, submitAction, isPending] = useActionState(createUser, null);

  return (
    <form
      action={submitAction}
      className="flex flex-col align-center p-12 gap-1"
    >
      <h1 className="text-center">UserPilot</h1>
      <p className="text-center text-white my-4">Let&#39;s get started</p>

      {state?.success && (
        <p className="text-center text-green-500 my-4">
          User created successfully!
        </p>
      )}
      <div className="flex items-center align-center gap-4 w-full justify-center py-4">
        <div className="flex flex-col gap-4 p-4 w-1/2">
          {fields.map((field, idx) => (
            <div key={idx} className="w-100 flex flex-col gap-2 p-4 m-1">
              <label htmlFor={field.name} className="text-sm text-white w-100">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                className="w-100 border rounded p-2 bg-white text-black"
              />
              {state?.error?.[field.name] && (
                <p className="text-red-500">{state.error[field.name]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className=" border rounded text-white bg-formbtn p-4 font-bold w-48 mx-auto my-2"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
