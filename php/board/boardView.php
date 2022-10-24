<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판</title>

    <?php include "../include/link.php" ?>
</head>
<body>
    <div id="skip">
        <a href="#header">헤더 영역 바로가기</a>
        <a href="#main">컨텐츠 영역 바로가기</a>
        <a href="#footer">푸터 영역 바로가기</a>
    </div>
    <!-- //skip -->

    <?php include "../include/header.php" ?>
    <!-- //header -->

    <main id="main">
        <section id="board" class="container">
            <h2>게시판 보기 영역입니다.</h2>
            <div class="board__inner">
                <div class="board__title">
                    <h3>게시판</h3>
                    <p>웹디자이너, 웹퍼블리셔, 프론트앤드 개발자를 위한 게시판입니다.</p>
                </div>
                <div class="board__view">
                    <table>
                        <colgroup>
                            <col style="width: 20%;">
                            <col style="width: 80%;">
                        </colgroup>

                        <tbody>
<?php
    $myBoardID = $_GET['myBoardID'];
    // echo $myBoardID;

    //조회수 + 1(UPDATE) - 우선순위 때문에 올려 줌
    $sql = "UPDATE myBoard SET boardView = boardView + 1 WHERE myBoardID = {$myBoardID}";
    $connect -> query($sql);

    $sql = "SELECT b.boardTitle, m.youName, b.regTime, b.boardView, b.boardContents FROM myBoard b JOIN myMember m ON(m.myMemberID = b.myMemberID) WHERE b.myBoardID = {$myBoardID}";
    $result = $connect -> query($sql);


    if($result){
        $info = $result -> fetch_array(MYSQLI_ASSOC);

        // echo "<pre>";
        // var_dump($info);
        // echo "</pre>";
        
        echo "<tr><th>제목</th><td>".$info['boardTitle']."</td></tr>";
        echo "<tr><th>등록자</th><td>".$info['youName']."</td></tr>";
        echo "<tr><th>등록일</th><td>".date('Y-m-d H:i', $info['regTime'])."</td></tr>";
        echo "<tr><th>조회수</th><td>".$info['boardView']."</td></tr>";
        echo "<tr><th>내용</th><td class='height'>".$info['boardContents']."</td></tr>";
    }


?>
                            <!-- <tr>
                                <th>제목</th>
                                <td>게시판 제목입니다.</td>
                            </tr>
                            <tr>
                                <th>등록자</th>
                                <td>박사과</td>
                            </tr>
                            <tr>
                                <th>등록일</th>
                                <td>2022.09.22</td>
                            </tr>
                            <tr>
                                <th>조회수</th>
                                <td>333</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td class="height">《어린 왕자》(프랑스어: Le Petit Prince)는 프랑스의 비행사이자 작가인 앙투안 드 생텍쥐페리가 1943년 발표한 소설이다.<br>
                                    1943년에 미국에서 처음 출판되었고, 그 해 비시 프랑스 치하의 프랑스에서 비밀리에 출판되었다. 프랑스가 해방된 이후 1947년 가리마르사(社)가 작자 자필의 이상하고 아름다운 삽화를 넣어 프랑스에서 새로 출판하였다.<br>
                                    현재까지 300여 개 국어로 번역되었고, 한국어판 중에는 저자의 삽화가 삽입되어 있는 번역본이 있다. 영화와 애니메이션으로도 제작되었다.<br>
                                    사하라 사막에 불시착한 조종사가 자기의 작은 별에서 여러 별들을 거쳐서 드디어 지상에 내려온 소년의 이야기를 듣고 결국 소년이 뱀에게 물려 자신의 별로 돌아갈 때까지의 이야기이다.
                                </td>
                            </tr> -->
                            
                        </tbody>
                    </table>
                </div>
                <div class="board__btn">
                    <a href="boardModify.php?MyBoardID=<?=$myBoardID?>">수정하기</a>
                    <a href="boardRemove.php?myBoardID=<?=$myBoardID?>" onclick="alert('진짜 삭세할꺼야????')">삭제하기</a>
                    <a href="board.php">목록보기</a>
                </div>
            </div>
        </section>
        <!-- //board -->
    </main>
    <!-- //main -->


    <?php include "../include/footer.php" ?>
    <!-- //footer -->
</body>
</html>