// DOM 요소 선택
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const empty = document.querySelector("#empty");
const allSeats = 48; // 상수 선언
const movieSelect = document.querySelector("#movie");
const clearBtn = document.querySelector(".clear");

let ticketPrice = +movieSelect.value;

/* LocalStorage 저장 함수 */
const saveMovieData = (index, price) => {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
};

/* 천단위 콤마 처리 */
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* UI 초기화 — LocalStorage 데이터 반영 */
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // 선택 좌석 복원
  if (selectedSeats?.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  } else {
    seats.forEach((seat) => seat.classList.remove("selected"));
  }

  // 영화 선택 초기화 (※ 기존 영화 복원 로직 제거)
  movieSelect.selectedIndex = 0;
  ticketPrice = +movieSelect.value;

  // 로컬스토리지에 저장된 영화 정보 제거
  localStorage.removeItem("selectedMovieIndex");
  localStorage.removeItem("selectedMoviePrice");

  // 포스터 이미지도 초기화
  const visual = document.querySelector(".banner");
  if (visual.classList.length > 1) {
    visual.classList.remove(visual.classList[1]);
  }
  visual.classList.add("banner_img0"); // 기본 이미지로 설정
};

/* 선택 좌석 수 & 총 가격 UI 갱신 */
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // 선택된 좌석들의 index 배열화
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedCount = selectedSeats.length;

  count.innerText = selectedCount;
  total.innerText = formatNumber(selectedCount * ticketPrice);
  empty.innerText = allSeats - selectedCount;
};

/* 이벤트 바인딩 — 영화 변경 */
let previousMovieIndex = movieSelect.selectedIndex; // 이전 영화 인덱스 저장

movieSelect.addEventListener("change", (e) => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // 좌석이 이미 선택된 경우 → 영화 변경 시 경고 후 초기화
  if (selectedSeats.length > 0) {
    const ok = confirm(
      "영화를 변경하면 선택된 좌석이 초기화됩니다.\n변경하시겠습니까?"
    );

    if (!ok) {
      // 취소 → 선택 변경을 롤백
      movieSelect.selectedIndex = previousMovieIndex;
      return;
    }

    // 확인 → 좌석 초기화
    seats.forEach((seat) => seat.classList.remove("selected"));
    localStorage.removeItem("selectedSeats");
    updateSelectedCount();
  }

  // 변경 확정 → 영화 데이터 저장
  previousMovieIndex = e.target.selectedIndex;
  ticketPrice = +e.target.value;

  saveMovieData(e.target.selectedIndex, ticketPrice);

  // 포스터 이미지 변경
  const visual = document.querySelector(".banner");
  visual.classList.remove(visual.classList[1]);
  visual.classList.add(`banner_img${e.target.selectedIndex}`);

  updateSelectedCount();
});

/* 이벤트 바인딩 — 좌석 클릭 */
container.addEventListener("click", (e) => {
  if (
    movieSelect.value > 0 &&
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

/* 초기화 버튼 */
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  populateUI();
  updateSelectedCount();
});

/* 초기 UI 반영 */
populateUI();
updateSelectedCount();
