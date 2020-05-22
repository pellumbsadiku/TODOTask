<?php
$db = new mysqli("localhost","reactjs","P66jlmSfi0qGN44V","reactjs");
if(!$db) die("database connection error");


$dbh = new PDO('mysql:host=localhost;dbname=reactjs', 'reactjs', 'P66jlmSfi0qGN44V');


?>