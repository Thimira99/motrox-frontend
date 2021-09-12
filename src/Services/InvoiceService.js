import axios from "axios";

const Invoice_API_Base_Url="http://localhost:8080/api/v1/Invoices";

class InvoiceService{

    getAllInvoices(){
        return axios.get(Invoice_API_Base_Url);
    }
}

export default new InvoiceService();