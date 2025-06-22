// Toggle menu
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("nav-open");
});

// Slider cập nhật giá trị
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
if (priceRange && priceValue) {
  priceValue.textContent = new Intl.NumberFormat('vi-VN').format(priceRange.value);
  priceRange.oninput = () => priceValue.textContent = new Intl.NumberFormat('vi-VN').format(priceRange.value);
}

const distanceRange = document.getElementById("distance-range");
const distanceValue = document.getElementById("distance-value");
if (distanceRange && distanceValue) {
  distanceValue.textContent = distanceRange.value;
  distanceRange.oninput = () => distanceValue.textContent = distanceRange.value;
}

// Dữ liệu xe
const vehicles = [
  { name: "Yamaha Exciter 155", type: "motorbike", price: 150000, location: "Huế", rating: 4.5, distance: 5, amenities: ["helmet", "gps"],image: "img/Yamaha Exciter 155.jpg" },
  { name: "VinFast Klara S", type: "electric-bike", price: 130000, location: "Huế", rating: 5.0, distance: 7, amenities: ["delivery"] },
  { name: "Honda SH Mode", type: "motorbike", price: 180000, location: "Đà Nẵng", rating: 4.0, distance: 3, amenities: ["helmet"] },
  { name: "Toyota Vios", type: "car", price: 500000, location: "Huế", rating: 4.8, distance: 6, amenities: ["gps", "delivery"] },
  { name: "Mazda CX-5", type: "car", price: 700000, location: "Huế", rating: 4.9, distance: 12, amenities: ["gps", "helmet", "delivery"] },
  { name: "Honda Wave Alpha", type: "motorbike", price: 90000, location: "Đà Nẵng", rating: 3.5, distance: 10, amenities: ["helmet"] },
  { name: "Suzuki GSX R150", type: "motorbike", price: 200000, location: "Huế", rating: 4.7, distance: 4, amenities: ["helmet"] },
  { name: "VinFast VF e34", type: "car", price: 650000, location: "Huế", rating: 5.0, distance: 8, amenities: ["gps", "delivery"] },
  { name: "Peugeot Django", type: "motorbike", price: 170000, location: "Hội An", rating: 4.2, distance: 2, amenities: ["helmet", "gps"] },
  { name: "Pega Aura", type: "electric-bike", price: 120000, location: "Huế", rating: 4.3, distance: 9, amenities: ["helmet"] },
  { name: "Honda Lead", type: "motorbike", price: 140000, location: "Huế", rating: 4.0, distance: 3, amenities: ["helmet"] },
  { name: "Yamaha Grande", type: "motorbike", price: 160000, location: "Huế", rating: 4.4, distance: 5, amenities: ["helmet", "delivery"] },
  { name: "Kia Seltos", type: "car", price: 550000, location: "Huế", rating: 4.6, distance: 6, amenities: ["gps", "helmet"] },
  { name: "Honda Vision", type: "motorbike", price: 130000, location: "Đà Nẵng", rating: 4.1, distance: 2, amenities: ["helmet"] },
  { name: "Yamaha Sirius", type: "motorbike", price: 100000, location: "Huế", rating: 3.9, distance: 7, amenities: ["helmet"] },
  { name: "Hyundai Accent", type: "car", price: 480000, location: "Huế", rating: 4.2, distance: 10, amenities: ["gps"] },
  { name: "VinFast Feliz S", type: "electric-bike", price: 110000, location: "Huế", rating: 4.5, distance: 5, amenities: ["delivery"] },
  { name: "Piaggio Liberty", type: "motorbike", price: 175000, location: "Huế", rating: 4.3, distance: 4, amenities: ["helmet", "gps"] },
  { name: "Toyota Fortuner", type: "car", price: 800000, location: "Huế", rating: 4.9, distance: 11, amenities: ["gps", "delivery"] },
  { name: "Honda PCX", type: "motorbike", price: 190000, location: "Huế", rating: 4.6, distance: 6, amenities: ["helmet", "delivery"] }
];

let filteredVehicles = [...vehicles];
const resultsContainer = document.querySelector(".results-content");
const paginationContainer = document.getElementById("pagination-container");
const perPage = 4;
let currentPage = 1;

// Hàm hiển thị danh sách xe
function renderVehicles() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageVehicles = filteredVehicles.slice(start, end);

  if (pageVehicles.length === 0) {
    resultsContainer.innerHTML = "<p>Không có xe nào phù hợp.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  const list = pageVehicles.map((v, i) => `
    <div class="vehicle-result-item">
      <div class="vehicle-image-placeholder"></div>
      <div class="vehicle-info">
        <h3>${v.name}</h3>
        <p class="vehicle-price">${v.price.toLocaleString('vi-VN')}đ/ngày</p>
        <p class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${v.location}</p>
        <div class="vehicle-rating">${"⭐".repeat(Math.floor(v.rating))} (${v.rating})</div>
        <button class="book-now-btn">Đặt thuê</button>
        <button class="book-now-btn detail-btn" data-index="${(currentPage - 1) * perPage + i}">Chi tiết</button>
      </div>
    </div>
  `).join("");

  resultsContainer.innerHTML = list;
}

// Hàm hiển thị phân trang
function renderPagination() {
  const totalPages = Math.ceil(filteredVehicles.length / perPage);
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderVehicles();
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    paginationContainer.appendChild(btn);
  }
}

// Hàm lọc xe theo điều kiện
function filterVehicles() {
  const carType = document.getElementById("car-type")?.value || "";
  const maxPrice = parseInt(priceRange?.value || "1000000");
  const maxDistance = parseInt(distanceRange?.value || "100");

  const starChecks = Array.from(document.querySelectorAll('input[name="star_rating"]:checked'))
                          .map(cb => parseFloat(cb.value));
  const amenityChecks = Array.from(document.querySelectorAll('input[name="amenity"]:checked'))
                             .map(cb => cb.value);

  filteredVehicles = vehicles.filter(vehicle => {
    if (carType && carType !== "all" && vehicle.type !== carType) return false;
    if (vehicle.price > maxPrice) return false;
    if (vehicle.distance > maxDistance) return false;
    if (starChecks.length > 0 && !starChecks.some(star => vehicle.rating >= star)) return false;
    if (amenityChecks.length > 0 && !amenityChecks.every(am => vehicle.amenities.includes(am))) return false;
    return true;
  });

  currentPage = 1;
  renderVehicles();
  renderPagination();
}

// Khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  renderVehicles();
  renderPagination();

  const searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      filterVehicles();
    });
  }

  // Gắn sự kiện nút "Chi tiết"
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("detail-btn")) {
      const index = e.target.getAttribute("data-index");
      const selectedVehicle = filteredVehicles[index];
      localStorage.setItem("selectedVehicle", JSON.stringify(selectedVehicle));
      window.location.href = "chi_tiet/xe1.html";
    }
  });
});
