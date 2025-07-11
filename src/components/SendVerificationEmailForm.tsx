"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {sendVerificationEmail} from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {cn} from "@/lib/utils";

const emailSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const SendVerificationEmailForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema)
    });

    const onSubmit = async ({email}: EmailFormValues) => {
        await sendVerificationEmail({
            email,
            callbackURL: "/auth/verify",
            fetchOptions: {
                onRequest: () => {},
                onResponse: () => {},
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Verification email successfully sent.");
                    router.push("/auth/verify/success");
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-sm w-full space-y-4">
            <div className="flex flex-col gap-2">
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
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Resend Verification Email"}
            </Button>
        </form>
    );
};

export default SendVerificationEmailForm;