import type { FieldValues, UseFormReturn } from "react-hook-form";

export const handleFormSubmit =
  <T extends FieldValues>(form: UseFormReturn<T>) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    // Trigger form validation and store `isValid` value
    const isValid = await form.trigger();

    // Validates form is valid
    if (!isValid) {
      // Prevent default form submission
      e.preventDefault();

      // Exit early
      return;
    }
    // Execute form submission so the server action can be executed
    e.currentTarget?.requestSubmit();
  };
