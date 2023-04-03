export const titleValidation = {
  required: "Введите дату в формате ДД.ММ.ГГГГ",
  validate: (value) => {
    if (value.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      return true
    }
    return "Введите дату в формате ДД.ММ.ГГГГ"
  }
}

export const urlValidation = {
  required: "Проверьте правильность URL",
  validate: (value) => {
    if (value.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      return true
    }
    return "Проверьте правильность URL"
  }
}

export const commenTextValidation = {
  required: "Введите не менее 6 символов",
  validate: (value) => {
    if (value.match(/[0-9a-zA-Zа-яА-Я\s]{6,}/)) {
      return true
    }
    return "Введите не менее 6 символов"
  }
}

export const emailValidation = {
  required: "Введите правильный e-mail адрес",
  validate: (value) => {
    if (value.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu)) {
      return true
    }
    return "Введите правильный e-mail адрес"
  }
}
