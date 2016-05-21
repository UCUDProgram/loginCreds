<?php

$payload = json_decode(file_get_contents('php://input'));
if (isset($payload->username)){
$user = $payload->username;
}

if (isset($payload->current)){
$pass = $payload->current;
}

if (isset($payload->new_password)){
$new_pass = $payload->new_password;
}


// Check the database for the potential Password
$dbhandle = new PDO("sqlite:passwords.sqlite") or die("Failed to open DB");
     if (!$dbhandle) die ($error);

$query = "SELECT word FROM Passwords WHERE word='$new_pass'";
$statement = $dbhandle->prepare($query);
$statement->execute();
$user_result = $statement->fetchAll(PDO::FETCH_ASSOC);

// If user_result size ==1 (>0) the suggested password is in the illegal passwords database
    if (sizeof($user_result) > 0){
        $result = false;
        $message = "Your new password is invalid";
    } else {
        $result = true;
    }

if ($result){
$dbhandle = new PDO("sqlite:accounts.sqlite") or die("Failed to open DB");
     if (!$dbhandle) die ($error);
     
    $query = "SELECT Password FROM Users WHERE Username='$user'";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $user_pass = $statement->fetchAll(PDO::FETCH_ASSOC);
    if(sizeof($user_pass) > 0){
        $result = true;
    } else {
        $result = false;
        $message = "Your password does not match the password in the database";
    }
    
    // if($user_pass == $pass)
    //     $result = true;
    // else
    //     $result = false;
}

if($result){
    $query = "UPDATE Users SET Password = '$new_pass' WHERE Username='$user'";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $message = "Your password has successfully been changed.";
}

$results = array("result" => $result, "message" => $message);

//this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode($results);
?>