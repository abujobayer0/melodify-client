import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const usePutData = (url) => {
  const mutation = useMutation((data) =>
    axiosInstance.put(url, data).then((response) => response.data)
  );
  return mutation;
};
