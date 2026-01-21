"use client";

import {
  useLazyGetCaptchaUrlQuery,
  useLoginMutation
} from "@/features/auth/api/authApi";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm, type SubmitHandler} from "react-hook-form";
import {
  loginSchema,
  type LoginInputs
} from "@/features/auth/schemas/loginschema";
import {ResultCode} from "@/components/common/enums";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {selectIsLoggedIn} from "@/app/app-slice";
import {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";

export const Login = () => {

  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.replace("/todolist");
  }, [isLoggedIn, router]);

  const [login, { isLoading }] = useLoginMutation();
  const [getCaptchaUrl, { data: captchaRes }] = useLazyGetCaptchaUrlQuery();

  const captchaUrl = captchaRes?.data?.url;

  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: "", password: "", rememberMe: false},
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.resultCode === ResultCode.Success) {
        form.reset();
        return;
      }

      if (res.resultCode === ResultCode.CaptchaError) {
        getCaptchaUrl()
        form.setError('root', {
          type: 'server',
          message: 'Please solve captcha to continue.'
        })
        return
      }

      form.setError("root", {
        type: "server",
        message: res.messages?.[0] ?? "Something went wrong",
      });
    } catch {
      form.setError("root", {
        type: "network",
        message: "Network error",
      });
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="login"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({field}) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Remember me</FormLabel>
                </FormItem>
              )}
            />

            {form.formState.errors.root?.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            {captchaUrl && (
              <div className="space-y-2">
                <img src={captchaUrl} alt="captcha" className="rounded-md border" />

                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Captcha</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter symbols" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
