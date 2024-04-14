import toast from "react-hot-toast";

export function checkPassword(data: {secondPassword: string, password: string}): boolean {
    let flag = true;
    if(data.password === "" || data.secondPassword === ""){
        toast('Введите пароль')
        flag = false
    } else {
        if(data.password !== data.secondPassword){
            toast('Пароли не совпадают')
            flag = false
        }
    
        if(data.password.length < 6 || data.secondPassword.length < 6) {
            toast('Длина пароля должна быть больше 6 символов')
            flag = false
        }
    }

    return flag
}