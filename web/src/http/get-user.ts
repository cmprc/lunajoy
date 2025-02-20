export async function getUser(): Promise<any> {
  const response = await fetch("http://localhost:3000/auth/status", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
