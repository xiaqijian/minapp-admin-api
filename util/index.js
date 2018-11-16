

function CleanData (data) {
    let arr = [];
    let i;
    if(data.length < 1) {
        return arr
    }
    const newdata =  JSON.parse(JSON.stringify(data));
    const len = newdata.length;
    for(i=0; i<len; i++) {
        // console.log(newdata[i].jprice)
        // console.log(getCoupon(newdata[i].jprice))
        const counpon = getCoupon(newdata[i].jmesg)
        newdata[i]['counpon'] = counpon
    }
    return newdata;
}

function getCoupon (str) {
   let newstr = '';
   if(str.length<1 || str === "无"){
       return newstr
   }
   const arr = str.split('减')[1].split('元')
   newstr = arr[0]
   return newstr

}

module.exports = {
    CleanData
}