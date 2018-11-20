

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
        const newprice = getNewprice(newdata[i].oldprice, counpon)
        const bDate = overDue(newdata[i].jendtime)
        newdata[i]['counpon'] = counpon
        newdata[i]['newprice'] = newprice
        newdata[i]['bDate'] = bDate
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

function getNewprice(price, counpon) {
    let newprice;
    if(counpon == ""){
        newprice = price
    }else {
       const p = Number(price) - Number(counpon);
       newprice = p
    }
    return newprice
}

// 判断时间是否过期
function overDue (date) {
    let yourtime = date;  
    let bDate = false;
    yourtime = yourtime.replace(/-/g,"/");//替换字符，变成标准格式  
    const d1=new Date();//取今天的日期  
    const d2 = new Date(Date.parse(yourtime));  
    if(d1>d2){  
      bDate = true
      return bDate
    }else {
      bDate = false
      return bDate
    }
}


module.exports = {
    CleanData
}