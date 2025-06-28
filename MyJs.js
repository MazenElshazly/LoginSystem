var signupName = document.getElementById('Name')
var signupEmail = document.getElementById('Email')
var signupPassword = document.getElementById('PasswordUp')
var signInEmail = document.getElementById('signIn')
var signInPassword = document.getElementById('password')

var Users = []
if (localStorage.getItem('users') == null) {
    Users = []
} else {
    Users = JSON.parse(localStorage.getItem('users'))
}



var activeUser = JSON.parse(localStorage.getItem('activeUser'));

if (activeUser !==null) {
        document.getElementById('NameOfUser').innerHTML = 'Welcome ' + activeUser.name;
}


function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return true
    } else {
        return false
    }
}




function isLoginEmpty() {

    if (signInEmail.value == "" || signInPassword.value == "") {
        return true
    } else {
        return false
    }
}


function isEmailExist() {
    for (var i = 0; i < Users.length; i++) {
        if (Users[i].email == signupEmail.value) {
            return true
        }
    }
}





function signUp(){


    if(isEmpty()){
        document.getElementById('Success').innerHTML = ''
       var div = document.getElementById('error')
        div.innerHTML = "Please enter all Fields"

    }else{
        var div = document.getElementById('error')
        div.innerHTML = ""
        var NewUser =
        {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }

        if(isEmailExist()){
            var div = document.getElementById('error')
            div.innerHTML = "Email already exists"
        }else{
            Users.push(NewUser)
            localStorage.setItem('users', JSON.stringify(Users))
            document.getElementById('Success').innerHTML = 'Success!'
             signupName.value = ''
             signupEmail.value = ''
             signupPassword.value = ''
        }
    }

}


function login(){
    if(isLoginEmpty()) {
        document.getElementById('Success').innerHTML = ''
        var div = document.getElementById('error')
        div.innerHTML = "Please enter all Fields"

    }else{
        for (var i = 0; i < Users.length ; i++) {

            if (signInPassword.value == Users[i].password ) {
                if (signInEmail.value == Users[i].email){
                    activeUser= Users[i];
                    localStorage.setItem('activeUser', JSON.stringify(activeUser));
                    document.getElementById('error').innerHTML = ''
                    window.location.href = 'home.html';
                    return;
                }
                document.getElementById('error').innerHTML = 'Incorrect Email'
                return ;
            }else{
                document.getElementById('error').innerHTML = 'Incorrect Password'
            }
        }

    }

    signInEmail.value = ''
    signInPassword.value = ''
}

function logout() {
    activeUser = null
    window.location.href = 'index.html';
}