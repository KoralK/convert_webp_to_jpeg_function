function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Fetch the upload URL from your server or a signed URL generator
        fetch('https://your-server.com/get-signed-url', {
            method: 'GET', // Or 'POST' if you are sending data to generate URL
        })
        .then(response => response.json())
        .then(data => {
            const uploadUrl = data.url; // Ensure this URL is the signed URL for uploads

            // Upload the file to Google Cloud Storage directly
            fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/webp'
                },
                body: file
            })
            .then(response => {
                if (response.ok) {
                    console.log('Image uploaded successfully');
                    alert('Upload successful!');
                } else {
                    throw new Error('Upload failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Upload failed');
            });
        })
        .catch(error => {
            console.error('Error getting signed URL:', error);
            alert('Failed to get upload URL');
        });
    } else {
        alert('Please select a file to upload');
    }
}
