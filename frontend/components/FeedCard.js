export default function FeedCard({ feed }) {
  return (
    <div className="card">

      <div className="feed-message">
        {feed.message}
      </div>

      <div className="feed-time">
        {new Date(feed.createdAt).toLocaleString()}
      </div>

    </div>
  );
}