<?php
    include "../connect/connect.php";
    
    $myBlogID = $_POST['blogID'];   //해당 블로그의 아이디값을 가져옴
    $commentName = $_POST['name'];
    $commentPass = $_POST['pass'];
    $commentMsg = $_POST['msg'];
    $regTime = time();
    $sql = "INSERT INTO myComment(myMemberID, myBlogID, commentName, commentMsg, commentPass, commentDelete, regTime) VALUES ('1', '$myBlogID', '$commentName', '$commentMsg', '$commentPass', '1','$regTime')";
    $result = $connect -> query($sql);
    echo json_encode(array("info" => $sql));
?>