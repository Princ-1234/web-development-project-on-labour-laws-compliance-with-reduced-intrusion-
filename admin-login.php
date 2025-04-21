<?php
session_start();

// Hardcoded admin credentials
$admin_email = "admin@example.com";

// Use a pre-hashed password (for "admin123")
// Generate it using password_hash("admin123", PASSWORD_DEFAULT) once
$admin_password_hash = password_hash("admin123", PASSWORD_DEFAULT);

// Get POST input
$input_email = $_POST['admin_username'];
$input_password = $_POST['admin_password'];

if ($input_email === $admin_email && password_verify($input_password, $admin_password_hash)) {
    $_SESSION['admin_logged_in'] = true;
    header("Location: admindashboard.html");
    exit();
} else {
    echo "<script>
            alert('Invalid email or password.');
            window.location.href = 'admin-login.html';
          </script>";
}
?>
