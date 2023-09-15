import ytdl from "ytdl-core"
import fs from "fs"

export const dowload = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o dowload do video: " + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const segundos = info.formats[0].approxDurationMs / 1000
        if (segundos > 60) {
          throw new Error("A duração do vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Dowload do vídeo concluido!")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel concluir o dowload do vídeo. \nDetalhes do Error: " +
            error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
