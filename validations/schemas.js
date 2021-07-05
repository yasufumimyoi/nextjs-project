import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("メールアドレスの形式に誤りがあります")
    .required("メールアドレスは必須です"),
  password: yup
    .string()
    .min(8, "8文字以上のパスワードを入力して下さい")
    .required("パスワードは必須です"),
});
