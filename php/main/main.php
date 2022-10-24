<?php
    include "../connect/session.php";

    echo "<pre>";
    var_dump($_SESSION);
    echo "</pre>";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP 사이트 만들기</title>

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
        <section id="banner">
            <h2>블로그 소개입니다.</h2>
            <div class="banner__inner container">
                <div class="img">
                    <img src="../assets/img/banner_bg01.jpg" alt="배너이미지">
                </div>
                <div class="desc">
                    어떤 일이라도 <em>노력</em>하고 즐기면  그 <em>결과</em>는 빛을 발한다고 생각합니다.
                    신입의 <em>열정</em>과 <em>도전정신</em>을 깊숙히 새기며 <em>배움</em>에 있어 겸손함을
                    유지하며 세부적인 곳까지 파고드는 <em>개발자</em>가 되겠습니다.
                </div>
            </div>
        </section>
        <!-- //banner -->
    </main>

    <?php include "../include/footer.php" ?>
    <!-- //footer -->

    <?php include "../login/login.php" ?>
    <!-- //loginpopup -->

    <!-- //script -->
    <script src="../assets/js/custom.js"></script>


    <script>
        // const loginBtn = document.querySelector(".loginBtn");
        // const loginCont = document.querySelector(".login__popup");
        // const loginClose = document.querySelector(".btn-close");

        // loginBtn.addEventListener("click", () => {
        //     loginCont.classList.add("open");
        // })
        // loginClose.addEventListener("click", () => {
        //     loginCont.classList.remove("open");
        // })

    </script>
</body>
</html>