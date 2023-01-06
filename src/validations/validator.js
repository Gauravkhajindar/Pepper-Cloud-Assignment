


const isValidFile = (pw) => {
    if (/(\/*\.(?:png|jpeg))/.test(pw))
        return true
}

module.exports={isValidFile}