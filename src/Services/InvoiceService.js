import axios from "axios";

const Invoice_API_Base_Url="http://localhost:8080/api/v1/Invoices";
const Item_Base_URL="http://localhost:8080/api/v1/stockItems";

class InvoiceService{

    getAllInvoices(){
        return axios.get(Invoice_API_Base_Url);
    }

    createInvoice(Invoices){
        return axios.post(Invoice_API_Base_Url,Invoices);
    }
 
    getAllstockItems(){
        return axios.get(Item_Base_URL);
    }


    getitemById(id){
        return axios.get(Item_Base_URL+"/"+id);
    }


}

export default new InvoiceService();