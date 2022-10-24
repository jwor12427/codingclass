<?php
    include "../connect/connect.php";

    $commentPass = $_POST['pass'];
    $commentID = $_POST['commentID'];
    $commentMsg = $_POST['msg'];


    $sql = "UPDATE myComment SET commentMsg = '{$commentMsg}', commentPass = '{$commentPass}' WHERE myCommentID = '{$commentID}'";
    $connect -> query($sql);

    echo json_encode(array("info" => $commentID));
    
?>