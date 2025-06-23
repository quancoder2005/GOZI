// Script/owner-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    const menuItems = document.querySelectorAll(".menu-item");
    const dashboardSections = document.querySelectorAll(".dashboard-section");
    const vehicleTableBody = document.getElementById("vehicleTableBody");

    // Dummy data for owner's vehicles (replace with actual data from backend later)
    const ownerVehicles = [
        { id: 1, name: "Yamaha Exciter 155", status: "renting" },
        { id: 2, name: "Honda SH Mode", status: "available" },
        { id: 3, name: "Toyota Vios", status: "available" },
        { id: 4, name: "VinFast Klara S", status: "renting" },
        { id: 5, name: "Honda Wave Alpha", status: "available" }
    ];

    // Function to render vehicle list
    function renderVehicleList() {
        vehicleTableBody.innerHTML = ''; // Clear existing rows
        if (ownerVehicles.length === 0) {
            vehicleTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Bạn chưa đăng ký xe nào.</td></tr>';
            return;
        }

        ownerVehicles.forEach(vehicle => {
            const statusClass = vehicle.status === 'renting' ? 'status-renting' : 'status-available';
            const statusText = vehicle.status === 'renting' ? 'Đang thuê' : 'Có sẵn';

            const row = `
                <tr>
                    <td>${vehicle.name}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" data-id="${vehicle.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${vehicle.id}" title="Xóa"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            vehicleTableBody.insertAdjacentHTML('beforeend', row);
        });

        // Add event listeners for edit/delete buttons (example)
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vehicleId = e.currentTarget.dataset.id;
                alert(`Sửa xe với ID: ${vehicleId}`);
                // Implement actual edit logic (e.g., open a form, fetch data)
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const vehicleId = e.currentTarget.dataset.id;
                if (confirm(`Bạn có chắc chắn muốn xóa xe này (ID: ${vehicleId})?`)) {
                    // Implement actual delete logic (e.g., send API request, remove from array)
                    // For demo, just remove from DOM:
                    e.currentTarget.closest('tr').remove();
                    alert(`Đã xóa xe ID: ${vehicleId}`);
                }
            });
        });
    }

    // Initial render of vehicle list
    renderVehicleList();

    // Sidebar Toggle
    toggleSidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        // For mobile, also toggle nav-open for full menu display
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle("nav-open");
        }
    });

    // Menu Item Click Handler
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active from all menu items
            menuItems.forEach(i => i.classList.remove("active"));
            // Add active to clicked item
            item.classList.add("active");

            // Hide all dashboard sections
            dashboardSections.forEach(section => section.classList.remove("active"));

            // Show the corresponding section
            const targetContentId = item.dataset.content;
            const targetSection = document.getElementById(targetContentId);
            if (targetSection) {
                targetSection.classList.add("active");
                // If the vehicle list is active, re-render it to ensure it's up-to-date
                if (targetContentId === 'vehicle-list') {
                    renderVehicleList();
                }
            }
            
            // On mobile, close sidebar after selecting an item
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("nav-open");
            }
        });
    });

    // Add New Vehicle Button Handler (example)
    const addVehicleBtn = document.querySelector(".add-vehicle-btn");
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener("click", () => {
            alert("Chuyển đến trang/form thêm xe mới!");
            // Implement logic to navigate to add vehicle form or open a modal
        });
    }

    // Handle initial active state for sections
    const initialActiveMenuItem = document.querySelector(".menu-item.active");
    if (initialActiveMenuItem) {
        const initialTargetContentId = initialActiveMenuItem.dataset.content;
        const initialTargetSection = document.getElementById(initialTargetContentId);
        if (initialTargetSection) {
            initialTargetSection.classList.add("active");
        }
    }
});