export const convertStringToTime = (stringTime) => {
  const partsTime = stringTime.split(":")
  const partsMinutesAndPM = partsTime[1].split(" ")
  const date = new Date()

  let hora = parseInt(partsTime[0])
  const minuto = parseInt(partsMinutesAndPM[0])

  if (partsMinutesAndPM[1] === "PM" && hora < 12) {
    hora += 12
  } else if (partsMinutesAndPM[1] === "AM" && hora === 12) {
    hora = 0
  }

  date.setHours(parseInt(hora))
  date.setMinutes(parseInt(minuto))

  return date.toLocaleTimeString("es-MX")
}

export const convertStringToDate = (stringDate) => {
  const date = new Date(stringDate)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${day}/${month}/${year}`
}

export const orderTimes = (arrayTimes) => {
  let arrayTimesOrdered = [...arrayTimes]

  for (let i = 0; i < arrayTimesOrdered.length - 1; i++) {
    let minIndex = i
    const timeParts = getTimeParts(arrayTimesOrdered[minIndex].inicia)
    let minTime = createDateTime(timeParts.hour, timeParts.minute, timeParts.identifier)

    for (let j = i + 1; j < arrayTimesOrdered.length; j++) {
      const currentTimeParts = getTimeParts(arrayTimesOrdered[j].inicia)
      const currentTime = createDateTime(currentTimeParts.hour, currentTimeParts.minute, currentTimeParts.identifier)

      if (currentTime < minTime) {
        minIndex = j
        minTime = currentTime
      }
    }

    if (minIndex !== i) {
      swapElements(arrayTimesOrdered, i, minIndex)
    }
  }

  return arrayTimesOrdered
}

const getTimeParts = (timeString) => {
  const partsTime = timeString.split(":")
  const partsMinutesAndPM = partsTime[1].split(" ")
  const hour = parseInt(partsTime[0])
  const minute = parseInt(partsMinutesAndPM[0])
  const identifier = partsMinutesAndPM[1]
  
  return { hour, minute, identifier }
}

const createDateTime = (hour, minute, identifier) => {
  const date = new Date()

  if (identifier === "PM" && hour <12 ) {
    hour += 12
  } else if (minute === "AM" && hour === 12) {
    hour = 0
  }

  date.setHours(hour)
  date.setMinutes(minute)

  return date.toLocaleTimeString("es-MX")
}

const swapElements = (array, positionA, positionB) => {
  const temp = array[positionA]
  array[positionA] = array[positionB]
  array[positionB] = temp
}


export const deleteElementTimePass = (orderedArray) => {
  const date = new Date()
  const currentTime = date.toLocaleTimeString("es-MX")
  const newArray = orderedArray.filter((element) => {
    const elementTime = convertStringToTime(element.inicia)
    return elementTime > currentTime
  })


  const newArrayOrdered = orderTimes(newArray);

  return newArrayOrdered
}
