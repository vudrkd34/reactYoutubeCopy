import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageDropzone({onValueChange}) {

    


    const onDrop = useCallback(acceptedFiles => {
        // 여기에서 파일을 처리합니다.
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const binaryStr = reader.result;
                //console.log(binaryStr); // 여기에서 파일을 처리합니다.
                
                onValueChange(binaryStr);
            };
            reader.readAsDataURL(file);
        });

        
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()}  />
            {
                isDragActive ?
                    <p>이미지를 여기에 놓으세요...</p> :
                    <p>이미지를 드래그하거나 클릭하여 업로드하세요.</p>
            }
        </div>
    );
}

const styles = {
    dropzone: {
        border: '2px dashed #cccccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer'
    }
};

export default ImageDropzone;
