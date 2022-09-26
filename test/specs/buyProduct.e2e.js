const { default: $ } = require('webdriverio/build/commands/element/$');

describe('Purchase a cheapest Laptop', () => {
    it('Get the cheapest laptop and buy it', async () => {
        //navigating to store application and clicking on laptops
        await browser.url(`https://www.demoblaze.com/`)
        const Laptops_Button= await browser.$("//div[@id='contcont']//div//a[text()='Laptops']")
        await Laptops_Button.click()
        await browser.pause(2000)
        let count= await browser.$$('//div[@id="tbodyid"]/div//h5');  
        let firstlistcount=count.length;

        //storing the page1 items into list
        let costList=[],itemList=[];
        for(let i=1;i<=firstlistcount;i++){
            let x=await browser.$('(//div[@id="tbodyid"]/div//h5)['+i+']').getText()
            costList[i]=x.substr(1)
            itemList[i]= await browser.$('(//div[@id="tbodyid"]/div//h4//a)['+i+']').getText()
       }

       //clicking on next button to navigate to secound page
       const nxtButton= await browser.$("//button[text()='Next']")
       await browser.pause(1000)
       await nxtButton.scrollIntoView();
       await browser.pause(1000)
       await nxtButton.click();
       await browser.pause(1000)

       // storing page 2 elements into above list
       let count_page2= await browser.$$('//div[@id="tbodyid"]/div//h5');
       let i,j;
       for( i=firstlistcount+1,j=1;i<=(count_page2.length+firstlistcount),j<=count_page2.length;i++,j++){
        let y=await browser.$('(//div[@id="tbodyid"]/div//h5)['+j+']').getText()
        costList[i]=y.substr(1)
        console.log("i value is " +i)
        itemList[i]= await browser.$('(//div[@id="tbodyid"]/div//h4//a)['+j+']').getText()
   }

    //getting the lowest cost laptop item
    const min = costList.reduce((a, b) => Math.min(a, b))
    console.log("low value is "+min)
    let index=costList.indexOf("230")
    let lowlaptop=itemList[index]
    //clicking on item 
    if(index<firstlistcount){
        await Laptops_Button.click()
        await browser.pause(2000)
    }
    else{ }

   //adding element to cart
    await browser.$("//div[@id='tbodyid']/div//h4//a[text()='"+lowlaptop+"']").click()
     await browser.pause(5000)
     let addToCart=await browser.$("//div[@class='row']//a[text()='Add to cart']")
     await addToCart.click()
     await browser.pause(3000)
     let goToCart=await browser.$("//div[@id='navbarExample']//li//a[text()='Cart']")
     await goToCart.click()
     await browser.pause(3000)
     let placeOrder= await browser.$("//button[text()='Place Order']")
     await placeOrder.click()
     await browser.pause(3000)

    //entering the details and buying the product
     let customerName=await browser.$("//label[text()='Name:']/following-sibling::input")
     await customerName.setValue("Customer1")
     let customerCountry=await browser.$("//label[text()='Country:']/following-sibling::input")
     await customerCountry.setValue("India")
     let customerCity=await browser.$("//label[text()='City:']/following-sibling::input")
     await customerCity.setValue("Hyderabad")
     let customerCarditCard=await browser.$("//label[text()='Credit card:']/following-sibling::input")
     await customerCarditCard.setValue("6787954321")
     let customerMonth=await browser.$("//label[text()='Month:']/following-sibling::input")
     await customerMonth.setValue("05")
     let customerYear=await browser.$("//label[text()='Year:']/following-sibling::input")
     await customerYear.setValue("2027")
     let purchase=await browser.$("//button[text()='Purchase']")
     await purchase.click()
     let thanksPopup=await browser.$(".sweet-alert")
     await thanksPopup.isDisplayed()

     //printing the order details
     let captureDetails=await browser.$("//div[contains(@class,'sweet-alert')]//p")
     let ID= await captureDetails.getText()
     console.log("Transcation Details:  "+ID)
     
    //clicking on save
     let buttonOK= await browser.$("//button[text()='OK']")
     await buttonOK.click()

    });
});