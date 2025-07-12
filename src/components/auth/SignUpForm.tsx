"use client";

import { signUp } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {useRouter} from "next/navigation";
import SignInOAuthButton from "@/components/auth/SignInOAuthButton";
import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";

const signUpSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState : {errors, isSubmitting},
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async ({ email, password }: SignUpSchema) => {
        const name = email.split("@")[0];

        await signUp.email(
            {
                name,
                email,
                password,
            },
            {
                onRequest: () => {},
                onResponse: () => {},
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Sign up complete. Please verify your email.");
                    router.push("/auth/signup/success");
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-4 w-full justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-3 px-4 w-full">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className={cn({ "border-red-500 focus-visible:ring-red-500": errors.email })}
                        type="email"
                        id="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className={cn({ "border-red-500 focus-visible:ring-red-500": errors.password })}
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
            </form>

            <hr className="max-w-sm w-full" />

            <div className="max-w-sm space-y-3 px-4 w-full flex flex-col">
                <SignInOAuthButton provider={"google"} signUp />
                <SignInOAuthButton provider={"github"} signUp />
            </div>
        </div>
    );
};

export default SignUpForm;