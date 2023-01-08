


const isValidFile = (pw) => {
    if (/(\/*\.(?:png|jpeg))/.test(pw))
        return true
}


const Dateregex = (pw)=>{ 
    if(/^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/.test(pw))
    return true
}

const isValidNumber = (pw) => {
    if (/^[0-9]*$/.test(pw))
        return true
}

module.exports={isValidFile,Dateregex,isValidNumber}