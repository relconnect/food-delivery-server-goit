const url = require("url");
const fs = require("fs");
const path = require("path");

const getId = url => {
  const lastIndex = url.lastIndexOf('/');

  if (lastIndex !== -1) {
    return url.slice(lastIndex +1);
  }
};

const getProducts = (request, response) => {
  const parsedUrl = url.parse(request.url,true);
  const id = getId(parsedUrl.path);
  const {query} = parsedUrl;
  let obj = {
    products: []
  };
  const filePath = path.join(
    __dirname,
    "../../../data/products/all-products.json"
  );

  if(query.id) {
  
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) throw error;
      let allItems = JSON.parse(data);
      query.id.split(',').forEach(element => {
        
        let item = allItems.find(elem => elem.id == element);
       
  
        if (item) {
          obj.status = "success";
          
          obj.products.push(item);
        } else {
          obj.status = "no products";
          obj.products = [];        }
        
      });
     
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(obj));
      response.end();
    });

  }else if(query.category){
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) throw error;
      let item = JSON.parse(data).filter(elem => {
        if( elem.categories.some(category => category == query.category))        
        return elem;
      });
  
      if (item) {
        obj.status = "success";
        obj.products = [];
        obj.products.push(item);
      } else {
        obj.status = "no products";
        obj.products = [];
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(obj));
      response.end();
    });
  }else {
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) throw error;
      let item = JSON.parse(data).find(elem => elem.id == id);
  
      if (item) {
        obj.status = "success";
        obj.products = [];
        obj.products.push(item);
      } else {
        obj.status = "no products";
        obj.products = [];
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(obj));
      response.end();
    });
  }
  
 
};

module.exports = getProducts;
