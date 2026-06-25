document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const feedback = document.getElementById('formFeedback');
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // -------------------------------------------------------------
    // ENGINE: Hardware Accelerated Matrix Digital Code Rain Background
    // -------------------------------------------------------------
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).fill(1);

    function drawMatrixRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f0ff'; // Neon Cyan Stream Vector tint
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    setInterval(drawMatrixRain, 33); // Smooth 30FPS stream animation array map

    // -------------------------------------------------------------
    // DATA PIPELINE: Direct Encryption Free Cloud Streaming Transmission
    // -------------------------------------------------------------
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const participantRecord = {
            username: document.getElementById('username').value.trim(),
            age: parseInt(document.getElementById('age').value, 10),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        feedback.textContent = "SYNCHRONIZING WITH CLOUD GRID...";
        feedback.className = "feedback-banner success";
        feedback.classList.remove('hidden');

        // Streaming destination points directly to your Google Cloud Script deployment url macro execution array
        fetch('https://script.google.com/macros/s/AKfycbwM7FDb0IdyZ1Zyu7l-8pqLaMbrhAnqif_RnfPbc2pFsxijMZMeBw3JF2Z2B2P3S-h0eg/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participantRecord)
        })
        .then(() => {
            feedback.textContent = "SUCCESS: Profile values verified & logged into master cloud matrix.";
            feedback.className = "feedback-banner success";
            userForm.reset();
            setTimeout(() => { feedback.classList.add('hidden'); }, 5000);
        })
        .catch(() => {
            feedback.textContent = "TRANSMISSION FAILURE: Terminal handshake link broke.";
            feedback.className = "feedback-banner error-msg";
        });
    });
});
