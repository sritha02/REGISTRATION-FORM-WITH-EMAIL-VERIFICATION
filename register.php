<?php 
$page_title="Registration Form";
include("includes/header.php"); 
include("includes/navbar.php");
?>
<div class="py5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                        <div class="card-header">
                            <h5>Registration form</h5>
                        </div>
                        <div class="cardbody">
                        <form action="code.php" method="POST">
                        <div class="form-group mb-3">
                            <label for="">Name</label>
                            <input type="text" name="name" class="form-control" >
                        </div>
                        <div class="form-group mb-3">
                            <label for="">Phone number</label>
                            <input type="text" name="Phone" class="form-control" >
                        </div>
                        <div class="form-group mb-3">
                            <label for="">Email id</label>
                            <input type="text" name="Email id" class="form-control" >
                        </div>
                        <div class="form-group mb-3">
                            <label for="">Password</label>
                            <input type="text" name="Pass" class="form-control" >
                        </div>
                        <div class="form-group mb-3">
                            <label for="">Confirm password</label>
                            <input type="text" name="Confirm _password" class="form-control" >
                        </div>
                        <div class="form-group">
                            <button type="submit" name="register_btn" class="btn btn-primary">Register now</button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
