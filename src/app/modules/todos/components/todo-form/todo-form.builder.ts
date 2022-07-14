import { FormBuilder, Validators } from "@angular/forms";

export const buildTodoForm = (formBuilder: FormBuilder) =>
  formBuilder.group({
    todo: ['', [Validators.required]],
  });