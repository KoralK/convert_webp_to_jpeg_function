function uploadAndDownloadImage() {
    const input = document.getElementById('uploadInput');
    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Adjust this URL to your actual function endpoint
        fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/generate_signed_url', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.url;
            console.log('Image URL:', imageUrl);
            // Automatically triggers a download of the image
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = 'converted_image.png'; // This forces download if supported
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Error uploading and downloading image:', error);
        });
    } else {
        alert('Please select a file to upload');
    }
}
