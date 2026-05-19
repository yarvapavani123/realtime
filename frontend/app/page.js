"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import socket from "../utils/socket";
import FeedCard from "../components/FeedCard";

export default function HomePage() {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getFeeds();

    socket.on("newFeed", (newFeed) => {

      setFeeds((prev) => {

        const exists = prev.find(
          (feed) => feed._id === newFeed._id
        );

        if (exists) return prev;

        return [newFeed, ...prev];
      });
    });

    return () => {
      socket.off("newFeed");
    };

  }, []);

  const getFeeds = async () => {

    try {

      const res = await axios.get(
       `${process.env.NEXT_PUBLIC_API_URL}/feed`
      );

      setFeeds(res.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <div className="header">

        <h1 className="title">
          Realtime Coaching Feed
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >

          <div className="live">
            ● Live Updates
          </div>

          <Link href="/admin">
            <button className="button">
              + Add Feed
            </button>
          </Link>

        </div>

      </div>

      {
        feeds.length === 0 ? (

          <div className="empty">
            No feeds available
          </div>

        ) : (

          feeds.map((feed) => (
            <FeedCard
              key={feed._id}
              feed={feed}
            />
          ))

        )
      }

    </div>
  );
}
