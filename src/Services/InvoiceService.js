import axios from "axios";

const Invoice_API_Base_Url="http://localhost:8080/api/v1/Invoices";
const Item_Base_URL="http://localhost:8080/api/v1/stockItems";

const STOCKITEM_API_BASE_URL2 ="http://localhost:8080/api/v1/stockItemsfindall";

class InvoiceService{

    getAllInvoices(){
        return axios.get(Invoice_API_Base_Url);
    }

    createInvoice(Invoices){
        return axios.post(Invoice_API_Base_Url,Invoices);
    }


    getInvoiceById(invoiceid){
        return axios.get(Invoice_API_Base_Url+"/"+invoiceid);
    }



    updateInvoiceById(invoice, invoiceID){
        return axios.put(Invoice_API_Base_Url+"/"+invoiceID,invoice);
    }



    deleteInvoice(invoId){
        return axios.delete(Invoice_API_Base_Url+"/"+invoId);

    }


 
    getAllstockItems(){
        return axios.get(Item_Base_URL);
    }


    



    getitemById(id){
        return axios.get(Item_Base_URL+"/"+id);
    }


/*
    getitemByString(Item_Name){
        return axios.get(Item_Base_URL+"/"+Item_Name);
    }
*/


getInvoiceBetweebdate(startDatee,endDatee){
    return axios.get(`http://localhost:8080/api/v1/Invoicesdate/${startDatee},${endDatee}`);
}



getInvoiceBetweebId(startDate,endDate){
    return axios.get(`http://localhost:8080/api/v1/Invoicesbet/${startDate},${endDate}`);
}


getVehicalSearch(Vehical_Name){
    return axios.get(`http://localhost:8080/api/v1/vehical_num/${Vehical_Name}`);
}


findInvoiceNumber(Invoice_Number){
    return axios.get(`http://localhost:8080/api/v1/Invoice_Number/${Invoice_Number}`);
}


}

export default new InvoiceService();