//MTech CFIS

subjectCodesNamesCodes = {
  MMA20I009: {
    subjectName: "Mathematics for CFIS",
    gcrCode: "zdy-egbb-izv",
  },
  MCS20I001: {
    subjectName: "Digital Forensics",
    gcrCode: "ttd-cetu-udq",
  },
  MCS20IE01: {
    subjectName: "Vulnerability Assessment and Penetration Testing",
    gcrCode: "fxx-fwhj-rpc",
  },
  MCS20IE06: {
    subjectName: "Advanced Computer Networks Security",
    gcrCode: "ymr-mhfc-dif",
  },
  MET20RM01: {
    subjectName: "Research Methodology and IPR",
    gcrCode: "fgw-gsnt-mif",
  },
  MET20AU07: {
    subjectName: "Stress Management by Yoga",
    gcrCode: "kcv-dnvs-qoy",
  },
  MC20IL001: {
    subjectName: "Digital Forensics Lab",
    gcrCode: "ttd-cetu-udq",
  },
  MCS20IEL1: {
    subjectName: "Vulnerability Assessment and Penetration Testing Lab",
    gcrCode: "xeg-wkay-zpv",
  },
  "MC20IL001 / MCS20IEL1": {
    subjectName: "Digital Forensics Lab / VAPT Lab",
    gcrCode: "ttd-cetu-udq/xeg-wkay-zpv",
  },
  BREAK: {
    subjectName: "Break",
    gcrCode: "None",
  },
  SEMINAR: {
    subjectName: "Seminar",
    gcrCode: "anm-srsq-yqf",
  },
  NONE: {
    subjectName: "None",
    gcrCode: "None",
  },
}

periodIntervals = {
  1: {
    startTime: { hour: "9", minute: "30" },
    endTime: { hour: "10", minute: "20" },
  },
  2: {
    startTime: { hour: "10", minute: "20" },
    endTime: { hour: "11", minute: "10" },
  },
  3: {
    startTime: { hour: "11", minute: "10" },
    endTime: { hour: "11", minute: "30" },
  },
  4: {
    startTime: { hour: "11", minute: "30" },
    endTime: { hour: "12", minute: "20" },
  },
  5: {
    startTime: { hour: "12", minute: "20" },
    endTime: { hour: "13", minute: "10" },
  },
  6: {
    startTime: { hour: "14", minute: "00" },
    endTime: { hour: "15", minute: "00" },
  },
}

timeTable = {
  monday: {
    1: "MMA20I009",
    2: "MCS20I001",
    3: "BREAK",
    4: "MET20AU07",
    5: "MC20IL001 / MCS20IEL1",
    6: "NONE",
  },
  tuesday: {
    1: "MMA20I009",
    2: "MCS20IE01",
    3: "BREAK",
    4: "MET20RM01",
    5: "MC20IL001",
    6: "NONE",
  },
  wednesday: {
    1: "MCS20I001",
    2: "MMA20I009",
    3: "BREAK",
    4: "MET20AU07",
    5: "MET20RM01",
    6: "NONE",
  },
  thursday: {
    1: "MCS20I001",
    2: "MCS20IE01",
    3: "BREAK",
    4: "MET20RM01",
    5: "MCS20IE01",
    6: "SEMINAR",
  },
  friday: {
    1: "MCS20IEL1",
    2: "MCS20IE06",
    3: "BREAK",
    4: "MCS20IE06",
    5: "MCS20IE06",
    6: "SEMINAR",
  },
}

const weekday = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

function runPeriodMisc() {
  const today = new Date()
  var day = weekday[today.getDay()]
  var periodIntervalLength = Object.keys(periodIntervals).length
  var isPeriodAvailable = false

  for (var i = 1; i <= periodIntervalLength; i++) {
    if (
      isBetweenInterval(
        periodIntervals[i].startTime,
        periodIntervals[i].endTime
      )
    ) {
      console.log(timeTable[day][i])
      isPeriodAvailable = true
      break
    }
  }

  if (isPeriodAvailable == false) {
    document.getElementById("currentPeriodCode").innerHTML = "None"
    document.getElementById("currentPeriodName").innerHTML = "None"
    document.getElementById("currentPeriodGCRLink").innerHTML = "None"
  } else {
    //change element inner html currentPeriodCode, currentPeriodName, currentPeriodGcrCode

    document.getElementById("currentPeriodCode").innerHTML = timeTable[day][i]
    document.getElementById("currentPeriodName").innerHTML =
      subjectCodesNamesCodes[timeTable[day][i]].subjectName
    if (subjectCodesNamesCodes[timeTable[day][i]].gcrCode.includes("/")) {
      gcr1 = subjectCodesNamesCodes[timeTable[day][i]].gcrCode.split("/")[0]
      gcr2 = subjectCodesNamesCodes[timeTable[day][i]].gcrCode.split("/")[1]
      gcrLink1 = `<a style="text-decoration: none;" href="https://meet.google.com/${gcr1}">${gcr1.toUpperCase()}</a>`
      gcrLink2 = `<a style="text-decoration: none;" href="https://meet.google.com/${gcr2}">${gcr2.toUpperCase()}</a>`
      document.getElementById("currentPeriodGCRLink").innerHTML =
        gcrLink1 + " / " + gcrLink2
    } else if (subjectCodesNamesCodes[timeTable[day][i]].gcrCode == "None") {
      gcrLink = `None`
      document.getElementById("currentPeriodGCRLink").innerHTML = gcrLink
    } else {
      gcr = subjectCodesNamesCodes[timeTable[day][i]].gcrCode
      gcrLink = `<a style="text-decoration: none;" href="https://meet.google.com/${gcr}">${gcr.toUpperCase()}</a>`
      document.getElementById("currentPeriodGCRLink").innerHTML = gcrLink
    }
  }
}

function isBetweenInterval(startTime, endTime) {
  var format = "hh:mm"
  // var currentTime = moment("13:09", format)
  var currentTime = moment()
  var st = moment(`${startTime.hour}:${startTime.minute}`, format)
  var et = moment(`${endTime.hour}:${endTime.minute}`, format)

  if (currentTime.isBetween(st, et, undefined, "[)")) {
    return true
  } else {
    return false
  }
}

runPeriodMisc()
setInterval(runPeriodMisc, 60000/2)
