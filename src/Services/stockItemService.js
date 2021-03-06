import axios from "axios";

const STOCKITEM_API_BASE_URL ="http://localhost:8090/api/v1/stockItems";
const STOCKITEM_API_BASE_URL2 ="http://localhost:8090/api/v1/stockItemsfindall";


class stockItemService{
    getstockItems(){
        return axios.get(STOCKITEM_API_BASE_URL);
    }
    createStockItem(stockItem){
        return axios.post(STOCKITEM_API_BASE_URL,stockItem)
    }
    getTStockItemByItemcode(itemcode){
        return axios.get(STOCKITEM_API_BASE_URL + '/'+ itemcode);
    }
    updateStockItem(stockItem, itemcode){
        return axios.put(STOCKITEM_API_BASE_URL + '/' + itemcode,stockItem);
    }


    deleteStockItem(itemcode){
        return axios.delete(STOCKITEM_API_BASE_URL + '/'+ itemcode);
    }








   
}

export default new stockItemService()