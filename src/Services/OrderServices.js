import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/orders"

class OrderServices {

    getOrders(){
        return axios.get(ORDER_API_BASE_URL);

    }
    createorders(order){
        return axios.post(ORDER_API_BASE_URL, order); 
    }

    getOrdersById(orderId){
        return axios.get(ORDER_API_BASE_URL + '/' + orderId);

    }

    updateorders(order, orderId){
        return axios.put(ORDER_API_BASE_URL + '/' + orderId, order);

    }

    deleteorders(orderId){
        return axios.delete(ORDER_API_BASE_URL + '/' + orderId);
    }


 

}

export default new OrderServices()