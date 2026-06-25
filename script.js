document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const feedback = document.getElementById('formFeedback');

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const participantRecord = {
            username: document.getElementById('username').value.trim(),
            age: parseInt(document.getElementById('age').value, 10),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        feedback.textContent = "TRANSMITTING DATA...";
        feedback.className = "success";

        // Connected directly to your personal unverified deployment gateway instance
        fetch('https://script.google.com/macros/s/AKfycbwM7FDb0IdyZ1Zyu7l-8pqLaMbrhAnqif_RnfPbc2pFsxijMZMeBw3JF2Z2B2P3S-h0eg/exec', {
            method: 'POST',
            mode: 'no-cors', // Crucial parameter flag for Google infrastructure execution
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participantRecord)
        })
        .then(() => {
            feedback.textContent = "SUCCESS: Profile logged to master cloud database.";
            feedback.className = "success";
            userForm.reset();
            setTimeout(() => { feedback.className = "hidden"; }, 4000);
        })
        .catch(() => {
            feedback.textContent = "ERROR: Transmission failed.";
            feedback.className = "error-msg";
        });
    });
});
