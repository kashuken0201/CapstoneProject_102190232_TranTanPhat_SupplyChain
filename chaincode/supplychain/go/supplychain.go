package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/golang/protobuf/ptypes"
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
	Manufacturered string `json:"Manufacturered"`
	Distributed    string `json:"Distributed"`
	Received       string `json:"Received"`
	Sold           string `json:"Sold"`
}

type ProductActors struct {
	ManufacturerId string `json:"ManufacturerId"`
	DistributorId  string `json:"DistributorId"`
	RetailerId     string `json:"RetailerId"`
}

type Product struct {
	ProductId   string        `json:"ProductId"`
	ProductName string        `json:"ProductName"`
	Raws        []*Raw        `json:"Raws"`
	Price       float64       `json:"Price"`
	Status      string        `json:"Status"`
	Description string        `json:"Description"`
	Dates       ProductDates  `json:"Dates"`
	Actors      ProductActors `json:"Actors"`
}

type ProductHistory struct {
	Record    *Product  `json:"Record"`
	TxId      string    `json:"TxId"`
	Timestamp time.Time `json:"Timestamp"`
	IsDelete  bool      `json:"IsDelete"`
}

type Raw struct {
	RawId          string `json:"RawId"`
	RawName        string `json:"RawName"`
	CreatedDate    string `json:"CreateDate"`
	SuppliedDate   string `json:"SuppliedDate"`
	SupplierId     string `json:"SupplierId"`
	ManufacturerId string `json:"ManufacturerId"`
}

type RawHistory struct {
	Record    *Raw      `json:"Record"`
	TxId      string    `json:"TxId"`
	Timestamp time.Time `json:"Timestamp"`
	IsDelete  bool      `json:"IsDelete"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {

	error := initCounter(ctx)

	if error != nil {
		return fmt.Errorf("error init counter: %s", error.Error())
	}

	return nil
}

/* UTIL FUNCTIONS
INIT COUNTER
GET COUNTER
INCREMENT COUNTER
GET TX TIMESTAMP
CHECK USER
*/

func initCounter(ctx contractapi.TransactionContextInterface) error {

	// Initializing User Counter
	UserCounterBytes, _ := ctx.GetStub().GetState("UserCounterNO")
	if UserCounterBytes == nil {
		var UserCounter = CounterNO{Counter: 0}
		UserCounterBytes, _ := json.Marshal(UserCounter)
		err := ctx.GetStub().PutState("UserCounterNO", UserCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate user counter: %s", err.Error())
		}
	} else {
		counter := new(CounterNO)
		_ = json.Unmarshal(UserCounterBytes, counter)
		var UserCounter = CounterNO{Counter: counter.Counter}
		UserCounterBytes, _ := json.Marshal(UserCounter)
		err := ctx.GetStub().PutState("UserCounterNO", UserCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate user counter: %s", err.Error())
		}
	}

	// Initializing Raw Counter
	RawCounterBytes, _ := ctx.GetStub().GetState("RawCounterNO")
	if RawCounterBytes == nil {
		var RawCounter = CounterNO{Counter: 0}
		RawCounterBytes, _ := json.Marshal(RawCounter)
		err := ctx.GetStub().PutState("RawCounterNO", RawCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate raw counter: %s", err.Error())
		}
	} else {
		counter := new(CounterNO)
		_ = json.Unmarshal(RawCounterBytes, counter)
		var RawCounter = CounterNO{Counter: counter.Counter}
		RawCounterBytes, _ := json.Marshal(RawCounter)
		err := ctx.GetStub().PutState("RawCounterNO", RawCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate raw counter: %s", err.Error())
		}
	}

	// Initializing Product Counter
	ProductCounterBytes, _ := ctx.GetStub().GetState("ProductCounterNO")
	if ProductCounterBytes == nil {
		var ProductCounter = CounterNO{Counter: 0}
		ProductCounterBytes, _ := json.Marshal(ProductCounter)
		err := ctx.GetStub().PutState("ProductCounterNO", ProductCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate product counter: %s", err.Error())
		}
	} else {
		counter := new(CounterNO)
		_ = json.Unmarshal(ProductCounterBytes, counter)
		var ProductCounter = CounterNO{Counter: counter.Counter}
		ProductCounterBytes, _ := json.Marshal(ProductCounter)
		err := ctx.GetStub().PutState("ProductCounterNO", ProductCounterBytes)
		if err != nil {
			return fmt.Errorf("failed to intitate product counter: %s", err.Error())
		}
	}

	return nil
}

func getCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {
	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)

	return counterAsset.Counter, nil
}

func incrementCounter(ctx contractapi.TransactionContextInterface, assetType string) (int, error) {

	counterAsBytes, _ := ctx.GetStub().GetState(assetType)
	counterAsset := CounterNO{}

	json.Unmarshal(counterAsBytes, &counterAsset)
	counterAsset.Counter++
	updateCounterAsBytes, _ := json.Marshal(counterAsset)

	err := ctx.GetStub().PutState(assetType, updateCounterAsBytes)
	if err != nil {
		return -1, fmt.Errorf("failed to increment counter: %s", err.Error())
	}

	return counterAsset.Counter, nil
}

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

func (s *SmartContract) CheckUser(ctx contractapi.TransactionContextInterface, userId string, userType string) (*User, error) {

	userAsBytes, _ := ctx.GetStub().GetState(userId)
	if userAsBytes == nil {
		return nil, fmt.Errorf("cannot find this %q", userType)
	}

	user := new(User)
	_ = json.Unmarshal(userAsBytes, user)

	if user.UserType != userType {
		return nil, fmt.Errorf("user must be a %q", userType)
	}
	return user, nil
}

/* 	ADMIN FUNCTIONS
SIGNIN
SIGNUP
CHANGE
*/

func (s *SmartContract) SignIn(ctx contractapi.TransactionContextInterface, email string, password string, userType string) (*User, error) {

	results, err := s.GetUsers(ctx, userType)

	if err != nil {
		return nil, err
	}

	for _, user := range results {
		_email := (*user).Email
		_password := (*user).Password
		_userId := (*user).UserId
		if _email == email && _password == password {
			userBytes, _ := ctx.GetStub().GetState(_userId)
			_user := new(User)
			_ = json.Unmarshal(userBytes, _user)
			return _user, nil
		}

	}
	return nil, fmt.Errorf("user is not exists")
}

func (s *SmartContract) SignUp(ctx contractapi.TransactionContextInterface, userType string, email string, password string, username string, address string, role string) error {
	results, err := s.GetUsers(ctx, userType)

	if err != nil {
		return err
	}

	for _, user := range results {
		_email := (*user).Email
		if _email == email {
			return fmt.Errorf("this user is exists")
		}
	}

	userCounter, _ := getCounter(ctx, "UserCounterNO")
	userCounter++

	user := User{
		UserId:   "User" + strconv.Itoa(userCounter),
		Email:    email,
		Password: password,
		UserName: username,
		Address:  address,
		UserType: userType,
		Role:     role,
		Status:   "ACTIVE",
	}

	userAsBytes, errMarshal := json.Marshal(user)
	if errMarshal != nil {
		return fmt.Errorf("marshal rrror in user: %s", errMarshal)
	}

	incrementCounter(ctx, "UserCounterNO")

	return ctx.GetStub().PutState(user.UserId, userAsBytes)
}

func (s *SmartContract) ChangeUserInfo(ctx contractapi.TransactionContextInterface, userId string, password string, username string, address string, status string) error {

	user, err := s.GetUser(ctx, userId)

	if err != nil {
		return err
	}

	user.UserName = username
	user.Password = password
	user.Address = address
	user.Status = status

	userAsBytes, errMarshal := json.Marshal(user)
	if errMarshal != nil {
		return fmt.Errorf("marshal error in user: %s", errMarshal)
	}

	return ctx.GetStub().PutState(user.UserId, userAsBytes)
}

/* 	SUPPLIER FUNCTIONS
CREATE RAW
UPDATE RAW
SUPPLY RAW
*/

func (s *SmartContract) CreateRaw(ctx contractapi.TransactionContextInterface, supplierId string, rawName string) error {

	_, error := s.CheckUser(ctx, supplierId, "supplier")
	if error != nil {
		return error
	}

	rawCounter, _ := getCounter(ctx, "RawCounterNO")
	rawCounter++

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	var raw = Raw{
		RawId:          "Raw" + strconv.Itoa(rawCounter),
		RawName:        rawName,
		CreatedDate:    txTimeAsPtr,
		SuppliedDate:   "",
		SupplierId:     supplierId,
		ManufacturerId: "",
	}

	rawAsBytes, _ := json.Marshal(raw)

	incrementCounter(ctx, "RawCounterNO")

	return ctx.GetStub().PutState(raw.RawId, rawAsBytes)
}

func (s *SmartContract) UpdateRaw(ctx contractapi.TransactionContextInterface, supplierId string, rawId string, rawName string) error {

	supplier, error := s.CheckUser(ctx, supplierId, "supplier")
	if error != nil {
		return error
	}

	rawAsBytes, _ := ctx.GetStub().GetState(rawId)
	if rawAsBytes == nil {
		return fmt.Errorf("cannot find this raw")
	}

	raw := new(Raw)
	_ = json.Unmarshal(rawAsBytes, raw)

	if raw.SupplierId != supplier.UserId {
		return fmt.Errorf("supplier do not own this raw")
	}

	raw.RawName = rawName

	rawAsBytes, _ = json.Marshal(raw)

	return ctx.GetStub().PutState(raw.RawId, rawAsBytes)
}

func (s *SmartContract) SupplyRaw(ctx contractapi.TransactionContextInterface, supplierId string, rawId string, manufacturerId string) error {

	supplier, error := s.CheckUser(ctx, supplierId, "supplier")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	rawAsBytes, _ := ctx.GetStub().GetState(rawId)
	if rawAsBytes == nil {
		return fmt.Errorf("cannot find this raw")
	}

	raw := new(Raw)
	_ = json.Unmarshal(rawAsBytes, raw)

	if raw.SupplierId != supplier.UserId {
		return fmt.Errorf("supplier do not own this raw")
	}

	if raw.ManufacturerId != manufacturerId {
		return fmt.Errorf("manufacturer do not order this raw")
	}

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	raw.SuppliedDate = txTimeAsPtr

	rawAsBytes, _ = json.Marshal(raw)

	return ctx.GetStub().PutState(raw.RawId, rawAsBytes)
}

/* 	MANUFACTURER FUNCTIONS
CREATE PRODUCT
UPDATE PRODUCT
ORDER RAW
PROVIDE PRODUCT
*/

func (s *SmartContract) CreateProduct(ctx contractapi.TransactionContextInterface, manufacturerId string, productName string, price float64, description string, rawIds string) error {

	_, error := s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	productCounter, _ := getCounter(ctx, "ProductCounterNO")
	productCounter++

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	dates := ProductDates{}
	dates.Manufacturered = txTimeAsPtr
	dates.Distributed = ""
	dates.Received = ""
	dates.Sold = ""

	actors := ProductActors{}
	actors.ManufacturerId = manufacturerId
	actors.DistributorId = ""
	actors.RetailerId = ""

	var raws []*Raw
	rawIdsSplit := strings.Split(rawIds, ",")
	for _, rawId := range rawIdsSplit {
		raw, _ := s.GetRaw(ctx, rawId)
		raws = append(raws, raw)
	}

	var product = Product{
		ProductId:   "Product" + strconv.Itoa(productCounter),
		ProductName: productName,
		Price:       price,
		Status:      "CREATED",
		Description: description,
		Raws:        raws,
		Dates:       dates,
		Actors:      actors,
	}

	productAsBytes, _ := json.Marshal(product)

	incrementCounter(ctx, "ProductCounterNO")

	return ctx.GetStub().PutState(product.ProductId, productAsBytes)
}

func (s *SmartContract) UpdateProduct(ctx contractapi.TransactionContextInterface, manufacturerId string, productId string, productName string, price float64, description string, rawIds string) error {

	_, error := s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	if product.Status != "CREATED" && product.Status != "UPDATED" {
		return fmt.Errorf("this product cannot be updated")
	}

	var raws []*Raw
	rawIdsSplit := strings.Split(rawIds, ",")
	for _, rawId := range rawIdsSplit {
		raw, _ := s.GetRaw(ctx, rawId)
		raws = append(raws, raw)
	}

	product.ProductName = productName
	product.Price = price
	product.Description = description
	product.Status = "UPDATED"
	product.Raws = raws

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

func (s *SmartContract) OrderRaw(ctx contractapi.TransactionContextInterface, manufacturerId string, rawId string, supplierId string) error {

	_, error := s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, supplierId, "supplier")
	if error != nil {
		return error
	}

	rawAsBytes, _ := ctx.GetStub().GetState(rawId)
	if rawAsBytes == nil {
		return fmt.Errorf("cannot find this raw")
	}

	raw := new(Raw)
	_ = json.Unmarshal(rawAsBytes, raw)

	if raw.SupplierId != supplierId {
		return fmt.Errorf("supplier do not own this raw")
	}

	raw.ManufacturerId = manufacturerId

	updatedRawAsBytes, _ := json.Marshal(raw)

	return ctx.GetStub().PutState(raw.RawId, updatedRawAsBytes)
}

func (s *SmartContract) ProvideProduct(ctx contractapi.TransactionContextInterface, manufacturerId string, productId string, retailerId string, distributorId string) error {

	_, error := s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, distributorId, "distributor")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, retailerId, "retailer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	if product.Status != "ORDERED" {
		return fmt.Errorf("this product cannot be provided")
	}

	product.Actors.DistributorId = distributorId
	product.Status = "DELIVERING"

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

/* 	DISTRIBUTOR FUNCTIONS
DELIVERY PRODUCT
*/
func (s *SmartContract) DeliveryProduct(ctx contractapi.TransactionContextInterface, distributorId string, productId string, manufacturerId string, retailerId string) error {

	_, error := s.CheckUser(ctx, distributorId, "distributor")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, retailerId, "retailer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	if product.Status != "DELIVERING" {
		return fmt.Errorf("this product cannot be delivered")
	}

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	product.Dates.Distributed = txTimeAsPtr

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

/* 	RETAILER FUNCTIONS
ORDER PRODUCT
RECEIVE PRODUCT
SELL PRODUCT
*/

func (s *SmartContract) OrderProduct(ctx contractapi.TransactionContextInterface, retailerId string, productId string, manufacturerId string) error {

	_, error := s.CheckUser(ctx, retailerId, "retailer")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	if product.Status != "CREATED" && product.Status != "UPDATED" {
		return fmt.Errorf("this product cannot be ordered")
	}

	product.Actors.RetailerId = retailerId
	product.Status = "ORDERED"

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

func (s *SmartContract) ReceiveProduct(ctx contractapi.TransactionContextInterface, retailerId string, productId string, manufacturerId string, distributorId string) error {

	_, error := s.CheckUser(ctx, distributorId, "distributor")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, manufacturerId, "manufacturer")
	if error != nil {
		return error
	}

	_, error = s.CheckUser(ctx, retailerId, "retailer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	if product.Status != "DELIVERING" {
		return fmt.Errorf("this product cannot be received")
	}

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	product.Dates.Received = txTimeAsPtr
	product.Status = "RECEIVED"

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

func (s *SmartContract) SellProduct(ctx contractapi.TransactionContextInterface, retailerId string, productId string) error {

	_, error := s.CheckUser(ctx, retailerId, "retailer")
	if error != nil {
		return error
	}

	productAsBytes, _ := ctx.GetStub().GetState(productId)
	if productAsBytes == nil {
		return fmt.Errorf("cannot find this product")
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, product)

	txTimeAsPtr, errTx := s.GetTxTimestampChannel(ctx)
	if errTx != nil {
		return fmt.Errorf("returning error in transaction timestamp")
	}

	product.Dates.Sold = txTimeAsPtr
	product.Status = "SOLD"

	updatedProductAsBytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(product.ProductId, updatedProductAsBytes)
}

/* 	COMMON FUNCTIONS
GET RAW(S)
GET PRODUCT(S)
GET USERS
GET RAW HISTORY
GET PRODUCT HISTORY
*/

func (s *SmartContract) GetUser(ctx contractapi.TransactionContextInterface, userId string) (*User, error) {
	userAsBytes, err := ctx.GetStub().GetState(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state. %s", err.Error())
	}

	if userAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", userId)
	}

	user := new(User)
	_ = json.Unmarshal(userAsBytes, &user)
	return user, nil
}

func (s *SmartContract) GetUsers(ctx contractapi.TransactionContextInterface, userType string) ([]*User, error) {

	assetCounter, _ := getCounter(ctx, "UserCounterNO")
	startKey := "User1"
	endKey := "User" + strconv.Itoa(assetCounter+1)
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	var users []*User

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		var _user User
		_ = json.Unmarshal(response.Value, &_user)
		if userType == _user.UserType {
			users = append(users, &_user)
		}
	}

	return users, nil
}

func (s *SmartContract) GetProduct(ctx contractapi.TransactionContextInterface, productId string) (*Product, error) {
	productAsBytes, err := ctx.GetStub().GetState(productId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state. %s", err.Error())
	}

	if productAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", productId)
	}

	product := new(Product)
	_ = json.Unmarshal(productAsBytes, &product)
	return product, nil
}

func (s *SmartContract) GetProducts(ctx contractapi.TransactionContextInterface, userId string) ([]*Product, error) {

	assetCounter, _ := getCounter(ctx, "ProductCounterNO")
	startKey := "Product1"
	endKey := "Product" + strconv.Itoa(assetCounter+1)
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	var products []*Product

	var user *User
	user, _ = s.GetUser(ctx, userId)

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		var product Product
		_ = json.Unmarshal(response.Value, &product)

		if product.Actors.ManufacturerId == userId && user.UserType != "manufacturer" {
			products = append(products, &product)
		} else if product.Actors.DistributorId == userId && user.UserType != "distributor" {
			products = append(products, &product)
		} else {
			products = append(products, &product)
		}
	}

	return products, nil
}

func (s *SmartContract) GetRaw(ctx contractapi.TransactionContextInterface, rawId string) (*Raw, error) {

	rawAsBytes, err := ctx.GetStub().GetState(rawId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state. %s", err.Error())
	}

	if rawAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", rawId)
	}

	raw := new(Raw)
	_ = json.Unmarshal(rawAsBytes, &raw)
	return raw, nil
}

func (s *SmartContract) GetRaws(ctx contractapi.TransactionContextInterface, userId string) ([]*Raw, error) {

	assetCounter, _ := getCounter(ctx, "RawCounterNO")
	startKey := "Raw1"
	endKey := "Raw" + strconv.Itoa(assetCounter+1)
	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	var raws []*Raw

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		var raw Raw
		_ = json.Unmarshal(response.Value, &raw)

		if raw.SupplierId == userId {
			raws = append(raws, &raw)
		} else {
			raws = append(raws, &raw)
		}
	}

	return raws, nil
}

func (s *SmartContract) GetRawHistories(ctx contractapi.TransactionContextInterface, rawId string) ([]RawHistory, error) {

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(rawId)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}
	defer resultsIterator.Close()

	var histories []RawHistory

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		var raw Raw
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &raw)
			if err != nil {
				return nil, err
			}
		} else {
			raw = Raw{
				RawId: rawId,
			}
		}

		timestamp, err := ptypes.Timestamp(response.Timestamp)
		if err != nil {
			return nil, err
		}

		rawHistory := RawHistory{
			Record:    &raw,
			TxId:      response.TxId,
			Timestamp: timestamp,
			IsDelete:  response.IsDelete,
		}
		histories = append(histories, rawHistory)
	}

	return histories, nil
}

func (s *SmartContract) GetProductHistories(ctx contractapi.TransactionContextInterface, productId string) ([]ProductHistory, error) {

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(productId)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}
	defer resultsIterator.Close()

	var histories []ProductHistory

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		var product Product
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &product)
			if err != nil {
				return nil, err
			}
		} else {
			product = Product{
				ProductId: productId,
			}
		}

		timestamp, err := ptypes.Timestamp(response.Timestamp)
		if err != nil {
			return nil, err
		}

		productHistory := ProductHistory{
			Record:    &product,
			TxId:      response.TxId,
			Timestamp: timestamp,
			IsDelete:  response.IsDelete,
		}
		histories = append(histories, productHistory)
	}

	return histories, nil
}

// MAIN FUNCTION
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
