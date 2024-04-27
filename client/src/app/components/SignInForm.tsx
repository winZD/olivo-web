"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string({}).email("Please enter a valid email address!"),
  password: z
    .string()
    .min(8, { message: "Password is too short!" })
    .max(20, { message: "Password is too long!" }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    console.log(result?.error);
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("You are logged in!");
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-96"
    >
      <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
        Sign In Form
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Input
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
          startContent={<UserIcon className="w-4" />}
        />
        <Input
          label="Password"
          {...register("password")}
          type={visiblePassword ? "text" : "password"}
          errorMessage={errors.password?.message}
          startContent={<KeyIcon className="w-4" />}
          endContent={
            <button
              type="button"
              onClick={() => setVisiblePassword((prev) => !prev)}
            >
              {visiblePassword ? (
                <EyeSlashIcon className="w-4 cursor-pointer" />
              ) : (
                <EyeIcon className="w-4 cursor-pointer" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-center gap-2">
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign Up
          </Button>
        </div>
      </div>
      {/* <NextAuthProviders /> */}
    </form>
  );
};

export default SignInForm;
