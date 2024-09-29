import { useMutation } from "@tanstack/react-query";
import { TDecodedUser, TPatient, TSignin } from "../types/user";
import {
  getCurrentUser,
  registerPatient,
  signinUser,
} from "../services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserData from "./user.hook";

export const useUserSignin = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { setUser } = useUserData();
  return useMutation({
    mutationKey: ["signinUser"],
    mutationFn: async (payload: TSignin) => await signinUser(payload),
    async onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "User signin successfully!");
        router.push(redirect || "/");
        const user = (await getCurrentUser()) as TDecodedUser;
        setUser(user);
      } else {
        toast.error(data?.message || "Failed to signin user!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to signin user!");
    },
  });
};

export const useUserRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["registerPatient"],
    mutationFn: async (payload: TPatient) => await registerPatient(payload),
    onSuccess(data) {
      if (data?.success) {
        toast.success(data?.message || "User registered successfully!");
        router.push("/signin");
      } else {
        toast.error(data?.message || "Failed to register user!");
      }
    },
    onError(error) {
      toast.error(error?.message || "Failed to register user!");
    },
  });
};