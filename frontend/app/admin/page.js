"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {

  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addFeed = async () => {

    // validation
    if (!message.trim()) {

      Swal.fire({
        icon: "warning",
        title: "Message Required",
        text: "Please enter a feed message",
      });

      return;
    }

    try {

      setLoading(true);

      // API Call
      await axios.post(
`${process.env.NEXT_PUBLIC_API_URL}/feed`        {
          message,
        }
      );

      // clear input
      setMessage("");

      // success popup
      Swal.fire({
        icon: "success",
        title: "Successfully Added",
        text: "Redirecting to live feed...",
        timer: 2000,
        showConfirmButton: false,
      });

      // redirect
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="container">

      <Link href="/">
        <button
          className="button"
          style={{
            marginBottom: "10px",
          }}
        >
          ← Back to LiveFeed
        </button>
      </Link>

      <div className="form-card">

        <h1 className="title">
          Admin Feed Panel
        </h1>

        <p
          style={{
            color: "gray",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          Add realtime coaching updates instantly
        </p>

        <input
          type="text"
          placeholder="Enter realtime message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="input"
        />

        <button
          onClick={addFeed}
          disabled={loading}
          className="button"
        >
          {
            loading
              ? "Adding..."
              : "Add Feed"
          }
        </button>

      </div>

    </div>
  );
}
