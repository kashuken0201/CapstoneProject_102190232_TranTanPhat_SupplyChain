package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type CounterNO struct {
	Counter int `json:"counter"`
}

type User struct {
	UserId   string `json:"UserId"`
	Email    string `json:"Email"`
	Password string `json:"Password"`
	UserName string `json:"UserName"`
	Address  string `json:"Address"`
	UserType string `json:"UserType"`
	Role     string `json:"Role"`
	Status   string `json:"Status"`
}

type ProductDates struct {
	Cultivated   string `json:"Cultivated"`
	Harvested    string `json:"Harvested"`
	Manufactured string `json:"Manufactured"`
	Distributed  string `json:"Distributed"`
	Ordered      string `json:"Ordered"`
	Sold         string `json:"Sold"`
	Delivered    string `json:"Delivered"`
	Received     string `json:"Received"`
}

type ProductActors struct {
	FarmerId       string `json:"FarmerId"`
	ManufacturerId string `json:"ManufacturerId"`
	DistributorId  string `json:"DistributorId"`
	RetailerId     string `json:"RetailerId"`
	ConsumerId     string `json:"ConsumerId"`
}

// Unit: kg, box/boxes, bottle, bottles, unit/units

// Farmer: id, cultivate, harvest => cultivating, harvested
// Manufacturer: id, manufacture, sell => manufactured/manufacturing, sold
// Distributor: id, distribute, deliver => distributed/distributing, delivered/delivering
// Retailer: id, sell => sold
// Consumer: id, order, receive => ordered, received
type Product struct {
	ProductId   string        `json:"ProductId"`
	ProductName string        `json:"ProductName"`
	Dates       ProductDates  `json:"Dates"`
	Actors      ProductActors `json:"Actors"`
	Quantity    int           `json:"Quantity"`
	Status      string        `json:"Status"`
	Price       float64       `json:"Price"`
	Unit        string        `json:"Unit"`
	Description string        `json:"Description"`
	OrderId     string        `json:"OrderID"`
}

type ProductResult struct {
	Record *Product
}

type UserResult struct {
	Record *User
}

type ProductHistory struct {
	TxId      string `json:"TxId"`
	Value     string `json:"Value"`
	Timestamp string `json:"Timestamp"`
	IsDelete  string `json:"IsDelete"`
}

// Init initializes chaincode
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {

	// Initializing Product Counter
	ProductCounterBytes, _ := ctx.GetStub().GetState("ProductCounterNO")
	if ProductCounterBytes == nil {
		var ProductCounter = CounterNO{Counter: 0}
		ProductCounterBytes, _ := json.Marshal(ProductCounter)
		err := ctx.GetStub().PutState("ProductCounterNO", ProductCounterBytes)
		if err != nil {
			return fmt.Errorf("Failed to Intitate Product Counter: %s", err.Error())
		}
	}
	// Initializing Order Counter
	OrderCounterBytes, _ := ctx.GetStub().GetState("OrderCounterNO")
	if OrderCounterBytes == nil {
		var OrderCounter = CounterNO{Counter: 0}
		OrderCounterBytes, _ := json.Marshal(OrderCounter)
		err := ctx.GetStub().PutState("OrderCounterNO", OrderCounterBytes)
		if err != nil {
			return fmt.Errorf("Failed to Intitate Order Counter: %s", err.Error())
		}
	}
	// Initializing User Counter
	UserCounterBytes, _ := ctx.GetStub().GetState("UserCounterNO")
	if UserCounterBytes == nil {
		var UserCounter = CounterNO{Counter: 0}
		UserCounterBytes, _ := json.Marshal(UserCounter)
		err := ctx.GetStub().PutState("UserCounterNO", UserCounterBytes)
		if err != nil {
			return fmt.Errorf("Failed to Intitate User Counter: %s", err.Error())
		}
	}

	// seed admin
	entityUser := User{Name: "admin", UserId: "User1", Email: "admin@pg.com", UserType: "manufacturer", Role: "admin", Address: "VietNam", Password: "adminpw"}
	entityUserAsBytes, errMarshal := json.Marshal(entityUser)

	if errMarshal != nil {
		return fmt.Errorf("Marshal Error in user: %s", errMarshal.Error())
	}

	errPut := ctx.GetStub().PutState(entityUser.UserId, entityUserAsBytes)
	if errPut != nil {
		return fmt.Errorf("Failed to create Entity Asset: %s --- %s", entityUser.UserId, errPut.Error())
	}

	entityUser = User{Name: "admin", UserId: "User2", Email: "admin@pg.com", UserType: "consumer", Role: "admin", Address: "VietNam", Password: "adminpw"}
	entityUserAsBytes, errMarshal = json.Marshal(entityUser)

	if errMarshal != nil {
		return fmt.Errorf("Marshal Error in user: %s", errMarshal.Error())
	}

	errPut = ctx.GetStub().PutState(entityUser.UserId, entityUserAsBytes)
	if errPut != nil {
		return fmt.Errorf("Failed to create Entity Asset: %s --- %s", entityUser.UserId, errPut.Error())
	}

	return nil
}

// getCounter to the latest value of the counter based on the Asset Type provided as input parameter
func getCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {
	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)
	// fmt.Sprintf("Counter Current Value %d of Asset Type %s", counterAsset.Counter, assetType)
	return counterAsset.Counter, nil
}

// incrementCounter to the increase value of the counter based on the Asset Type provided as input parameter by 1
func incrementCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {
	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)
	counterAsset.Counter++
	counterAsBytes, _ = json.Marshal(counterAsset)

	err := ctx.GetStub().PutState(assetType, counterAsBytes)
	if err != nil {
		return -1, fmt.Errorf("Failed to Increment Counter: %s", err.Error())
	}
	fmt.Printf("Printf in incrementing counter  %v", counterAsset)
	return counterAsset.Counter, nil
}

// GetTxTimestampChannel Function gets the Transaction time when the chain code was executed it remains same on all the peers where chaincode executes
func (s *SmartContract) GetTxTimestampChannel(ctx contractapi.TransactionContextInterface) (string, error) {
	txTimeAsPtr, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
		fmt.Printf("Returning error in TimeStamp \n")
		return "Error", err
	}
	fmt.Printf("\t returned value from ctx.GetStub(): %v\n", txTimeAsPtr)
	timeStr := time.Unix(txTimeAsPtr.Seconds, int64(txTimeAsPtr.Nanos)).String()
	return timeStr, nil
}

// sign in
func (s *SmartContract) SignIn(ctx contractapi.TransactionContextInterface, email string, password string) (*User, error) {

	results, err := s.GetAllUsers(ctx)

	if err != nil {
		return nil, err
	}

	for _, user := range results {
		_email := (*user.Record).Email
		_password := (*user.Record).Password
		_userId := (*user.Record).UserId
		if _email != email || _password != password {
			return nil, fmt.Errorf("Email or password is wrong.")
		}
		userBytes, _ := ctx.GetStub().GetState(_userId)
		_user := new(User)
		_ = json.Unmarshal(userBytes, &user)
		return _user, nil
	}
	return nil, fmt.Errorf("User is not exists.")
}

// create user
func (s *SmartContract) CreateUser(ctx contractapi.TransactionContextInterface, email string, password string, name string, address string, userType string) error {

	results, err := s.GetAllUsers(ctx)

	if err != nil {
		return err
	}

	for _, user := range results {
		_email := (*user.Record).Email
		if _email != email {
			return fmt.Errorf("This user is exists.")
		}
	}

	userCounter, _ := getCounter(ctx, "UserCounterNO")
	userCounter++

	user := User{
		UserId:   "User" + strconv.Itoa(userCounter),
		Email:    email,
		Password: password,
		Name:     name,
		Address:  address,
		UserType: userType,
		Role:     "client",
	}

	userAsBytes, errMarshal := json.Marshal(user)
	if errMarshal != nil {
		return fmt.Errorf("Marshal Error in Product: %s", errMarshal)
	}

	incrementCounter(ctx, "UserCounterNO")

	return ctx.GetStub().PutState(user.UserId, userAsBytes)
}

// create product
func (s *SmartContract) CreateProduct(ctx contractapi.TransactionContextInterface, userId string, name string, manufacturerName string, quantity int, price float64, description string) error {

	// get user details from the stub ie. Chaincode stub in network using the user id passed
	userBytes, _ := ctx.GetStub().GetState(userId)
	if userBytes == nil {
		return fmt.Errorf("Cannot find User")
	}

	user := new(User)
	_ = json.Unmarshal(userBytes, &user)

	// User type check for the function
	if user.UserType != "manufacturer" {
		return fmt.Errorf("User must be a manufacturer")
	}

	productCounter, _ := getCounter(ctx, "ProductCounterNO")
	productCounter++

	//To Get the transaction TimeStamp from the Channel Header
	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("Returning error in Transaction TimeStamp")
	}

	// DATES
	dates := ProductDates{}
	dates.ManufactureDate = txTimeAsPtr
	var product = Product{
		ProductId:         "Product" + strconv.Itoa(productCounter),
		OrderId:           "",
		Name:              name,
		Consumer_ID:       "",
		Manufacturer_ID:   userId,
		Manufacturer_Name: manufacturerName,
		Quantity:          quantity,
		Status:            "",
		Date:              dates,
		Price:             price,
		Description:       description,
	}

	if product.Quantity <= 0 {
		product.Status = "Out of stock"
	} else {
		product.Status = "Available"
	}

	productAsBytes, _ := json.Marshal(product)

	incrementCounter(ctx, "ProductCounterNO")

	return ctx.GetStub().PutState(product.ProductId, productAsBytes)
}

// update product
func (s *SmartContract) UpdateProduct(ctx contractapi.TransactionContextInterface, userId string, productId string, name string, quantity int, price float64, description string) error {

	// get user details from the stub ie. Chaincode stub in network using the user id passed
	userBytes, _ := ctx.GetStub().GetState(userId)
	if userBytes == nil {
		return fmt.Errorf("Cannot find User")
	}

	user := new(User)
	_ = json.Unmarshal(userBytes, &user)

	// User type check for the function
	if user.UserType != "manufacturer" {
		return fmt.Errorf("User must be a manufacturer")
	}

	// get product details from the stub ie. Chaincode stub in network using the product id passed
	productBytes, _ := ctx.GetStub().GetState(productId)
	if productBytes == nil {
		return fmt.Errorf("Cannot find Product")
	}

	product := new(Product)
	_ = json.Unmarshal(productBytes, &product)

	// Updating the product values withe the new values
	product.Name = name
	product.Price = price
	product.Description = description
	product.Quantity = quantity

	if product.Quantity <= 0 {
		product.Status = "Out of stock"
	} else {
		product.Status = "Available"
	}

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

// order product
func (s *SmartContract) OrderProduct(ctx contractapi.TransactionContextInterface, userId string, productId string) error {

	userBytes, _ := ctx.GetStub().GetState(userId)
	if userBytes == nil {
		return fmt.Errorf("Cannot find User")
	}

	user := new(User)
	_ = json.Unmarshal(userBytes, &user)

	// User type check for the function
	if user.UserType != "consumer" {
		return fmt.Errorf("User must be a consumer")
	}

	productBytes, _ := ctx.GetStub().GetState(productId)
	if productBytes == nil {
		return fmt.Errorf("Cannot find Product")
	}

	product := new(Product)
	if product.Status != "Available" || product.Status == "Out of stock" {
		return fmt.Errorf("Cannot order this product")
	}
	_ = json.Unmarshal(productBytes, &product)
	orderCounter, _ := getCounter(ctx, "OrderCounterNO")
	orderCounter++

	//To Get the transaction TimeStamp from the Channel Header
	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("Returning error in Transaction TimeStamp")
	}

	product.OrderId = "Order" + strconv.Itoa(orderCounter)
	product.Consumer_ID = user.UserId
	product.Status = "Ordered"
	product.Date.OrderedDate = txTimeAsPtr

	updatedProductAsBytes, _ := json.Marshal(product)

	incrementCounter(ctx, "OrderCounterNO")

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

// sell the product to consumer
func (s *SmartContract) SellToConsumer(ctx contractapi.TransactionContextInterface, userId string, productId string) error {

	userBytes, _ := ctx.GetStub().GetState(userId)
	if userBytes == nil {
		return fmt.Errorf("Cannot find User")
	}

	user := new(User)
	_ = json.Unmarshal(userBytes, &user)

	// User type check for the function
	if user.UserType != "manufacturer" {
		return fmt.Errorf("User must be a manufacturer")
	}

	// get product details from the stub ie. Chaincode stub in network using the product id passed
	productBytes, _ := ctx.GetStub().GetState(productId)
	if productBytes == nil {
		return fmt.Errorf("Cannot find Product")
	}

	product := new(Product)
	_ = json.Unmarshal(productBytes, &product)

	// check if the product is ordered or not
	if product.OrderId == "" {
		return fmt.Errorf("Product has not been ordered yet")
	}

	// check if the product is sold to consumer already
	if product.Consumer_ID == "" {
		return fmt.Errorf("Customer Id should be set to sell to customer")
	}

	//To Get the transaction TimeStamp from the Channel Header
	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("Returning error in Transaction TimeStamp")
	}

	// Updating the product values to be updated after the function
	product.Date.SellToConsumerDate = txTimeAsPtr
	product.Status = "Sold"
	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

// deliver product
func (s *SmartContract) DeliveredProduct(ctx contractapi.TransactionContextInterface, userId, string, productId string) error {

	userBytes, _ := ctx.GetStub().GetState(userId)
	if userBytes == nil {
		return fmt.Errorf("Cannot find User")
	}

	user := new(User)
	_ = json.Unmarshal(userBytes, user)

	// User type check for the function
	if user.UserType != "consumer" {
		return fmt.Errorf("User must be a consumer")
	}

	productBytes, _ := ctx.GetStub().GetState(productId)
	if productBytes == nil {
		return fmt.Errorf("Cannot find Product")
	}

	product := new(Product)
	_ = json.Unmarshal(productBytes, product)
	if product.Status != "Sold" {
		return fmt.Errorf("Product is not delivered yet")
	}

	//To Get the transaction TimeStamp from the Channel Header
	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("Returning error in Transaction TimeStamp")
	}

	product.Date.DeliveredDate = txTimeAsPtr
	product.Status = "Delivered"
	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

// get a asset
func (s *SmartContract) GetProduct(ctx contractapi.TransactionContextInterface, productId string) (*Product, error) {
	productAsBytes, err := ctx.GetStub().GetState(productId)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if productAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", productId)
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	return product, nil
}

// get all asset
func (s *SmartContract) GetAllUsers(ctx contractapi.TransactionContextInterface) ([]UserResult, error) {

	assetCounter, _ := getCounter(ctx, "UserCounterNO")
	startKey := "User1"
	endKey := "User" + strconv.Itoa(assetCounter+1)
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	results := []UserResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		user := new(User)
		_ = json.Unmarshal(queryResponse.Value, &user)

		queryResult := UserResult{Key: queryResponse.Key, Record: user}

		results = append(results, queryResult)
	}

	return results, nil
}

func (s *SmartContract) GetAllProducts(ctx contractapi.TransactionContextInterface) ([]ProductResult, error) {

	assetCounter, _ := getCounter(ctx, "ProductCounterNO")
	startKey := "Product1"
	endKey := "Product" + strconv.Itoa(assetCounter+1)
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	results := []ProductResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		product := new(Product)
		_ = json.Unmarshal(queryResponse.Value, &product)

		queryResult := ProductResult{Key: queryResponse.Key, Record: product}

		results = append(results, queryResult)
	}

	return results, nil
}

// get the history transaction of product
func (s *SmartContract) GetHistory(ctx contractapi.TransactionContextInterface, productId string) ([]ProductHistory, error) {

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(productId)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}
	defer resultsIterator.Close()

	results := []ProductHistory{}

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		queryResult := ProductHistory{
			TxId:      response.TxId,
			Value:     string(response.Value),
			Timestamp: time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String(),
			IsDelete:  strconv.FormatBool(response.IsDelete),
		}
		results = append(results, queryResult)
	}

	return results, nil
}

// Main function
func main() {
	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create fsc chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fsc chaincode: %s", err.Error())
	}
}
