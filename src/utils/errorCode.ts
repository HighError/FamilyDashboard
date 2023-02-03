import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function ShowErrorMessage(err: unknown): void {
  if (typeof err === 'string') {
    toast.error(err);
  } else if (isAxiosError(err)) {
    if (err.response && err.response.data && err.response.data.error_code) {
      toast.error(GetErrorCodeMessage(err.response.data.error_code));
    } else {
      toast.error(GetErrorCodeMessage(''));
    }
  } else if (err instanceof Error) {
    toast.error(GetErrorCodeMessage(err.message));
  }
}

function GetErrorCodeMessage(code: string): string {
  switch (code) {
    case 'ERR_INVALID_LOGIN_OR_PASSWORD':
      return 'Невірний логін або пароль';
    case 'ERR_EMAIL_ALREADY_EXISTS':
      return 'Цей E-mail уже зайнятий';
    case 'ERR_USERNAME_ALREADY_EXISTS':
      return 'Цей логін уже зайнятий';
    case 'ERR_USER_NOT_FOUND':
      return 'Користувача не знайдено';
    case 'ERR_MISSING_PARAMS':
      return "Відсутні обов'язкові параметри";
    case 'ERR_OLD_PASSWORD_INVALID':
      return 'Невірний попередній пароль';
    default:
      return 'Невідома помилка!';
  }
}
