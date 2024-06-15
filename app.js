function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files.length > 0) {
        const file = input.files[0];
        const fileName = file.name;
        const contentType = file.type;  // Make sure this matches the file type

        // Fetch the signed URL from your Google Cloud Function
        fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/generate_signed_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName: fileName,
                contentType: contentType
            })
        })
        .then(response => response.json())
        .then(data => {
            const uploadUrl = data.url;

            // Upload the file to Google Cloud Storage using the signed URL
            fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': contentType
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
                console.error('Error uploading image:', error);
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
