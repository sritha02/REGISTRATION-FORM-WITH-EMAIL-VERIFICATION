<?php
session_start();
include('dbconn.php')

function sendemail_verify($name,$email,$verify_token)
{

}


if(isset($_POST["register_btn"]))
{
    $name= $_POST['name'];
    $phone= $_POST['phone'];
    $Email= $_POST['Email id'];
    $password= $_POST['pass'];
    $verify_token=md(rand());
    //email exits or not
    $check_email_query = "SELECT email FROM user WHERE email='$email' LIMIT 1"
    $check_email_query_run = mysqli_query($conn,$check_email_query);
if(mysqli_num_rows( $check_email_query_run)>0)
{
$_SESSION('status') = "Email id already Exists";
header("Location: register.php");
}
else{
//insert user / registered user data
$query ="INSERT INTO users(name,phone,email,password,verify_token) VALUES ('$name','$phone','$Email','$password','$verify_token')";
$query_run= mysqli_query($con,$query);
if($query_run)
{
    sendemail_verify("$name","$email","$verify_token");
    $_SESSION('status') = "Reistration Successfull.! Please verify your email Address.";
    header("Location: register.php");
}
else{
    $_SESSION('status') = "Reistration failed";
header("Location: register.php");
}
}
}

?>
