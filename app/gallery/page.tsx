"use client";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { IconButton, Autocomplete, Button, TextField } from "@mui/material";
import { db, storage } from "@/firebase";
import { MuiFileInput } from "mui-file-input";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Home() {
    
    interface Event {
        id: string;
        name: string;
    }

    const [event, setEvent] = useState<Event | null>(null);

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const eventsRef = collection(db, 'events');
        getDocs(eventsRef).then((snapshot) => {
            snapshot.forEach((doc) => {
                setEvents((prevEvents) => {
                    if (prevEvents.find((event) => event.id === doc.id)) {
                        return prevEvents;
                    }
                    return [...prevEvents, {id: doc.id, name: doc.data().name}];
                });
            });
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const [files, setFiles] = useState<File[]>([]);
    const [upload, setUpload] = useState('Upload Data');

    const handleSubmit = async (e:any) => {
        getAuth();
        e.preventDefault();
        setUpload('Uploading...');
        const id = event?.id;
        files.forEach((file, index) => {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                alert('Please upload only .jpg or .png files');
                setUpload('Upload Data');
                return;
            }
            const fileRef = ref(storage, 'gallery/' + id + '/' + file.name);
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

      <h1 className="text-3xl font-semibold py-4">Upload Gallery Data</h1>

      <form onSubmit={handleSubmit} className="grid gap-4" >

        <div className="flex flex-col gap-1">
            <label htmlFor="eventName" className="font-medium">Event Name*</label>
            <Autocomplete options={events} value={event} onChange={(e, newValue)=>setEvent(newValue)} getOptionLabel={(option) => option.name} fullWidth renderInput={(params) => <TextField {...params} placeholder="ACM Event" required />} />
        </div>
        
        <div className="flex flex-col gap-1">
            <label htmlFor="eventCover" className="font-medium">Event Images*</label>
            <MuiFileInput required multiple fullWidth value={files} placeholder="Upload .jpg, .jpeg or .png" onChange={(newValue)=>setFiles(newValue)} /> 
        </div>

        <Button type="submit" variant="contained" disabled={upload == "Uploading..."} disableElevation color="primary">{upload}</Button>
      </form>

    </main>
  );
}
