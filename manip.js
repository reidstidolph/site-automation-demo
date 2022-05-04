'use strict'

const fs = require('fs')
var inputData = require('./sites.json')
const outputData = './sites-updated.json'

const templateIds = {
  "kiosk" : {
    "rf": "b38c87aa-ddec-4b42-b30c-1eac65722489",
    "wan": "f1a9b9b8-2639-4911-9b5e-fb1dadfda66a"
  },
  "small-branch" : {
    "rf": "ed6d6a6c-4189-41b2-99ba-157b0bb567d5",
    "wan": "6a55c651-9712-4235-9d5c-94a70e717db9"
  },
  "large-branch": {
    "rf": "96275985-b16f-4072-9803-b085b0a0bf74",
    "wan": "da283cdb-732d-4c56-a2ea-fe031fc2db5f"
  },
  "datacenter": {
    "wan": "bcddf1fd-3c42-4ac0-98c3-11dda6116664"
  }
}


var datacenterCount = 6
var largeCount = 100
var smallCount = 3000

var siteData = []

var kioskKeys = [...Array(6000).keys()]
var datacenterKeys = []
var largeKeys = []
var smallKeys = []

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function removeFromKiosk(siteKey){
  let index = kioskKeys.indexOf(siteKey)
  if (index > -1) {
    kioskKeys.splice(index, 1)
  }
}

for (let i = 0; i < datacenterCount; i++) {
  let dcNumber = getRandom(0, kioskKeys.length)
  datacenterKeys.push(kioskKeys[dcNumber])
  removeFromKiosk(kioskKeys[dcNumber])
}

for (let i = 0; i < largeCount; i++) {
  let largeNumber = getRandom(0, kioskKeys.length)
  largeKeys.push(kioskKeys[largeNumber])
  removeFromKiosk(kioskKeys[largeNumber])
}

for (let i = 0; i < smallCount; i++) {
  let smallNumber = getRandom(0, kioskKeys.length)
  smallKeys.push(kioskKeys[smallNumber])
  removeFromKiosk(kioskKeys[smallNumber])
  //console.log(`length: ${kioskKeys.length}`)
}

console.log(`dc: ${datacenterKeys.length}, large: ${largeKeys.length}, small: ${smallKeys.length}, kiosk: ${kioskKeys.length}`)

for (const key of datacenterKeys) {
  inputData[key].gatewaytemplate_id = templateIds.datacenter.wan
  inputData[key].name = `${inputData[key].name} - Data Center`
}

for (const key of largeKeys) {
  inputData[key].gatewaytemplate_id = templateIds['large-branch'].wan
  inputData[key].rftemplate_id = templateIds['large-branch'].rf
  inputData[key].name = `${inputData[key].name} - Large Branch`
}

for (const key of smallKeys) {
  inputData[key].gatewaytemplate_id = templateIds['small-branch'].wan
  inputData[key].rftemplate_id = templateIds['small-branch'].rf
  inputData[key].name = `${inputData[key].name} - Small Branch`
}

for (const key of kioskKeys) {
  inputData[key].gatewaytemplate_id = templateIds['kiosk'].wan
  inputData[key].rftemplate_id = templateIds['kiosk'].rf
  inputData[key].name = `${inputData[key].name} - Kiosk`
}

console.log(inputData)

function writeToFile(path, contentString){
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contentString, {mode: 0o600,encoding: 'utf8'}, (err) => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}

async function writeData(){
  await writeToFile(outputData, JSON.stringify(inputData, null, 2))
}

writeData()