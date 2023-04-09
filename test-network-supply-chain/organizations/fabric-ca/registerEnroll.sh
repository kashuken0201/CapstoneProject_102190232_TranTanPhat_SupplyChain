#!/bin/bash

function createFarmer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/farmer.scm.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/farmer.scm.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-farmer --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-farmer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-farmer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-farmer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-farmer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy farmer's CA cert to farmer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/tlscacerts/ca.crt"

  # Copy farmer's CA cert to farmer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/farmer.scm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farmer.scm.com/tlsca/tlsca.farmer.scm.com-cert.pem"

  # Copy farmer's CA cert to farmer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/farmer.scm.com/ca"
  cp "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farmer.scm.com/ca/ca.farmer.scm.com-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-farmer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-farmer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-farmer --id.name farmeradmin --id.secret farmeradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-farmer -M "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/msp" --csr.hosts peer0.farmer.scm.com --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-farmer -M "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls" --enrollment.profile tls --csr.hosts peer0.farmer.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/farmer.scm.com/peers/peer0.farmer.scm.com/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-farmer -M "${PWD}/organizations/peerOrganizations/farmer.scm.com/users/User1@farmer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farmer.scm.com/users/User1@farmer.scm.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://farmeradmin:farmeradminpw@localhost:7054 --caname ca-farmer -M "${PWD}/organizations/peerOrganizations/farmer.scm.com/users/Admin@farmer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farmer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farmer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farmer.scm.com/users/Admin@farmer.scm.com/msp/config.yaml"
}

function createManufacturer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/manufacturer.scm.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/manufacturer.scm.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7064 --caname ca-manufacturer --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7064-ca-manufacturer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7064-ca-manufacturer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7064-ca-manufacturer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7064-ca-manufacturer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy manufacturer's CA cert to manufacturer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/tlscacerts/ca.crt"

  # Copy manufacturer's CA cert to manufacturer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/tlsca/tlsca.manufacturer.scm.com-cert.pem"

  # Copy manufacturer's CA cert to manufacturer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/ca"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/ca/ca.manufacturer.scm.com-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name manufactureradmin --id.secret manufactureradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7064 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/msp" --csr.hosts peer0.manufacturer.scm.com --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7064 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls" --enrollment.profile tls --csr.hosts peer0.manufacturer.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/peers/peer0.manufacturer.scm.com/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7064 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/users/User1@manufacturer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/users/User1@manufacturer.scm.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://manufactureradmin:manufactureradminpw@localhost:7064 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/users/Admin@manufacturer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.scm.com/users/Admin@manufacturer.scm.com/msp/config.yaml"
}

function createDistributor() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/distributor.scm.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/distributor.scm.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7074 --caname ca-distributor --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7074-ca-distributor.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7074-ca-distributor.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7074-ca-distributor.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7074-ca-distributor.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy distributor's CA cert to distributor's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/tlscacerts/ca.crt"

  # Copy distributor's CA cert to distributor's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.scm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.scm.com/tlsca/tlsca.distributor.scm.com-cert.pem"

  # Copy distributor's CA cert to distributor's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.scm.com/ca"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.scm.com/ca/ca.distributor.scm.com-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name distributoradmin --id.secret distributoradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7074 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/msp" --csr.hosts peer0.distributor.scm.com --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7074 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls" --enrollment.profile tls --csr.hosts peer0.distributor.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/distributor.scm.com/peers/peer0.distributor.scm.com/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7074 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.scm.com/users/User1@distributor.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.scm.com/users/User1@distributor.scm.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://distributoradmin:distributoradminpw@localhost:7074 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.scm.com/users/Admin@distributor.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.scm.com/users/Admin@distributor.scm.com/msp/config.yaml"
}

function createRetailer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/retailer.scm.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/retailer.scm.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7084 --caname ca-retailer --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7084-ca-retailer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7084-ca-retailer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7084-ca-retailer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7084-ca-retailer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy retailer's CA cert to retailer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/tlscacerts/ca.crt"

  # Copy retailer's CA cert to retailer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.scm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.scm.com/tlsca/tlsca.retailer.scm.com-cert.pem"

  # Copy retailer's CA cert to retailer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.scm.com/ca"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.scm.com/ca/ca.retailer.scm.com-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name retaileradmin --id.secret retaileradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7084 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/msp" --csr.hosts peer0.retailer.scm.com --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7084 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls" --enrollment.profile tls --csr.hosts peer0.retailer.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/retailer.scm.com/peers/peer0.retailer.scm.com/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7084 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.scm.com/users/User1@retailer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.scm.com/users/User1@retailer.scm.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://retaileradmin:retaileradminpw@localhost:7084 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.scm.com/users/Admin@retailer.scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.scm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.scm.com/users/Admin@retailer.scm.com/msp/config.yaml"
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/scm.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/scm.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/scm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/scm.com/msp/tlscacerts/tlsca.scm.com-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/scm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/scm.com/tlsca/tlsca.scm.com-cert.pem"

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/msp" --csr.hosts orderer.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/scm.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/msp/config.yaml"

  infoln "Generating the orderer-tls certificates"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls" --enrollment.profile tls --csr.hosts orderer.scm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/scm.com/orderers/orderer.scm.com/msp/tlscacerts/tlsca.scm.com-cert.pem"

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/scm.com/users/Admin@scm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/scm.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/scm.com/users/Admin@scm.com/msp/config.yaml"
}