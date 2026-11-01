async function request(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}
 
export const fetchShoes = () => request("/api/shoes");
 
export const placeOrder = order =>
  request("/api/orders", { method: "POST", body: JSON.stringify(order) });
 
