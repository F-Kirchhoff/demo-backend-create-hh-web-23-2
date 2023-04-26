import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg), // arg === jokeData
  });

  const data = await response.json();
  console.log(data);
}

export default function JokeForm() {
  const { trigger } = useSWRMutation("/api/jokes", sendRequest);

  async function handleCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    // { joke: 'text in input'}

    trigger(jokeData); // jokeData => arg
  }

  return (
    <form onSubmit={handleCreate}>
      <label htmlFor="joke-input">Enter a new joke</label>
      <input type="text" id="joke-input" name="joke" />
      <button type="submit">Submit</button>
    </form>
  );
}
