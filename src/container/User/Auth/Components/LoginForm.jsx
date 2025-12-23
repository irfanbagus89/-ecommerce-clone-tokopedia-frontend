import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useLoginUser } from "@/services/User/Auth/login";
import { toast } from "@/lib/toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Nomor HP atau email wajib diisi")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{9,15}$/.test(value),
      {
        message: "Masukkan email atau nomor HP yang valid",
      }
    ),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

const LoginPage = () => {
  const router = useRouter();
  const [hide, setHide] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { refetch } = useAuthContext();

  const { trigger: loginUser, isMutating, error } = useLoginUser();

  const onSubmit = async (formData) => {
    const payload = {
      email: formData.emailOrPhone,
      password: formData.password,
    };

    try {
      const res = await loginUser(payload);

      if (res?.Message?.statusCode === 200) {
        toast.success("Login berhasil");
        await refetch();
        setTimeout(() => {
          router.replace("/home");
        }, 2000);
      } else {
        toast.error("Email / password salah");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(
        "Login gagal. email atau password anda salah"
      );
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/oauth/background/login-bg.png~tplv-zr7vqa5nfb-image.image')",
      }}
    >
      <Card className="w-[420px] shadow-lg">
        <CardContent className="space-y-4 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Masuk ke Tokopedia</h1>
            <Link
              href="/register"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Daftar
            </Link>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Nomor HP atau Email"
              className={`h-12 ${errors.emailOrPhone ? "border-red-500" : ""}`}
              error={errors.emailOrPhone?.message}
              {...register("emailOrPhone")}
            />

            <Input
              type={hide === true ? "password" : "text"}
              placeholder="Password"
              className={`h-12 ${errors.password ? "border-red-500" : ""}`}
              error={errors.password?.message}
              {...register("password")}
              rightIcon={
                <div className="" onClick={() => setHide(!hide)}>
                  {hide === false ? <Eye /> : <EyeOff />}
                </div>
              }
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-emerald-600 hover:underline"
              >
                Lupa password?
              </button>
            </div>
            <Button
              type="submit"
              disabled={!isValid || isMutating}
              className={`w-full ${
                isValid
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {isMutating ? "Masuk..." : "Masuk"}
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              atau masuk dengan
            </span>
            <Separator className="flex-1" />
          </div>

          {/* SOCIAL */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Scan Kode QR
            </Button>

            <Button variant="outline" className="w-full">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="mr-2 h-4 w-4"
              />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="absolute bottom-6 text-xs text-muted-foreground">
        © 2009–2025, PT Tokopedia ·{" "}
        <span className="cursor-pointer text-emerald-600">Bantuan</span>
      </footer>
    </div>
  );
};

export default LoginPage;
