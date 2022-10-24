<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";

    $boardTitle = $_POST['boardTitle'];
    $boardContents = $_POST['boardContents'];

    $boardTitle = $connect -> real_escape_string($boardTitle);
    $boardContents = $connect -> real_escape_string($boardContents);
    $boardView = 1;
    $regTime = time();
    $myMemberID = $_SESSION['myMemberID'];  //회원가입한 사람만 작성 가능

    $sql = "INSERT INTO myBoard(myMemberID, boardTitle, boardContents, boardView, regTime) VALUES ('$myMemberID', '$boardTitle', '$boardContents', '$boardView', '$regTime')";

    $connect -> query($sql);
?>


<script>
    location.href = "board.php";
</script>