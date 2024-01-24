<?php 
$page_title="Login Form";
include("includes/header.php"); 
include("includes/navbar.php");
?>
<div class="py5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                        <div class="card-header">
                            <h5>Login form</h5>
                        </div>
                        <div class="cardbody">
                        <form action="">
                        <div class="form-group mb-3">
                            <label for="">Email id</label>
                            <input type="text" name="Email id" class="form-control" >
                        </div>
                        <div class="form-group mb-3">
                            <label for="">Password</label>
                            <input type="text" name="Pass" class="form-control" >
                        </div>                      
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Login now</button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include("includes/footer.php"); ?>
