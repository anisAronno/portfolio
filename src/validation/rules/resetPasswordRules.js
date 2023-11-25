import { email, required } from '@vuelidate/validators'
export const resetPasswordRules = {
  email: { required, email },
  password: { required },
  password_confirmation: { required }
}
