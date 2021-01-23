const vision = require("@google-cloud/vision")

const { createWorker } = require("tesseract.js")

// client tesseract
const worker = createWorker()

// Creates a client g
const client = new vision.ImageAnnotatorClient()

const fileName = "res/passport.jpg"

const app = async () => {
  // google vision - veloce e affidabile
  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log("Text:")
  //detections.forEach((text) => console.log(text))
  console.log(detections[0])

  // tesseract - lentissimo
  await worker.load()
  await worker.loadLanguage("eng")
  await worker.initialize("eng")
  const {
    data: { text },
  } = await worker.recognize(fileName)
  console.log(text)
  await worker.terminate()
}

app()
