## movies (영화)

id (PK)
title
price
poster_url

## seats (좌석)

id (PK)
movie_id (FK)
seat_number
is_reserved

## reservations (예매)

id (PK)
movie_id (FK)
seat_id (FK)
user_id (optional)
reserved_at (datetime)
