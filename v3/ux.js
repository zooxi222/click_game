
TouchFree.Init();
let keyImg;
let keyQues;


$(document).ready(function(){
    setPrompt();

    // var startDesc = `<strong>그림을 뜻하는 한자를 찔러라!</strong>
    //     <p>포이와 함께 산성비를 무찌르고 소림사의 안전을 지켜주세요</p><br/>
	// 	<button class="btn-replay text" type="button" onclick="initGame()">게임시작</button>`;

    // var startDesc = `<strong style="font-size:50px;">지나가는 한자를 잡아라!</strong><div class="key_img"><img src="${keyImg}"/></div>
    //     <p style="margin:0; display:flex;gap:10px; align-items:center; justify-content:center;">제한시간 내에 그림이 <img src="${keyImg}" style="width:50px;"/> 의미하는 한자를 클릭하세요 !</p><br/><br/>
	// 	<button class="btn-replay text" type="button" onclick="initGame()">게임시작</button>`;

    var startDesc = `<strong style="font-size:70px;">고수의 이름은 ?</strong><br/><br/><input type="text" id="userName" style="width:600px; height:100px; font-size:50px; text-align:center; border-radius:30px; border:none; padding:0 20px; font-family:'HakgyoansimDunggeunmisoTTF-B';" placeholder="예) 오늘은 포청천"/><br/><br/><button class="btn-replay text" type="button" onclick="saveName()">닉네임 저장</button>`;

   $("#layerBg").html(startDesc).css("zIndex",5).show();

	document.getElementById("quesSound").src = keyQues;
	document.getElementById("quesSound").play();
   /*setTimeout(()=>{
        $("#layerBg").html('').hide();
   }, 2000);*/

   var elementBtn = document.querySelector(".btn-replay.text");

   elementBtn.onpointerover = function() {
       elementBtn.classList.add("hovered");
   }

   elementBtn.onpointerleave = function() {
       elementBtn.classList.remove("hovered");
   }

 


});

let initArray, arrayLength, newUserArray, currentUserIndex;

if(localStorage.rankings != undefined) { //이미 n번째 게임이면
    initArray = JSON.parse(localStorage.getItem('rankings'));
    arrayLength = parseInt(Object.keys(initArray).length + 1);
    currentUserIndex = 'user' + arrayLength;
} else { // 첫 게임이면
    localStorage.setItem('rankings',JSON.stringify({"user1":""}));
    initArray = JSON.parse(localStorage.getItem('rankings'));
    currentUserIndex = 'user1'
    console.log("처음 스토리지 등록")
}

function saveName(){
    // 로컬스토리지 값 다 가져오기
    // 가져 온 값을 배열에 담고 뒤에 지금 추가된 사람 이름 추가
    // 게임이 끝나고 마지막에 맞춘갯수와 틀린갯수를 저장
    // user1, user2 ... 식으로 키 잡아서 총 몇판 재생했는지 체크

    // 맞춘 갯수는 10점 틀린 갯수는 -5점으로 계산해서 순위 매기기
    // 형태는 "user1 ++" : {correct : 5, wrong : 1, name : "닉네임", 점수 : 150} 로 스토리지 재새팅
    // 매긴 순위는 그대로 저장하고, 1위부터 5위까지만 화면에 출력


    

    if($("#userName").val() == '') {
        alert("닉네임을 입력해주세요.");
        $("#userName").focus();
        return false;
    }
    
    initArray[currentUserIndex] = {name : $("#userName").val(), correct : '', totalScore : '', wrong : ''};
    //localStorage.setItem('rankings', JSON.stringify(initArray));

    startDesc = `<strong style="font-size:70px;">초심자여, 수련 준비가 되었는가?</strong><div class="key_img"><img src="${keyImg}"/></div><p style="margin:0; display:flex;gap:10px; background:#000; padding:0 20px; border-radius:10px; align-items:center; justify-content:center; font-size:32px">제시 그림을 <img src="${keyImg}" style="width:50px;"/> 의미하는 한자를 찔러 소림사를 지켜주게 !</p><br/><br/>
	<button class="btn-replay text" type="button" onclick="initGame()">게임시작</button>`;



    $("#layerBg").html(startDesc);

    document.getElementById("startSound").play();
} // saveName()


// 정답 10개, 비슷한 답 5개, 오답 5개
const words = [{
        word : "水", // 永 길 영, 氷 얼음 빙
        key : "shui", 
        ques : [
            {word : '水', key : "shui"},
            {word : '石', key : "shi"},
            {word : '氷', key : "bing"},
            {word : '水', key : "shui"},
            {word : '永', key : "ying"},
            {word : '水', key : "shui"},
            {word : '花', key : "hua"},
            {word : '水', key : "shui"},
            {word : '水', key : "shui"},
            {word : '永', key : "ying"},
            {word : '馬', key : "ma"},
            {word : '水', key : "shui"},
            {word : '氷', key : "bing"},
            {word : '水', key : "shui"},
            {word : '木', key : "mu"},
            {word : '水', key : "shui"},
            {word : '門', key : "men"},
            {word : '水', key : "shui"},
            {word : '水', key : "shui"},
            {word : '肉', key : "rou"},
        ]
    },{
        word : "門", // 円 둥글 영, 鬥 싸울 투, 間 사이 간
        key : "men", 
        ques : [
            {word : '門', key : "men"},
            {word : '石', key : "shi"},
            {word : '鬥', key : "tu"},
            {word : '門', key : "men"},
            {word : '円', key : "ying2"},
            {word : '門', key : "men"},
            {word : '花', key : "hua"},
            {word : '門', key : "men"},
            {word : '門', key : "men"},
            {word : '円', key : "ying2"},
            {word : '馬', key : "ma"},
            {word : '門', key : "men"},
            {word : '間', key : "gan"},
            {word : '門', key : "men"},
            {word : '木', key : "mu"},
            {word : '門', key : "men"},
            {word : '魚', key : "yu"},
            {word : '門', key : "men"},
            {word : '門', key : "men"},
            {word : '鬥', key : "tu"},
        ]
    },{
        word : "石", // 右 오른 우, 万 일만 만
        key : "shi", 
        ques : [
            {word : '石', key : "shi"},
            {word : '風', key : "feng"},
            {word : '右', key : "wu"},
            {word : '石', key : "shi"},
            {word : '万', key : "wan"},
            {word : '石', key : "shi"},
            {word : '花', key : "hua"},
            {word : '石', key : "shi"},
            {word : '石', key : "shi"},
            {word : '万', key : "wan"},
            {word : '馬', key : "ma"},
            {word : '石', key : "shi"},
            {word : '右', key : "wu"},
            {word : '石', key : "shi"},
            {word : '木', key : "mu"},
            {word : '石', key : "shi"},
            {word : '魚', key : "yu"},
            {word : '石', key : "shi"},
            {word : '石', key : "shi"},
            {word : '万', key : "wan"},
        ]
    },{
        word : "風", // 𠘳 바람 우, 周 두루 주
        key : "feng", 
        ques : [
            {word : '風', key : "feng"},
            {word : '肉', key : "rou"},
            {word : '𠘳', key : "wu2"},
            {word : '風', key : "feng"},
            {word : '周', key : "zhou"},
            {word : '風', key : "feng"},
            {word : '花', key : "hua"},
            {word : '風', key : "feng"},
            {word : '風', key : "feng"},
            {word : '𠘳', key : "wu2"},
            {word : '馬', key : "ma"},
            {word : '風', key : "feng"},
            {word : '𠘳', key : "wu2"},
            {word : '風', key : "feng"},
            {word : '木', key : "mu"},
            {word : '風', key : "feng"},
            {word : '魚', key : "yu"},
            {word : '風', key : "feng"},
            {word : '風', key : "feng"},
            {word : '周', key : "zhou"},
        ]
    },{
        word : "肉", // 丙 남녘 병, 兩 두 량
        key : "rou", 
        ques : [
            {word : '肉', key : "rou"},
            {word : '魚', key : "yu"},
            {word : '兩', key : "liang"},
            {word : '肉', key : "rou"},
            {word : '丙', key : "bing2"},
            {word : '肉', key : "rou"},
            {word : '花', key : "hua"},
            {word : '肉', key : "rou"},
            {word : '肉', key : "rou"},
            {word : '丙', key : "bing2"},
            {word : '馬', key : "ma"},
            {word : '肉', key : "rou"},
            {word : '魚', key : "yu"},
            {word : '肉', key : "rou"},
            {word : '木', key : "mu"},
            {word : '肉', key : "rou"},
            {word : '魚', key : "yu"},
            {word : '肉', key : "rou"},
            {word : '肉', key : "rou"},
            {word : '兩', key : "liang"},
        ]
    },{
        word : "魚", // 焦 탈 초, 漁 고기 잡을 어
        key : "yu", 
        ques : [
            {word : '魚', key : "yu"},
            {word : '石', key : "shi"},
            {word : '焦', key : "jiao"},
            {word : '魚', key : "yu"},
            {word : '漁', key : "yu2"},
            {word : '魚', key : "yu"},
            {word : '門', key : "men"},
            {word : '魚', key : "yu"},
            {word : '魚', key : "yu"},
            {word : '焦', key : "jiao"},
            {word : '馬', key : "ma"},
            {word : '魚', key : "yu"},
            {word : '焦', key : "jiao"},
            {word : '魚', key : "yu"},
            {word : '木', key : "mu"},
            {word : '魚', key : "yu"},
            {word : '風', key : "feng"},
            {word : '魚', key : "yu"},
            {word : '魚', key : "yu"},
            {word : '漁', key : "yu2"},
        ]
    },{
        word : "馬", // 思 생각 사, 長 길 장
        key : "ma", 
        ques : [
            {word : '馬', key : "ma"},
            {word : '石', key : "shi"},
            {word : '長', key : "zhang"},
            {word : '馬', key : "ma"},
            {word : '漁', key : "yu2"},
            {word : '馬', key : "ma"},
            {word : '門', key : "men"},
            {word : '馬', key : "ma"},
            {word : '馬', key : "ma"},
            {word : '思', key : "si"},
            {word : '肉', key : "rou"},
            {word : '馬', key : "ma"},
            {word : '思', key : "si"},
            {word : '馬', key : "ma"},
            {word : '木', key : "mu"},
            {word : '馬', key : "ma"},
            {word : '風', key : "feng"},
            {word : '馬', key : "ma"},
            {word : '馬', key : "ma"},
            {word : '長', key : "zhang"},
        ]
    },{
        word : "木", // 末 끝 몰, 本 근본 본
        key : "mu", 
        ques : [
            {word : '木', key : "mu"},
            {word : '漁', key : "yu2"},
            {word : '末', key : "mo2"},
            {word : '木', key : "mu"},
            {word : '本', key : "ben"},
            {word : '木', key : "mu"},
            {word : '門', key : "men"},
            {word : '木', key : "mu"},
            {word : '木', key : "mu"},
            {word : '末', key : "mo2"},
            {word : '肉', key : "rou"},
            {word : '木', key : "mu"},
            {word : '肉', key : "rou"},
            {word : '木', key : "mu"},
            {word : '本', key : "ben"},
            {word : '木', key : "mu"},
            {word : '風', key : "feng"},
            {word : '木', key : "mu"},
            {word : '木', key : "mu"},
            {word : '末', key : "mo2"},
        ]
    }
];

let currentPrompt = '';
let lastPrompt = '';
let randomIndex = 0;        // 선택된 word의 인덱스
let currentIndex = 0;       // ques 배열에서의 현재 문제 인덱스


let score1 = 0;
let score2 = 0;
let countdown = 3000;
let correctClicks = 0;
let wrongClicks = 0;
let resultTxt;

// 타이머 시작
let gamePaused = false;  // 게임이 멈췄는지 여부를 저장하는 변수
let timerInterval;       // 타이머를 저장할 변수
let rainInterval;        // 단어 생성 주기를 저장할 변수
let divs = [];

function startTimer() {
    let totalDuration = 3000;  // 30초
    let progressMin = 5;     // 최소 width 값 (5%)
    let progressMax = 98;    // 최대 width 값 (98%)
    let progressRange = progressMax - progressMin; // width 변동 범위

    timerInterval = setInterval(function() {
         if (!gamePaused && countdown > 0) {
            countdown--;
           let progressPercentage = progressMax - ((totalDuration - countdown) / totalDuration) * progressRange;
            document.getElementById('progress').style.width = progressPercentage + '%';
            // correctClicks >= 3 ||
            if(countdown < 500) {
                document.getElementById("clockEffect").play();
            } 
            if (countdown <= 0 || wrongClicks >= 3) { // 게임이 끝나면
                clearInterval(timerInterval);
                clearInterval(rainInterval); // 타이머 종료 시 단어 생성도 멈춤

                /*
                    10개 이상 - 최고에요! => 소림사를 지켜줘서 고마워!
                    7개 이상 - 대단해요! => 덕분에 소림사는 무사해!
                    5개 이상 - 훌륭해요! => 고수가 되긴 멀었는걸?
                    4개 이하 - 꽤 하는데? => 오늘 내 소림사가 무너졌어
                */
				var resultSoundSrc = 'src/result_sound_10.mp3';
                if(correctClicks >= 10){
                    resultTxt = "소림사를 지켜줘서 고마워!" 
                } else if(correctClicks > 7) {
                    resultTxt = "덕분에 소림사는 무사해!" 
					resultSoundSrc = 'src/result_sound_7.mp3';
                } else if(correctClicks > 5) {
                    resultTxt = "고수가 되긴 멀었는걸?" 
					resultSoundSrc = 'src/result_sound_5.mp3';
                } else {
                    resultTxt = "오늘 내 소림사가 무너졌어" 
					resultSoundSrc = 'src/result_sound_0.mp3';
                }
				
				document.getElementById("resultSound").src = resultSoundSrc;
                $("#resultTxt").text(resultTxt);
				
				

                setTimeout(function(){
   
                    var totalscore = (score1 * 10) + (score2 * -5);

                    initArray[currentUserIndex].correct = score1;
                    initArray[currentUserIndex].wrong = score2;
                    initArray[currentUserIndex].totalScore = totalscore;
                    
                    localStorage.setItem('rankings',JSON.stringify(initArray));

                    
                    // alert('게임 종료! \n맞춘 횟수 : ' + score1 + ' / 틀린 횟수 : ' + score2);
                    $(".click").remove();
                    document.getElementById("score3").textContent = score1;
                    document.getElementById("score4").textContent = score2;
                    document.getElementById("resultLayer").style.display = 'block';
                    document.getElementById("ibgm").pause();
                    document.getElementById("windBgm").pause();
                    document.getElementById("clockEffect").pause();
					document.getElementById("resultSound").play();
					
                    //resetGame();
                }, 1500)
            }

        }
    }, 10);
}

//랭킹페이지 오픈
function openRanking(){
    document.getElementById("resultLayer").style.display = 'none';
    makeLanking();

    document.getElementById("rankingLayer").style.display = 'flex';

}

function makeLanking(){
    console.log(initArray);

    var sortedRankings = Object.keys(initArray)
        .map(key => initArray[key])  // 객체를 배열로 변환
        .sort((a, b) => b.totalScore - a.totalScore);  


    var list = '';
    for(var i = 0; i < Math.min(10, sortedRankings.length); i++) {
        list += `<li><span>${i+1}등</span><span>${sortedRankings[i].name}</span><span style="margin-left:auto; margin-right:0;">${sortedRankings[i].totalScore}</span></li>`;
    }

    $("#rankList").html(list);
}


// 제시어 설정
function setPrompt() {
    do {
        randomIndex = Math.floor(Math.random() * words.length);
        currentPrompt = words[randomIndex].word;
    } while (currentPrompt === lastPrompt);

    //console.log(currentPrompt)

    lastPrompt = currentPrompt;
    document.getElementById('prompt').src = 'img/' + words[randomIndex].key + '.png';

    keyImg = 'img/' + words[randomIndex].key + '.png';
	keyQues = 'src/ques_' + words[randomIndex].key + '.mp3';
}
// 단어 날려보내는 함수
function createFallingWord() {
    const maxWords = 15;
    const currentWords = document.querySelectorAll('.click').length;

    if (currentWords >= maxWords) {
        return;  // 화면에 15개 이상의 단어가 있을 경우, 새로운 단어를 생성하지 않음
    }

    // 현재 제시어에 해당하는 ques 배열에서 단어를 선택
    let selectedWord = words[randomIndex].ques[currentIndex];

    // 다음 문제로 넘어가도록 인덱스 증가
    currentIndex++;
    if (currentIndex >= words[randomIndex].ques.length) {
        currentIndex = 0;  // 인덱스가 배열 끝에 도달하면 처음으로 돌아감
    }

    // if (Math.random() < 0.5) {
    //     selectedWord = words.find(word => word.word === currentPrompt);
    // } else {
    //     randomIndex = Math.floor(Math.random() * words.length);
    //     selectedWord = words[randomIndex];

    //     while (selectedWord.word === currentPrompt) {
    //         randomIndex = Math.floor(Math.random() * words.length);
    //         selectedWord = words[randomIndex];
    //     }
    // }







    // div 생성
    var div = document.createElement('div');
    div.classList.add('click');
    div.innerHTML = selectedWord.word;

    // 상단의 랜덤 위치에서 생성되도록 설정
    var randomTop = (Math.random() * (window.innerHeight - 250)) + 100
    div.style.top = randomTop + 'px';

    // 왼쪽에서 오른쪽으로 이동하는 애니메이션 설정
    div.style.left = '0';  // 화면 밖 왼쪽에서 시작
    div.style.animation = 'moveRight 10s cubic-bezier(.08,.37,.73,.91), fade-out 4.5s forwards cubic-bezier(.08,.37,.73,.91)';  // 10초 동안 오른쪽으로 이동

    // 클릭 이벤트 핸들러
    div.onclick = function(event) {
        if (selectedWord.word === currentPrompt) {
            correctClicks++;
            score1++;
            showCorrectEffect(selectedWord.key, div);
        } else {
            wrongClicks++;
            score2++;
            showWrongEffect(selectedWord.key, div);
            var removeHeart = "heart" + wrongClicks;
            document.querySelectorAll('.score2 img').forEach((el) => {
                if (el.id == removeHeart) {
                   document.getElementById(removeHeart).remove();
                }
            });
        }
        div.remove();
    };

    // 애니메이션 상태 관련 이벤트 핸들러
    div.onpointerover = function() {
        div.classList.add("hovered");
    }

    div.onpointerleave = function() {
        div.classList.remove("hovered");
    }

    div.onpointerdown = function() {
        div.classList.add("pressed");
    }

    div.onpointerup = function() {
        div.classList.remove("pressed");
    }

    document.getElementById('wrap').appendChild(div);

    // 제거 타이머 관련 변수
    let removeTimeout;
    let remainingTime = 8000; 
    let startTime = Date.now(); // 시작 시간 저장

    // 8초 후 자동 제거
    setTimeout(function () {
        div.remove(); 
    }, remainingTime);  

     // div 관련 정보 저장
     divs.push({ element: div, removeTimeout, remainingTime, startTime });
}



// 정답 효과
function showCorrectEffect(imgSrc, el) {
	var offsetLeft = el.offsetLeft;
	var offsetTop = el.offsetTop;

    var correctImg = document.createElement("img");
    correctImg.classList.add("correct_img");  
    correctImg.src = 'img/' + imgSrc + '.png';
    correctImg.style.left = (offsetLeft - 100) + 'px';
    correctImg.style.top = (offsetTop - 100) + 'px';
    document.body.appendChild(correctImg);
    correctImg.style.opacity = 1;

    var ispark = document.createElement("img");
    //console.log(ispark)
    ispark.id = "ispark"; 
    ispark.classList.add("spark")
    ispark.src = 'img/clear.gif';
    ispark.style.left = (offsetLeft - 200) + 'px';
    ispark.style.top = offsetTop + 'px';
    ispark.style.opacity = 1;
    ispark.style.zIndex = 1;
    document.body.appendChild(ispark);

    setTimeout(function() {
        ispark.style.opacity = 0;
        ispark.style.zIndex = -1;
        //clapLottie.stop();
        correctImg.remove();
        ispark.remove();
    }, 1500);
	document.getElementById("correctEffect").currentTime = 0;
	document.getElementById("correctEffect").play();
    document.getElementById("speakSound").src = 'src/' + imgSrc + '.mp3';
    document.getElementById("speakSound").play();
	//console.log(el.offsetLeft, el.offsetTop);
}

// 오답 효과
function showWrongEffect(imgSrc, el) {
    //wrongLottie.play();
	var offsetLeft = el.offsetLeft;
	var offsetTop = el.offsetTop;
    document.getElementById("wrongEffect").currentTime = 0;
	document.getElementById("wrongEffect").play();

    document.getElementById("speakSound").src = 'src/' + imgSrc + '.mp3';
    document.getElementById("speakSound").play();

    var iwrong = document.createElement("img");
    iwrong.id = "iwrong"; 
    iwrong.classList.add("wrong")
    iwrong.src = 'img/incorrect.gif';
    iwrong.style.left = (offsetLeft - 50) + 'px';
    iwrong.style.top = offsetTop + 'px';
    iwrong.style.opacity = 1;
    iwrong.style.zIndex = 1;
    document.body.appendChild(iwrong);

	document.getElementById("wrapBg").classList.add("wrong_bg");
	

    setTimeout(function() {
        iwrong.style.opacity = 0;
        iwrong.style.zIndex = -1;
        //wrongLottie.stop();
		document.getElementById("wrapBg").classList.remove("wrong_bg");
    }, 1500);
    


}

// 단어 생성 주기를 일정하게 설정
function startRain() {
    rainInterval = setInterval(function() { 
        if (!gamePaused) {  
            createFallingWord();
            document.getElementById("windSound").play()
        }
    }, 1500);  // 일정한 간격으로 단어 생성 (1초마다 생성)
}

// 게임 일시 정지
function pauseGame() {
    gamePaused = true;

    divs.forEach(obj => {
        const div = obj.element;

        // 애니메이션 중단을 위해 현재의 위치 계산
        const currentLeft = parseFloat(div.style.left);
        const currentTop = parseFloat(div.style.top);

        obj.currentLeft = currentLeft;  // 현재 X 위치 저장
        obj.currentTop = currentTop;    // 현재 Y 위치 저장

        // 애니메이션 멈추고 현재 위치에 고정
        div.style.animationPlayState = 'paused';
        div.style.left = `${currentLeft}px`;
        div.style.top = `${currentTop}px`;

        // 남은 시간 계산 및 타이머 취소
        clearTimeout(obj.removeTimeout);
        obj.remainingTime -= Date.now() - obj.startTime;
    });

    $("#layerBg").html("<p style='font-size:50px'>게임 일시정지</p>").css("zIndex",3).show();
    clearInterval(rainInterval);  // 단어 생성도 멈춤
    document.getElementById("ibgm").pause();
    document.getElementById("windBgm").pause();
    document.getElementById("clockEffect").pause();
}

// 게임 재개
function resumeGame() {
    gamePaused = false;
    document.getElementById("layerBg").style.display = "none";  // 일시정지 화면 숨기기

    divs.forEach(obj => {
        const div = obj.element;

        // 애니메이션을 재개하고 남은 시간 동안 동작하도록 설정
        div.style.animationPlayState = 'running';

        obj.startTime = Date.now(); // 재개 시점을 다시 기록
        obj.removeTimeout = setTimeout(function () {
            div.remove();
        }, obj.remainingTime);
    });

    document.getElementById("ibgm").play();
    document.getElementById("windBgm").play();
    startRain();  // 단어 생성을 재개
}


// 게임 재개
function resumeGame() {
    gamePaused = false;
    $("#layerBg").hide();
    divs.forEach(obj => {
        const div = obj.element;

        // 애니메이션 재개
        div.style.animationPlayState = 'running';

        // 남은 시간으로 타이머 재설정
        obj.startTime = Date.now();
        obj.removeTimeout = setTimeout(function () {
            div.remove();
        }, obj.remainingTime);
    });
    document.getElementById("ibgm").play();
    document.getElementById("windBgm").play();
    startRain();  // 단어 생성을 재개
}

function resetGame() {
    score1 = 0;
    score2 = 0;
    correctClicks = 0;
    wrongClicks = 0;
    countdown = 3000;
    
    document.querySelectorAll('.click').forEach(function(div){
        div.remove();
    })

    //setPrompt();
    startRain();
    startTimer();
}

// 게임 시작
function initGame(){
	 $("#layerBg").html('').hide();
	document.getElementById("ibgm").play();
    document.getElementById("windBgm").play();
	//setPrompt();
    startRain();
    startTimer();
}
   
