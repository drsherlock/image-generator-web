export const config = {
  API:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://api.imagegen.live"
};
