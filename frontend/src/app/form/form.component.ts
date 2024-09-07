import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formData: any;
  form: UntypedFormGroup = this.fb.group({});
  checkValue: any;
  validationMessages: any = {};

  formConfig = {
    "jsonForm": [
      {
        "inputType": "range",
        "label": "How would you rate your overall experience with your landlord?",
        "controlName": "overall_experience",
        "value": "",
        "options": {
          "min": 0,
          "max": 10,
          "value": 5,
          "step": 1
        },
        "validations": {
          "required": true
        }
      },
      // {
      //   "inputType": "text",
      //   "label": "How would you rate your overall experience with your landlord?",
      //   "controlName": "overall_experience",
      //   "placeholder": "Rate 1 - 10",
      //   "value": "",
      //   "validations": {
      //     "required": true,
      //     "maxlength": 15
      //   }
      // },
      {
        "inputType": "text",
        "label": "How responsive is your landlord to maintenance requests or concerns?",
        "controlName": "responsiveness",
        "placeholder": "",
        "value": "",
        "validations": {
          "required": true,
          "email": true
        }
      },
      {
        "inputType": "text",
        "label": "How clear and transparent is your landlord about lease terms and conditions?",
        "controlName": "transparency",
        "placeholder": "",
        "value": "",
        "validations": {
          "required": true,
          "email": true
        }
      },
      {
        "inputType": "textarea",
        "label": "Have you experienced any issues with communication with your landlord? If so, please describe.",
        "controlName": "communication",
        "placeholder": "",
        "value": "",
        "validations": {
          "required": false,
        }
      },
      {
        "inputType": "radio",
        "label": "Do you feel that your landlord respects your privacy and provides adequate notice before entering your unit?",
        "controlName": "privacy",
        "value": "",
        "list": [
          'Yes', 'No'
        ],
        "validations": {
          "required": false,
        }
      },
      {
        "inputType": "textarea",
        "label": "Have you encountered any disputes or issues related to security deposits or rent increases?",
        "controlName": "deposit_dispute",
        "placeholder": "Please write the problem you faced in brief and how would you have liked it",
        "value": "",
        "validations": {
          "required": false,
        }
      },
      {
        "inputType": "select",
        "label": "Select Location",
        "controlName": "location",
        "value": "",
        "list": [
          "Mumbai",
          "Thane",
          "Pune"
        ],
        "validations": {
          "required": true
        }
      },
      {
        "inputType": "checkbox",
        "label": "Subscribe to newsletter",
        "controlName": "isSubscribed",
        "value": false,
        "validations": []
      }
    ]
  }

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    // this.http.get(`../../assets/form.json`).subscribe((res: any) => {
      this.formData = this.formConfig.jsonForm;
      this.generateForm();
    // })
  }

  generateForm() {
    this.formData.forEach((res: any) => {
      const validations = this.setValidations(res.validations)
      this.form.addControl(res.controlName, new UntypedFormControl(res.value))
      this.form.controls[res.controlName].setValidators(validations);
      this.form.controls[res.controlName].updateValueAndValidity();
      // console.log(res.controlName, 'required', this.form.controls[res.controlName].hasValidator(Validators.required));
      // console.log(res.controlName, 'minlength', this.form.controls[res.controlName].hasValidator(Validators.minLength(5)));
      // console.log(res.controlName, 'maxlength', this.form.controls[res.controlName].hasValidator(Validators.maxLength(15)))
    })

    this.intializeValidationMessages()
    console.log(this.formData, 'this.formData')
  }

  setValidations(validations: any) {
    let validationsArray: any = []
    Object.keys(validations).forEach(type => {
      switch (type) {
        case 'required':
          validationsArray.push(Validators.required);
          break;

        case 'minlength':
          validationsArray.push(Validators.minLength(validations[type]));
          break;

        case 'maxlength':
          validationsArray.push(Validators.maxLength(validations[type]));
          break;

          case 'email':
          validationsArray.push(Validators.email);
          break;

        default:
          break;
      }
    })

    return validationsArray;
  }

  intializeValidationMessages() {
    Object.keys(this.form.controls).forEach(field => {
      this.validationMessages[field] = ''
    })

    console.log(this.validationMessages)
  }

  submitForm() {
    this.form.markAllAsTouched()
    console.log(this.form.value)
  }

}
