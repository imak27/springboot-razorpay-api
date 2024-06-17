package com.payment.razorpay.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.razorpay.*;

@Controller
public class PaymentController {

    @RequestMapping("/")
    public String homepage() {
        System.out.println("Request for home page");
        return "home"; // Assuming payment.html is located in resources/templates directory
    }

    @RequestMapping("/payment")
    public String payment() {
        System.out.println("Request for payment page");
        return "payment"; // Assuming payment.html is located in resources/templates directory
    }

    @RequestMapping("/form")
    public String formPay() {
        System.out.println("Request for payment form page");
        return "payForm"; // Assuming payment.html is located in resources/templates directory
    }

    @PostMapping("/create_order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String, Object> data) throws Exception {
        // System.out.println("Order funciton executed");
        System.out.println(data);
        int amt = Integer.parseInt(data.get("amount").toString());
        var client = new RazorpayClient("rzp_test_pD20lLR7U73r0J", "lqa9CxNDAGl1TS6V8XhSoxET");

        JSONObject ob = new JSONObject();
        ob.put("amount", amt*100);
        ob.put("currency", "INR");
        ob.put("receipt", "receipt#1");


        //creating order
        Order order = client.orders.create(ob);
        System.out.println(order);

        return order.toString();
    }

}
