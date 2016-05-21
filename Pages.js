var pages = ['login', 'register', 'passwordChange','loggedIn'];
var currentPageIndex = 0;

var userName = "";
var userPassword = "";

var decision= false;
var message = "";

var regUsername = "";
var regPassword = "";
var regPasswordVerify = "";

var pwdChgUser = "";
var currentPassword = "";
var pwdChgPassword = "";
var pwdChgPasswordVerify = "";

// This block handles Page Views

var showLoginPage = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 0;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showRegistration = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 1;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showPWDChange = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 2;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showLogIn = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 3;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    display_Success_Login();
};

// Deals with Login Variables
var setLoginUsername = function(){
  userName = document.getElementById("username").value;
};

var setLoginPassword = function(){
  userPassword = document.getElementById("password").value;
};

// Deals with Registration Variables
var setNewUsername = function(){
  regUsername = document.getElementById("regUsername").value;
  // console.log(regUsername);
};

var setNewPassword = function(){
  regPassword = document.getElementById("new_pwd").value;
};

var setNewPasswordVerify = function(){
  regPasswordVerify = document.getElementById("new_pwd_verify").value;
};

// Deals with Password Change Variables
var setPwdChgUser = function(){
  pwdChgUser = document.getElementById("pwdUsername").value;
};

var setPwdChgCurPwd = function(){
  currentPassword = document.getElementById("user_curr_pwd").value;
};

var setPasswordChg = function(){
  pwdChgPassword = document.getElementById("pwd_reset").value;
};

var setPasswordChgVerify = function(){
  pwdChgPasswordVerify = document.getElementById("pwd_reset_verify").value;
};

// This deals with the functions addressed by a button click event
var registrationInitialization = function(){
  if (regPassword == regPasswordVerify){
      register();
      if(decision){
        resetRegInput();
        showLoginPage();
      } else {
        resetRegInput();
        showRegistration();
      }
  } else {
    alert("The password fields do not match");
    resetRegInput();
    showRegistration();
  }
};

var passwordChange = function(){
  if(pwdChgPassword == pwdChgPasswordVerify){
    changePwd();
    if(decision){
      clearPwdChgInput();
      showLoginPage();
    } else{
      resetPwdChgInput();
      showPWDChange();
    }
  } else {
    alert("The new password fields do not match");
    resetPwdChgInput();
    showPWDChange();
  } 
};

var loginAttempt = function(){
 loginData();
 if(decision){
   clearLoginCred();
   showLogIn();
 } else {
   clearLoginCred();
   showLoginPage();
 }
};

// var logout = function(){
  
// };


// Used to reset the input boxes
var resetRegInput = function(){
  document.getElementById("regUsername").value = "";
  document.getElementById("new_pwd").value = "";
  document.getElementById("new_pwd_verify").value = "";
};

var clearPwdChgInput = function(){
  document.getElementById("pwdUsername").value = "";
  document.getElementById("user_curr_pwd").value = "";
  document.getElementById("pwd_reset").value = "";
  document.getElementById("pwd_reset_verify").value = "";
};

// var clearRegInput = function() {
  
// };

var resetPwdChgInput = function(){
  document.getElementById("pwd_reset").value = "";
  document.getElementById("pwd_reset_verify").value = "";
};

var clearLoginCred = function(){
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};

// This deals with formatting the necessary information into a JSON object 
var logincred = function(){
  var logData = JSON.stringify({username:userName, password:userPassword});
  return logData;
};

var pwdResetData = function(){
   var pwdData = JSON.stringify({username:pwdChgUser, current:currentPassword, new_password:pwdChgPassword});
  return pwdData; 
};

var regData = function(){
  var registerInfo = JSON.stringify({username:regUsername, password:regPassword});
  return registerInfo;
};

var decipherResponse = function (chuckJSON){
  var data =JSON.parse(chuckJSON);
  decision = data.result;
  message = data.message;
};

var parseRegInfo = function(chuckJSON){
  decipherResponse(chuckJSON);
  alert(message);
  if(decision)
    showLoginPage();
  else{
    resetRegInput();
    showRegistration();
  }
};

var parsePwdChangeInfo = function(chuckJSON){
  decipherResponse(chuckJSON);
  alert(message);
  if(decision)
    showLoginPage();
  else{
    resetPwdChgInput();
    showPWDChange();
  }
};

var parseLogin = function(chuckJSON){
  decipherResponse(chuckJSON);
  alert(message);
  if(decision)
    showLogIn();
  else{
    clearLoginCred();
    showLoginPage();
  }
};

// var parseData = function(chuckJSON){
//   // , number
//   var data =JSON.parse(chuckJSON);
//   console.log(data);
//   decision = data.result;
//   message = data.message;
//   console.log(decision);
//   console.log(message);
//   alert(message);
//   showLoginPage();
  // if (number == 1){
  //   successLogin = data.result;
  //   loginMessage = data.message;
  // }
  // if(number == 2){
  //   pwdResult = data.result;
  //   pwdMessage = data.message;
  // }
  // if (number == 3){
  //   regResult = data.result;
  //   regMessage = data.message;
  // }
// };

var loginData = function(){
  var URL = "https://login-credentials-ucudprogram.c9users.io/login.php";
  var xhr = new XMLHttpRequest();
  
  xhr.onload = function(){
    if (this.status == 200){
      parseLogin(this.response);
    }
  };
  var data = logincred();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
};



var changePwd = function(){
  var URL = "https://login-credentials-ucudprogram.c9users.io/pwdchg.php";
  var xhr = new XMLHttpRequest();

  xhr.onload = function(){
    if (this.status == 200){
      parsePwdChangeInfo(this.response);
    }
  };
  
  var data = pwdResetData();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
};



var register = function(){
  var URL = "https://login-credentials-ucudprogram.c9users.io/register.php";
  var xhr = new XMLHttpRequest();
  
  xhr.onload = function(){
    if (this.status == 200){
      parseRegInfo(this.response);
    }
  };
  
  var data= regData();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
};

var display_Success_Login = function (){
   var $div = document.getElementById("loginSuccess");
  $div.innerHTML = '';
  var $p = document.createElement('p');
  var levelText = "Congratulations:  You have successfully logged in";
  $p.innerHTML = levelText;
  $div.appendChild($p);
};

var appStart = function(){
    currentPageIndex = 0;
    
    // Event Listeners for Account Login
    document.getElementById('username').addEventListener('blur',setLoginUsername);
    document.getElementById('password').addEventListener('blur',setLoginPassword);
    // document.getElementById('loginSubmit').addEventListener('blur',setLoginPassword);
    
    // Event Listeners for Account Registration
    document.getElementById('regUsername').addEventListener('blur',setNewUsername);
    document.getElementById('new_pwd').addEventListener('blur',setNewPassword);
    document.getElementById('new_pwd_verify').addEventListener('blur',setNewPasswordVerify);
    
    // Event Listeners for Account Password Change
    document.getElementById('pwdUsername').addEventListener('blur',setPwdChgUser );
    document.getElementById('user_curr_pwd').addEventListener('blur', setPwdChgCurPwd);
    document.getElementById('pwd_reset').addEventListener('blur', setPasswordChg);
    document.getElementById('pwd_reset_verify').addEventListener('blur',setPasswordChgVerify);
    
    // Event Listeners for Page Submiting 
    document.getElementById('registerSubmit').addEventListener('click', registrationInitialization);
    document.getElementById('pwdChangeSubmit').addEventListener('click', passwordChange);
    document.getElementById('loginSubmit').addEventListener('click', loginAttempt);

    // Event Listeners for Switching Between Pages
    // document.getElementById('loginSubmit').addEventListener('click', showLogIn);
    document.getElementById('passChange').addEventListener('click', showPWDChange);
    document.getElementById('registerAcct').addEventListener('click', showRegistration);
    document.getElementById('registerBack').addEventListener('click', showLoginPage);
    document.getElementById('pwdChangeBack').addEventListener('click', showLoginPage);
    document.getElementById('logout').addEventListener('click', showLoginPage);
};

document.addEventListener('DOMContentLoaded', appStart);