// Script/admin-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    const menuItems = document.querySelectorAll(".menu-item");
    const dashboardSections = document.querySelectorAll(".dashboard-section");

    const logoutItem = document.getElementById("logout-item"); 

    const dashboardStats = {
        totalUsers: 1250,
        totalVehicles: 300,
        totalRevenue: 250000000 // VND
    };

    // --- Các mảng dữ liệu để tạo tên ngẫu nhiên ---
    const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Đặng", "Bùi"];
    const middleNames = ["Thị", "Văn", "Minh", "Thanh", "Bảo", "Kim", "Anh", "Đức", "Trọng", "Hồng"];
    const firstNames = ["An", "Bình", "Châu", "Dung", "Hùng", "Lan", "Nam", "Quang", "Thảo", "Long", "Tuấn", "Hà", "Yến", "Khoa", "Vân", "Hiếu"];
    const vehicleNames = ["Yamaha Exciter 155", "Honda SH Mode", "Toyota Vios", "VinFast Klara S", "Honda Wave Alpha", "Ford Ranger", "Mazda 3", "Hyundai Accent"];


    // Hàm tạo tên đầy đủ ngẫu nhiên (Giữ nguyên từ lần trước)
    function generateRandomFullName() {
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let randomMiddleName = '';
        if (Math.random() > 0.3) { 
            randomMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)] + ' ';
        }
        return `${randomLastName} ${randomMiddleName}${randomFirstName}`;
    }

    // Hàm tạo email ngẫu nhiên từ tên (Giữ nguyên từ lần trước)
    function generateRandomEmail(fullName) {
        const slugName = fullName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, '.');
        const domains = ["example.com", "mail.com", "company.net", "gozi.com"];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomNumber = Math.floor(Math.random() * 1000); 
        return `${slugName}${randomNumber}@${randomDomain}`;
    }

    // Hàm tạo một người dùng ngẫu nhiên (Giữ nguyên từ lần trước)
    function generateRandomUser() {
        const fullName = generateRandomFullName();
        const email = generateRandomEmail(fullName);
        const roles = ["Khách hàng", "Chủ xe"];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        return { name: fullName, email: email, role: randomRole };
    }

    // Tạo N người dùng ngẫu nhiên cho danh sách gần đây
    const numberOfRecentUsers = 5; 
    const recentUsers = Array.from({ length: numberOfRecentUsers }, () => generateRandomUser());


    // --- Hàm tạo ngày ngẫu nhiên trong một khoảng thời gian ---
    function generateRandomDate(start, end) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // --- Hàm tạo một đơn đặt xe ngẫu nhiên ---
    function generateRandomBooking() {
        const randomVehicle = vehicleNames[Math.floor(Math.random() * vehicleNames.length)];
        const randomRenter = generateRandomFullName(); // Sử dụng hàm tạo tên ngẫu nhiên
        const statuses = ["completed", "pending", "active"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Giới hạn ngày trong 30 ngày tới
        const startDate = new Date(); // Ngày hiện tại
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30); // 30 ngày tới

        const randomDate = generateRandomDate(startDate, endDate);

        return {
            vehicle: randomVehicle,
            renter: randomRenter,
            date: randomDate,
            status: randomStatus
        };
    }

    // Tạo N đơn đặt xe ngẫu nhiên cho danh sách gần đây
    const numberOfRecentBookings = 5; // Số lượng đơn đặt xe bạn muốn hiển thị
    const recentBookings = Array.from({ length: numberOfRecentBookings }, () => generateRandomBooking());


    // Function to update dashboard stats
    function updateDashboardStats() {
        document.getElementById("total-users").textContent = dashboardStats.totalUsers.toLocaleString('vi-VN');
        document.getElementById("total-vehicles").textContent = dashboardStats.totalVehicles.toLocaleString('vi-VN');
        document.getElementById("total-revenue").textContent = `${dashboardStats.totalRevenue.toLocaleString('vi-VN')}đ`;
    }

    // Function to render recent users table (không thay đổi)
    function renderRecentUsers() {
        const tableBody = document.getElementById("recentUsersTableBody");
        tableBody.innerHTML = '';
        recentUsers.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Function to render recent bookings table (sẽ sử dụng dữ liệu mới)
    function renderRecentBookings() {
        const tableBody = document.getElementById("recentBookingsTableBody");
        tableBody.innerHTML = '';
        recentBookings.forEach(booking => {
            let statusClass = '';
            let statusText = '';
            switch (booking.status) {
                case 'completed':
                    statusClass = 'status-completed';
                    statusText = 'Hoàn thành';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Đang chờ';
                    break;
                case 'active':
                    statusClass = 'status-active';
                    statusText = 'Đang hoạt động';
                    break;
                default:
                    statusClass = '';
                    statusText = booking.status;
            }

            const row = `
                <tr>
                    <td>${booking.vehicle}</td>
                    <td>${booking.renter}</td>
                    <td>${booking.date}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Initial render for overview section when the page loads
    updateDashboardStats();
    renderRecentUsers();
    renderRecentBookings(); // Sẽ hiển thị đơn đặt xe với tên người thuê ngẫu nhiên

    // Sidebar Toggle
    toggleSidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle("nav-open");
        }
    });

    // Menu Item Click Handler
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            if (item.id !== "logout-item") { 
                menuItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                dashboardSections.forEach(section => section.classList.remove("active"));

                const targetContentId = item.dataset.content;
                const targetSection = document.getElementById(targetContentId);
                if (targetSection) {
                    targetSection.classList.add("active");
                    if (targetContentId === 'overview') {
                        updateDashboardStats();
                        renderRecentUsers();
                        renderRecentBookings(); // Đảm bảo đơn đặt xe ngẫu nhiên được render lại
                    }
                }
            }
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("nav-open");
            }
        });
    });

    // Handle "Xem tất cả" links to switch sections
    document.querySelectorAll(".view-all-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            const targetSectionId = e.currentTarget.dataset.target;

            menuItems.forEach(item => {
                if (item.dataset.content === targetSectionId) {
                    item.click(); 
                }
            });
        });
    });

    // Add New Button Handler (example for users/vehicles sections)
    document.querySelectorAll(".add-new-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Mở form thêm mới (người dùng/xe)!");
        });
    });

    // Thêm xử lý sự kiện cho nút Đăng xuất
    if (logoutItem) {
        logoutItem.addEventListener("click", () => {
            alert("Đang đăng xuất..."); 
            window.location.href = "index.html"; 
        });
    }

    // Initial active state for sections on page load
    const initialActiveMenuItem = document.querySelector(".menu-item.active");
    if (initialActiveMenuItem) {
        const initialTargetContentId = initialActiveMenuItem.dataset.content;
        const initialTargetSection = document.getElementById(initialTargetContentId);
        if (initialTargetSection) {
            initialTargetSection.classList.add("active");
        }
    }
});