const XLSX = require('xlsx');

const parseData = async(file) => {
    try {
        const workbook = XLSX.read(file);//readFile(file);
        const worksheet1 = workbook.Sheets["Sheet1"];

        //reads both sheets into json data
        const EoLs = XLSX.utils.sheet_to_json(worksheet1);

        //converts the yes no questions to booleans or -99999 if there is an incorrect answer
        for (i = 0; i < EoLs.length; i++) {
            if (EoLs[i]["homepage_query"] == "no" || EoLs[i]["homepage_query"] == "No") {
                EoLs[i]["homepage_query"] = false;
            } else if (EoLs[i]["homepage_query"] == "Yes" || EoLs[i]["homepage_query"] == "yes") {
                EoLs[i]["homepage_query"] = true;
            } else {
                EoLs[i]["homepage_query"] = -999999;
            }
        }
        
        for (i = 0; i < EoLs.length; i++) {
            if (EoLs[i]["bio_query"] == "no" || EoLs[i]["bio_query"] == "No") {
                EoLs[i]["bio_query"] = false;
            } else if (EoLs[i]["bio_query"] == "Yes" || EoLs[i]["bio_query"] == "yes") {
                EoLs[i]["bio_query"] = true;
            } else {
                EoLs[i]["bio_query"] = -999999;
            }
        }
        // console.log("parsed");
        return (EoLs);
    } 
    catch {
        return(-99);
    }

}


module.exports = {
    parseData
};


  