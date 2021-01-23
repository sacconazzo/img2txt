const vision = require("@google-cloud/vision")

const { createWorker } = require("tesseract.js")

const mobilenet = require("@tensorflow-models/mobilenet")

//const img = document.getElementById('img');

// client tesseract
const worker = createWorker()

// Creates a client googleVision
const client = new vision.ImageAnnotatorClient()

const fileName = "res/passport.jpg"

const app = async () => {
  // google vision - veloce e affidabile
  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log("Text:")
  //detections.forEach((text) => console.log(text))
  console.log(detections[0])

  // TensorFlow - Classify the image
  const model = await mobilenet.load()

  const predictions = await model.classify(fileName)

  console.log("Predictions: ")
  console.log(predictions)

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
