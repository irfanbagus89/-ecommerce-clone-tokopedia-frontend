import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useRegisterUser } from "@/services/User/Auth/register";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

const signupSchema = z.object({
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
  name: z.string().min(1, "Nama wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const { trigger: registerUser, isMutating, error, data } = useRegisterUser();
  const router = useRouter();
  const onSubmit = async (formData) => {
    const payload = {
      email: formData.emailOrPhone,
      name: formData.name,
      password: formData.password,
    };

    try {
      const res = await registerUser(payload);
      if (res.Message.statusCode === 201) {
        toast.success("Pendaftaran Berhasil");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white">
        {/* LEFT */}
        <div className="flex w-1/2 flex-col items-center justify-center bg-green-50 p-10 text-center">
          <Image
            src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/user/register_icon_new.png~tplv-zr7vqa5nfb-image.image"
            alt="Tokopedia Register"
            width={240}
            height={240}
            priority
            className="mb-6"
          />

          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Jual Beli Mudah Hanya di Tokopedia
          </h2>
          <p className="text-sm text-gray-600">
            Gabung dan rasakan kemudahan bertransaksi di Tokopedia.
          </p>
        </div>

        <div className="flex w-1/2 flex-col justify-center p-10">
          <h1 className="mb-1 text-2xl font-bold">Daftar Sekarang</h1>
          <p className="mb-6 text-sm text-gray-600">
            Sudah punya akun Tokopedia?{" "}
            <Link
              href="/login"
              className="font-medium text-green-500 hover:text-green-600"
            >
              Masuk
            </Link>
          </p>  

          <Button
            variant="outline"
            className="mb-4 w-full border-gray-300 hover:bg-gray-50"
          >
            Google
          </Button>

          <div className="my-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-gray-500">atau</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Email atau Nomor HP"
              className={`h-12 ${errors.emailOrPhone ? "border-red-500" : ""}`}
              error={errors.emailOrPhone?.message}
              {...register("emailOrPhone")}
            />

            <Input
              placeholder="Nama Lengkap"
              className={`h-12 ${errors.name ? "border-red-500" : ""}`}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              type="password"
              placeholder="Password"
              className={`h-12 ${errors.password ? "border-red-500" : ""}`}
              error={errors.password?.message}
              {...register("password")}
            />

            {error && (
              <p className="text-sm text-red-500">
                Gagal mendaftar. Silakan coba lagi.
              </p>
            )}

            <Button
              type="submit"
              disabled={!isValid || isMutating}
              className={`w-full ${
                isValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {isMutating ? "Mendaftarkan..." : "Daftar"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Dengan mendaftar, saya menyetujui <br />
            <Link href="#" className="font-medium text-green-500">
              Syarat & Ketentuan
            </Link>{" "}
            serta{" "}
            <Link href="#" className="font-medium text-green-500">
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
