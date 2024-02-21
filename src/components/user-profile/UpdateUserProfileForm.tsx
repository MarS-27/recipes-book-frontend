"use client";
import { type FC } from "react";
import { FormInput } from "../ui/FormInput";
import {
  type FieldError,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";
import { type TUpdatedUserProfile } from "@/types/auth";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";
import { UpdateUserImage } from "./UpdateUserImage";

type TUpdateUserProfileFormProps = {
  updateUserProfile: SubmitHandler<TUpdatedUserProfile>;
};

export const UpdateUserProfileForm: FC<TUpdateUserProfileFormProps> = ({
  updateUserProfile,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<TUpdatedUserProfile>();

  return (
    <form
      className="flex flex-col w-full gap-3"
      onSubmit={handleSubmit(updateUserProfile)}
    >
      <UpdateUserImage />
      <FormInput
        type="email"
        placeholder="User email"
        register={register("email", {
          required: "Email is required!",
        })}
        error={errors.email as FieldError}
      />
      <FormInput
        type="text"
        placeholder="User name"
        register={register("userName")}
      />
      <div className="flex justify-center gap-3">
        <Button disabled={isSubmitting} type="submit" variant="contained">
          {isSubmitting ? (
            <Loader classNameModificator="border-t-white" />
          ) : (
            "Submit"
          )}
        </Button>
        <Button variant="outlined" onClick={() => console.log("cancel")}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
