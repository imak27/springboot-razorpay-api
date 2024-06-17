const paymentStart = () => {
    console.log("Payment started.");

    // Fetch amount from payment_field input
    let amount = $("#payment_field").val().trim(); 
    console.log("Amount:", amount);

    // Check if amount is not empty
    if (amount === '') {
        alert("Amount is required!");
        return;
    }

    
    $.ajax({
        url: "/create_order",
        data: JSON.stringify({ amount: amount, info: "order_request" }),
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == "created")
            {
                //open payment form
                let options ={
                    key:'rzp_test_pD20lLR7U73r0J',
                    amount: response.amount,
                    currency: "INR",
                    name: "Patidar Auto Sales",
                    description: "Payment",
                    order_id:response.id,

                    handler:function(response)
                    {
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_order_id);
                        console.log(razorpay_signature);
                        console.log("Payment Successfull !!!");
                        Swal.fire({title: "Good job!", text: "Payment Successfull !!",icon: "success"});
                    },
                    prefill:
                    {
                        name: "",
                        email: " ",
                        contact : "",
                    },

                    notes:{
                        address:"Pune",
                    },
                    theme:
                    {
                        color :"#3399cc",
                    },
                };

                let rzp = new Razorpay(options);

                rzp.on("payment.failed",function(response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    alert("Oops payment failed !!");
                });

                rzp.open();
            }
        },
        error: function (error) {
            console.log(error);
            console.log("Something went Wrong!!");
        }
    });
};
