import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const FileUploader = () => {
    const [files, setFiles] = useState([]);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const { files } = event.dataTransfer;
        if (files.length) {
            Array.from(files).forEach(file => {
                setFiles(prevFiles => [...prevFiles, { file, name: file.name, progress: 0 }]);
                uploadFile(file);
            });
        }
    };

    const uploadFile = (file) => {
        const url = 'https://jsonplaceholder.typicode.com/photos';
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                updateFileProgress(file.name, progress);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                updateFileProgress(file.name, 100);
            } else {
                console.error('Error uploading file:', xhr.responseText);
            }
        };

        xhr.onerror = () => {
            console.error('Error uploading file:', xhr.statusText);
        };

        xhr.send(formData);
    };

    const updateFileProgress = (fileName, progress) => {
        setFiles(prevFiles =>
            prevFiles.map(f => f.name === fileName ? { ...f, progress } : f)
        );
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="uploader"
        >
            <p>Drag and drop files here, or click to select files</p>
            {files.map((file, index) => (
                <div key={index} className={"mt-10"}>
                    <div>{file.name}</div>
                    <ProgressBar progress={file.progress} />
                </div>
            ))}
        </div>
    );
};

export default FileUploader;
