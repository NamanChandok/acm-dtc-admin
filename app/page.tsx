"use client";
import { Logout, Event, PictureAsPdf, Collections } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";

export default function Home() {

  const handleLogout = async () => {
    await fetch("/api/signout");
    window.location.href = "/login";
  };

  return (
    <main className="p-8 md:p-10">

    <IconButton onClick={handleLogout} color="primary">
      <Logout fontSize="large" />
    </IconButton>

      <h1 className="text-3xl font-semibold py-4">Welcome</h1>

      <Button variant="contained" disableElevation href="/event" startIcon={<Event />}>Upload Event Data</Button>
      <br /><br />

      <Button variant="contained" disableElevation href="/gallery" startIcon={<Collections />}>Upload Gallery Data</Button>
      <br /><br />

      <Button variant="contained" disableElevation href="/resource" startIcon={<PictureAsPdf />}>Upload Resources Data</Button>

    </main>
  );
}
