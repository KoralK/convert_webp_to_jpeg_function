function uploadAndDownloadImage() {
    const input = document.getElementById('uploadInput');
    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Create an object to hold the data you will send
        const dataToSend = {
            fileName: file.name,
            contentType: file.type
        };

        // Adjust this URL to your actual function endpoint
        fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/generate_signed_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Set Content-Type to application/json
            },
            body: JSON.stringify(dataToSend), // Make sure to send JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.url) {
                console.log('Image URL:', data.url);
                // Automatically triggers a download of the image
                const a = document.createElement('a');
                a.href = data.url;
                a.download = 'converted_image.png'; // This forces download if supported
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                console.error('No URL was provided by the server.', data);
                alert('Failed to get the image URL.');
            }
        })
        .catch(error => {
            console.error('Error uploading and downloading image:', error);
            alert('Error while uploading or downloading the image.');
        });
    } else {
        alert('Please select a file to upload');
    }
}
