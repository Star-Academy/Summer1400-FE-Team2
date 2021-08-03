const user_data=[
    {'name': "Mohadeseh",
    'lastName' : "Beautiful",
    'password' : 1234,
    'userName' : "Mohadeseh",
    'email' : "mohadeseh@gmail.com",
    'gender' : "female"},
    {'name': "Parna",
    'lastName' : "Asadi",
    'password' : 4567,
    'userName' : "Perriex",
    'email' : "parna@gmail.com",
    'gender' : "female"},
];

const reset_pass = document.getElementById("login-email");
const btn_reset  = document.getElementById("rstBtn");
console.log(reset_pass,btn_reset);
const send_mail = (e) => {
    e.preventDefault();
    let result_text = "کاربری با این اطلاعات یافت نشد";
    for ( let i = 0 ; i < user_data.length ; i++){
        if(user_data[i].email === reset_pass.value){
            result_text = "لینک بازیابی به ایمیل شما ارسال شد";
            break;
        }
    }
    alert(result_text);
}

btn_reset.addEventListener("click",send_mail);
