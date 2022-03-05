//MTech CFIS

var clockElement = document.getElementById("clock")

subjectCodesNamesCodes = {
  MCS20C002: {
    subjectName: "Advanced Algorithms",
    gcrCode: "upq-ysmf-qga",
  },
  MCS20C003: {
    subjectName: "Soft Computing",
    gcrCode: "oyc-duxd-ynm",
  },
  MCS20IE07: {
    subjectName: "Information Security",
    gcrCode: "owe-rbre-pkq",
  },
  MCS20IE11: {
    subjectName: "Cyber Crime Investigation",
    gcrCode: "gtq-hbhs-vcg",
  },
  MET20AU02: {
    subjectName: "Disaster Management",
    gcrCode: "pmb-kgwp-diz",
  },
  MCS20CL02: {
    subjectName: "Advanced Algorithm Lab",
    gcrCode: "sqz-ykps-ies",
  },
  MCS20IEL11: {
    subjectName: "Cyber Crime Investigation Lab",
    gcrCode: "sor-rkjp-jsx",
  },
  MCS20IL02: {
    subjectName: "Mini Project with Seminar",
    gcrCode: "fkj-aavw-hih",
  },
  BREAK: {
    subjectName: "Break",
    gcrCode: "None",
  },
  NONE: {
    subjectName: "None",
    gcrCode: "None",
  },
}

periodIntervals = {
  1: {
    startTime: { hour: "9", minute: "20" },
    endTime: { hour: "10", minute: "10" },
  },
  2: {
    startTime: { hour: "10", minute: "10" },
    endTime: { hour: "11", minute: "00" },
  },
  3: {
    startTime: { hour: "11", minute: "00" },
    endTime: { hour: "11", minute: "20" },
  },
  4: {
    startTime: { hour: "11", minute: "20" },
    endTime: { hour: "12", minute: "10" },
  },
  5: {
    startTime: { hour: "12", minute: "10" },
    endTime: { hour: "13", minute: "00" },
  },
}

timeTable = {
  sunday: {
    1: "NONE",
    2: "NONE",
    3: "NONE",
    4: "NONE",
    5: "NONE",
  },
  monday: {
    1: "MCS201EL11",
    2: "MCS201EL11",
    3: "BREAK",
    4: "MCS201EL11",
    5: "MET20AU02",
  },
  tuesday: {
    1: "MCS20C002",
    2: "MCS20IL02",
    3: "BREAK",
    4: "MCS20IL02",
    5: "MCS20C002",
  },
  wednesday: {
    1: "MCS20C002",
    2: "MCS20IE07",
    3: "BREAK",
    4: "MCS20IE07",
    5: "MCS201E11",
  },
  thursday: {
    1: "MCS20CL02",
    2: "MCS20CL02",
    3: "BREAK",
    4: "MCS201E11",
    5: "MCS201E11",
  },
  friday: {
    1: "MCS20IE07",
    2: "MCS20C003",
    3: "BREAK",
    4: "MCS20C003",
    5: "MCS20C003",
  },
  saturday: {
    1: "NONE",
    2: "NONE",
    3: "NONE",
    4: "NONE",
    5: "NONE",
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
      gcrLink1 = `<a target="_blank" style="text-decoration: none;" href="https://meet.google.com/${gcr1}">${gcr1.toUpperCase()}</a>`
      gcrLink2 = `<a target="_blank" style="text-decoration: none;" href="https://meet.google.com/${gcr2}">${gcr2.toUpperCase()}</a>`
      document.getElementById("currentPeriodGCRLink").innerHTML =
        gcrLink1 + " / " + gcrLink2
    } else if (subjectCodesNamesCodes[timeTable[day][i]].gcrCode == "None") {
      gcrLink = `None`
      document.getElementById("currentPeriodGCRLink").innerHTML = gcrLink
    } else {
      gcr = subjectCodesNamesCodes[timeTable[day][i]].gcrCode
      gcrLink = `<a target="_blank" style="text-decoration: none;" href="https://meet.google.com/${gcr}">${gcr.toUpperCase()}</a>`
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
setInterval(runPeriodMisc, 5000)
setInterval(() => (clockElement.textContent = new Date().toString()), 1000)
