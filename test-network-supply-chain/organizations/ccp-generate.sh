#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=farmer
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/farmer.scm.com/tlsca/tlsca.farmer.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/farmer.scm.com/ca/ca.farmer.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/farmer.scm.com/connection-farmer.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/farmer.scm.com/connection-farmer.yaml

ORG=manufacturer
P0PORT=7061
CAPORT=7064
PEERPEM=organizations/peerOrganizations/manufacturer.scm.com/tlsca/tlsca.manufacturer.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/manufacturer.scm.com/ca/ca.manufacturer.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/manufacturer.scm.com/connection-manufacturer.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/manufacturer.scm.com/connection-manufacturer.yaml

ORG=distributor
P0PORT=7071
CAPORT=7074
PEERPEM=organizations/peerOrganizations/distributor.scm.com/tlsca/tlsca.distributor.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/distributor.scm.com/ca/ca.distributor.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributor.scm.com/connection-distributor.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/distributor.scm.com/connection-distributor.yaml

ORG=retailer
P0PORT=7081
CAPORT=7084
PEERPEM=organizations/peerOrganizations/retailer.scm.com/tlsca/tlsca.retailer.scm.com-cert.pem
CAPEM=organizations/peerOrganizations/retailer.scm.com/ca/ca.retailer.scm.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailer.scm.com/connection-retailer.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/retailer.scm.com/connection-retailer.yaml