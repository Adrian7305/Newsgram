const LoadingSkeleton = () => {
  return (
    <div className="skeleton" style={{ padding: 20, background: "#f0f0f0", marginBottom: 10 }}>
      <div style={{ height: 20, background: "#ccc", marginBottom: 5 }} />
      <div style={{ height: 15, background: "#ccc", width: "60%" }} />
    </div>
  );
};

export default LoadingSkeleton;