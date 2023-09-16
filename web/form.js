import { server } from "./server.js"
const form = document.querySelector("#form")
const url = document.querySelector("#url")
const erro = document.querySelector("#erro")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  const videoURL = url.value

  if (!videoURL.includes("/shorts/")) {
    erro.textContent = "Esse vídeo não é um shorts!"
    setTimeout(() => {
      erro.textContent = ""
    }, 10000)
  }

  const [youtube, videoID2, params] = videoURL.split("/shorts/")
  const [videoID] = videoID2.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
  
})
