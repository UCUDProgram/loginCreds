<?php
function loginCheck($passedin, $dbcheck){
    return ($passedin == $dbcheck);
};

$payload = json_decode(file_get_contents('php://input'));
if (isset($payload->username)){
$user = $payload->username;
}

if (isset($payload->password)){
$pass = $payload->password;
}

$result = false;
$message = "";


// Check the database for the username & Password
$dbhandle = new PDO("sqlite:accounts.sqlite") or die("Failed to open DB");
     if (!$dbhandle) die ($error);

//     $query = "SELECT Username FROM Users WHERE Username='$user'";
//     $statement = $dbhandle->prepare($query);
//     $statement->execute();
//     $user_result = $statement->fetchAll(PDO::FETCH_ASSOC);
// if(sizeof($user_result) == 0){
//     $message = "Username does not Exist";
// } else{
//     $result = true;
// }

// if ($result){

    // $query = "SELECT Password FROM Users WHERE Username='admin'";


    $query = "SELECT Password FROM Users WHERE Username='$user'";
    $pass_state = $dbhandle->prepare($query);
    $pass_state->execute();
    $pass_result = $pass_state->fetchAll(PDO::FETCH_ASSOC);

if(sizeof($pass_result) == 0){
    $message = "User has no Password set.";
}

$pass_result = $pass_result[0][Password];
    
      if($pass == $pass_result){ 
        $result = true;
        $message = "You have the right credentials.";
    } else {
        $result = false;
        $message = "You have entered the wrong password.";
    }
// }   

// $results = array("result"=> $pass_result, "message"=>$message);

$results = array("result"=> $result, "message"=>$message);


//this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode($results);
?>