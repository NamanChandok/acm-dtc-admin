"use client";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { IconButton, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiFileInput } from "mui-file-input";
import { db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [upload, setUpload] = useState("Upload Event");
  const [dateAfter, setDateAfter] = useState<boolean>(false);

  useEffect(() => {
    const today = dayjs();
    if (date) {
      if (date.isAfter(today)) {
        setDateAfter(true);
      } else {
        setDateAfter(false);
      }
    }
  }, [date]);

  const handleSubmit = async (event: any) => {
    getAuth();
    event.preventDefault();
    setUpload("Uploading...");
    if (file?.type !== "image/jpeg" && file?.type !== "image/png") {
      alert("Please upload only .jpg or .png file");
      setUpload("Upload Event");
      return;
    }
    const name = event.target.eventName.value;
    const date = dayjs(event.target.eventDate.value).format("MMMM DD, YYYY");
    const description = event.target.eventDescription.value.replace(
      /\n/g,
      "<br>",
    );
    const link = event.target.eventLink.value;
    const id =
      name
        .toLowerCase()
        .replace(",", "%2C")
        .replace(".", "%2E")
        .replace("(", "%28")
        .replace(")", "%29")
        .replace("*", "%2A")
        .replace("/", "%2F")
        .replace(/\s/g, "-") +
      "-" +
      dayjs(date).format("YYYY-MM-DD");
    const fFormat = file?.name.split(".").pop();
    const storageRef = ref(storage, "gallery/" + id + "/" + "0." + fFormat);
    uploadBytes(storageRef, file as Blob)
      .then((snapshot) => {
        const docRef = doc(db, "events", id);
        const eventDoc = {
          name: name,
          date: date,
          description: description,
          link: link,
          cover: `https://firebasestorage.googleapis.com/v0/b/acm-dtc.appspot.com/o/gallery%2F${id}%2F0.${fFormat}?alt=media`,
        };
        setDoc(docRef, eventDoc)
          .then(() => {
            window.location.href = "/";
          })
          .catch((error) => {
            console.error(error);
            setUpload("Upload Event");
          });
      })
      .catch((error) => {
        console.error(error);
        setUpload("Upload Event");
      });
  };

  return (
    <main className="p-8 md:p-10">
      <IconButton href="/" color="primary">
        <KeyboardDoubleArrowLeft fontSize="large" />
      </IconButton>

      <h1 className="text-3xl font-semibold py-4">Upload Event Data</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="eventName" className="font-medium">
            Event Name*
          </label>
          <TextField
            required
            id="eventName"
            placeholder="ACM Event"
            fullWidth
          />
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventDate" className="font-medium">
              Event Date*
            </label>
            <DatePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{
                textField: {
                  id: "eventDate",
                  required: true,
                  placeholder: "MM/DD/YYYY",
                  fullWidth: true,
                },
              }}
            />
          </div>
        </LocalizationProvider>

        <div className="flex flex-col gap-1">
          <label htmlFor="eventCover" className="font-medium">
            Event Cover Image*
          </label>
          <MuiFileInput
            id="eventCover"
            placeholder="Upload .jpg, .jpeg or .png"
            required
            value={file}
            onChange={(newValue) => setFile(newValue)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="eventLink" className="font-medium">
            Event Registration Link{dateAfter ? "*" : ""}
          </label>
          <TextField
            id="eventLink"
            required={dateAfter}
            placeholder="Google Form Link"
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="eventDescription" className="font-medium">
            Event Description*
          </label>
          <TextField
            required
            id="eventDescription"
            multiline
            minRows={4}
            placeholder="1 or 2 paragraphs about the event."
            fullWidth
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={upload == "Uploading..."}
          disableElevation
          color="primary"
        >
          {upload}
        </Button>
      </form>
    </main>
  );
}
