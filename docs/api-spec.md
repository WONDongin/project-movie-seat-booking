# Movie Seat Booking API Spec

## 1. GET /movies

영화 목록 조회

### Response

[
{
"id": 1,
"title": "Avengers",
"price": 12000,
"posterUrl": "/images/avengers.png"
},
...
]

---

## 2. GET /movies/{id}/seats

특정 영화의 좌석 조회

### Response

[
{
"seatId": 1,
"seatNumber": "A1",
"isReserved": false
}
]

---

## 3. POST /reservations

좌석 예약 API

### Request

{
"movieId": 1,
"seatId": 23,
"userId": 5
}

### Response

{
"reservationId": 1004,
"message": "예약 완료"
}
