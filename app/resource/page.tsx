"use client";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { IconButton, Autocomplete, Button, TextField } from "@mui/material";
import { storage } from "@/firebase";
import { MuiFileInput } from "mui-file-input";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function Home() {

    const [files, setFiles] = useState<File[]>([]);
    const [upload, setUpload] = useState('Upload Data');

    const handleSubmit = async (e:any) => {
        getAuth();
        e.preventDefault();
        setUpload('Uploading...');
        files.forEach((file, index) => {
            if (file.type !== 'application/pdf') {
                alert('Please upload only .pdf files');
                setUpload('Upload Data');
                return;
            }
            const fileRef = ref(storage, 'resources/' + file.name);
            uploadBytes(fileRef, file as Blob).then((snapshot) => {
                if (index === files.length - 1) {
                    window.location.href = '/';
                }
            }).catch((error) => {
                console.error(error);
                setUpload('Upload Data');
            });
        });
    };

    useEffect(() => {console.log(event)}, [event]);

  return (
    <main className="p-8 md:p-10">

    <IconButton href="/" color="primary">
      <KeyboardDoubleArrowLeft fontSize="large" />
    </IconButton>

      <h1 className="text-3xl font-semibold py-4">Upload Resources Data</h1>

      <form onSubmit={handleSubmit} className="grid gap-4" >
        
        <div className="flex flex-col gap-1">
            <label htmlFor="eventCover" className="font-medium">Resource File*</label>
            <MuiFileInput required multiple fullWidth value={files} placeholder="Upload .pdf" onChange={(newValue)=>setFiles(newValue)} /> 
        </div>

        <Button type="submit" variant="contained" disabled={upload == "Uploading..."} disableElevation color="primary">{upload}</Button>
      </form>

    </main>
  );
}
