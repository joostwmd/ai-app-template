export async function decreaseUserTokens(userId: string) {
  try {
    const endpoint =
      "https://europe-west3-gamechar-ai.cloudfunctions.net/decreaseUserTokens"
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
    console.log("decreaseUserToken", res)
  } catch (error) {
    console.error(error)
  }
}
