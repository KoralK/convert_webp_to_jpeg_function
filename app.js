function uploadAndDownloadImage() {
    const input = document.getElementById('uploadInput');
    const statusMessage = document.getElementById('statusMessage');
    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        statusMessage.textContent = 'Uploading and converting the image...';

        fetch('https://us-central1-your-project-id.cloudfunctions.net/convertWebpToPng', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                statusMessage.innerHTML = `Conversion successful! Download your image <a href="${data.url}">here</a>.`;
            } else {
                throw new Error('No URL was returned by the server.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = 'Failed to convert the image: ' + error.message;
        });
    } else {
        alert('Please select a file to upload.');
    }
}
