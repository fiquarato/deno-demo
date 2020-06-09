console.log("Deno works with JavaScript and TypeScript");

const response = await fetch(
  "https://www.example.com/",
);
const data = await response.json();
console.log(data.results[0].slug);
