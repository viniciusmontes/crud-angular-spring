import { Injectable } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlenght')) {
      const requiredLengh: number = field.errors
        ? field.errors['minlegth']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa de ser ${requiredLengh} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLengh: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho maxímo excedido de ${requiredLengh} caracteres.`;
    }
    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(
      fieldName
    ) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArratRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return (
      !formArray.valid && formArray.hasError('required') && formArray.touched
    );
  }
}
