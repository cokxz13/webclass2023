/* 모달로 부터 사용자 이름을 입력받는 함수*/
function getUsername() {
    /* input 태그 요소에 접근하여 입력값 가져오기 */
    const input = document.getElementById("username")
    const username = input.value
    console.log(input);
    console.log(username);

    /* 입력값의 길이가 0보다 크다면 모달 숨기기. 아니라면 경고창 띄우기 */
    if(username.length > 0 ){
        /* 모달 숨기기 */
        const modal = document.getElementById('name-modal')
        modal.classList.add('hide')

        /* 컨텐츠 보이기 */
        const contents = document.getElementById('contents')
        contents.classList.remove('hide')
        contents.classList.add('show')

        /*인사말 넣기*/
        showUsername(username)

    } else {
        window.alert('이름을 입력해주세요!')
    }
}

/*사용자 이름을 화면에 보여주는 함수*/
function showUsername(username) {
    const span = document.getElementById('name')
    span.innerText = username
}

/* 포춘 쿠키를 선택하는 함수 */
const selected = [false, false, false]
function selectCookie(index) {
    console.log(event.target)
    const target = event.target
    /* 만약 선택되지 않은 쿠키라면 */
    if(selected[index] == false) {
        /* 이미지를 바꾸고, 선택되었으므로 true로 바꾸기*/
        target.src = "fortune-cookie-after.png"
        selected[index] = true
        /* 포춘쿠키 메시지 보여주기 */
        showMessage()
    } else {
        window.alert('이미 선택된 쿠키입니다!')
    }
}

/* 포춘쿠키 운세 문구들*/
const messages = [
    '시도하지 않으면 아무것도 얻을 수 없습니다. 용기를 갖고 시도해보세요!',
    '오늘은 운수 좋은 날. 하는 일 마다 잘 될 꺼에요~',
    '오늘 친구들에게 칭찬 한마디 건네보는 건 어떨까요?',
    '가보지 않은 장소에 가보세요. 어쩌면 새로운 인연이 있을지도?',
    '갑작스러운 지출이 있을 수 있습니다. 현명한 소비를 하세요.'
]
/* 포춘쿠키 메시지를 보여주는 함수 */
function showMessage() {
    const result = document.getElementById("result-message")
    /* 메시지를 랜덤으로 선택하기 */
    const idx = getRandomInt(0, messages.length)
    result.innerText = messages[idx]

    /*만약 class에 hide가 있으면 지우고 show 추가하기*/
    if ( result.classList.contains('hide')){
        result.classList.remove('hide')
        result.classList.add('show')
    }
    
}

/* 두 정수 사이의 랜덤 값 생성하기 */ 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}