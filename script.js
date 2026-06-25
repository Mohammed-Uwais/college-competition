document.addEventListener('DOMContentLoaded', () => {
    // Component Form Hooking Handles
    const adminPortalBtn = document.getElementById('admin-portal-btn');
    const adminSection = document.getElementById('admin-section');
    const registrationSection = document.getElementById('registration');
    const userForm = document.getElementById('userForm');
    const feedback = document.getElementById('formFeedback');
    const downloadDataBtn = document.getElementById('downloadDataBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const displayArea = document.getElementById('displayArea');

    // -------------------------------------------------------------
    // CONTROL LAYER: Secure Verification Gateway Panel
    // -------------------------------------------------------------
    adminPortalBtn.addEventListener('click', () => {
        // If already looking at admin block, toggle back out smoothly
        if (!adminSection.classList.contains('hidden')) {
            adminSection.classList.add('hidden');
            registrationSection.classList.remove('hidden');
            adminPortalBtn.textContent = "🔒 Admin Panel";
            return;
        }

        // Standard verification window prompt request
        const accessPassphrase = prompt("Enter Administration Verification Key:");
        
        if (accessPassphrase === "admin123") { // CHANGE YOUR PASSWORD HERE
            adminSection.classList.remove('hidden');
            registrationSection.classList.add('hidden');
            adminPortalBtn.textContent = "🔓 Exit Admin";
            renderAdminDashboardLogs();
        } else if (accessPassphrase !== null) {
            alert("ACCESS DENIED: Authentication parameters matching failure.");
        }
    });

    // -------------------------------------------------------------
    // DATA LAYER: Submit Form Values Into Local Device Memory
    // -------------------------------------------------------------
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const participantRecord = {
            username: document.getElementById('username').value.trim(),
            age: parseInt(document.getElementById('age').value, 10),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            timestamp: new Date().toLocaleString()
        };

        try {
            let activeRegistry = JSON.parse(localStorage.getItem('collegeCompDatabase')) || [];
            activeRegistry.push(participantRecord);
            localStorage.setItem('collegeCompDatabase', JSON.stringify(activeRegistry));

            feedback.textContent = "SUCCESS: Registration entry recorded successfully!";
            feedback.className = "success";
            userForm.reset();

            // Clear visual notification safely after timeout delay
            setTimeout(() => { feedback.className = "hidden"; }, 4000);

        } catch (error) {
            feedback.textContent = "SYSTEM ERROR: Failed writing values to device matrix space.";
            feedback.className = "error-msg";
        }
    });

    // -------------------------------------------------------------
    // OUTPUT LAYER: Read Registry and Export to Excel-Compatible CSV
    // -------------------------------------------------------------
    function renderAdminDashboardLogs() {
        const storedRegistry = JSON.parse(localStorage.getItem('collegeCompDatabase')) || [];

        if (storedRegistry.length === 0) {
            displayArea.innerHTML = "<p style='text-align:center; opacity:0.6;'>No participant logs currently found inside browser storage maps.</p>";
            return;
        }

        let dynamicHtml = "";
        storedRegistry.forEach((profile, index) => {
            dynamicHtml += `
                <div class="user-entry-card">
                    <p><strong>ENTRY NO:</strong> #${index + 1}</p>
                    <p><strong>NAME:</strong> ${escapeHtml(profile.username)}</p>
                    <p><strong>AGE:</strong> ${profile.age}</p>
                    <p><strong>PHONE:</strong> ${escapeHtml(profile.phone)}</p>
                    <p><strong>EMAIL:</strong> ${escapeHtml(profile.email)}</p>
                    <p style="margin-top:6px; font-size:11px; opacity:0.4;">STAMP: ${profile.timestamp}</p>
                </div>`;
        });
        displayArea.innerHTML = dynamicHtml;
    }

    // Gathers and converts storage array into an instantly downloadable Excel CSV sheet file
    downloadDataBtn.addEventListener('click', () => {
        const dataEntries = JSON.parse(localStorage.getItem('collegeCompDatabase')) || [];

        if (dataEntries.length === 0) {
            alert("No participant records available to export!");
            return;
        }

        // Build standard document matrix framework for Excel parsing
        let csvContent = "\uFEFF"; // Byte Order Mark (BOM) ensuring Excel parses special text configurations perfectly
        csvContent += "Entry ID,Full Name,Age,Phone Number,Email ID,Timestamp\n";

        dataEntries.forEach((user, index) => {
            // Standard formatting framework parameters ensuring comma parsing strings stay cleanly matched inside cell boundaries
            let name = `"${user.username.replace(/"/g, '""')}"`;
            let phone = `"${user.phone.replace(/"/g, '""')}"`;
            let email = `"${user.email.replace(/"/g, '""')}"`;
            
            csvContent += `${index + 1},${name},${user.age},${phone},${email},"${user.timestamp}"\n`;
        });

        // Fire physical device download pipeline transaction
        const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const objectUrl = URL.createObjectURL(dataBlob);
        const processingTriggerLink = document.createElement('a');
        
        processingTriggerLink.href = objectUrl;
        processingTriggerLink.download = 'College_Competition_Registrations.csv'; // Saves directly as an Excel Sheet file!
        document.body.appendChild(processingTriggerLink);
        processingTriggerLink.click();
        
        // Clean memory structures completely
        document.body.removeChild(processingTriggerLink);
        URL.revokeObjectURL(objectUrl);
    });

    // Wipe storage maps completely from device execution frames
    clearDataBtn.addEventListener('click', () => {
        if (confirm("CRITICAL WARNING: This will permanently purge ALL participant records from this system instance. Proceed?")) {
            localStorage.removeItem('collegeCompDatabase');
            displayArea.innerHTML = "";
            alert("System instance registry successfully cleared.");
            renderAdminDashboardLogs();
        }
    });

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
