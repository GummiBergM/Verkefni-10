const locations = [
  {
    title: "Reykjavík",
    lat: 64.147,
    lng: -21.9408,
  },
  {
    title: "Tokyo",
    lat: 35.6828,
    lng: 139.8394,
  },
];

const authString = btoa(`5e7de5a6-5ed4-4482-9cd0-623f42a1720d:5698338c41117cb6e3121f89ef984adc9c676a0e8390f19a07bc5b891e5f75f9f53c63061086ba95ce7fa77f3bf79b3decd80d0864def52409ded6860f6bffc6ccf655e433575a4daec960f6f864ebee46d3aee5a1fb90351ddb4b5f9cbab2d2f8038d42ab3093341c373d6fe1928af4`);
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open(
  "GET",
  "https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2024-11-04&to_date=2024-11-04&time=17%3A10%3A17"
);
xhr.setRequestHeader(
  "Authorization",
  "Basic NWU3ZGU1YTYtNWVkNC00NDgyLTljZDAtNjIzZjQyYTE3MjBkOjU2OTgzMzhjNDExMTdjYjZlMzEyMWY4OWVmOTg0YWRjOWM2NzZhMGU4MzkwZjE5YTA3YmM1Yjg5MWU1Zjc1ZjlmNTNjNjMwNjEwODZiYTk1Y2U3ZmE3N2YzYmY3OWIzZGVjZDgwZDA4NjRkZWY1MjQwOWRlZDY4NjBmNmJmZmM2Y2NmNjU1ZTQzMzU3NWE0ZGFlYzk2MGY2Zjg2NGViZWU0NmQzYWVlNWExZmI5MDM1MWRkYjRiNWY5Y2JhYjJkMmY4MDM4ZDQyYWIzMDkzMzQxYzM3M2Q2ZmUxOTI4YWY0"
);

xhr.send(data);
