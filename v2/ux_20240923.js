
TouchFree.Init();

$(document).ready(function(){
    var startDesc = `<strong>[떨어지는 단어를 잡아라!]</strong>
        <p>제시 그림을 보고 40초 내에 뜻하는 단어를 클릭하세요 !</p><br/><br/>
		<button class="btn-replay text" type="button" onclick="initGame()">게임시작</button>`;
   $("#layerBg").html(startDesc).show();

   /*setTimeout(()=>{
        $("#layerBg").html('').hide();
   }, 2000);*/
});
const words = [
    {word : "물", bg : "water"},
    {word : "인형", bg : "doll"},
    {word : "가방", bg : "bag"},
    {word : "책", bg : "book"},
    {word : "과자", bg : "snack"},
    {word : "문", bg : "door"},
    {word : "컵", bg : "cup"},
    {word : "집", bg : "house"},
    {word : "신발", bg : "shoes"},
    {word : "사탕", bg : "candy"},
    {word : "거울", bg : "mirror"},
    {word : "햇님", bg : "sun"},
];

let currentPrompt = '';
let lastPrompt = '';
let score1 = 0;
let score2 = 0;
let countdown = 4000;
let correctClicks = 0;
let wrongClicks = 0;

// 타이머 시작
let gamePaused = false;  // 게임이 멈췄는지 여부를 저장하는 변수
let timerInterval;       // 타이머를 저장할 변수
let rainInterval;        // 단어 생성 주기를 저장할 변수
let divs = [];

function startTimer() {
    let totalDuration = 4000;  // 40초
    let progressMin = 5;     // 최소 width 값 (5%)
    let progressMax = 98;    // 최대 width 값 (98%)
    let progressRange = progressMax - progressMin; // width 변동 범위

    timerInterval = setInterval(function() {
         if (!gamePaused && countdown > 0) {
            countdown--;
            let progressPercentage = progressMin + ((totalDuration - countdown) / totalDuration) * progressRange;
            document.getElementById('progress').style.width = progressPercentage + '%';
            // correctClicks >= 3 || 
            if (countdown <= 0 || wrongClicks >= 3) {
                clearInterval(timerInterval);
                clearInterval(rainInterval); // 타이머 종료 시 단어 생성도 멈춤

                setTimeout(function(){
                    // alert('게임 종료! \n맞춘 횟수 : ' + score1 + ' / 틀린 횟수 : ' + score2);
                    document.getElementById("score3").textContent = score1;
                    document.getElementById("score4").textContent = score2;
                    document.getElementById("resultLayer").style.display = 'block';
                    //resetGame();
                }, 700)
            }
        }
    }, 10);
}

// 제시어 설정
function setPrompt() {
    do {
        var randomIndex = Math.floor(Math.random() * words.length);
        currentPrompt = words[randomIndex].word;
    } while (currentPrompt === lastPrompt);

    lastPrompt = currentPrompt;
    document.getElementById('prompt').src = 'img/' + words[randomIndex].bg + '.png';
}

// 한 화면에 단어가 10개만 유지되도록 제한
function createFallingWord() {
    const maxWords = 15;
    const currentWords = document.querySelectorAll('.click').length;

    if (currentWords >= maxWords) {
        return;  // 화면에 10개 이상의 단어가 있을 경우, 새로운 단어를 생성하지 않음
    }

    var randomIndex;
    var selectedWord;

    // 제시어를 더 자주 나오게 할 확률 설정
    if (Math.random() < 0.5) {
        selectedWord = words.find(word => word.word === currentPrompt);
    } else {
        randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex];

        while (selectedWord.word === currentPrompt) {
            randomIndex = Math.floor(Math.random() * words.length);
            selectedWord = words[randomIndex];
        }
    }

    // div 생성
    var div = document.createElement('div');
    div.classList.add('click');
    div.innerHTML = selectedWord.word;

    // 단어가 겹치지 않도록 랜덤 위치 설정
    div.style.left = Math.random() * 1200 + 'px';
    
    // 일정한 속도로 떨어지게 수정 (고정 10초)
    div.style.animation = `drop 10s linear`;
	
    div.onclick = function(event) {
		//console.log(event.pageX, event.pageY)
        if (selectedWord.word === currentPrompt) {
            correctClicks++;
            score1++;
            showCorrectEffect(selectedWord.bg, div);
            // document.getElementById('score1').textContent = '맞춘 횟수: ' + correctClicks + ' / 3';
            

        } else {
            wrongClicks++;
            score2++;
            showWrongEffect(div);
            // document.getElementById('score2').textContent = '틀린 횟수: ' + wrongClicks + ' / 3';
            var removeHeart = "heart" + wrongClicks;
            document.querySelectorAll('.score2 img').forEach((el)=>{
                if(el.id == removeHeart) {
                   document.getElementById(removeHeart).remove();
                }
            })
        }
        div.remove();
    };

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

    // 떨어지는 애니메이션 적용
    setTimeout(function() {
        div.style.top = window.innerHeight + 'px';
    }, 10);

    // 제거 타이머 관련 변수
    let removeTimeout;
    let remainingTime = 12000; // 초기 12초 설정
    let startTime = Date.now(); // 시작 시간 저장

    // 12초 후 자동 제거
    removeTimeout = setTimeout(function () {
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
    //clapLottie.play();
    correctImg.style.opacity = 1;

    var ispark = document.getElementById("ispark");
    ispark.style.left = (offsetLeft - 200) + 'px';
    ispark.style.top = offsetTop + 'px';
    ispark.style.opacity = 1;
    ispark.style.zIndex = 1;

    setTimeout(function() {
        ispark.style.opacity = 0;
        ispark.style.zIndex = -1;
        //clapLottie.stop();
        correctImg.remove();
    }, 2000);
	
	document.getElementById("correctSound").play();

	//console.log(el.offsetLeft, el.offsetTop);
}

// 오답 효과
function showWrongEffect(el) {
    //wrongLottie.play();
	var offsetLeft = el.offsetLeft;
	var offsetTop = el.offsetTop;
	
	document.getElementById("wrongSound").play();

    var iwrong = document.getElementById("iwrong");
    iwrong.style.left = (offsetLeft - 100) + 'px';
    iwrong.style.top = (offsetTop - 100) + 'px';
    iwrong.style.opacity = 1;
    iwrong.style.zIndex = 1;

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
        }
    }, 2000);  // 일정한 간격으로 단어 생성 (2초마다 생성)
}

// 게임 일시 정지
function pauseGame() {
    //console.log("멈춤 누름")
    gamePaused = true;

    divs.forEach(obj => {
        const div = obj.element;

        // 애니메이션 멈춤
        div.style.animationPlayState = 'paused';

        // 남은 시간 계산 및 타이머 취소
        clearTimeout(obj.removeTimeout);
        obj.remainingTime -= Date.now() - obj.startTime;
    });

    $("#layerBg").html("<p style='font-size:50px'>게임 일시정지</p>").show();
    clearInterval(rainInterval);  // 단어 생성도 멈춤
    document.getElementById("ibgm").pause();
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

    setPrompt();
    startRain();
    startTimer();
}

// 게임 시작
function initGame(){
	 $("#layerBg").html('').hide();
	document.getElementById("ibgm").play();

	setPrompt();
    startRain();
    startTimer();
}
   
