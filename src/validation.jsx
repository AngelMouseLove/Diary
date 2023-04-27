export const urlValidation = {
  required: "Проверьте правильность URL",
  validate: (value) => {
    if (value.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      return true;
    }
    return "Проверьте правильность URL";
  },
};

export const commenTextValidation = {
  required: "Введите не менее 6 символов",
  validate: (value) => {
    if (value.match(/[0-9a-zA-Zа-яА-Я\s]{6,}/)) {
      return true;
    }
    return "Введите не менее 6 символов";
  },
};

export const emailValidation = {
  required: "Введите правильный e-mail адрес",
  validate: (value) => {
    if (
      value.match(
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
      )
    ) {
      return true;
    }
    return "Введите правильный e-mail адрес";
  },
};

export const passwordValidation = {
  required:
    "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру",
  validate: (value) => {
    if (value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      return true;
    }
    return "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру";
  },
};
